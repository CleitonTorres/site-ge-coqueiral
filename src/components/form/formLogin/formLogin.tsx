import { ChangeEvent, FormEvent } from "react";
import styles from './formLogin.module.css';
import Section from "@/components/layout/sections/section";

type PropsFormLogin = {
    handleData: (e: ChangeEvent<HTMLInputElement>) => void,
    dataForm: {
        user: string;
        password: string;
    },
    submit: (e: FormEvent<HTMLButtonElement>) => void
}

export default function  FormLogin ({handleData, submit, dataForm}:PropsFormLogin){
    return(
        <Section customClass={['flexCollTop', 'minHeight']} title="Sessão Formulário Login">
            <form className={`${styles.subConteiner}`} method='POST' title="formulário de login">
                <label htmlFor="user">Usuário</label>                   
                <input 
                    type="text" 
                    name='user' 
                    onChange={(e)=>handleData(e)}
                    value={dataForm.user || '' }
                    placeholder='Nome de usuário'
                />
                <label htmlFor="user">Senha</label>       
                <input 
                    type="password" 
                    name='password'
                    placeholder='senha'
                    onChange={(e)=>handleData(e)}
                    value={dataForm.password || '' }
                />   
                <button onClick={(e)=>submit(e)}>
                    Ok
                </button>  
            </form>
        </Section>
    )
}