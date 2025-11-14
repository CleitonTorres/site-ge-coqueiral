import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import Image from 'next/image';
import Carrocel from '@/components/layout/carrocel/carrocel';
import { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Dia de Semear Paz",
    description:
      "Planejar e executar um projeto que tenha como objetivo contribuir com a minimização dos impactos...",
    keywords:
      "cultura, comunidade, impacto social, trabalho voluntário, projetos sociais, meio ambiente, educação, social, crianças, dia de semear paz",
    authors: [{ name: "19 Grupo Escoteiro Coqueiral" }],
    icons: {
      icon: "/favicon.ico",
    },
    metadataBase: new URL('https://www.19.escoteiroses.org.br/projetos/dia-de-semear-paz'),
    openGraph: {
        title: "Dia de Semear Paz",
        description:
            "Planejar e executar um projeto que tenha como objetivo contribuir com a minimização dos impactos...",
        images: [],
        url: 'www.19.escoteiroses.org.br/projetos/dia-de-semear-paz'
    }
  };
}

export default function Page(){
    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <h1 className={styles.title}>Dia de Semear Paz</h1>
            <div className={styles.conteiner}>
                <div className={styles.subConteiner}>
                    <Image 
                        alt=""
                        width={970}
                        height={350}
                        src={'/images/mensageiros-da-paz (4).jpg'}
                        className={styles.image}
                    /> 
                    <p className={styles.paragraph}>
                        Em decorrência das fortes chuvas ocorridas no dia 22/23 de Março de 2024 na região de Mimoso do Sul no ES as quais ocasionaram alagamentos de porte nunca registrado no Estado do ES, várias famílias sofreram e ficaram sem abrigo, e perderam os seus bens materiais nessa ocasião.
                        Entre os afetados, inúmeras crianças as quais além de terem perdido seus bens materiais, sofreram impactos sociais e psicológicos que ficarão gravados em suas vidas.
                    </p>
                    <Carrocel urlImages={[
                        '/images/mensageiros-da-paz (1).png',
                        '/images/mensageiros-da-paz (2).jpg',
                        '/images/mensageiros-da-paz (22).png',
                        '/images/mensageiros-da-paz (3).jpg',
                        '/images/mensageiros-da-paz (3).png',
                        '/images/mensageiros-da-paz (4).jpg',
                        '/images/mensageiros-da-paz (5).png',
                        '/images/mensageiros-da-paz (6).png'
                    ]} />
                    <ul>
                        <li className={styles.subTitle}>
                            Objetivo do projeto
                        </li>
                        <li className={styles.paragraph}>
                            Planejar e executar um projeto que tenha como objetivo contribuir com a minimização dos impactos sofridos pelas crianças afetadas pelas chuvas em Mimoso do Sul, em especial as crianças da comunidade Morro da Palha.
                            Esse projeto consiste na promoção de um bazar solidário no qual convidamos a comunidade de Coqueiral a contribuir com doações de roupas, calçados e outros itens, para constituir o bazar solidário.
                            Por meio desse bazar, arrecadamos recursos financeiros que forão destinados à compra de brinquedos/material escolar (de acordo com a necessidade identificada) para as crianças de Mimoso do Sul e em alinhamento com o grupo de Mimoso faremos um evento para a distribuição dos itens.
                        </li>
                        <li className={styles.subTitle}>
                            Objetivo secundário
                        </li>
                        <li className={styles.paragraph}>
                            realização dos itens 61 (c- atuar em alguma campanha de auxílio à comunidade, ou em apoio a desastres) e 53 (participar ativamente de pelo menos 1 atividade de cunho comunitário desenvolvida pela sua patrulha) da progressão sênior.
                        </li>
                        <li className={styles.subTitle}>
                            Conclusão/Resultados.
                        </li>
                        <li className={styles.paragraph}>
                            Foram arrecadados R$1.229,00 + 171,00 (doação) = R$ 1400,00, com esse valor conseguimos comprar 150 brinquedos novos e no dia 26/10 foi realizado o evento onde atendemos aproximadamente 100 crianças. Os brinquedos que sobraram 20 bambolês, 5 bonecas e alguns bichinhos diversos foram deixados aos cuidados do GE Mimoso do Sul para serem distribuídos posteriormente. 
                            Houve também distribuição de picolé e pipoca para todos. Podemos notar que o evento foi impactante para as crianças e ficamos muito orgulhosos de ter conseguido concluí-lo desta forma.
                            <br/>
                        </li>
                        <li className={styles.subTitle}>
                            Autores:
                        </li>
                        <li className={styles.paragraph}>
                            Kauany Alves Oliveira
                            Monitora Patrulha Xavante,
                            Laura Corrêa Guimarães
                            Sub monitora Patrulha Xavante,
                            Cleiton Torres Machado
                            Chefe de seção,
                            Ana Paula Corrêa do Carmo
                            Chefe assistente,
                            Colaboração:
                            Rubia Veiga Riveiro Machado
                            Ch. Diretora Presidente,
                            Ademilsian Alves de Lima Oliveira
                            Ch. Diretora Administrativa
                        </li>
                    </ul>
                </div>
            </div>
            <Link 
                href={'https://photos.app.goo.gl/ENG394XHfzMciiR58'} 
                target='_blank'
            >
                <h2 
                    className={styles.subtitle}
                    style={{textAlign: 'center'}}
                >
                    Veja nosso álbum de fotos.
                </h2>                    
                <Image 
                    alt='meio ambiente, escoteiros, aracruz, coqueiral, praia limpa, rio, mar, lagoa'
                    src={'/images/mutcom03.jpg'}
                    width={300}
                    height={200}
                    style={{objectFit: 'contain', height: 'auto', width: '100%'}}
                />
            </Link>
        </Section>
    )
}