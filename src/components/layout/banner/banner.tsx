import Image from 'next/image';
import styles from './banner.module.css';

type Props = {
    title?: string,
    subTitle?: string,
    paragraph?: string,
    imageURL?: string
}
export default function Banner({title, subTitle, paragraph, imageURL}:Props){
    return(
        <div className={`${styles.conteiner} porcent100`}>
            <video autoPlay loop>
                <source src='/videos/videoinst.mp4' type="video/mp4" />
                Seu navegador não suporta vídeos HTML5.
            </video>
            <div className={styles.filter}></div>
            <div className={`${styles.rotulo} flexCollCenter`}>
                {title ? <h1 className='textLarge colorWhite'>{title}</h1> :null}
                {subTitle ? <h4 className='colorWhite textMedium'>Educação para a vida.</h4> :null}
                {paragraph ? <p className='colorWhite textMediumFit'>
                    Venha fazer parte deste Movimento que já conta com mais de 57 milhões de pessoas em todo o mundo.
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