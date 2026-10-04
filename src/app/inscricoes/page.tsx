'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Banner from '@/components/layout/banner/banner';
import { PublicForm } from '@/lib/registrations/model';
import styles from '@/components/form/registration/styles.module.css';
export default function Page() {
  const [forms, setForms] = useState<PublicForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/inscricoes/formularios', {cache: 'no-store', signal: controller.signal}).then(async response => { const data = await response.json(); if (!response.ok) throw new Error(data.error); setForms(data.forms); }).catch(error => {if (!controller.signal.aborted) setError(error.message);}).finally(() => {if (!controller.signal.aborted) setLoading(false);});
    return () => controller.abort();
  }, []);
  return <div className={styles.page}>
    <Banner 
      title="Novas histórias começam aqui." 
      subTitle="Inscrições" 
      paragraph="Participe das atividades do Grupo Escoteiro Coqueiral." 
      imageURL="/logo/logo.png" 
    />
    <div className={styles.content}>
      <h2 className={styles.heading}>Encontre sua próxima aventura</h2>
      {loading ? 
        <p role="status">Carregando inscrições…</p> 
        : error ? 
          <p role="alert" className={styles.error}>{error}</p> 
          : !forms.length ? 
            <p className={styles.notice}>Nenhum formulário publicado no momento.</p> 
            : <div className={styles.cards}>{forms.map(form => 
              <article className={styles.card} key={form.slug}>
                <span className={styles.eyebrow}>
                  {form.open ? 'Inscrições abertas' : 'Inscrições fechadas'}
                </span>
                <h2>{form.title}</h2>
                <p>{form.description}</p>
                <Link className={styles.button} href={`/inscricoes/${form.slug}`}>
                  {form.open ? 'Fazer inscrição →' : 'Consultar formulário →'}
                </Link>
              </article>
            )}</div>
      }
      </div>
    </div>;
}
