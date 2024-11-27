'use client'
import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { ProfileProps } from '@/@types/types';
import { createCookie, destroyCookie, encryptPassword, getCookie } from '@/scripts/globais';
import Modal from '@/components/layout/modal/modal';
import LoadIcon from '@/components/layout/loadIcon/loadIcon';
import axios from 'axios';

export default function Page(){
    const [dataUser, setDataUser] = useState({} as ProfileProps);
    const [dataNewUser, setDataNewUser] = useState({} as ProfileProps);
    const [showModal, setShowModal] = useState(false);

    const recoverProfile = async()=>{
        //caso esteja vindo da página de login.
        const token = getCookie();

        if(!token){
            window.location.href ='/administrativo';
            return;
        }

        // Verificar a validade do cookie com base no maxAge
        const dataMatch = token.expires ? Date.now() < token.expires : false;
        
        if(!dataMatch){
            console.log("token expirado!")
            window.location.href ='/administrativo';
        }else{
            destroyCookie('coqueiralSite')
            createCookie(token)
            setDataUser({...token, token: `${process.env.NEXT_PUBLIC_AUTORIZATION}`})
            return;
        }
    }

    const handleData = (e:ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;

        setDataNewUser((prev)=>{
            return{
                ...prev,
                [name]: value
            }
        })
    }

    const submit = async(e:FormEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        if(!dataNewUser.user || !dataNewUser.password || !dataNewUser.name){
            alert("Preencha os campos de autenticação!")
            return;
        }
        setShowModal(true);

        await axios.post(`${process.env.NEXT_PUBLIC_URL_AUTH}`,
            {            
                dataNewUser: encryptPassword(JSON.stringify(dataNewUser)),
            },{
                headers:{
                    'Authorization': `Bearer ${dataUser.token}`
                }
            }
        )
        .then((response)=>{
            console.log(response.data);
            setDataNewUser({} as ProfileProps)
            alert("Gravado com sucesso!");
            setShowModal(false);
        })
        .catch((e)=>{
            console.log(e.message)
            alert("Erro ao tentar gravar novo usuário!")
            setShowModal(false)
        });
    }

    useEffect(()=>{
        recoverProfile();
    },[]);

    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <h1 className={styles.title}>Área Restrita</h1>
            <h4>Bem vindo(a), {dataUser?.name}</h4>
            <div className={styles.conteiner}>
                
                {dataUser.name === "Cleiton T. Machado" ? 
                <form className={`${styles.subConteiner}`} method='POST'>
                    <h4>Cadastrar novo usuário</h4> 
                    <div className={styles.boxInputs}>
                        <div className={styles.boxInput}> 
                            <label htmlFor="user">Nome</label>                   
                            <input 
                                type="text" 
                                name='name' 
                                onChange={(e)=>handleData(e)}
                                value={dataNewUser.name || '' }
                                placeholder='Nome'
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="user">Cargo</label>                   
                            <input 
                                type="text" 
                                name='cargo' 
                                onChange={(e)=>handleData(e)}
                                value={dataNewUser.cargo || '' }
                                placeholder='Cargo'
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="user">Ramo</label>                   
                            <input 
                                type="text" 
                                name='ramo' 
                                onChange={(e)=>handleData(e)}
                                value={dataNewUser.ramo || '' }
                                placeholder='Ramo que atua'
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="user">Usuário</label>                   
                            <input 
                                type="text" 
                                name='user' 
                                onChange={(e)=>handleData(e)}
                                value={dataNewUser.user || '' }
                                placeholder='Nome de usuário'
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="user">Senha</label>       
                            <input 
                                type="password" 
                                name='password'
                                placeholder='senha'
                                onChange={(e)=>handleData(e)}
                                value={dataNewUser.password || '' }
                            /> 
                        </div>
                    </div>                   
                    
                      
                    <button onClick={(e)=>submit(e)}>
                        Ok
                    </button>
                </form>
                :null}

                <div className={styles.subConteiner}>                    
                    <ul>
                        <li className={styles.paragraph}>
                            <b>Documento de membros</b>
                        </li>
                        <li className={styles.paragraph}>
                            <b>Cadastrar notícia</b>
                        </li>
                    </ul>
                    <br />
                    
                </div>
            </div>

            {showModal ?
                <Modal customClass={['alingCenter']}>
                    <LoadIcon showHide={true} customClass="size100"/>
                </Modal>:null
            }
        </Section>
    )
}