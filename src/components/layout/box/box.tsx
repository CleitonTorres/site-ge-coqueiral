'use client'
import { useEffect, useState } from 'react';
import styles from './box.module.css';

type Props = {
    children:React.ReactNode
    customClass?: string[]
}
export default function Box({children, customClass}:Props){
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

    return(
        <div className={`${customStyles}`}>
            {children}
        </div>
    )
}