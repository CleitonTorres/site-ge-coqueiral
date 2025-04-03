import Image from 'next/image';
import styles from './cardEventos.module.css';
import { DataNews } from '@/@types/types';
import { dateFormat2, dateFormat3, handleTypeUrl } from '@/scripts/globais';
import Link from 'next/link';

type Props = {
    dataNews: DataNews
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
                src={handleTypeUrl(dataNews)}
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