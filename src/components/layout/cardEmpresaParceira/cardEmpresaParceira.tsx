import Image from 'next/image';
import styles from './cardEmpresaParceira.module.css';

type Props = {
    nameEmpresa: string,
    logoURL: string,
    linkSiteEmpresa: string
}
export default function CardEmpresaParceira ({nameEmpresa, logoURL, linkSiteEmpresa}:Props){
    return(
        <a href={linkSiteEmpresa} target='_blank' rel='noopener noreferrer' aria-label={`${nameEmpresa} (abre em nova aba)`} className={styles.conteiner}>
            <Image 
              alt={nameEmpresa}
              width={200}
              height={135}
              src={logoURL}
              className={styles.logo}
            />
            <span className={styles.spam01}>{nameEmpresa}</span>
            <Image 
              alt=''
              width={26}
              height={26}
              src={'https://upload.wikimedia.org/wikipedia/commons/3/3c/Fleur-de-lis-fill.svg'}
              className={styles.icon}
            />
        </a>  
    )
}
