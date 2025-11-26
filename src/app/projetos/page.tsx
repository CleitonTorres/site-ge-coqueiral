'use server'
import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import { Metadata } from 'next';
import Projetos from '@/components/layout/projetos/projetos';
import ShareButton from '@/components/layout/shareButton/shareButton';

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
                <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', padding: 10}}>
                  <ShareButton
                      title={"Projetos do Coqueiral"}
                      text={"Aqui você vai encontrar todos os projetos que o 19º Grupo Escoteiro Coqueiral desenvolve."}
                      url={`${process.env.NEXT_PUBLIC_ROOT_URL}/projetos/`}
                      imageUrl={`${process.env.NEXT_PUBLIC_ROOT_URL}/images/projetos/acampa-canoa/acampa-canoa (4).jpg`}
                  />
                </div>
                <Projetos resume={false} />
            </div>
        </Section>
    )
}

export default Page;