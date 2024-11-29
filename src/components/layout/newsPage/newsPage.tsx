'use client'
import Section from '@/components/layout/sections/section';
import styles from './newsPage.module.css';
import { DataNews } from '@/@types/types';
import Image from 'next/image';
import { isRelativeURL, isValidURL } from '@/scripts/globais';

type Props = {
    origem: 'cadastro' | 'view',
    dataNews: DataNews
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
             elements.push(<span key={lastIndex}>{text.slice(lastIndex, index)}</span>);
         }
 
         // Verifica qual padrão foi encontrado
         if (p1 !== undefined) {
             // Formatação de parágrafo
             elements.push(
                 <p key={index} style={{ margin: '10px 0' }}>
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
         elements.push(<span key={lastIndex}>{text.slice(lastIndex)}</span>);
     }
 
     return elements;
};
const TextFormatter = ({ text }: { text: string }) => {
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

export default function NewsPage({dataNews}:Props) {
    return(
        <Section customClass={['flexCollTop', 'maxWidth']}>
            <h1 className={styles.title}>{dataNews.title}</h1>
            {dataNews.imageID ? 
                <div className={styles.conteinerImg}>
                        <Image 
                        alt=""
                        width={970}
                        height={350}
                        src={isValidURL(dataNews.imageID) ? dataNews.imageID : isRelativeURL(dataNews.imageID) ? dataNews.imageID : `https://drive.google.com/uc?export=download&id=${dataNews.imageID}`}
                        className={styles.image}
                        decoding='auto'/>
                </div>                
            :null}
            <TextFormatter text={dataNews.paragraph}/>
        </Section>
    )
}