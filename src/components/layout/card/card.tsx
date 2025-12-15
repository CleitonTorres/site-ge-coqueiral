import Image from "next/image";
import styles from './card.module.css';
import Link from "next/link";
import { DataNews } from "@/@types/types";
import { dateFormat3, handleTypeUrl } from "@/scripts/globais";
import { JSX } from "react";

const formatText = (text:string) => {
    if(!text) return<></>;

    // Regex para identificar os padrões de formatação
    const pattern = /\/p(.*?)\/p|\*(.*?)\*/g;

    const elements: JSX.Element[] = [];
    let lastIndex = 0;
 
    // Percorre as correspondências dos padrões
    text.replace(pattern, (match, p1, bold, index) => {
        // Adiciona o texto antes da correspondência como texto simples
        // if (lastIndex < index) {
        //     elements.push(<span className={styles.paragraph} key={lastIndex}>{text.slice(lastIndex, index)}</span>);
        // }

        // Verifica qual padrão foi encontrado
        if (p1 !== undefined) {
            // Formatação de parágrafo
            elements.push(
                <p key={index} className={styles.paragraph}>
                    {p1} {/* Processa recursivamente */}
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
 
    // // Adiciona qualquer texto restante após o último match
    if (lastIndex < text.length) {
        elements.push(<p className={styles.paragraph} key={lastIndex}>{text.slice(lastIndex)}</p>);
    }
 
    return elements;
};

export default function Card({dataNews}:{dataNews:DataNews}){    
    return(
        <Link href={`/aconteceu/${dataNews.slug}`} 
            className={styles.conteiner}
        >
            {dataNews.imageID ? 
                <Image
                    alt="card"
                    width={400}
                    height={150}
                    style={{
                        objectFit: 'contain',
                        backgroundColor: 'transparent', 
                        width: '100%'
                    }}
                    src={handleTypeUrl(Array.isArray(dataNews.imageID) ? dataNews.imageID[0] : dataNews.imageID)} 
                />
            :null}
            <h4>{dateFormat3(dataNews.date) || ''}</h4>
            <h1>{dataNews.title}</h1>
            {formatText(dataNews.paragraph)[0] || ''}
        </Link>
    )
}