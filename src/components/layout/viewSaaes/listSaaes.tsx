'use client'
import { Context } from "@/components/context/context";
import { ChangeEvent, useContext, useState } from "react";
import styles from './listSaaes.module.css';
import { FaMinus } from "react-icons/fa6";
import Modal from "../modal/modal";
import SaaeResumo from "@/components/form/saaeResumo/saaeResumo";
import { deleteDataStorage } from "@/scripts/indexedDB";
import { SAAE } from "@/@types/types";
import Confirme from "../confirme/confirme";
import axios from "axios";
import Botton from "@/components/form/botton/botton";

type ListSaaeProps = {
    tipo: 'user' | 'regional'
}

export default function ViewSaaes({tipo}: ListSaaeProps) {
    const context = useContext(Context);
    const [showSaae, setShowSaae]= useState(false);
    const [currentSAAEResponse, setCurrentSAAEResponse] = useState<SAAE>();

    const handleSaaeResponse = (e:ChangeEvent<HTMLSelectElement>, saae:SAAE)=>{
        //valor do select.
        const value = e.target.value;

        setCurrentSAAEResponse(saae);

        //texto inicial das observações;
        setCurrentSAAEResponse((prev)=>{
            return{
                ...prev || {} as SAAE,
                status: value,
                obs: ["pendente", "reprovada"].includes(value) ? "SAAE " + value + " pelo motivo..." : "SAAE " + value
            }
        });
    }

    const handleSubmitResposta = ()=>{
        if(!currentSAAEResponse) return;

        //exibe o modal de confirmação de envio.
        context.setShowModal(
            {element: 
            <>
            <Confirme 
                message="Deseja enviar essa resposta?"
                confirme={async()=>{
                    return submitResposta();
                }}
                cancele={()=>context.setShowModal(null)}
            />
            </>,
            styles: ['backgroundBlue']
            }
        )
    }

    const submitResposta = async()=>{        
        if(!currentSAAEResponse || !currentSAAEResponse._id || currentSAAEResponse.status === 'enviada') {
            return{
                bool: false,
                text: 'o status da SAAE informado não permite o envio de respostas.'
            }
        };

        try{
            const response = await axios.post(`${process.env.NEXT_PUBLIC_URL_SERVICES}`, {
                service: 'saaeResposta',
                status: currentSAAEResponse.status,
                obs: currentSAAEResponse.obs,
                idSaae: currentSAAEResponse._id
            },{
                headers:{
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTORIZATION}`
                }
            });

            // console.log(response);
            if(response.data){
                context.setListSaaes((prev)=>{
                    const newData = prev.map(s=>{
                        if(s._id === currentSAAEResponse._id){
                            return currentSAAEResponse
                        }else{
                            return s
                        }
                    });

                    return newData
                })

                return {
                    bool: true,
                    text: 'Resposta enviada com sucesso!'
                }
            }else{
                 //retorna ao valor original, sem alterações.
                setCurrentSAAEResponse(undefined)
                return {
                    bool: false,
                    text: 'Ocorreu um erro desconhecido ao tentar enviar a resposta da SAAE!'
                }
            }
        }catch(error){
            if (axios.isAxiosError(error)) {
                // Se o erro for gerado pelo Axios
                console.error("Erro Axios:", error.response?.data || error.message);
                
                // Capturando os detalhes da resposta
                if (error.response) {
                    console.error("Status:", error.response.status);
                    console.error("Dados:", error.response.data);
                }
            } else {
                // Se for outro tipo de erro
                console.error("Erro inesperado:", error);
            }

            //retorna ao valor original, sem alterações.
            setCurrentSAAEResponse(undefined)

            return {
                bool: false,
                text: 'Ocorreu um erro ao tentar enviar a resposta da SAAE!'
            }
        }
    }

    return(
        <>
        {(context.tester || context.dataUser).nivelAcess === 'Regional-admin' && tipo === 'regional'?
            <>
            <h1 className={styles.title}>SAAEs PARA AVALIAR</h1>
            <div className={`${styles.conteiner}`}>
                <div className={`${styles.subConteinerRegional}`}>
                    <div className={styles.header}>
                        <h4 className={styles.collum01}>SAAEs para avaliar</h4>
                        <h4 className={styles.collum02}>Solicitante</h4>
                        <h4 className={styles.collum02}>UEL</h4> 
                        <h4 className={styles.collum03}>Status</h4>  
                    </div>                                                            
                    {context.listSaaes?.map((saae, idx)=>(
                        <div key={idx+'listaSAAEs'} 
                            className={`${styles.boxInput}`}>
                            <label 
                                htmlFor={`saae-${idx}`} 
                                className={`${styles.collum01} ${styles.cursorPointer}`}
                                onClick={()=>{
                                    setShowSaae(true);
                                    context.setSaaeEdit((prev)=> {
                                        if(prev === saae._id) return undefined
                                        return saae._id
                                    });
                                }}
                            >
                                {saae?.dadosGerais?.nomeAtividade || 'Sem nome atividade'}
                            </label>
                            <label 
                                htmlFor="" 
                                className={`${styles.collum02}`}>
                                    {saae.solicitante?.name || 'Usuário Teste'}
                                </label>
                            <label 
                                htmlFor="" 
                                className={`${styles.collum02}`}>
                                    {`${saae.solicitante?.numUel || '00'} - ${saae.solicitante?.nameUel || 'UEL Teste'}`  || 'Usuário Teste'}
                                </label>
                            <select 
                                name="status" 
                                id="" 
                                className={`${styles.collum03}`}
                                style={{background: 'none', border: 'none', fontSize: 16}}
                                value={saae._id === currentSAAEResponse?._id ? currentSAAEResponse.status : saae.status || ''}
                                onChange={(e)=>{
                                    if(e.target.value === 'enviada') return;
                                    handleSaaeResponse(e, saae);
                                }}
                            >
                                    {['enviada', 'pendente', 'aprovada', 'reprovada'].map((status, idx)=>(
                                        <option key={idx+'status'} value={status}>{status}</option>
                                    ))}
                            </select>
                        </div>
                    ))}
                </div>
            </div>
            {currentSAAEResponse?.status ?
                <div className={`${styles.conteiner} flexRowButton`}>
                    <div className={`${styles.subConteinerRegional}`}>
                        <b>Enviar resposta:</b>
                        <textarea 
                            name="obs"
                            placeholder="observações"
                            //defaultValue={value === "pendente" ? "SAAE " + value + "pelo motivo..." : "SAAE " + value || ''}
                            value={currentSAAEResponse.obs || ''}
                            onChange={(e)=>{
                                setCurrentSAAEResponse((prev)=>{
                                    return{
                                        ...prev || {} as SAAE,
                                        obs: e.target.value
                                    }
                                });
                            }}
                            className={styles.obs}
                        />
                    </div>
                    <Botton title="Responder" customClass={['marginBotton10']} action={()=>{
                        handleSubmitResposta();
                    }}/>
                </div>
            :null}
            </>
        :null}

        {tipo === 'user'?
            <>
            <h1 className={styles.title}>SUAS SAAEs</h1>
            <div className={`${styles.conteiner}`}>
                {/* Rascunhos de SAAEs (não enviadas) */}
                <div className={`${styles.subConteiner} `}>
                    <h4>Rascunhos de SAAEs (não enviadas)</h4>
                    <div className={styles.boxInput}>
                        <label htmlFor="novaSaae">Nova SAAE</label>
                        <input 
                            type="radio"
                            name="indexSaae"
                            checked={context.saaeEdit === 0}
                            onChange={()=>context.setSaaeEdit(0)}
                        />
                    </div>  
                            
                    {context.dataStorage?.map((storage, idx)=>(
                        <div key={idx+'listaSAAEs'} className={styles.boxInput}>
                            <label htmlFor={`saae-${storage.id}`}>{storage.dataSaae?.dadosGerais?.nomeAtividade || 'Sem nome atividade'}</label>
                            <div className={styles.btns}>
                                <input 
                                    type="radio"
                                    name="indexSaae"
                                    checked={storage.id === context.saaeEdit}
                                    onChange={()=>{}}
                                    onClick={()=>context.setSaaeEdit((prev)=>{
                                        if(prev !== storage.id){
                                            return storage.id
                                        }else{
                                            return undefined
                                        }
                                    })}
                                />
                                <FaMinus 
                                    size={20} 
                                    className={styles.btnRemAtividade}
                                    onClick={()=>{
                                        const result = confirm("Você tem certeza que deseja excluir essa SAAE?")
                                        if(result){ 
                                            deleteDataStorage('saae', storage.id!)
                                            context.setDataStorage((prev)=>{
                                                const newData= prev.filter(data=> data.id !== storage.id);
                                                return newData;
                                            });
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                {/* SAAEs enviadas para análise */}
                <div className={`${styles.subConteiner}`}>
                    <div className={styles.header}>
                        <h4>SAAEs Enviadas</h4> 
                        <h4>Status</h4>  
                    </div>                                                            
                    {context.listSaaes?.map((saae, idx)=>(
                        <div key={idx+'listaSAAEs'} className={`${styles.boxInput} cursorPointer`} onClick={()=>{
                            if(['aprovada', 'enviada'].includes(saae.status)){
                                setShowSaae(true);
                                context.setSaaeEdit(saae._id)
                            }else{
                                context.setSaaeEdit((prev)=> {
                                    if(prev === saae._id) return undefined
                                    return saae._id
                                })//corrigir isso depois.
                            }
                        }}>
                            <label htmlFor={`saae-${idx}`} className="cursorPointer">
                                {saae?.dadosGerais?.nomeAtividade || 'Sem nome atividade'}
                            </label>
                            <label htmlFor="" className="cursorPointer">{saae.status || 'enviada'}</label>
                        </div>
                    ))}
                </div>                    
            </div>
            </>
        :null}

        {showSaae ?
            <Modal customClass={['backgroundWhite']} 
                actionClose={()=>{
                    context.setSaaeEdit(undefined);
                    setShowSaae(false);
                }}
            > 
                <SaaeResumo hiddeButton={true} />
            </Modal>
        :null}
        </>
    )
}