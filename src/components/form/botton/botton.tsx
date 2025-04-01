'use client'
import Image from 'next/image';
import styles from './botton.module.css';
import { useEffect, useState } from 'react';

type Props = {
    title: string,
    imageURL?: string,
    customClass?: string[],
    action?: ()=>void,
    titleHover?: string
}

export default function Botton ({title, imageURL, customClass, titleHover, action}: Props){
    const [customStyles, setCustomStyles] = useState('');

    useEffect(()=>{
        if(Array.isArray(customClass)){
            let newString = '';
            for (const item of customClass) {
                newString += styles[item] + " ";         
            }
            setCustomStyles(newString)
        }else{
            setCustomStyles(customClass ? styles[customClass] : '') 
        }
    },[customClass]);

    return(
        <button 
            className={`${styles.conteiner} ${customStyles}`} 
            onClick={action}
            title={titleHover}
        >
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