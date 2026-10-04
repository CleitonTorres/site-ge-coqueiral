import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import { insertRegistrationWithProtocol } from '@/server/registration-protocol';
import { registrationDb, sameOrigin, signRegistrationToken } from '@/server/registrations';
import { RegistrationForm, validateAnswers } from '@/lib/registrations/model';
import { CaptchaVerification, registrationCaptchaFailure } from '@/lib/registrations/security';

export const runtime = 'nodejs';
export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return NextResponse.json({error: 'Origem não autorizada.'}, {status: 403});
  try {
    const body = await req.json();
    if (typeof body.slug !== 'string' || typeof body.captcha !== 'string' || body.captcha.length > 4096) return NextResponse.json({error: 'Dados inválidos.'}, {status: 400});
    const uploadBase = process.env.URL_UPLOAD;
    const secret = process.env.RECATCHA_SECRET_KEY || process.env.RECAPTCHA_KEY_SECRET || process.env.RECAPTCHA_SECRET_KEY || process.env.RECAPTCHA_SECRET;
    if (!uploadBase || !secret || !process.env.INSCRICOES_SECRET) return NextResponse.json({error: 'As inscrições ainda não foram configuradas. Entre em contato com o grupo.'}, {status: 503});
    const verification = await fetch('https://www.google.com/recaptcha/api/siteverify', {method: 'POST', body: new URLSearchParams({secret, response: body.captcha}), signal: AbortSignal.timeout(10000)});
    if (!verification.ok) return NextResponse.json({error: 'O serviço de verificação de segurança está indisponível. Tente novamente.', code: 'RECAPTCHA_UNAVAILABLE'}, {status: 503});
    const captcha = await verification.json() as CaptchaVerification;
    const hostname = new URL(req.headers.get('origin')!).hostname;
    const failure = registrationCaptchaFailure(captcha, hostname);
    if (failure) {
      // Never log credentials or the token; retain only Google's validation result.
      const diagnostics = {score: captcha.score, action: captcha.action, hostname: captcha.hostname, expectedHostname: hostname, googleErrorCodes: captcha['error-codes']};
      console.warn('[inscricoes] reCAPTCHA recusado', {code: failure.code, ...diagnostics});
      return NextResponse.json({error: failure.error, code: failure.code, ...(process.env.NODE_ENV === 'development' ? {diagnostics} : {})}, {status: failure.status});
    }
    const db = await registrationDb();
    const form = await db.collection<RegistrationForm>('registrationForms').findOne({slug: body.slug});
    if (!form) return NextResponse.json({error: 'Formulário não encontrado.'}, {status: 404});
    if (!form.open) return NextResponse.json({error: 'As inscrições estão fechadas.'}, {status: 409});
    if (form.revision !== body.revision) return NextResponse.json({error: 'O formulário mudou. Atualize a página antes de se inscrever.'}, {status: 409});
    let registration;
    try { registration = validateAnswers(form, body); } catch (error) { return NextResponse.json({error: (error as Error).message}, {status: 400}); }
    const id = randomUUID();
    const expires = Date.now() + 30 * 60 * 1000;
    const ticket = signRegistrationToken({scope: 'registration-upload', id, slug: form.slug, expires});
    const collection = db.collection('registrations');
    await collection.createIndex({registrationId: 1}, {unique: true});
    const protocol = await insertRegistrationWithProtocol(collection, {registrationId: id, slug: form.slug, revision: form.revision, ...registration, status: 'authorized', createdAt: new Date(), expiresAt: new Date(expires)});
    return NextResponse.json({ticket, registrationId: id, protocol, uploadUrl: `${uploadBase.replace(/\/$/, '')}/inscricoes`, expires}, {headers: {'Cache-Control': 'no-store'}});
  } catch { return NextResponse.json({error: 'Não foi possível preparar a inscrição. Tente novamente.'}, {status: 503}); }
}
