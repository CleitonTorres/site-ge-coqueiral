import Link from 'next/link';
import Image from 'next/image';
import { DataNews } from '@/@types/types';
import { handleTypeUrl } from '@/scripts/globais';
import hero from '@/app/projetos/page.module.css';
import cards from '@/components/layout/projetos/projetos.module.css';
import styles from './newsListing.module.css';

export default async function NewsListing({events = false}: {events?: boolean}) {
    const label = events ? 'Eventos' : 'Aconteceu';
    let items: DataNews[] = [];
    let failed = false;
    try {
        const url = new URL(process.env.URL_SERVICES || '/api/services', process.env.ROOT_URL || 'https://19.escoteiroses.org.br');
        url.searchParams.set('service', 'news');
        const response = await fetch(url, {
            headers: {Authorization: `Bearer ${process.env.AUTORIZATION}`},
            next: {revalidate: 60},
        });
        if (!response.ok) throw new Error('Serviço indisponível');
        const data = await response.json();
        if (!Array.isArray(data.news)) throw new Error('Resposta inválida');
        items = data.news.filter((item: DataNews) => Boolean(item.evento) === events && item.slug)
            .sort((a: DataNews, b: DataNews) => (new Date(b.date).getTime() || 0) - (new Date(a.date).getTime() || 0));
    } catch {
        failed = true;
        console.error(`Não foi possível carregar a lista de ${label}.`);
    }
    return <div className={hero.page}>
        <header className={hero.hero}>
            <div className={hero.heroInner}>
                <nav aria-label="Caminho da página" className={hero.breadcrumb}>
                    <Link href="/">Início</Link><span aria-hidden="true">/</span><span aria-current="page">{label}</span>
                </nav>
                <span className={hero.eyebrow}>Escotismo em ação</span>
                <h1>{events ? 'Encontros que nos aproximam.' : 'Histórias que fazem a diferença.'}</h1>
                <p>{events ? 'Acompanhe os eventos e as oportunidades de viver o escotismo com o Grupo Escoteiro Coqueiral.' : 'Conheça as atividades, conquistas e histórias do Grupo Escoteiro Coqueiral na nossa comunidade.'}</p>
            </div>
        </header>
        <section className={cards.section} aria-labelledby="publicacoes">
            <div className={cards.heading}>
                <div><span className={cards.eyebrow}>Nosso dia a dia</span><h2 id="publicacoes">{events ? 'Nossos eventos' : 'Últimos acontecimentos'}</h2></div>
                <Link className={cards.all} href={events ? '/aconteceu' : '/eventos'}>{events ? 'Ver acontecimentos' : 'Ver eventos'}</Link>
            </div>
            {items.length ? <ul className={cards.grid}>
                {items.map(item => {
                    const image = Array.isArray(item.imageID) ? item.imageID[0] : item.imageID;
                    const date = item.date ? new Date(item.date) : null;
                    const validDate = date && !isNaN(date.getTime());
                    return <li key={item.slug}>
                        <Link href={`/aconteceu/${item.slug}`} className={cards.card}>
                            <Image src={image ? handleTypeUrl(image) : '/images/grupo00.jpg'} alt="" width={600} height={375}
                                sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw" className={cards.image} />
                            <div className={cards.body}>
                                <span className={cards.category}>{events ? 'Evento' : 'Aconteceu'}</span>
                                {validDate && <time className={styles.date} dateTime={date.toISOString()}>{date.toLocaleDateString('pt-BR', {timeZone: 'America/Sao_Paulo', day: 'numeric', month: 'long', year: 'numeric'})}</time>}
                                <h3>{item.title}</h3>
                                <p className={styles.excerpt}>{item.paragraph}</p>
                                <span className={cards.more}>Leia mais <span aria-hidden="true">→</span></span>
                            </div>
                        </Link>
                    </li>;
                })}
            </ul> : <div className={styles.empty}>
                <h3>{failed ? 'Não foi possível carregar as publicações' : events ? 'Nenhum evento publicado no momento' : 'Nenhuma notícia publicada no momento'}</h3>
                <p>{failed ? 'Tente novamente em alguns instantes.' : 'Volte em breve para acompanhar as novidades do grupo.'}</p>
                {failed && <a href={events ? '/eventos' : '/aconteceu'}>Tentar novamente</a>}
            </div>}
        </section>
        <aside className={hero.invitation}>
            <div><h2>Faça parte dessa história</h2><p>Há muitas maneiras de contribuir com o escotismo em Coqueiral.</p></div>
            <Link href="/seja-escoteiro">Quero participar <span aria-hidden="true">→</span></Link>
        </aside>
    </div>;
}
