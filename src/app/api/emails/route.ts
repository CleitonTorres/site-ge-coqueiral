import { NextRequest, NextResponse } from 'next/server';
import { emailNotificationId } from '@/server/email/notification-token';
import { notifyRegistration } from '@/server/email/registration-notification';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const authorization = req.headers.get('authorization');
  const id = emailNotificationId(authorization?.startsWith('Bearer ') ? authorization.slice(7) : undefined);
  if (!id) return NextResponse.json({error: 'Acesso não autorizado.'}, {status: 401});
  
  // Only the template and recipients configured on the server can be used.
  try {
    const result = await notifyRegistration(id);
    return NextResponse.json(result, {status: result.status === 'not-found' ? 404 : result.status === 'processing' ? 202 : 200, headers: {'Cache-Control': 'no-store'}});
  } catch (error) {
    console.error('[emails] notificação de inscrição falhou', {registrationId: id, code: (error as {code?: string}).code || 'EMAIL_SEND_FAILED'});
    return NextResponse.json({error: 'Não foi possível enviar a notificação.'}, {status: 503});
  }
}
