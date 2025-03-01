'use client'
import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import Image from 'next/image';

export default function Page(){

    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <div className={styles.conteiner}>
                <h1 className={styles.title}>Projetos dos Grupo Escoteiro Coqueiral</h1>
                <Image 
                    alt=""
                    width={970}
                    height={350}
                    src={'/images/header-eventos.png'}
                    className={styles.image}
                />            
                <ul className={styles.boxLinks}>
                    <li className='boxShadow cursorPointer'>
                        <a href="/projetos/escoteiros-pela-biodiversidade" target='_self'>
                            <Image alt='' width={296} height={150} src={'/images/biodiversidade (1).jpg'}/>
                            <span>Escoteiros Pela Biodiversidade</span>
                        </a>
                    </li>
                    <li className='boxShadow cursorPointer'>
                        <a href="/projetos/dia-de-semear-paz" target='_self'>
                        <Image alt='' width={296} height={150} src={'/images/mensageiros-da-paz (4).jpg'}/>
                        <span>Dia de Semear Paz</span>
                        </a>
                    </li>
                </ul>
            </div>
        </Section>
    )
}