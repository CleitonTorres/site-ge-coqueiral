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
import { useContext, useEffect } from 'react';
import { Context } from '@/components/context/context';
import Confirme from '@/components/layout/confirme/confirme';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfDocumentInfosPreliminares from '@/components/layout/PrintDoc/printDocInfoPreliminar';
import { SAAE } from '@/@types/types';

type Props= {
    hiddeButton?: boolean
}
/**
 * Componente que exibe o resumo antes do envio ou os dados preenchidos de uma SAAE já enviada. 
 * @returns 
 */

export default function SaaeResumo ({hiddeButton}:Props){
    const context = useContext(Context);

    const printComponent = (data: SAAE) => {
        // Salva os dados no localStorage
        localStorage.setItem("print-data", JSON.stringify(data));
      
        // Abre a página de impressão
        window.open("/administrativo/area-restrita/printer/resumoSaae", "_blank");
    };

      
    useEffect(()=>{
        return undefined
    },[]);
    
    return(
        <div className={styles.conteiner}>
            <h2>8. Resumo da sua SAAE</h2>
            <PDFDownloadLink 
                document={
                    <PdfDocumentInfosPreliminares dataSaae={context.dataSaae}/>
                } 
                fileName="informacoes-preliminares.pdf"
            >
                {({ blob, url, loading, error }) =>{
                    if(loading){
                        return 'Carregando documento...'
                    }else{
                        console.log('blob', blob, 'Url', url, 'error', error)
                        return <span style={{cursor:'pointer', textDecoration: 'underline'}}>imprimir informações preliminares</span>
                    }
                }}
            </PDFDownloadLink>
            
            <span 
                style={{cursor:'pointer', textDecoration: 'underline'}}
                onClick={()=>{
                    printComponent(context.dataSaae);
                }}
            >
                Imprimir SAAE
            </span>

            <DadosGerais 
                readOnly 
                idSaae={context.dataSaae._id} 
                obsSaae={context.dataSaae.obs} 
                statusSaae={context.dataSaae.status}
            />
            <InfosPreliminares readOnly/>
            <InventarioSaae readOnly/>
            <MatrizRisco readOnly/>
            <PlanoEmergencia 
                readOnly
                grauRisco={context.dataSaae.grauRisco}
                nomeAtividade={context.dataSaae.dadosGerais.nomeAtividade}
                localInicio={context.dataSaae.dadosGerais.localInicio}
            />
            <FotosInspecao readOnly/>
            <SectionDocumentos readOnly/>
            {!hiddeButton ? 
            <div className={styles.subConteiner}>
                <Botton 
                    customClass={['marginTop20']}
                    title='Enviar' 
                    action={()=>{
                    context.setShowModal({
                        element: <Confirme
                            message='Deseja enviar sua SAAE para análise?'
                            confirme={async()=>{
                                return await context.handleSendSaae(context.dataSaae);
                            }}
                            cancele={()=> context.setShowModal(null)}
                        />,
                        styles:['backgroundBlue']
                    })
                }}/>
            </div>
            :null}
        </div>
    )
}