'use client'
import { useEffect, useState } from 'react';
import styles from './section.module.css';

type Props = {
    children:React.ReactNode
    customClass?: string[]
}
export default function Section({children, customClass}:Props){
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
        <section className={`${styles.conteiner} flexCollCenter ${customStyles}`}>
            {children}
        </section>
    )
}