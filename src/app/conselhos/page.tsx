import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import Image from 'next/image';

export default function Page(){
    return(
        <Section customClass={['flexCollTop', 'fullWidth', 'margin0']}>
             <h1 className={styles.title}>Conselhos</h1>
             <div className={styles.conteiner}>
             <div className={styles.subConteiner}>
                <h1 className={styles.subTitle}>Conselho Fiscal</h1>
                <div className={`${styles.card} boxShadow`}>
                    <Image 
                        alt=''
                        width={200}
                        height={300}
                        src={'/images/adulto08.jpg'}
                    />
                    <p>
                        Em breve.
                    </p>                    
                </div>
             </div>
                
             </div>
        </Section>
    )
}