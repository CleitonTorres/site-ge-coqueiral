import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';

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
                        O 19° Grupo Escoteiro Coqueiral, atua no Bairro Coqueiral, Aracruz/ES, a 37 anos. Atualmente estamos funcionado no anexo à Oficina de Artes. Aos sábados de 14:30 às 17:00h.
                    </p>
                    <br />
                    <div className={styles.coluna}>
                        <p className={`${styles.paragraph} ${styles.widthAuto}`}>
                            Venha fazer parte dessa fraternidade mundial! <br/> 
                            <b>
                                 Os Escoteiros do Brasil oferecem condições de isenção de taxa de registro
                                para famílias de baixa renda, descontos na aquisição de traje e outras vantagens.
                            </b>
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
                        <a href="https://wa.me/27997364409?text=Ola%20gostaria%20de%20saber%20mais%20sobre%20o%20grupo%20escoteiro" target='_blank'>
                            WhatsApp: <FaWhatsapp size={28} color='green' style={{cursor: 'pointer'}}/>
                        </a>
                    </p>                    
                    <p className={styles.paragraph}>
                        <a href="/seja-escoteiro" className='link'>Veja mais sobre o ESCOTISMO</a>                    
                    </p>
                </div>
            </div>
        </Section>
    )
}