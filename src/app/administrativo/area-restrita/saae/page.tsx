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
                {currenteSession === 0 ? <InfosPreliminares /> : null}
                {currenteSession === 1 ? <DadosGerais /> : null}
                {currenteSession === 2 ? <InventarioSaae /> : null}
                {currenteSession === 3 ? <MatrizRisco /> : null}
                {currenteSession === 4 ? <PlanoEmergencia /> : null}

                <div className={styles.boxButtom}>
                    <IoIosArrowBack 
                        size={40}
                        onClick={()=>{setCurrentSession((prev)=> {
                            if(prev === 0){
                                return 6
                            }else{
                                return prev-1
                            }
                        })}}
                    />
                    <IoIosArrowForward 
                        size={40}
                        onClick={()=>{setCurrentSession((prev)=> {
                            if(prev === 6){
                                return 0
                            }else{
                                return prev+1
                            }
                        })}}
                    />
                </div>                
            </div>
        </Section>
    )
}