import { NextRequest, NextResponse } from 'next/server';
import { ObjectId, type Filter, type Document } from 'mongodb';
import { registrationDb, registrationSession } from '@/server/registrations';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const headers = {'Cache-Control': 'private, no-store'};

export async function GET(req: NextRequest) {
  const session = registrationSession(req);
  if (!session || !ObjectId.isValid(session.userId)) return NextResponse.json({error: 'Entre novamente no sistema para consultar as inscrições.'}, {status: 401, headers});
  try {
    const db = await registrationDb();
    if (!await db.collection('users').findOne({_id: new ObjectId(session.userId)}, {projection: {_id: 1}})) return NextResponse.json({error: 'Acesso não autorizado.'}, {status: 401, headers});
    const page = Math.max(1, Math.min(100000, Number(req.nextUrl.searchParams.get('page')) || 1));
    if (!Number.isInteger(page)) return NextResponse.json({error: 'Página inválida.'}, {status: 400, headers});
    const slug = req.nextUrl.searchParams.get('slug')?.slice(0, 120);
    const search = req.nextUrl.searchParams.get('search')?.trim().slice(0, 100);
    const filter: Filter<Document> = {status: 'completed', ...(slug ? {slug} : {})};
    if (search) {
      const expression = {$regex: search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i'};
      filter.$or = [{protocol: expression}, {registrationId: expression}, {'answers.name': expression}, {'answers.nome': expression}];
    }
    const collection = db.collection('registrations');
    const [records, total, slugs] = await Promise.all([
      collection.find(filter, {projection: {_id: 0, registrationId: 1, protocol: 1, slug: 1, answers: 1, kits: 1, totalCents: 1, submittedAt: 1, documents: 1, driveFolderId: 1, formSnapshot: 1}}).sort({submittedAt: -1, _id: -1}).skip((page - 1) * 25).limit(25).maxTimeMS(8000).toArray(),
      collection.countDocuments(filter, {maxTimeMS: 8000}),
      collection.distinct('slug', {status: 'completed'}, {maxTimeMS: 8000}),
    ]);
    const forms = await db.collection('registrationForms').find({slug: {$in: slugs}}, {projection: {_id: 0, slug: 1, title: 1, fields: 1}}).maxTimeMS(8000).toArray();
    const formsBySlug = new Map(forms.map(form => [form.slug, form]));
    return NextResponse.json({
      registrations: records.map(({formSnapshot, ...record}) => ({...record, form: formSnapshot || formsBySlug.get(record.slug) || {title: record.slug, fields: []}})),
      forms: slugs.map(slug => ({slug, title: formsBySlug.get(slug)?.title || slug})).sort((a, b) => a.title.localeCompare(b.title, 'pt-BR')),
      total, page, pageSize: 25,
    }, {headers});
  } catch {
    return NextResponse.json({error: 'Não foi possível carregar as inscrições. Tente novamente.'}, {status: 503, headers});
  }
}
