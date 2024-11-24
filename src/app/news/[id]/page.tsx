import Section from '@/components/layout/sections/section';
import styles from './page.module.css';

export default async function Page({params}:{params: Promise<{id: string}>}) {
    const idNews = (await params).id;

    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <h1 className={styles.title}>{idNews}</h1>
        </Section>
    )
}