'use client'
import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import Image from 'next/image';
import CardEventos from '@/components/layout/cardEventos/cardEventos';
import { useContext } from 'react';
import { Context } from '@/components/context/context';
import { v4 } from 'uuid';
import LoadIcon from '@/components/layout/loadIcon/loadIcon';
import Head from 'next/head';

export default function Page(){
    const context = useContext(Context);
    return(
        <>
        <Head>
            <title>Aconteceu - Notícias</title>
            <meta name="description" content="Fique por dentro das últimas notícias e eventos relacionados ao nosso trabalho e à comunidade que servimos. Acompanhe atualizações importantes, histórias inspiradoras e informações relevantes que impactam positivamente a vida das pessoas." />
            <meta name="keywords" content="notícias, eventos, atualizações, comunidade, histórias inspiradoras, impacto social, trabalho voluntário, projetos sociais" />
            <meta name="author" content="19 Grupo Escoteiro Coqueiral" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <div className={styles.conteiner}>
                <h1 className={styles.title}>Notícias</h1>
                <Image 
                    alt=""
                    width={970}
                    height={350}
                    src={'/images/header-eventos.png'}
                    className={styles.image}
                />            
                <div className={styles.subConteiner}>
                    {context.dataNews ?
                        context.dataNews.filter(news=> !news.evento).map(news=>(
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
                    : <LoadIcon showHide/>}                    
                </div>
            </div>
        </Section>
        </>
    )
}