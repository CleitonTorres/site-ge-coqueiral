'use client'
import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import Image from 'next/image';
import CardEventos from '@/components/layout/cardEventos/cardEventos';
import { useContext } from 'react';
import { Context } from '@/components/context/context';
import { v4 } from 'uuid';

export default function Page(){
    const context = useContext(Context);

    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
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
                    {context.dataNews?.filter(news=> news.evento).map(news=>(
                        <CardEventos 
                            key={v4()}
                            dataNews={
                                {
                                    date:news.date || new Date(),
                                    destaque: news.destaque || false,
                                    imageID: news.imageID ||[ '/images/grupo00.jpg'],
                                    linkMaps: news.linkMaps || '',
                                    paragraph: news.paragraph || '',
                                    slug: news.slug || '',
                                    title: news.title || '',
                                    keywords:[],
                                    evento: news.evento || true,
                                    _id: ''
                                }
                            }
                        />
                    ))
                    }                    
                </div>
            </div>
        </Section>
    )
}