'use client'
import Image from "next/image";
import styles from './card.module.css';
import Link from "next/link";
import { DataNews } from "@/@types/types";
import { dateFormat3, isRelativeURL, isValidURL } from "@/scripts/globais";

export default function Card({dataNews}:{dataNews:DataNews}){    
    return(
        <Link href={{
            pathname: '/news/',
            query: {idNews: dataNews._id}
            }} 
            className={styles.conteiner}
        >
            {dataNews.imageID ? 
                <Image
                    alt="card"
                    width={400}
                    height={150}
                    style={{objectFit: 'cover', width: '98%'}}
                    src={isValidURL(dataNews.imageID) ? dataNews.imageID : isRelativeURL(dataNews.imageID) ? dataNews.imageID : `https://drive.google.com/uc?export=download&id=${dataNews.imageID}`}
                />
            :null}
            <h4>{dateFormat3(dataNews.date) || ''}</h4>
            <h1>{dataNews.title}</h1>
            <p>
                {dataNews.paragraph}
            </p>
        </Link>
    )
}