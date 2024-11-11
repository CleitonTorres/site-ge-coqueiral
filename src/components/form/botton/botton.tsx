'use client'
import Image from 'next/image';
import styles from './botton.module.css';

type Props = {
    title: string,
    imageURL?: string,
    action?: ()=>void
}

export default function Botton ({title, imageURL, action}: Props){
    return(
        <button className={styles.conteiner} onClick={action}>
            {imageURL ? <Image 
                alt=''
                width={26}
                height={26}
                src={imageURL}
            />:null}
            {title}
        </button>
    )
}