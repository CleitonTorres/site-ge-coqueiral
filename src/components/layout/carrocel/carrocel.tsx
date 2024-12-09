'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './carrocel.module.css';
import { v4 } from 'uuid';
import { IoIosArrowBack, IoIosArrowForward  } from "react-icons/io";

type Props = {
  customClass?: string[],
  urlImages: string[]
}
const Carrocel = ({customClass, urlImages}:Props) => {
    const [customStyles, setCustomStyles] = useState('');
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    // Função para navegar para o próximo post
    const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % urlImages.length); // Vai para o próximo post e loopa
    };

    // Função para navegar para o post anterior
    const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + urlImages.length) % urlImages.length); // Vai para o post anterior e loopa
    };

    useEffect(()=>{
        if(Array.isArray(customClass)){
            let newString = '';
            for (const item of customClass) {
                newString += styles[item] + " ";         
            }
            setCustomStyles(newString)
        }else{
            setCustomStyles(customClass ? styles[customClass] : '') 
        }
    },[customClass]);

    // Troca automática de imagem a cada 5 segundos
    useEffect(() => {
    const interval = setInterval(() => {
        goToNext(); // Chama a função para ir para o próximo post
    }, 5000); // 5 segundos

    return () => clearInterval(interval); // Limpa o intervalo quando o componente for desmontado
    }, []);

    return(
        <div className={`${styles.conteiner} ${customStyles}`}>
            <div className={styles.carousel}>
            <div className={styles.carouselWrapper} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {urlImages.map((post) => (
                <div className={styles.carouselItem} key={v4()}>
                    <Image
                        src={post}
                        alt={'Post do Instagram'}
                        width={200}
                        height={200}
                        priority
                        quality={100}
                    />
                </div>
                ))}
            </div>

            {/* Botões de Navegação */}
            <div className={styles.navigation}>
                <IoIosArrowBack onClick={goToPrev} className={styles.navButton} size={36}/>
                <IoIosArrowForward onClick={goToNext} className={styles.navButton} size={36}/>
            </div>
            </div>
        </div>
    )
}

export default Carrocel;
