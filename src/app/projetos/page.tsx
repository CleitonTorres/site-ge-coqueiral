import type { Metadata } from 'next';
import Link from 'next/link';
import Projetos from '@/components/layout/projetos/projetos';
import ShareButton from '@/components/layout/shareButton/shareButton';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Projetos do Coqueiral',
  description: 'Conheça os projetos de educação, cultura, esporte e meio ambiente do 19º Grupo Escoteiro Coqueiral.',
  alternates: { canonical: 'https://19.escoteiroses.org.br/projetos/' },
};

export default function Page() {
  const siteUrl = process.env.ROOT_URL || 'https://19.escoteiroses.org.br';
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <nav aria-label="Caminho da página" className={styles.breadcrumb}><Link href="/">Início</Link><span aria-hidden="true">/</span><span aria-current="page">Projetos</span></nav>
          <span className={styles.eyebrow}>Escotismo em ação</span>
          <h1>Juntos, fazemos a diferença.</h1>
          <p>Projetos do Grupo Escoteiro Coqueiral que transformam aprendizado em ações para a nossa comunidade.</p>
          <div className={styles.share}>
            <ShareButton title="Projetos do Coqueiral" text="Conheça os projetos do 19º Grupo Escoteiro Coqueiral." url={`${siteUrl}/projetos/`} imageUrl={`${siteUrl}/images/projetos/acampa-canoa/acampa-canoa01.jpg`} />
          </div>
        </div>
      </header>
      <Projetos resume={false} />
      <aside className={styles.invitation}>
        <div><h2>Faça parte dessa história</h2><p>Há muitas maneiras de contribuir com o escotismo em Coqueiral.</p></div>
        <Link href="/seja-escoteiro">Quero participar <span aria-hidden="true">→</span></Link>
      </aside>
    </div>
  );
}
