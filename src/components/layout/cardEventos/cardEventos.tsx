import Image from 'next/image';
import styles from './cardEventos.module.css';
import { DataNews } from '@/@types/types';
import { dateFormat2, dateFormat3, handleTypeUrl } from '@/scripts/globais';

type Props = {
    dataNews: DataNews
} 
export default function CardEventos({dataNews}:Props){
    return(
        <div className={`${styles.card} boxShadow cursorPointer`} onClick={()=>window.open(`/news?idNews=${dataNews._id}`, '_self')}>
            <div className={styles.boxData}><span>{dateFormat2(dataNews.date)}</span></div>
            <Image 
                alt=''
                width={200}
                height={200}
                src={handleTypeUrl(dataNews)}
                className={styles.banner}
            /> 
            <h1>{dataNews.title}</h1>
            <h5>{dateFormat3(dataNews.date)}</h5>
            <p>
                {dataNews.paragraph}                  
            </p> 
            {dataNews.linkMaps ?
            <div className={styles.boxLocation}>
                <Image 
                    alt=''
                    width={16}
                    height={36}
                    src={'/icons/location.svg'}
                    className={styles.svg}
                />
                <h6><a href={dataNews.linkMaps}>Local</a></h6>
            </div>
            :null}
        </div>
    )
}