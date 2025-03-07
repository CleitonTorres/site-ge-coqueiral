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
import { printComponent } from '@/scripts/globais';
// import { InfosPreliminaresSaae, SAAE } from '@/@types/types';

type Props= {
    hiddeButton?: boolean
}
/**
 * Componente que exibe o resumo antes do envio ou os dados preenchidos de uma SAAE já enviada. 
 * @param {boolean} hiddeButton - Se verdadeiro, não exibe o botão de envio.
 * @returns {JSX.Element} retorna o JSX com o resumo da SAAE.
 */
export default function SaaeResumo ({hiddeButton}:Props){
    const context = useContext(Context);

    useEffect(()=>{
        return undefined
    },[]);
    
    return(
        <div className={styles.conteiner}>
            <h2>8. Resumo da sua SAAE</h2>
            <span 
                style={{cursor:'pointer', textDecoration: 'underline'}}
                onClick={()=>{
                    printComponent(context.dataSaae.infosPreliminares, 'print-data-infosPreliminares');
                }}
            >
                Imprimir Infos. Preliminares
            </span>
            
            <span 
                style={{cursor:'pointer', textDecoration: 'underline'}}
                onClick={()=>{
                    printComponent(context.dataSaae, 'print-data');
                }}
            >
                Imprimir SAAE
            </span>

            <DadosGerais 
                readOnly 
                idSaae={context.dataSaae._id} 
                obsSaae={context.dataSaae.obs} 
                statusSaae={context.dataSaae.status}
                localData={context.dataSaae.dadosGerais}
            />
            <InfosPreliminares 
                readOnly
                localData={context.dataSaae.infosPreliminares}
            />
            <InventarioSaae 
                readOnly
                localData={context.dataSaae.inventarioRiscos}
            />
            <MatrizRisco 
                readOnly
                localData={context.dataSaae.grauRisco}
            />
            <PlanoEmergencia 
                readOnly
                grauRisco={context.dataSaae.grauRisco}
                nomeAtividade={context.dataSaae.dadosGerais?.nomeAtividade}
                localInicio={context.dataSaae.dadosGerais?.localInicio}
                localData={context.dataSaae.planoEmergencia}
            />
            <FotosInspecao 
                readOnly
                localData={context.dataSaae.fotosInspecao}
            />
            <SectionDocumentos 
                readOnly
                localData={context.dataSaae.documentos}
            />
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