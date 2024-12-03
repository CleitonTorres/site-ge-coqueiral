import Section from "@/components/layout/sections/section";
import styles from './page.module.css';
import ActivityForm from "@/components/form/inputIA/inputIA";


export default function Page(){
    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <h1 className={styles.title}>SAAE</h1>
            <div className={styles.conteiner}>
                <ActivityForm />
            </div>
        </Section>
    )
}