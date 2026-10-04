import Link from 'next/link';
import { connection } from 'next/server';
import { registrationDb } from '@/server/registrations';
import { RegistrationForm } from '@/lib/registrations/model';
import styles from './styles.module.css';

export default async function OpenRegistrations() {
  // Render current availability in the server HTML, rather than loading it after hydration.
  await connection();
  let forms: Pick<RegistrationForm, 'slug' | 'title' | 'description'>[] = [];
  let failed = false;
  try {
    const db = await registrationDb();
    forms = await db.collection<RegistrationForm>('registrationForms')
      .find({open: true}, {projection: {_id: 0, slug: 1, title: 1, description: 1}, maxTimeMS: 5000})
      .sort({title: 1}).toArray();
  } catch { failed = true; }
  return <section className={styles.section} aria-labelledby="open-registrations-heading">
    <div className={styles.heading}>
      <div><span className={styles.eyebrow}>Sua próxima aventura</span><h2 id="open-registrations-heading">Inscrições abertas</h2></div>
      <Link href="/inscricoes">Todas as inscrições <span aria-hidden="true">→</span></Link>
    </div>
    {forms.length ? <div className={styles.grid}>{forms.map(form => <article className={styles.card} key={form.slug}>
      <span className={styles.status}>Inscrições abertas</span>
      <h3><Link href={`/inscricoes/${form.slug}`}>{form.title}</Link></h3>
      <p>{form.description.length > 220 ? `${form.description.slice(0, 217)}…` : form.description}</p>
      <Link className={styles.action} href={`/inscricoes/${form.slug}`}>Quero participar <span aria-hidden="true">→</span></Link>
    </article>)}</div> : <p className={styles.empty}>{failed ? 'Não foi possível consultar as inscrições agora. Tente novamente mais tarde.' : 'Novas oportunidades de participação serão publicadas aqui. Acompanhe as próximas atividades do grupo.'}</p>}
  </section>;
}
