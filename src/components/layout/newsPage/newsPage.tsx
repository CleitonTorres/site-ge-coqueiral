import Section from '@/components/layout/sections/section';
import styles from './newsPage.module.css';
import { DataNews } from '@/@types/types';
import Image from 'next/image';

type Props = {
    origem: 'cadastro' | 'view',
    dataNews: DataNews
}
export default function NewsPage({origem, dataNews}:Props) {
    return(
        <Section customClass={['flexCollTop', 'maxWidth']}>
            <h1 className={styles.title}>{dataNews.title}</h1>
            {dataNews.imageID ? 
                <div className={styles.conteinerImg}>
                        <Image 
                        alt=""
                        width={970}
                        height={350}
                        src={origem === "cadastro" ? dataNews.imageID : `https://drive.google.com/uc?export=download&id=${dataNews.imageID}`}
                        className={styles.image}
                        decoding='auto'/>
                </div>                
            :null}
            <p className={styles.paragraph}>
                {dataNews.paragraph}
            </p>
            {dataNews.urlLink ? <p className={styles.paragraph}>
                Acesse no <a href={dataNews.urlLink}>link</a>.
            </p>:null}
        </Section>
    )
}