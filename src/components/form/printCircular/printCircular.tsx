'use client'
import { SAAE } from "@/@types/types";
import styles from './printCircular.module.css';
import { FaPrint } from "react-icons/fa6";
import { useState } from "react";

type Props = {
    dataSaae: SAAE
}
export default function PrintCircular({dataSaae}:Props) {
    const [localData, setLocalData] = useState({} as {local: string, data: string});

    return(
        <div className={styles.conteiner}>
            <FaPrint size={30} cursor={'pointer'} onClick={()=> window.print()}/>
            
            <h1>Informações Preliminares do evento/atividade {dataSaae.dadosGerais?.nomeAtividade || ''}</h1>
            <p>
                A coordenação do evento {dataSaae.dadosGerais?.nomeAtividade || ''} informa a todos os interessados as informações mínimas e preliminares relacionadas ao evento/atividade.
            </p>
            {dataSaae?.infosPreliminares?.map((info, index) => (
                <div key={index}>
                    <h2>{info.item}.</h2>
                    <p>{info.text}</p>
                </div>
            ))}

            <span>À coordenação,</span>
            <span className={styles.boxData}>
                <input 
                    value={localData.local || ''} 
                    placeholder="Local"
                    onChange={(e)=>setLocalData((prev)=>{return{...prev, local: e.target.value}})}/>,  
                <input 
                    type="date"
                    defaultValue={localData.data}
                    datatype={localData.data}
                    placeholder="data"
                    onChange={(e)=>setLocalData((prev)=>{return{...prev, data: e.target.value}})} 
                />
            </span>
        </div>
    )
}