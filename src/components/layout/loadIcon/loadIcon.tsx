import Image from "next/image";

import styles from './loadIcon.module.css';

type Props = {
    showHide: boolean,
    customClass?: string
}
export default function LoadIcon ({showHide, customClass}:Props){

    return(
        showHide ?
        <div className={`${styles.conteiner} ${customClass ? styles[customClass] : null}`}>
            <Image 
                width={100}
                height={100}
                src={'/logo/logo.png'} 
                alt="Logo do 19º grupo escoteiro Coqueiral." 
                priority={true}/>
            <div className={`${styles.loop} ${customClass ? styles[customClass] : null}`}></div>
        </div>
        :null
    )
}