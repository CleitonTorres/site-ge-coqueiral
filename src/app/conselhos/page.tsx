import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import Image from 'next/image';

export default function Page(){
    return(
        <Section customClass={['flexCollTop', 'fullWidth', 'margin0']}>
            <h1 className={styles.title}>Conselhos</h1>
            <div className={styles.conteiner}>
            <h1 className={styles.subTitle}>Conselho Fiscal</h1>
                <div className={styles.subConteiner}>
                    <div className={`${styles.card} boxShadow`}>
                        <Image 
                            alt=''
                            width={200}
                            height={300}
                            quality={100}
                            src={'/images/conselho-fiscal/conselho1.jpeg'}
                        />
                        <p>
                            Priscila Teixeira Amaral
                        </p> 
                        <p>
                            Conselheira/Relatora
                        </p>                   
                    </div>
                    <div className={`${styles.card} boxShadow`}>
                        <Image 
                            alt=''
                            width={200}
                            height={300}
                            quality={100}
                            src={'/images/conselho-fiscal/conselho2.jpeg'}
                        />
                        <p>
                            Luciana Fracari De Queiros
                        </p> 
                        <p>
                            2ª Conselheira
                        </p>                   
                    </div>
                    <div className={`${styles.card} boxShadow`}>
                        <Image 
                            alt=''
                            width={200}
                            height={300}
                            quality={100}
                            src={'/images/adulto08.jpg'}
                        />
                        <p>
                            Fábia Ravani Lamas
                        </p> 
                        <p>
                            3ª Conselheira
                        </p>                   
                    </div>
                    <div className={`${styles.card} boxShadow`}>
                        <Image 
                            alt=''
                            width={200}
                            height={300}
                            quality={100}
                            src={'/images/adulto08.jpg'}
                        />
                        <p>
                            Maria Eugenia Freire B. Lavagna
                        </p> 
                        <p>
                            1ª Suplente
                        </p>               
                    </div>
                    <div className={`${styles.card} boxShadow`}>
                        <Image 
                            alt=''
                            width={200}
                            height={300}
                            quality={100}
                            src={'/images/adulto08.jpg'}
                        />
                        <p>
                            Leonardo Reis Milagres
                        </p> 
                        <p>
                            2ª Suplente
                        </p>               
                    </div>
                </div>                
            </div>
        </Section>
    )
}