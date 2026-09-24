import { Metadata } from "next";
import { DataNews } from '@/@types/types';
import { TextFormatter } from '@/components/layout/newsPage/newsPage';
import Link from "next/link";
import hero from "@/app/projetos/page.module.css";
import { cache } from "react";
import { notFound } from "next/navigation";
import Carrocel from "@/components/layout/carrocel/carrocel";
import { dateFormat3 } from "@/scripts/globais";

import styles from './article.module.css';
import axios from "axios";
import ShareButton from "@/components/layout/shareButton/shareButton";

type PageProps = {
    params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
    const slug = (await (params)).slug;
    const noticia = await getNewsData(slug) as DataNews;
    
    if (!noticia) notFound();
    const category = noticia.evento ? 'Eventos' : 'Aconteceu';
    const back = noticia.evento ? '/eventos' : '/aconteceu';
    const images = (Array.isArray(noticia.imageID) ? noticia.imageID : [noticia.imageID]).filter(Boolean);
    const date = noticia.date ? new Date(noticia.date) : null;
    const validDate = date && !isNaN(date.getTime());
    const map = /^https?:\/\//i.test(noticia.linkMaps || '') ? noticia.linkMaps : null;
    return <article className={hero.page}>
        <header className={hero.hero}>
            <div className={hero.heroInner}>
                <nav aria-label="Caminho da página" className={hero.breadcrumb}>
                    <Link href="/">Início</Link><span aria-hidden="true">/</span>
                    <Link href={back}>{category}</Link><span aria-hidden="true">/</span>
                    <span aria-current="page">Detalhes da publicação</span>
                </nav>
                <span className={hero.eyebrow}>{noticia.evento ? 'Agenda do Coqueiral' : 'Histórias do Coqueiral'}</span>
                <h1>{noticia.title}</h1>
                {validDate && <time className={styles.date} dateTime={date.toISOString()}>{dateFormat3(noticia.date)}</time>}
            </div>
        </header>
        <div className={styles.content}>
            {images.length > 0 && <div className={styles.gallery}><Carrocel urlImages={images}/></div>}
            <div className={styles.toolbar}>
                {map && <a className={styles.map} href={map} target="_blank" rel="noopener noreferrer">Ver local no mapa<span className="sr-only"> (abre em nova aba)</span></a>}
                <ShareButton title={noticia.title} text={noticia.paragraph}
                    url={`${process.env.ROOT_URL || 'https://19.escoteiroses.org.br'}/aconteceu/${noticia.slug}`}
                    imageUrl={images[0] || ''}/>
            </div>
            <div className={styles.text}><TextFormatter text={noticia.paragraph}/></div>
            <footer className={styles.footer}><Link href={back}>← Voltar para {category.toLowerCase()}</Link><Link href="/projetos">Conheça nossos projetos →</Link></footer>
        </div>
    </article>;
}

const getNewsData = cache(async (slug: string) => {
    try{
        const response = await axios.get(`${process.env.ROOT_URL}${process.env.URL_SERVICES}`, {
            params: {
                service: 'news',
                slug: slug,
            },
            headers: {
                'Authorization': `Bearer ${process.env.AUTORIZATION}`
            }
        });

        const data = await response.data as { news: DataNews };
        return data.news;
    }catch(error){
        console.error("Erro ao buscar notícia em aconteceu:", error);
        return null;
    }
});

export const revalidate = 60;

// Gerar os caminhos estáticos (substitui getStaticPaths)
export async function generateStaticParams() {
    try {
        const response = await axios.get(`${process.env.ROOT_URL}${process.env.URL_SERVICES}`, {
            params: {service: 'news'}, 
            headers: { 
                'Authorization': `Bearer ${process.env.AUTORIZATION}`
            }
        });

        const noticias = await response.data.news as DataNews[]; 
        
        return noticias.map((noticia) => ({ slug: noticia.slug}));

    } catch (error) {
        console.error("Erro ao buscar notícias em aconteceu, genarateStaticPparams:", error);
        return [];
    }
}

// Configurar SEO dinâmico
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const slug = (await (params)).slug;
    const noticia = await getNewsData(slug) as DataNews;

    if (!noticia) {
        return {
            title: "Notícia não encontrada",
            description: "A notícia requisitada não foi encontrada.",
        };
    }

    return {
        title: noticia.title,
        description: noticia.paragraph,
        openGraph: {
            title: noticia.title,
            description: noticia.paragraph,
            images: noticia.imageID ? [{ 
                url: Array.isArray(noticia.imageID) ? noticia.imageID[0] : noticia.imageID,
                width: 800,
                height: 600,
                alt: noticia.title
            }] : [],
            url: `${process.env.ROOT_URL || 'https://19.escoteiroses.org.br'}/aconteceu/${noticia.slug}`
        }
    };
}
