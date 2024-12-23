'use client'
import { SAAE } from "@/@types/types";
import styles from './printCircular.module.css';
import { FaPrint } from "react-icons/fa6";

type Props = {
    dataSaae: SAAE
}
export default function PrintCircular({dataSaae}:Props) {
    return(
        <div className={styles.conteiner}>
            <FaPrint size={30} cursor={'pointer'} onClick={()=> window.print()}/>
            
            <h1>Informações Preliminares do evento {dataSaae.dadosGerais?.nomeAtividade || ''}</h1>
            <p>
                A coordenação do evento {dataSaae.dadosGerais?.nomeAtividade || ''} informa a todos os interessados as informações mínimas e preliminares relacionadas ao evento/atividade.
            </p>
            {dataSaae?.infosPreliminares?.map((info, index) => (
                <div key={index}>
                    <h2>{info.item}.</h2>
                    <p>{info.text}</p>
                </div>
            ))}
        </div>
    )
}