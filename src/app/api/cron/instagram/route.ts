import { timingSafeEqual } from 'node:crypto';
import { refreshInstagramToken } from '@/server/instagram';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET(request: Request) {
    const secret = process.env.CRON_SECRET;
    const actual = Buffer.from(request.headers.get('authorization') || '');
    const expected = Buffer.from(`Bearer ${secret || ''}`);
    if (!secret || actual.length !== expected.length || !timingSafeEqual(actual, expected)) {
        return Response.json({error: 'Não autorizado'}, {status: 401});
    }
    try {
        return Response.json(await refreshInstagramToken(), {headers: {'Cache-Control': 'no-store'}});
    } catch {
        console.error('Falha na renovação automática do Instagram. Verifique configuração, conexão e autorização na Meta.');
        return Response.json({error: 'Falha na renovação do Instagram'}, {status: 503});
    }
}
