'use client'
import Section from '@/components/layout/sections/section';
import styles from './newsPage.module.css';
import Image from 'next/image';
import { dateFormat3 } from '@/scripts/globais';
import { useContext, useEffect, useState } from 'react';
import { Context } from '@/components/context/context';
import { DataNews } from '@/@types/types';
import Carrocel from '../carrocel/carrocel';

type Props = {
    origem: 'cadastro' | 'view',
    idNews: string,
    dataNews?: DataNews
}

const formatText = (text:string) => {
    if(!text) return<></>;

    // Regex para identificar os padrões de formatação
    const pattern = /\/p(.*?)\/p|\*(.*?)\*/g;

    const elements: JSX.Element[] = [];
    let lastIndex = 0;
 
    // Percorre as correspondências dos padrões
    text.replace(pattern, (match, p1, bold, index) => {
        // Adiciona o texto antes da correspondência como texto simples
        if (lastIndex < index) {
            elements.push(<span className={styles.paragraph} key={lastIndex}>{text.slice(lastIndex, index)}</span>);
        }

        // Verifica qual padrão foi encontrado
        if (p1 !== undefined) {
            // Formatação de parágrafo
            elements.push(
                <p key={index} className={styles.paragraph}>
                    {formatText(p1)} {/* Processa recursivamente */}
                </p>
            );
        } else if (bold !== undefined) {
            // Formatação de negrito
            elements.push(
                <strong key={index} style={{ fontWeight: 'bold' }}>
                    {bold}
                </strong>
            );
        }

        lastIndex = index + match.length;
        return match; // Necessário para o replace continuar
    });
 
    // Adiciona qualquer texto restante após o último match
    if (lastIndex < text.length) {
        elements.push(<p className={styles.paragraph} key={lastIndex}>{text.slice(lastIndex)}</p>);
    }
 
    return elements;
};

export const TextFormatter = ({ text }: { text: string }) => {
    return <div className={styles.subConteiner}>{formatText(text)}</div>;
};

// const TextLink = ({text}:{text:string})=> {  
//     // Regex para identificar URLs (começando com http:// ou https://)
//     const urlPattern = /https?:\/\/[^\s/$.?#].[^\s]*/g;
  
//     // Combinar os dois padrões em uma única RegEx
//     const combinedPattern = new RegExp(`${urlPattern.source}`, 'g');
  
//     // Divide o texto em partes, identificando CNPJs
//     const parts = text.split(combinedPattern);
  
//     // Encontra todos os CNPJs na string
//     const matches = [...text.matchAll(combinedPattern)];
  
//     // Mapeia e renderiza partes do texto, tornando CNPJs clicáveis
//     return (
//       <div>
//         {parts.map((part, index) => (
//           <Fragment key={index}>
//             {part}
//             {matches[index] && (
//               <a
//                 style={{ color: 'rgb(8, 8, 38)', textDecoration: 'underline', cursor: 'pointer' }}
//                 href={matches[index][0]}
//               >
//                 {matches[index][0]}
//               </a>
//             )}
//           </Fragment>
//         ))}
//       </div>
//     );
// }

export default function NewsPage({idNews, dataNews}:Props) {
    const context = useContext(Context);
    const [news, setNews] = useState(context?.dataNews.find(news=> news._id === idNews));

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
    )
}