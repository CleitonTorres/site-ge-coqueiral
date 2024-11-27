import { ReactNode, useEffect, useState } from "react";
import styles from "./modal.module.css";

type Props ={
    children: ReactNode | null,
    customClass?: string[],
}

export default function Modal ({children, customClass}:Props){
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
        <div className={`${styles.conteiner} ${customStyles}`} aria-label="modal">
            <div className={styles.content}>
                {children}
            </div>
        </div>
    )
}