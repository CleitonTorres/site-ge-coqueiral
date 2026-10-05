import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import { registrationSession, sameOrigin } from '@/server/registrations';
import { validateLinktree } from '@/lib/linktree/model';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// As rotas legadas fecham a conexão compartilhada; esta mantém seu próprio pool.
let clientPromise: Promise<MongoClient> | undefined;
async function database() {
  if (!process.env.URL_MONGO) throw new Error('URL_MONGO não configurada.');
  clientPromise ??= new MongoClient(process.env.URL_MONGO, {
    maxPoolSize: 5, serverSelectionTimeoutMS: 8000, connectTimeoutMS: 8000,
  }).connect().catch(error => { clientPromise = undefined; throw error; });
  return (await clientPromise).db('site-coqueiral');
}
async function canEdit(req: NextRequest) {
  const session = registrationSession(req);
  if (!session || !ObjectId.isValid(session.userId)) return false;
  const user = await (await database()).collection('users').findOne(
    { _id: new ObjectId(session.userId) }, { projection: { nivelAcess: 1 } },
  );
  return !!user && ['Admin', 'Dirigente'].includes(user.nivelAcess);
}

export async function GET(req: NextRequest) {
  try {
    if (req.nextUrl.searchParams.get('admin') === '1' && !await canEdit(req)) {
      return NextResponse.json({ error: 'Apenas Admin e Dirigente podem editar o Linktree. Entre novamente se sua sessão expirou.' }, { status: 403 });
    }
    const profile = await (await database()).collection('linktree').findOne({}, {
      projection: { _id: 0, name: 1, bio: 1, avatarUrl: 1, links: 1 },
    });
    if (!profile) return NextResponse.json({ error: 'Nenhum perfil Linktree encontrado.' }, { status: 404 });
    return NextResponse.json(validateLinktree(profile), { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json({ error: 'Não foi possível carregar os links.' }, { status: 503 });
  }
}

export async function PUT(req: NextRequest) {
  if (!sameOrigin(req)) return NextResponse.json({ error: 'Acesso não autorizado.' }, { status: 403 });
  try {
    if (!await canEdit(req)) return NextResponse.json({ error: 'Apenas Admin e Dirigente podem editar o Linktree. Entre novamente se sua sessão expirou.' }, { status: 403 });
    let profile;
    try { profile = validateLinktree(await req.json()); }
    catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : 'Dados inválidos.' }, { status: 400 }); }
    const collection = (await database()).collection('linktree');
    const current = await collection.findOne({}, { projection: { _id: 1 } });
    if (!current) return NextResponse.json({ error: 'Nenhum perfil Linktree encontrado.' }, { status: 404 });
    const result = await collection.updateOne({ _id: current._id }, { $set: profile });
    if (!result.matchedCount) return NextResponse.json({ error: 'Perfil removido. Recarregue o editor.' }, { status: 404 });
    return NextResponse.json(profile, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json({ error: 'Não foi possível salvar o Linktree.' }, { status: 503 });
  }
}
