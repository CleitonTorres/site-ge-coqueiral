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
import Requerimento from '../requerimento/requerimento';
import { SAAE } from '@/@types/types';

type Props= {
    hiddeButton?: boolean,
    localData: SAAE | null,
    print?: boolean
}
/**
 * Componente que exibe o resumo antes do envio ou os dados preenchidos de uma SAAE já enviada. 
 * @param {boolean} hiddeButton - Se verdadeiro, não exibe o botão de envio.
 * @returns {JSX.Element} retorna o JSX com o resumo da SAAE.
 */
export default function SaaeResumo ({hiddeButton, localData, print}:Props){
    const context = useContext(Context);

    useEffect(()=>{
        return undefined
    },[]);
    
    if(!localData) return <span>formulário não carregado</span>

    return(
        <div className={styles.conteiner}>
            <h2>8. Resumo da sua SAAE</h2>
            <span 
                className={styles.noPrint}
                style={{cursor:'pointer', textDecoration: 'underline'}}
                onClick={()=>{
                    printComponent(localData.infosPreliminares, 'print-data-infosPreliminares');
                }}
            >
                Imprimir Infos. Preliminares
            </span>
            
            {localData?.dadosGerais?.usoTransporteInterMunicipal ? 
            <span 
                className={styles.noPrint}
                style={{cursor:'pointer', textDecoration: 'underline'}}
                onClick={()=>{
                    printComponent(localData.infosPreliminares, 'print-data-autoviagem');
                }}
            >
                Imprimir Autorização de Viagem
            </span> : null}
            <span 
                className={styles.noPrint}
                style={{cursor:'pointer', textDecoration: 'underline'}}
                onClick={()=>{
                    printComponent(localData, 'print-data');
                }}
            >
                Imprimir SAAE
            </span>

            <Requerimento localData={localData.dadosGerais} />

            <DadosGerais 
                readOnly 
                idSaae={localData?._id} 
                obsSaae={localData?.obs} 
                statusSaae={localData?.status}
                localData={localData?.dadosGerais}
                print={print}
            />
            <InfosPreliminares 
                readOnly
                localData={localData?.infosPreliminares}
                print={print}
            />
            <InventarioSaae 
                readOnly
                localData={localData?.inventarioRiscos}
                print={print}
            />
            <MatrizRisco 
                readOnly
                localData={localData?.grauRisco}
            />
            <PlanoEmergencia 
                readOnly
                grauRisco={localData?.grauRisco}
                nomeAtividade={localData?.dadosGerais?.nomeAtividade}
                localInicio={localData?.dadosGerais?.localInicio}
                localData={localData?.planoEmergencia}
                print={print}
            />
            <FotosInspecao 
                readOnly
                localData={localData?.fotosInspecao}
                print={print}
            />
            <SectionDocumentos 
                readOnly
                localData={localData?.documentos}
                print={print}
            />
            {!hiddeButton ? 
            <div className={styles.subConteiner}>
                <Botton 
                    customClass={['marginTop20']}
                    title='Enviar' 
                    titleHover='Enviar para análise'
                    action={()=>{
                    context.setShowModal({
                        element: <Confirme
                            message='Deseja enviar sua SAAE para análise?'
                            confirme={async()=>{
                                return await context.handleSendSaae({...localData, status: 'enviada'});
                            }}
                            cancele={()=> context.setShowModal(null)}
                        />,
                        styles:['backgroundBlue']
                    })
                }}/>
                <Botton 
                    customClass={['marginTop20']}
                    title='Salvar' 
                    titleHover='Salvar na nuvem, mas não enviar para análise.'
                    action={()=>{
                    context.setShowModal({
                        element: <Confirme
                            message='Deseja salvar sua SAAE na nuvem?'
                            confirme={async()=>{
                                return await context.handleSendSaae({...localData});
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