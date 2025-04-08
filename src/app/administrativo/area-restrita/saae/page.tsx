'use client'
import Section from "@/components/layout/sections/section";
import styles from './page.module.css';
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import InfosPreliminares from "@/components/form/infosPreliminaresSaae/infosPreliminares";
import DadosGerais from "@/components/form/dadosGeraisSaae/dadosGerais";
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
import NavButoomsSaae from "@/components/layout/navButtomsSaae/navButtomsSaae";
import Dashboard from "@/components/layout/dashboard/dashboard";

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

    //busca as SAAEs do usuário enviadas para análise.
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
        <Section customClass={['flexCollTop', 'fullWidth', 'minHeight']}>
           <ViewSaaes tipo="regional"/>

           <ViewSaaes tipo="user"/>
            
            {/* não permite edição de SAAE se tiver com status de enviada ou aprovada*/}
            {context.saaeEdit && !['enviada', 'aprovada'].includes(context.dataSaae?.status) && 
                (context.tester || Object.keys(context.dataUser).length > 0) ?
                <div className={styles.conteiner}>
                    <NavButoomsSaae currenteSession={currenteSession} setCurrentSession={setCurrentSession}/>                
                    
                    {currenteSession === 0 ? <DadosGerais 
                        readOnly={false}
                        localData={context.dataSaae?.dadosGerais}
                        idSaae={context.dataSaae?._id}
                        obsSaae={context.dataSaae?.obs}
                        statusSaae={context.dataSaae?.status}
                    /> : null}
                    {currenteSession === 1 ? <InfosPreliminares 
                        readOnly={false}
                        localData={context.dataSaae?.infosPreliminares}
                    /> : null}
                    {currenteSession === 2 ? <InventarioSaae 
                        readOnly={false}
                        localData={context.dataSaae?.inventarioRiscos}
                        programacao={[...context.dataSaae.dadosGerais?.programacao,
                            ...(context.dataSaae?.dadosGerais?.programacaoRamos?.flatMap(p=> p.programacao) || [])
                        ]}
                    /> : null}
                    {currenteSession === 3 ? <MatrizRisco 
                        readOnly={false}
                        localData={context.dataSaae?.grauRisco}
                    /> : null}
                    {currenteSession === 4 ? <PlanoEmergencia 
                        readOnly={false}
                        grauRisco={context.dataSaae?.grauRisco}
                        localInicio={context.dataSaae?.dadosGerais.localInicio}
                        nomeAtividade={context.dataSaae?.dadosGerais.nomeAtividade}
                        localData={context.dataSaae?.planoEmergencia}
                    /> : null}
                    {currenteSession === 5 ? <FotosInspecao 
                        readOnly={false}
                        localData={context.dataSaae?.fotosInspecao}
                    /> : null}
                    {currenteSession === 6 ? <SectionDocumentos 
                        readOnly={false}
                        localData={context.dataSaae?.documentos}
                    /> : null}
                    {currenteSession === 7 ? <SaaeResumo localData={context.dataSaae}/> : null}
                    
                    <NavButoomsSaae currenteSession={currenteSession} setCurrentSession={setCurrentSession}/>                
                </div>
            :null}

            <Dashboard listSaaes={context.listSaaes}/>
        </Section>
    )
}