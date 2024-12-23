'use client'
import Section from "@/components/layout/sections/section";
import styles from './page.module.css';
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
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
import Modal from "@/components/layout/modal/modal";
import axios from "axios";
import { SAAE } from "@/@types/types";
import { userTest } from "@/components/data-training/data-training";
import FormLogin from "@/components/form/formLogin/formLogin";

/**
 * Componente que gerencia os modulos de uma SAAE para prenchimento.
 * @returns 
 */
export default function Page(){
    const context = useContext(Context);
    const [currenteSession, setCurrentSession] = useState(0);
    const [showSaae, setShowSaae]= useState(false);

    //provisório
    const [dataForm, setData] = useState({} as {user: string, password: string});
    const handleData = (e:ChangeEvent<HTMLInputElement>)=>{
            e.preventDefault();
            const name = e.target.name;
            const value = e.target.value;
    
            setData((prev)=>{
                return{
                    ...prev,
                    [name]: value
                }
            })
    }
    
    const submit = (e:FormEvent<HTMLButtonElement>)=>{
        e.preventDefault();

        if(!dataForm.user || !dataForm.password){
            alert("Preencha os campos de autenticação!")
            return;
        }

        const verify = dataForm.user === userTest.user && dataForm.password === userTest.password;

        if(verify){
            context.setTester(userTest);
        }else{
            alert("Os dados de acesso não conferem!")
        }
    }
    //-----------------------

    const getSaaes = async()=>{
        try{
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
        getSaaes();
    },[]);

    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <h1 className={styles.title}>SAAE</h1>
                {context.tester || Object.keys(context.dataUser).length > 0 ?
                    <div className={`${styles.conteiner} ${styles.box}`}>
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
                :
                    <FormLogin handleData={handleData} submit={submit} dataForm={dataForm}/>
                }
            
            {context.saaeEdit && 
                (context.tester || Object.keys(context.dataUser).length > 0) ?
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
                            onClick={()=>{
                                setCurrentSession(0);
                                window.scrollTo(0, 0);
                            }} 
                            style={{
                                border: currenteSession === 0 ? '2px solid var(--dark)' : '',
                                backgroundColor: currenteSession === 0 ? 'var(--verde)' : '',
                                color: currenteSession === 0 ? 'var(--dark)' : 'var(--white)'
                            }}>1</div>
                        <div 
                            onClick={()=>{
                                setCurrentSession(1);
                                window.scrollTo(0, 0);
                            }}
                            style={{
                                border: currenteSession === 1 ? '2px solid var(--dark)' : '',
                                backgroundColor: currenteSession === 1 ? 'var(--verde)' : '',
                                color: currenteSession === 1 ? 'var(--dark)' : 'var(--white)'
                            }}>2</div>
                        <div 
                            onClick={()=>{
                                setCurrentSession(2);
                                window.scrollTo(0, 0);
                            }}
                            style={{
                                border: currenteSession === 2 ? '2px solid var(--dark)' : '',
                                backgroundColor: currenteSession === 2 ? 'var(--verde)' : '',
                                color: currenteSession === 2 ? 'var(--dark)' : 'var(--white)'
                            }}
                        >3</div>
                        <div 
                            onClick={()=>{
                                setCurrentSession(3);
                                window.scrollTo(0, 0);
                            }}
                            style={{
                                border: currenteSession === 3 ? '2px solid var(--dark)' : '',
                                backgroundColor: currenteSession === 3 ? 'var(--verde)' : '',
                                color: currenteSession === 3 ? 'var(--dark)' : 'var(--white)'
                            }}
                        >4</div>
                        <div 
                            onClick={()=>{
                                setCurrentSession(4);
                                window.scrollTo(0, 0);
                            }}
                            style={{
                                border: currenteSession === 4 ? '2px solid var(--dark)' : '',
                                backgroundColor: currenteSession === 4 ? 'var(--verde)' : '',
                                color: currenteSession === 4 ? 'var(--dark)' : 'var(--white)'
                            }}
                        >5</div>
                        <div 
                            onClick={()=>{
                                setCurrentSession(5);
                                window.scrollTo(0, 0);
                            }}
                            style={{
                                border: currenteSession === 5 ? '2px solid var(--dark)' : '',
                                backgroundColor: currenteSession === 5 ? 'var(--verde)' : '',
                                color: currenteSession === 5 ? 'var(--dark)' : 'var(--white)'
                            }}
                        >6</div>
                        <div 
                            onClick={()=>{
                                setCurrentSession(6);
                                window.scrollTo(0, 0);
                            }}
                            style={{
                                border: currenteSession === 6 ? '2px solid var(--dark)' : '',
                                backgroundColor: currenteSession === 6 ? 'var(--verde)' : '',
                                color: currenteSession === 6 ? 'var(--dark)' : 'var(--white)'
                            }}
                        >7</div>
                        <div 
                            onClick={()=>{
                                setCurrentSession(7);
                                window.scrollTo(0, 0);
                            }}
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

            {showSaae ?
                <Modal customClass={['backgroundWhite']}>
                    <div onClick={()=>{
                        context.setSaaeEdit(undefined);
                        setShowSaae(false);
                    }} className={styles.btnClose}>
                        x
                    </div>
                    <SaaeResumo hiddeButton={true}/>
                </Modal>
            :null}
        </Section>
    )
}