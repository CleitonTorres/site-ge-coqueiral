import Section from "@/components/layout/sections/section";
import styles from './page.module.css';


export default function SAEE(){
    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <h1 className={styles.title}>SAAE</h1>
            <div className={styles.conteiner}></div>
        </Section>
    )
}