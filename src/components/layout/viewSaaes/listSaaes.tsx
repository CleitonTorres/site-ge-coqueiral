'use client'
import { Context } from "@/components/context/context";
import { ChangeEvent, useCallback, useContext, useEffect, useState } from "react";
import styles from './listSaaes.module.css';
import { FaMinus } from "react-icons/fa6";
import Modal from "../modal/modal";
import SaaeResumo from "@/components/form/saaeResumo/saaeResumo";
import { deleteDataStorage, getAllDataStorage } from "@/scripts/indexedDB";
import { DataStorage, SAAE } from "@/@types/types";
import Confirme from "../confirme/confirme";
import axios from "axios";
import Botton from "@/components/form/botton/botton";
import { printComponent } from "@/scripts/globais";
import RelatorioSaae from "@/components/form/relatorioSaae/relatorioSaae";
import { IoRefreshSharp } from "react-icons/io5";
import Mathias from "../mathias/mathias";

type ListSaaeProps = {
    tipo: 'user' | 'regional'
}

export default function ViewSaaes({tipo}: ListSaaeProps) {
    const context = useContext(Context);
    const [showSaae, setShowSaae]= useState(false);
    const [showObs, setShowObs]= useState(false);
    const [currentSAAEResponse, setCurrentSAAEResponse] = useState<SAAE>();
    const [dataStorage, setDataStorage] = useState<DataStorage[]>([]);

    const handleSaaeResponse = (e:ChangeEvent<HTMLSelectElement>, saae:SAAE)=>{
        //valor do select.
        const value = e.target.value;

        setCurrentSAAEResponse(saae);

        //texto inicial das observações;
        setCurrentSAAEResponse((prev)=>{
            return{
                ...prev || {} as SAAE,
                status: value as "rascunho" | "enviada" | "aprovada" | "reprovada" | "pendente",
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
                });

                setShowObs(false);
                
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

    const handleGetStorage = async ()=>{
        const saaes = await getAllDataStorage('saae');

        setDataStorage(saaes);
    }

    //busca as SAAEs do usuário enviadas para análise.
    const getSaaes = async()=>{
        try{
            context.setShowModal({
                element: <Mathias show text="Atualizando lista de SAAEs"/>
            });
            const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_SERVICES}`,{
                params:{
                    service: 'getSaae'
                },
                headers:{
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTORIZATION}`
                }
            });

            const data = response.data as {saaes: SAAE[]};
            console.log(data.saaes)
            context.setListSaaes(data.saaes);

            context.setShowModal({
                element: <Confirme 
                    message="Lista de SAAEs atualizada com sucesso" 
                    confirme={async()=>{
                        context.setShowModal(null);
                        return {
                            bool: true,
                            text: 'Lista de SAAEs atualizada com sucesso!'
                        }
                    }}/>
            });
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

            alert("Ocorreu um erro ao tentar recuperar a lista de SAAEs")
        }
    }

    useEffect(()=>{
        setShowObs(()=>{
            if(currentSAAEResponse?.status && 
                currentSAAEResponse.status !== context.listSaaes.find(s=> s._id === currentSAAEResponse._id)?.status){
                return true
            }else{
                return false
            }
        })
    },[currentSAAEResponse?.status]);

    useEffect(()=>{
        handleGetStorage();
    },[context.saaeEdit]);

    const setNameAtividade = useCallback((idSaae:number | string, storageNameAtividade: string)=>{
        if(idSaae === context.saaeEdit){
            return context.dataSaae?.dadosGerais?.nomeAtividade || storageNameAtividade
        }else{
            return storageNameAtividade
        }
    },[context.dataSaae]);

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
                    {context.listSaaes?.filter(s=> !s.status.includes('aprovada'))?.map((saae, idx)=>(
                        <div key={idx+'listaSAAEs'} 
                            className={`${styles.boxInput}`}>
                            <label 
                                htmlFor={`saae-${idx}`} 
                                className={`${styles.collum01} ${styles.cursorPointer}`}
                                onClick={()=>{
                                    printComponent(saae, 'print-data');
                                }}
                            >
                                {saae?.dadosGerais?.nomeAtividade || 'Sem nome atividade'}
                            </label>
                            <label 
                                htmlFor="" 
                                className={`${styles.collum02}`}>
                                    {saae.dadosGerais?.coordenador || 'Usuário Teste'}
                                </label>
                            <label 
                                htmlFor="" 
                                className={`${styles.collum02}`}>
                                    {`${saae.dadosGerais?.dadosUel?.numUel || '00'} - ${saae.dadosGerais?.dadosUel?.nameUel || 'UEL Teste'}`  || 'Usuário Teste'}
                                </label>
                            <select 
                                name="status" 
                                id="" 
                                className={`${styles.collum03}`}
                                style={{background: 'none', border: 'none', fontSize: 16}}
                                value={saae._id === currentSAAEResponse?._id ? currentSAAEResponse.status : saae.status || ''}
                                onChange={(e)=>{
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
            {showObs ?
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
            <IoRefreshSharp 
                size={32} 
                color="blue" 
                cursor={'pointer'} 
                style={{margin: 20}}
                title="Atualizar lista de SAAEs"
                onClick={getSaaes}
            />
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
                            
                    {dataStorage.filter(item=> item.dataSaae?.status === 'rascunho')
                    ?.sort((a,b)=> a.dataSaae?.dadosGerais?.nomeAtividade?.localeCompare(b.dataSaae?.dadosGerais?.nomeAtividade || '') || 0)
                    ?.map((storage, idx)=>(
                        <div key={idx+'listaSAAEs'} className={styles.boxInput}>
                            <label htmlFor={`saae-${storage.id}`}>
                                {setNameAtividade(storage.id, storage.dataSaae?.dadosGerais?.nomeAtividade || 'Nova Atividade')}
                            </label>
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
                                            deleteDataStorage('saae', storage.id!);
                                            setDataStorage((prev)=>{
                                                const newData = prev.filter(s=> s.id !== storage.id);
                                                return newData;
                                            })
                                            context.setDataSaae({} as SAAE);
                                            context.setSaaeEdit(undefined);
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
                        <h4 className={styles.collum01}>SAAEs Enviadas</h4> 
                        <h4 className={styles.collum02}>Status</h4> 
                        <h4 className={styles.collum02}>Relatório</h4> 
                    </div>                                                            
                    {context.listSaaes?.sort((a,b)=> a.dadosGerais.nomeAtividade?.localeCompare(b.dadosGerais.nomeAtividade || ''))
                    ?.map((saae, idx)=>(
                        <div 
                            key={idx+'listaSAAEs'} 
                            className={`${styles.boxInput} cursorPointer`}
                        >
                            <label 
                                htmlFor={`saae-${idx}`} 
                                className={`${styles.cursorPointer} ${styles.collum01}`}
                                onClick={()=>{
                                    if(['aprovada', 'enviada'].includes(saae.status)){
                                        printComponent(saae, 'print-data');
                                    }else{
                                        context.setSaaeEdit((prev)=> {
                                            if(prev === saae._id) return undefined
                                            return saae._id as string
                                        });
                                    }
                                }}
                            >
                                {saae?.dadosGerais?.nomeAtividade || 'Sem nome atividade'}
                            </label>
                            <label 
                                htmlFor="" 
                                className={`cursorPointer ${styles.collum02}`}
                            >
                                {saae.status || 'enviada'}
                            </label>
                            <label 
                                htmlFor="" 
                                className={`${saae.status === 'aprovada' ? styles.cursorPointer : ''} ${styles.collum02}`}
                                onClick={()=>{
                                    if(saae.status === 'aprovada'){
                                        //seta a saae editada para o contexto.
                                        context.setSaaeEdit((prev)=> {
                                            if(prev === saae._id) return undefined
                                            return saae._id as string
                                        });

                                        //exibe o modal para edição do relatório da SAAE.
                                        context.setShowModal({
                                            element: <RelatorioSaae/>,
                                            styles:['backgroundWhite', 'alingTop', 'paddin30'],
                                            onClose: ()=>{
                                                context.setSaaeEdit(undefined);
                                                deleteDataStorage('saae', saae._id as string);
                                            }
                                        })
                                    }
                                }}
                            >
                                {saae.relatorio ? 'enviado' : 'pendente'}
                            </label>
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
                <SaaeResumo hiddeButton={true} localData={context.dataSaae}/>
            </Modal>
        :null}
        </>
    )
}