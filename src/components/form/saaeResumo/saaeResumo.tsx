'use client'
import styles from './saaeResumo.module.css';
import DadosGerais from '../dadosGeraisSaae/dadosGerais';
import InfosPreliminares from '../infosPreliminaresSaae/infosPreliminares';
import InventarioSaae from '../inventarioSaae/inputIA';
import MatrizRisco from '../matrizSaae/matrizRisco';
import PlanoEmergencia from '../planoEmergencia/planoEmergencia';
import FotosInspecao from '../fotosInspecao/fotosInspecao';
import SectionDocumentos from '../sectionDocumentos/documentos';
import Botton from '../botton/botton';
import { useContext } from 'react';
import { Context } from '@/components/context/context';

type Props= {
    hiddeButton?: boolean
}
/**
 * Componente que exibe o resumo antes do envio ou os dados preenchidos de uma SAAE já enviada. 
 * @returns 
 */
export default function SaaeResumo ({hiddeButton}:Props){
    const context = useContext(Context);
    return(
        <div className={styles.conteiner}>
            <h2>8. Resumo da sua SAAE</h2>
            <DadosGerais readOnly/>
            <InfosPreliminares readOnly/>
            <InventarioSaae readOnly/>
            <MatrizRisco readOnly/>
            <PlanoEmergencia readOnly/>
            <FotosInspecao readOnly/>
            <SectionDocumentos readOnly/>
            {!hiddeButton ? 
            <div className={styles.subConteiner}>
                <Botton title='Preparar e Enviar' action={()=>{
                    context.sendSaae(context.dataSaae);
                }}/>
            </div>
            :null}
        </div>
    )
}