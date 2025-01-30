import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import Image from 'next/image';

export default function Page(){
    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <h1 className={styles.title}>Entre em contato com a gente</h1>
            <div className={styles.conteiner}>
                <div className={styles.subConteiner}>
                    <Image 
                        alt=""
                        width={970}
                        height={350}
                        src={'/images/senior01.jpeg'}
                        className={styles.image}
                    />
                    <p className={styles.paragraph}>
                        O 19° Grupo Escoteiro Coqueiral, atua no Bairro Coqueiral, Aracruz/ES, a 37 anos. Atualmente estamos funcionado no anexo à Oficina de Artes. Aos sábados de 08 às 10:30h.
                    </p>
                    <br />
                    <div className={styles.coluna}>
                        <p className={`${styles.paragraph} ${styles.widthAuto}`}>
                            Venha fazer parte dessa fraternidade mundial! <b>Temos vagas para pessoas de baixa renda, com descontos em registro, traje e outras vantagens.</b>
                        </p>
                        <ul className={`${styles.boxLinks} ${styles.widthAuto}`}>
                            <li>
                                <a href="ramo-lobinho" target='_self'>Conheça o Ramo Lobinho</a>
                            </li>
                            <li>
                                <a href="ramo-escoteiro" target='_self'>Conheça o Ramo Escoteiro</a>
                            </li>
                            <li>
                                <a href="ramo-senior" target='_self'>Conheça o Ramo Sênior</a>
                            </li>
                            <li>
                                <a href="ramo-pioneiro" target='_self'>Conheça o Ramo Pioneiro</a>
                            </li>
                            <li>
                            <a href="https://docs.google.com/forms/d/e/1FAIpQLSclIiYAVyW2YnUxGx7WVYro-c2Cre_DqCdSWapn13SJIl_Ntg/viewform" target='_blank'>Seja um VOLUNTÁRIO</a>
                            </li>
                        </ul>
                    </div>
                    <br />
                    <h1 className={styles.subTitle}>
                        Nossos contatos:
                    </h1>
                    <p className={styles.paragraph}>
                        Instagram: @19escoqueiral <br/>
                        E-mail: 19coqueiral@gmail.com <br/>
                        WhatsApp: 27 99736-4409
                    </p>                    
                    <p className={styles.paragraph}>
                        <a href="/seja-escoteiro" className='link'>Veja mais sobre o ESCOTISMO</a>                    
                    </p>
                </div>
            </div>
        </Section>
    )
}