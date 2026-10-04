import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import { registrationAdmin, registrationDb, sameOrigin } from '@/server/registrations';
import { publicForm, RegistrationForm, validateForm } from '@/lib/registrations/model';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest) {
  try {
    const admin = req.nextUrl.searchParams.get('admin') === '1';
    if (admin && !registrationAdmin(req)) 
      return NextResponse.json({
        error: 'Entre novamente como administrador ou dirigente.'
      }, {status: 401}
    );
    
    const db = await registrationDb();
    const slug = req.nextUrl.searchParams.get('slug');
    const forms = await db.collection<RegistrationForm>('registrationForms').find(slug ? {slug} : {}).sort({title: 1}).toArray();
    
    return NextResponse.json({
      forms: forms.map(({_id: _id, ...form}) => admin ? form : publicForm(form))
    }, {headers: {'Cache-Control': 'no-store'}});
  } catch {
    return NextResponse.json({error: 'Não foi possível carregar os formulários.'}, {status: 503}); 
  }
}
async function save(req: NextRequest, create: boolean) {
  if (!registrationAdmin(req) || !sameOrigin(req)) return NextResponse.json({error: 'Acesso não autorizado.'}, {status: 403});
  let body;
  
  try { body = await req.json(); } catch { 
    return NextResponse.json({error: 'Dados inválidos.'}, {status: 400}); 
  }

  let form: RegistrationForm;
  try { 
    form = validateForm(body); 
  } catch (error) { 
    return NextResponse.json({error: (error as Error).message}, 
      {status: 400}
    ); 
  }
  
  try {
    const db = await registrationDb();
    const collection = db.collection<RegistrationForm>('registrationForms');
    await collection.createIndex({slug: 1}, {unique: true});
    form.revision = randomUUID();
    
    if (create) await collection.insertOne(form);
    else {
      if (typeof body.revision !== 'string') return NextResponse.json({
        error: 'Recarregue o formulário.'}, 
        {status: 400}
      );
      
      const result = await collection.replaceOne({slug: form.slug, revision: body.revision}, form);
      if (!result.matchedCount){ 
        return NextResponse.json({
          error: 'O formulário foi alterado por outro usuário. Recarregue antes de salvar.'}, 
          {status: 409}
        );
      }
    }
    return NextResponse.json({form}, {status: create ? 201 : 200});
  } catch (error) {
    return NextResponse.json({error: (error as {code?: number}).code === 11000 ? 'Já existe um formulário com esse endereço.' : 'Não foi possível salvar o formulário.'}, {status: (error as {code?: number}).code === 11000 ? 409 : 503});
  }
}

export function POST(req: NextRequest) { return save(req, true); }
export function PUT(req: NextRequest) { return save(req, false); }
