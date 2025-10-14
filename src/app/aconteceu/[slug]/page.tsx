import { Metadata } from "next";
import { DataNews } from '@/@types/types';
import { TextFormatter } from '@/components/layout/newsPage/newsPage';
import Head from "next/head";
import Section from "@/components/layout/sections/section";
import Carrocel from "@/components/layout/carrocel/carrocel";
import { dateFormat3 } from "@/scripts/globais";
import Image from "next/image";
import styles from './page.module.css';
import axios from "axios";
import ShareButton from "@/components/layout/shareButton/shareButton";

type PageProps = {
    params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
    const slug = (await (params)).slug;
    const noticia = await getNewsData(slug) as DataNews;
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": noticia?.title,
        "description": noticia?.paragraph,
        "image": noticia?.imageID,
        "datePublished": noticia?.date,
        "author": {
          "@type": "Person",
          "name": "19º ES Grupo Escoteiro Coqueiral",
        },
    };
    if (!noticia) {
        return <div>Notícia não encontrada</div>;
    }

    return(
        <>
        <Head>
            <title>{noticia?.title} | Seu Site</title>
            <meta name="description" content={noticia?.paragraph} />
            <meta name="keywords" content={noticia?.keywords?.join(', ')} />
            <meta property="og:title" content={noticia?.title} />
            <meta name="author" content="19 Grupo Escoteiro Coqueiral" />
            <meta property="og:description" content={noticia?.paragraph} />
            <meta property="og:image" content={`${noticia?.imageID}`} />
            <meta property="og:url" content={`https://19.escoteiroses.org.br/${noticia?._id}`} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />
        </Head>
        <Section customClass={['flexCollTop', 'maxWidth']}>
            <h1 className={styles.title}>{noticia.title}</h1>
            {noticia.imageID ? 
                <div className={styles.conteinerImg}>
                    <Carrocel 
                        urlImages={typeof noticia.imageID === 'string' ? [noticia.imageID] : noticia.imageID}
                    />
                </div>                
            :null}
            <div className={styles.dataLocal}>
                <h4>{`${dateFormat3(noticia?.date)}`}</h4>
                {noticia?.linkMaps ?
                <div className={styles.boxLocation}>
                    <Image 
                        alt=''
                        width={16}
                        height={20}
                        src={'/icons/location.svg'}
                        className={styles.svg}
                    />
                    <h6><a href={noticia.linkMaps}>Local</a></h6>
                </div>
                :null}

                
                <ShareButton
                    title={noticia.title}
                    text={noticia.paragraph}
                    url={`${process.env.NEXT_PUBLIC_ROOT_URL}/aconteceu/${noticia.slug}`}
                />
            </div>
            <TextFormatter text={noticia.paragraph}/>
        </Section>
        </>
    )
}

async function getNewsData(slug: string) {
    try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_ROOT_URL}${process.env.NEXT_PUBLIC_URL_SERVICES}`, {
            params: {
                service: 'news',
                slug: slug,
            },
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTORIZATION}`
            }
        });

        const data = await response.data as { news: DataNews };
        return data.news;
    }catch(error){
        console.error("Erro ao buscar notícia em aconteceu:", error);
        return null;
    }
}

// Gerar os caminhos estáticos (substitui getStaticPaths)
export async function generateStaticParams() {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_ROOT_URL}${process.env.NEXT_PUBLIC_URL_SERVICES}`, {
            params: {service: 'news'},
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTORIZATION}`
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
            images: noticia.imageID ? [{ url: noticia.imageID[0] }] : [],
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/aconteceu/${noticia._id}`
        }
    };
}
