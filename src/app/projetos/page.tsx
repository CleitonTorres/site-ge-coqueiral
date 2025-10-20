'use server'
import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import Image from 'next/image';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Projetos do Coqueiral",
    description:
      "Aqui você vai encontrar todos os projetos que o 19º Grupo Escoteiro Coqueiral desenvolve.",
    keywords:
      "cultura, comunidade, impacto social, trabalho voluntário, projetos sociais, meio ambiente, educação, esporte, escoteiro dev, acampa canoa, escoteiros pela biodiversidade, dia de semear paz, pipa escoteira",
    authors: [{ name: "19 Grupo Escoteiro Coqueiral" }],
    icons: {
      icon: "/favicon.ico",
    },
    metadataBase: new URL('https://www.19.escoteiroses.org.br/projetos/'),
    openGraph: {
        title: "Projetos do Coqueiral",
        description:
            "Aqui você vai encontrar todos os projetos que o 19º Grupo Escoteiro Coqueiral desenvolve.",
        images: [],
        url: 'www.19.escoteiroses.org.br/projetos/'
    }
  };
}

function Page(){
    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <div className={styles.conteiner}>
                <h1 className={styles.title}>Projetos dos Grupo Escoteiro Coqueiral</h1>
                <Image 
                    alt=""
                    width={970}
                    height={350}
                    src={'/images/header-eventos.png'}
                    className={styles.image}
                    about='projeto para captar brinquedos e alimentos para crianças em zonas carentes'
                /> 

                <ul className={styles.boxLinks}>
                    <li className='boxShadow cursorPointer'>
                        <a href="/projetos/escoteiros-pela-biodiversidade" target='_self'>
                            <Image 
                                alt='' 
                                width={296} 
                                height={150} 
                                src={'/images/biodiversidade (1).jpg'}
                                quality={100}
                                loading='eager'
                                priority
                                unoptimized
                                className={styles.image2}
                                about='projeto realizado por jovens de 14,4 a 17 anos que visa mapear especies invasoras, georeferenciando e comunicando as autoridades municipais.'
                            />
                            <span>Escoteiros Pela Biodiversidade</span>
                        </a>
                    </li>
                    <li className='boxShadow cursorPointer'>
                        <a href="/projetos/dia-de-semear-paz" target='_self'>
                        <Image 
                            alt='' 
                            width={296} 
                            height={150} 
                            src={'/images/mensageiros-da-paz (4).jpg'}
                            loading='eager'
                            quality={100}
                            priority
                            unoptimized
                            className={styles.image2}
                        />
                        <span>Dia de Semear Paz</span>
                        </a>
                    </li>
                    <li className='boxShadow cursorPointer'>
                        <a href="/projetos/acampa-canoa" target='_self'>
                            <Image 
                                alt='' 
                                width={296} 
                                height={150} 
                                src={'/images/projetos/acampa-canoa/acampa-canoa01.jpg'}
                                className={styles.image2}
                                loading='eager'
                                quality={100}
                                priority
                                unoptimized
                                about='projeto de esporte nautico com cunho educativa realizado uma vez por ano com escoteiros de Cachoeiro, Linhares, Vitória e Aracruz.'
                            />
                            <span>Acampa Canoa</span>
                        </a>
                    </li>
                    <li className='boxShadow cursorPointer'>
                        <a href="/projetos/escoteiro-dev" target='_self'>
                            <Image 
                                alt='' 
                                width={296} 
                                height={150} 
                                loading='eager'
                                src={'/images/escoteiro-dev.jpg'}
                                className={styles.image2}
                                quality={100}
                                priority
                                unoptimized
                                about='imagem do projeto de aulas de informática básica e programação'
                            />
                            <span>Escoteiro Dev</span>
                            
                        </a>
                    </li>
                    <li className='boxShadow cursorPointer'>
                        <a href="/projetos/pipa-escoteira" target='_self'>
                            <Image 
                                alt='' 
                                width={296} 
                                height={150} 
                                loading='eager'
                                className={styles.image2}
                                quality={100}
                                priority
                                unoptimized
                                src={'/images/projetos/pipa-escoteira/pipa-escoteira01.jpeg'}
                                about='projeto cultural que visa a proteção de tradições da melhor infancia incentivo a artes visuais e trabalhos manuais com a confecção de pipas.'
                            />
                            <span>Pipa Escoteira</span>
                        </a>
                    </li>
                </ul>
            </div>
        </Section>
    )
}

export default Page;