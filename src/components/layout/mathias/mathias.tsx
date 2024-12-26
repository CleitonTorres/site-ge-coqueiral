'use client'
import Image from "next/image";
import Texting from "../texting/texting";
import styles from './mathias.module.css';
import { useEffect, useState } from "react";

type Props ={
    text: string,
    show: boolean,
    customClass?: string[]
}
export default function Mathias ({text, show, customClass}:Props){
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
    },[customClass])

    if(!show) return null;
    
    return(
        <div className={`${styles.boxAvatar} ${customStyles}`}> 
            <Image 
                alt='assistente Mathias'
                width={90}
                height={90}
                src={'/icons/assistente-mathias.png'}
            />
            <Texting text={text} speed={100} customClass={customClass}/>
        </div>
    )
}