import Image from 'next/image';
import styles from './banner.module.css';

type Props = {
    title?: string,
    subTitle?: string,
    paragraph?: string,
    imageURL?: string,
    videoURL?: string
}
export default function Banner({title, subTitle, paragraph, imageURL, videoURL}:Props){
    return(
        <div className={`${styles.conteiner} porcent100`}>
            {videoURL ? 
                <video autoPlay loop className={styles.video}>
                    <source src={videoURL} type="video/mp4" />
                    Seu navegador não suporta vídeos HTML5.
                </video>
            :null}
            <div className={styles.filter}></div>
            <div className={`${styles.rotulo} flexCollCenter`}>
                {title ? <h1 className={`${styles.title} textLarge colorWhite`}>{title}</h1> :null}
                {subTitle ? <h4 className={`${styles.subTitle} colorWhite textMedium`}>{subTitle}</h4> :null}
                {paragraph ? <p className={`${styles.paragraph} colorWhite textMediumFit`}>
                    {paragraph}
                </p>:null}
                {imageURL ? 
                <Image 
                    width={100} 
                    height={100} 
                    alt='logo grupo escoteiro Coqueiral' 
                    src={imageURL}
                />:null}
            </div>            
        </div>
    )
}