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
import axios from "axios";
import { SAAE } from "@/@types/types";
import { userTest } from "@/components/data-training/data-training";
import FormLogin from "@/components/form/formLogin/formLogin";
import ViewSaaes from "@/components/layout/viewSaaes/listSaaes";

/**
 * Componente que gerencia os modulos de uma SAAE para prenchimento.
 * @returns 
 */
export default function Page(){
    const context = useContext(Context);
    const [currenteSession, setCurrentSession] = useState(0);

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

        const verify = userTest.find(user=> user.user === dataForm.user && user.password === dataForm.password);

        if(verify){
            context.setTester(verify);
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

    if(!context.tester && Object.keys(context.dataUser).length === 0){
        return <FormLogin handleData={handleData} submit={submit} dataForm={dataForm}/>
    }

    return(
        <Section customClass={['flexCollTop', 'fullWidth', 'minHeight']} title="Sessão SAAE">
           <ViewSaaes tipo="regional"/>

           <ViewSaaes tipo="user"/>
            
            {/* não permite edição de SAAE se tiver com status de enviada ou aprovada*/}
            {context.saaeEdit && !['enviada', 'aprovada'].includes(context.dataSaae.status) && 
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

            
        </Section>
    )
}