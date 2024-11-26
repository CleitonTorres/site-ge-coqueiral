import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import Image from 'next/image';

export default function Page(){
    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <h1 className={`${styles.title}`}>Doe e ajude o Escotismo em Coqueiral</h1>
            <div className={styles.conteiner}>
                <div className={styles.subConteiner}>
                    <Image 
                        alt=""
                        width={970}
                        height={350}
                        priority
                        quality={100}
                        src={'/images/senior04.jpeg'}
                        className={styles.image}
                    />
                    <h1 className={styles.subTitle}>
                        Como sua doação vai nos ajudar 
                    </h1>
                    <p className={styles.paragraph}>
                        Sua doação vai nos ajudar na seguinte ordem de prioridade:
                    </p>
                    <br />
                    <ol>
                        <li className={styles.paragraph}>
                            <b>compra de equipamentos</b> de camping como barracas, bússolas, isolante térmico, saco de dormir, lonas, cordas etc.
                        </li>
                        <li className={styles.paragraph}>
                            <b>compra de vestuário</b> escoteiro e roupa de campo para crianças sem condições financeiras.
                        </li>
                        <li className={styles.paragraph}>
                            <b>na manutenção</b> da sede como pintura e serviços gerais.
                        </li>
                        <li className={styles.paragraph}>
                            <b>compra de equipamento</b> (bebedouro, ventiladores, ar condicionado a depender da necessidade) e equipamentos de SAPA (serrotes, serrinhas, facão, machadinha, enxada, cavadeiras, pedra de amolar, etc.).
                        </li>
                    </ol>
                    <br />
                    <p className={styles.paragraph}>
                        Doe via pix: <b>05991537000184</b> (CNPJ do 19º Grupo Escoteiro Coqueiral)
                    </p>
                    <br />
                    <p className={styles.paragraph} style={{textDecoration: 'underline'}}>
                        Informe na descrição que o valor se trata de doação ao 19º GE Coqueiral.
                    </p>
                    <br />
                    <h1 className={styles.subTitle}>
                        MUITO OBRIGADO!
                    </h1>
                    <Image 
                        alt=""
                        width={970}
                        height={350}
                        priority
                        quality={100}
                        src={'/images/escoteiros05.jpg'}
                        className={styles.image}
                    />
                </div>
            </div>
        </Section>
    )
}