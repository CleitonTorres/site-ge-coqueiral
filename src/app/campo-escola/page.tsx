'use client'
import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import Image from 'next/image';

export default function Page(){
    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <h1 className={styles.title}>Campo Escola Virtual</h1>
            <div className={styles.conteiner}>
                <div className={styles.subConteiner}>
                    <div className={styles.boxImage}>
                        <Image 
                            alt=""
                            width={970}
                            height={350}
                            src={'/images/adulto07.jpg'}
                            className={styles.image}
                        />
                    </div>                    
                    <p className={styles.paragraph}>
                        Os Escoteiros do Brasil oferecem a todos os seus voluntários a oportunidade de conhecer mais sobre o Movimento Escoteiro e aperfeiçoar os seus conhecimentos, a partir do Campo-Escola Virtual.                    
                    </p>
                    <p className={styles.paragraph}>
                        Nele é possível encontrar diversos cursos que colaboram com o desenvolvimento das competências necessárias para as tarefas de um adulto na organização.                    
                    </p>
                    <p className={styles.paragraph}>
                        Além do Campo-Escola Virtual, estão disponíveis alguns cursos de aprendizagem individual, na qual o adulto assume a responsabilidade integral sobre seu desenvolvimento realizando leituras e atividades relacionadas à alguns temas, confira a relação de cursos disponíveis:
                    </p>
                    <br />
                    <div 
                        className={styles.boxAcesse}
                        onClick={()=>window.open('https://ead.escoteiros.org.br/', '_blank')}
                    >
                        <span>Acesse o campo escola virtual</span>
                    </div>
                    
                    <br />
                    <p className={styles.paragraph}>
                       <a href="https://ead.escoteiros.org.br/course/view.php?id=139" target='_blank'>
                            Bem-vindo ao Movimento Escoteiro
                       </a>
                    </p>
                    <p className={styles.paragraph}>
                        <a href="https://ead.escoteiros.org.br/mod/page/view.php?id=21072" target='_blank'>
                            Proteção Infantojuvenil
                        </a>
                    </p>
                    <p className={styles.paragraph}>
                        <a href="https://ead.escoteiros.org.br/course/info.php?id=109">
                            Cyberbullying – Prevenção e Informações
                        </a>
                    </p>
                </div>
            </div>
        </Section>
    )
}