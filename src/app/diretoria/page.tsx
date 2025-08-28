import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import Image from 'next/image';

export default function Page(){
    return(
        <Section customClass={['flexCollTop', 'fullWidth', 'margin0']}>
             <h1 className={styles.title}>Nossa Diretoria</h1>
             <div className={styles.conteiner}>
                <h1 className={styles.subTitle}>Mandado 2025 a 2027</h1>
                <div className={styles.subConteiner}>                
                    <div className={`${styles.card} boxShadow`}>
                        <Image 
                            alt=''
                            width={200}
                            height={300}
                            quality={100}
                            src={'/images/diretoria/presidente.jpeg'}
                        />
                        <p>Rubia Veiga Ribeiro Machado</p>
                        <p>
                            Diretora Presidente
                        </p>                    
                    </div>
                    <div className={`${styles.card} boxShadow`}>
                        <Image 
                            alt=''
                            width={200}
                            height={300}
                            quality={100}
                            src={'/images/diretoria/diradmin.jpeg'}
                        />
                        <p>
                            Ademilsian Alves De Lima Oliveira
                        </p> 
                        <p>
                            Diretora Administrativa</p>                  
                    </div>
                    <div className={`${styles.card} boxShadow`}>
                        <Image 
                            alt=''
                            width={200}
                            height={300}
                            src={'/images/diretoria/dirdme.jpg'}
                        />
                        <p>
                            Ana Paula Corrêa Do Carmo
                        </p> 
                        <p>
                            Diretora de Método Educativo</p>                  
                    </div>
                    <div className={`${styles.card} boxShadow`}>
                        <Image 
                            alt=''
                            width={200}
                            height={300}
                            quality={100}
                            src={'/images/diretoria/dirfinanceira.jpeg'}
                        />
                        <p>
                            Natália Aparecida Da Silva Baracho Morais
                        </p> 
                        <p>
                            Diretora Financeira</p>                  
                    </div>
                </div>                
             </div>
        </Section>
    )
}