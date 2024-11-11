import Image from "next/image";
import styles from './card.module.css';

type Props = {
    imageURL?: string,
    textData?: string,
    title: string,
    paragraph: string
}
export default function Card({title, paragraph, imageURL, textData}:Props){
    return(
        <div className={styles.conteiner}>
            {imageURL ? <Image
                alt="card"
                width={408}
                height={150}
                src={imageURL}
            />:null}
            <h4>{textData || ''}</h4>
            <h1>{title}</h1>
            <p>
                {paragraph}
            </p>
        </div>
    )
}