import type { DataNews } from '@/@types/types';
import { dateFormat3, handleTypeUrl } from '@/scripts/globais';
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.css';

export default async function NewsHomeSection({ apenasEventos = false }: { apenasEventos?: boolean }) {
  const heading = apenasEventos ? 'Nossos eventos' : 'Notícias do grupo';
  const id = apenasEventos ? 'events-heading' : 'news-heading';
  let news: DataNews[] = [];
  let failed = false;
  try {
    const response = await fetch(`${process.env.ROOT_URL}${process.env.URL_SERVICES}?service=news`, {
      headers: { Authorization: `Bearer ${process.env.AUTORIZATION}` },
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error('Falha ao carregar notícias');
    const data = await response.json();
    news = (Array.isArray(data.news) ? data.news as DataNews[] : [])
      .filter(item => Boolean(item.evento) === apenasEventos)
      .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
      .slice(0, 3);
  } catch { failed = true; }

  return <section className={styles.section} aria-labelledby={id}>
    <div className={styles.heading}><h2 id={id}>{heading}</h2><Link href={apenasEventos ? '/eventos' : '/aconteceu'}>{apenasEventos ? 'Todos os eventos' : 'Todas as notícias'} <span aria-hidden="true">→</span></Link></div>
    {news.length > 0 ? <div className={styles.conteiner}>{news.map(item => {
      const excerpt = (item.paragraph || '').replace(/\/p/g, ' ').replace(/\*/g, '').trim();
      return <Link href={`/aconteceu/${item.slug}`} key={String(item._id)} className={styles.content}>
        {item.imageID && <Image alt="" width={600} height={375} sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" src={handleTypeUrl(Array.isArray(item.imageID) ? item.imageID[0] : item.imageID)} />}
        <div className={styles.body}><span className={styles.date}>{dateFormat3(item.date)}</span><h3>{item.title}</h3><p>{excerpt.length > 180 ? excerpt.slice(0, 177) + '…' : excerpt}</p><span className={styles.more}>Leia mais <span aria-hidden="true">→</span></span></div>
      </Link>;
    })}</div> : <p className={styles.empty}>{failed ? 'Não foi possível carregar as publicações agora. Tente novamente mais tarde.' : apenasEventos ? 'Novos eventos serão publicados aqui.' : 'Novas notícias serão publicadas aqui.'}</p>}
  </section>;
}
