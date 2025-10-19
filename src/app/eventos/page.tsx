'use server'
import styles from './page.module.css';
import Image from 'next/image';
import CardEventos from '@/components/layout/cardEventos/cardEventos';
import { v4 } from 'uuid';
import { DataNews } from '@/@types/types';
import Head from 'next/head';

export default async function Page(){
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_ROOT_URL}${process.env.NEXT_PUBLIC_URL_SERVICES}?service=news`,
            {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTORIZATION}`,
            },
            cache: 'force-cache', // SEO friendly
            }
        );

        const data = await response.json();
        const news: DataNews[] = (data.news as DataNews[])
        ?.sort((a, b)=> {
            const dateA = a.date ? new Date(a.date).getTime() : 0;
            const dateB = b.date ? new Date(b.date).getTime() : 0;
            return dateB - dateA
        });

        if(!news || news.length === 0){
            return <p>Não há notícias disponíveis no momento.</p>;
        }

        return (
            <>
            <Head>
                <title>Nossos Evento</title>
                <meta name="description" content="Fique por dentro eventos relacionados ao nosso trabalho e à comunidade que servimos. Acompanhe atualizações importantes, histórias inspiradoras e informações relevantes que impactam positivamente a vida das pessoas." />
                <meta name="keywords" content="notícias, eventos, atualizações, comunidade, histórias inspiradoras, impacto social, trabalho voluntário, projetos sociais" />
                <meta name="author" content="19 Grupo Escoteiro Coqueiral" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <section>
                <div className={styles.conteiner}>
                    <h1 className={styles.title}>Nossos Eventos</h1>
                    <Image 
                        alt=""
                        width={970}
                        height={350}
                        src={'/images/header-eventos.png'}
                        className={styles.image}
                    />            
                    <div className={styles.subConteiner}>
                        {news ?
                            news.filter(news=> news.evento)
                            .map(news=>(
                            <CardEventos 
                                key={v4()}
                                dataNews={
                                    {
                                        date:news.date || new Date(),
                                        destaque: news.destaque || false,
                                        imageID: news.imageID || ['/images/grupo00.jpg'],
                                        linkMaps: news.linkMaps || '',
                                        paragraph: news.paragraph || '',
                                        title: news.title || '',
                                        slug: news.slug || '',
                                        keywords:[],
                                        evento: news.evento || true,
                                        _id: ''
                                    }
                                }
                            />
                        ))
                        : <p>carregando...</p>}                    
                    </div>
                </div>
            </section>
            </>      
        );
    } catch (err) {
        console.error("Erro ao buscar os eventos:", err);
        return <p>Não foi possível carregar as notícias.</p>;
    }
}