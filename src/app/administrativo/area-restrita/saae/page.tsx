'use client'
import Section from "@/components/layout/sections/section";
import styles from './page.module.css';
import { useContext, useEffect, useState } from "react";
import InfosPreliminares from "@/components/form/infosPreliminaresSaae/infosPreliminares";
import DadosGerais from "@/components/form/dadosGeraisSaae/dadosGerais";
import { IoIosArrowForward, IoIosArrowBack  } from "react-icons/io";
import { Context } from "@/components/context/context";
import InventarioSaae from "@/components/form/inventarioSaae/inputIA";
import MatrizRisco from "@/components/form/matrizSaae/matrizRisco";
import PlanoEmergencia from "@/components/form/planoEmergencia/planoEmergencia";
import FotosInspecao from "@/components/form/fotosInspecao/fotosInspecao";
import SectionDocumentos from "@/components/form/sectionDocumentos/documentos";
import SaaeResumo from "@/components/form/saaeResumo/saaeResumo";
import { FaMinus } from "react-icons/fa6";
import { deleteDataStorage } from "@/scripts/indexedDB";

export default function Page(){
    const context = useContext(Context);
    const [currenteSession, setCurrentSession] = useState(0);
    
    useEffect(()=>{
        context.recoverProfile();
    },[]);
    
    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <h1 className={styles.title}>SAAE</h1>
                <div className={styles.conteiner}>
                    <div className={styles.subConteiner}>
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
                </div>
            
            {context.saaeEdit ?
                <div className={styles.conteiner}>
                {currenteSession === 0 ? <DadosGerais readOnly={false}/> : null}
                {currenteSession === 1 ? <InfosPreliminares readOnly={false}/> : null}
                {currenteSession === 2 ? <InventarioSaae readOnly={false}/> : null}
                {currenteSession === 3 ? <MatrizRisco readOnly={false}/> : null}
                {currenteSession === 4 ? <PlanoEmergencia readOnly={false}/> : null}
                {currenteSession === 5 ? <FotosInspecao readOnly={false}/> : null}
                {currenteSession === 6 ? <SectionDocumentos readOnly={false}/> : null}
                {currenteSession === 7 ? <SaaeResumo /> : null}

                <div className={styles.boxButtom}>
                    <IoIosArrowBack 
                        size={40}
                        onClick={()=>{
                            setCurrentSession((prev)=> {
                            if(prev === 0){
                                return 7
                            }else{
                                return prev-1
                            }
                            });
                            window.scrollTo(0, 0);
                        }}
                    />
                    <div className={styles.boxBtnNav}>
                        <div 
                            onClick={()=>setCurrentSession(0)} 
                            style={{
                                border: currenteSession === 0 ? '2px solid var(--dark)' : '',
                                backgroundColor: currenteSession === 0 ? 'var(--verde)' : '',
                                color: currenteSession === 0 ? 'var(--dark)' : 'var(--white)'
                            }}>1</div>
                        <div 
                            onClick={()=>setCurrentSession(1)}
                            style={{
                                border: currenteSession === 1 ? '2px solid var(--dark)' : '',
                                backgroundColor: currenteSession === 1 ? 'var(--verde)' : '',
                                color: currenteSession === 1 ? 'var(--dark)' : 'var(--white)'
                            }}>2</div>
                        <div 
                            onClick={()=>setCurrentSession(2)}
                            style={{
                                border: currenteSession === 2 ? '2px solid var(--dark)' : '',
                                backgroundColor: currenteSession === 2 ? 'var(--verde)' : '',
                                color: currenteSession === 2 ? 'var(--dark)' : 'var(--white)'
                            }}
                        >3</div>
                        <div 
                            onClick={()=>setCurrentSession(3)}
                            style={{
                                border: currenteSession === 3 ? '2px solid var(--dark)' : '',
                                backgroundColor: currenteSession === 3 ? 'var(--verde)' : '',
                                color: currenteSession === 3 ? 'var(--dark)' : 'var(--white)'
                            }}
                        >4</div>
                        <div 
                            onClick={()=>setCurrentSession(4)}
                            style={{
                                border: currenteSession === 4 ? '2px solid var(--dark)' : '',
                                backgroundColor: currenteSession === 4 ? 'var(--verde)' : '',
                                color: currenteSession === 4 ? 'var(--dark)' : 'var(--white)'
                            }}
                        >5</div>
                        <div 
                            onClick={()=>setCurrentSession(5)}
                            style={{
                                border: currenteSession === 5 ? '2px solid var(--dark)' : '',
                                backgroundColor: currenteSession === 5 ? 'var(--verde)' : '',
                                color: currenteSession === 5 ? 'var(--dark)' : 'var(--white)'
                            }}
                        >6</div>
                        <div 
                            onClick={()=>setCurrentSession(6)}
                            style={{
                                border: currenteSession === 6 ? '2px solid var(--dark)' : '',
                                backgroundColor: currenteSession === 6 ? 'var(--verde)' : '',
                                color: currenteSession === 6 ? 'var(--dark)' : 'var(--white)'
                            }}
                        >7</div>
                        <div 
                            onClick={()=>setCurrentSession(7)}
                            style={{
                                border: currenteSession === 7 ? '2px solid var(--dark)' : '',
                                backgroundColor: currenteSession === 7 ? 'var(--verde)' : '',
                                color: currenteSession === 7 ? 'var(--dark)' : 'var(--white)'
                            }}
                        >R</div>
                    </div>
                    <IoIosArrowForward 
                        size={40}
                        onClick={()=>{setCurrentSession((prev)=> {
                            if(prev === 7){
                                return 0
                            }else{
                                return prev+1
                            }
                            });
                            window.scrollTo(0, 0);
                        }}
                    />
                </div>                
                </div>
            :null}
        </Section>
    )
}