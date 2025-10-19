'use client'
import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import { ChangeEvent, FormEvent, useState } from 'react';
import Modal from '@/components/layout/modal/modal';
import LoadIcon from '@/components/layout/loadIcon/loadIcon';
import axios from 'axios';
import { createCookie, encryptPassword } from '@/scripts/globais';
import { ResponseRecaptcha } from '@/@types/types';
import FormLogin from '@/components/form/formLogin/formLogin';

export default function Page(){
    const [dataForm, setData] = useState({} as {user: string, password: string});
    const [showModal, setShowModal] = useState(false);

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

        setShowModal(true);

        grecaptcha.ready(()=> {
            grecaptcha.execute(`${process.env.NEXT_PUBLIC_RECAPTCHA_KEY_SITE}`, {action: 'submit'})
            .then(async(token:string)=> {
                axios.post(`${process.env.NEXT_PUBLIC_URL_SERVICES}`,{
                    service: "recatptcha",
                    token: token
                },{
                    headers:{
                        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_AUTORIZATION}`
                    }
                })  
                .then(async(resp)=>{
                    const data  = resp.data as ResponseRecaptcha;
                    if(data.success || data.score >= 0.8){
                        await axios.get(`${process.env.NEXT_PUBLIC_URL_AUTH}`,{
                            params:{            
                                data: encryptPassword(JSON.stringify(dataForm)),
                                service: "auth"
                            }
                        })
                        .then((response)=>{
                            createCookie(response.data);
                            setShowModal(false);
                            window.location.href = '/administrativo/area-restrita'; 
                        })
                        .catch((e)=>{
                            console.log(e.message)
                            alert("Erro ao tentar fazer login.")
                            setShowModal(false)
                        });
                    }else{
                        console.log(resp.data)
                        alert("Você não passou na verificação de segurança!")
                        setShowModal(false)
                    }                  
                })
                .catch(e=>{
                    console.log(e.response)
                    setShowModal(false);
                    alert("Ocorreu um erro ao tentar verificar a segurança!")
                })
            })
            .catch(e=>console.log("erro no recaptcha", e))
        });
    }

    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <h1 className={styles.title}>Recursos administrativos</h1>
            <div className={styles.conteiner}>
                <FormLogin dataForm={dataForm} handleData={handleData} submit={submit}/>
            </div>

            {showModal ?
                <Modal customClass={['alingCenter']}>
                    <LoadIcon showHide={true} customClass="size100"/>
                </Modal>:null
            }
        </Section>
    )
}