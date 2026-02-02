import Image from 'next/image';
import styles from './cardEventos.module.css';
import { DataNews } from '@/@types/types';
import { dateFormat2, dateFormat3, handleTypeUrl } from '@/scripts/globais';
import Link from 'next/link';
import { Metadata } from 'next';

type Props = {
    dataNews: DataNews
} 

// Configurar SEO dinâmico
export async function generateMetadata({ dataNews }: Props): Promise<Metadata> {
    if (!dataNews || !dataNews.slug) {
        return {
            title: "Notícia não encontrada",
            description: "A notícia requisitada não foi encontrada.",
        };
    }

    return {
        title: dataNews.title,
        description: dataNews.paragraph,
        openGraph: {
            title: dataNews.title,
            description: dataNews.paragraph,
            images: dataNews.imageID ? [{ url: dataNews.imageID[0] }] : [],
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/aconteceu/${dataNews._id}`
        }
    };
}

export default function CardEventos({dataNews}:Props){
    return(
        <Link 
            href={`/aconteceu/${dataNews.slug}`} 
            className={`${styles.card} boxShadow cursorPointer`}
        >
            <div className={styles.boxData}><span>{dateFormat2(dataNews.date)}</span></div>
            <Image 
                alt=''
                width={300}
                height={200}
                src={handleTypeUrl(Array.isArray(dataNews.imageID) ? dataNews.imageID[0] : dataNews.imageID)}
                className={styles.banner}
            /> 
            <h1>{dataNews.title}</h1>
            <h5>{dateFormat3(dataNews.date)}</h5>
            <p>
                {dataNews.paragraph}                  
            </p>
        </Link>
    )
}