import { createHmac, timingSafeEqual } from 'node:crypto';

export function emailNotificationId(token: string | undefined, secret = process.env.INSCRICOES_SECRET): string | null {
  try {
    if (!secret || secret.length < 32 || !token || token.length > 4096) return null;
    const [data, signature, extra] = token.split('.');
    if (!data || !signature || extra) return null;
    const expected = createHmac('sha256', secret).update(data).digest();
    const actual = Buffer.from(signature, 'base64url');
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString());
    return payload.scope === 'registration-email' && typeof payload.id === 'string' && payload.id.length <= 100 && payload.expires > Date.now() && payload.expires <= Date.now() + 6 * 60 * 1000 ? payload.id : null;
  } catch { return null; }
}
