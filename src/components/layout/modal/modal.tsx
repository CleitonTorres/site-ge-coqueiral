'use client'
import { ReactNode, useContext, useEffect, useState } from "react";
import styles from "./modal.module.css";
import { Context } from "@/components/context/context";

type Props ={
    children: ReactNode | null,
    customClass?: string[],
    actionClose?: ()=>void
}

/**
 * Componente usado para exibir sobre posições.
 * @returns 
 */
export default function Modal ({children, customClass, actionClose}:Props){
    const context = useContext(Context);
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
            <span onClick={()=>{
                if(actionClose) actionClose();
                context.setShowModal(null);
            }} className={styles.closeBtn}>X</span>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    )
}