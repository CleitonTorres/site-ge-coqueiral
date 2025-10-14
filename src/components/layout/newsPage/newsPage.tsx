'use client'
import Section from '@/components/layout/sections/section';
import styles from './newsPage.module.css';
import Image from 'next/image';
import { dateFormat3 } from '@/scripts/globais';
import { Fragment, useContext, useEffect, useState } from 'react';
import { Context } from '@/components/context/context';
import { DataNews } from '@/@types/types';
import Carrocel from '../carrocel/carrocel';
import Head from 'next/head';

type Props = {
    origem: 'cadastro' | 'view',
    idNews?: string,
    dataNews?: DataNews
}

const TextLink = (text:string)=> {  
    // Regex para identificar URLs (começando com http:// ou https://)
    const urlPattern = /https?:\/\/[^\s/$.?#].[^\s]*/g;
  
    // Combinar mais padrões padrões em uma única RegEx
    const combinedPattern = new RegExp(`${urlPattern.source}`, 'g');
  
    // Divide o texto em partes
    const parts = (text || '').split(combinedPattern);
  
    // Encontra todos os CNPJs na string
    const matches = [...(text || '').matchAll(combinedPattern)];
  
    // Mapeia e renderiza partes do texto, tornando CNPJs clicáveis
    return (
      <div>
        {parts.map((part, index) => (
          <p key={index} className={styles.paragraph}>
            {part}
            {matches[index] && (
              <a
                href={matches[index][0]}
                target="_blank"
                rel="noopener noreferrer"
              >
                {matches[index][0]}
              </a>
            )}
          </p>
        ))}
      </div>
    );
}

export const TextFormatter = ({ text }: { text: string }) => {
    return <div className={styles.subConteiner}>{TextLink(text)}</div>;
};


export default function NewsPage({idNews, dataNews}:Props) {
    const context = useContext(Context);
    const [news, setNews] = useState(context?.dataNews.find(news=> news._id === idNews));
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": dataNews?.title,
        "description": dataNews?.paragraph,
        "image": dataNews?.imageID,
        "datePublished": dataNews?.date,
        "author": {
          "@type": "Person",
          "name": "19º ES Grupo Escoteiro Coqueiral",
        },
    };

    useEffect(()=>{
        if(dataNews){
            console.log(dataNews)
            setNews(dataNews)
        }
    },[dataNews]);

    useEffect(()=>{
        console.log("componente", news)
    },[news])
    
    if(!news) return <span>Nada para ler aqui</span>;

    return(
        <>
        <Head>
            <title>{dataNews?.title} | Seu Site</title>
            <meta name="description" content={dataNews?.paragraph} />
            <meta name="keywords" content={dataNews?.keywords?.join(', ')} />
            <meta property="og:title" content={dataNews?.title} />
            <meta property="og:description" content={dataNews?.paragraph} />
            <meta property="og:image" content={`${dataNews?.imageID}`} />
            <meta property="og:url" content={`https://seusite.com/noticias/${dataNews?._id}`} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />
        </Head>
        <Section customClass={['flexCollTop', 'maxWidth']}>
            <h1 className={styles.title}>{news.title}</h1>
            {news.imageID ? 
                <div className={styles.conteinerImg}>
                    <Carrocel urlImages={typeof news.imageID === 'string' ? [news.imageID] : news.imageID}/>
                </div>                
            :null}
            <div className={styles.dataLocal}>
                <h4>{`${dateFormat3(dataNews?.date)}`}</h4>
                {dataNews?.linkMaps ?
                <div className={styles.boxLocation}>
                    <Image 
                        alt=''
                        width={16}
                        height={20}
                        src={'/icons/location.svg'}
                        className={styles.svg}
                    />
                    <h6><a href={dataNews.linkMaps}>Local</a></h6>
                </div>
                :null}
            </div>
            <TextFormatter text={news.paragraph}/>
        </Section>
        </>
    )
}