'use client'
import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import Image from 'next/image';

export default function Page(){
    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <h1 className={styles.title}>Como abrir uma Unidade Escoteira Local</h1>
            <div className={styles.conteiner}>
                <div className={styles.subConteiner}>
                    <Image 
                        alt=""
                        width={970}
                        height={350}
                        src={'/images/grupo01.jpeg'}
                        className={styles.image}
                    />
                    <p className={styles.paragraph}>
                        O Escotismo é um movimento de educação não formal para crianças, jovens e adolescentes encontrado em quase todos os cantos do Mundo e que promove a paz, a sustentabilidade e a compreensão mútua, capacitando os jovens como cidadãos ativos e futuros líderes em suas comunidades.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        Atualmente, no Brasil, somos mais de 80 mil associados ativos, distribuídos em mais 1.400 unidades escoteiras atuantes em todos os estados brasileiros. Mundialmente, somos parte de uma fraternidade que conta com mais de 59 milhões de pessoas comprometidas com o propósito educativo do Movimento Escoteiro.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        Com apoio dos adultos comprometidos de forma livre e voluntária, nosso objetivo é alcançar cada vez mais jovens e adultos atuantes nas Unidades Escoteiras Locais para formar agentes de mudanças positivas em nosso país, frente a todos os desafios e distintas realidades que caracterizam nosso mundo atual, incluindo a globalização e suas consequências.
                    </p>
                    <br />
                    <Image 
                        alt=""
                        width={970}
                        height={350}
                        src={'/images/senior02.jpg'}
                        className={styles.image}
                    />
                    <h1 className={styles.subTitle}>
                        Quer abrir uma Unidade Escoteira Local?
                    </h1>
                    <p className={styles.paragraph}>
                        O interesse em adquirir mais informações sobre o processo de criação de uma nova Unidade Escoteira Local parte de uma pessoa ou grupo de pessoas que tenham tido ou não contato anterior com o Escotismo.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        Para ter maiores informações sobre o Movimento Escoteiro, os Escoteiros do Brasil e como abrir uma Unidade Escoteira Local entre em contato conosco através dos canais: 19coqueiral@gmail.com ou o telefone +55 27 99518-9739 (WhatsApp apenas).
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        Um representante do 19º/ES Grupo Escoteiro Coqueiral entrará em contato para se colocar à disposição e sanar as primeiras dúvidas, ou talvez, até marcar um primeiro encontro com o(s) interessado(s).
                    </p>
                </div>
            </div>
        </Section>
    )
}