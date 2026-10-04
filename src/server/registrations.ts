import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { MongoClient } from 'mongodb';
import { NextRequest } from 'next/server';
import { matchesRequestOrigin } from '@/lib/registrations/security';

let client: Promise<MongoClient> | undefined;
export async function registrationDb() {
  if (!process.env.URL_MONGO) throw new Error('Configure URL_MONGO.');
  client ??= new MongoClient(process.env.URL_MONGO, {serverSelectionTimeoutMS: 8000, connectTimeoutMS: 8000}).connect().catch(error => { client = undefined; throw error; });
  return (await client).db('site-coqueiral');
}
export function signRegistrationToken(payload: object) {
  const secret = process.env.INSCRICOES_SECRET;
  if (!secret || secret.length < 32) throw new Error('Configure INSCRICOES_SECRET com pelo menos 32 caracteres.');
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');

  return `${data}.${createHmac('sha256', secret).update(data).digest('base64url')}`;
}

export function registrationSession(req: NextRequest): {userId: string; role: string} | null {
  try {
    const secret = process.env.INSCRICOES_SECRET;
    const token = req.cookies.get('coqueiral-admin')?.value;
    if (!secret || secret.length < 32 || !token) return null;

    const [data, signature, extra] = token.split('.');
    if (!data || !signature || extra) return null;
    
    const expected = createHmac('sha256', secret).update(data).digest();
    const actual = Buffer.from(signature, 'base64url');
    if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;
    
    const session = JSON.parse(Buffer.from(data, 'base64url').toString());
    return session.scope === 'admin' && session.expires > Date.now() && typeof session.userId === 'string' && typeof session.role === 'string' ? {userId: session.userId, role: session.role} : null;
  } catch { return null; }
}

export function registrationAdmin(req: NextRequest): boolean {
  const session = registrationSession(req);
  return !!session && ['Admin', 'Dirigente'].includes(session.role);
}

export function sameOrigin(req: NextRequest) {
  return matchesRequestOrigin(req.headers.get('origin'), req.url, req.headers.get('host'));
}
