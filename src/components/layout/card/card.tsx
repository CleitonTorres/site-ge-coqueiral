'use client'
import Image from "next/image";
import styles from './card.module.css';

type Props = {
    imageURL?: string,
    date?: string,
    title: string,
    paragraph: string,
    idNews: string,
}
export default function Card({title, paragraph, imageURL, date, idNews}:Props){
    return(
        <div className={styles.conteiner} onClick={()=> window.open(`/news/${idNews}`, '_self')}>
            {imageURL ? <Image
                alt="card"
                width={400}
                height={150}
                src={imageURL}
            />:null}
            <h4>{date || ''}</h4>
            <h1>{title}</h1>
            <p>
                {paragraph}
            </p>
        </div>
    )
}