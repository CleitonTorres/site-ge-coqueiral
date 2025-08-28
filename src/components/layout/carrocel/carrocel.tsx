'use client'
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from './carrocel.module.css';
import { IoIosArrowBack, IoIosArrowForward  } from "react-icons/io";
import { handleUrl } from '@/scripts/globais';

type Props = {
  customClass?: string[] | string,
  urlImages: string[]
}

const Carrocel = ({ customClass, urlImages }: Props) => {
  const [customStyles, setCustomStyles] = useState('');
  const carouselRef = useRef<HTMLDivElement>(null);

  // monta classes personalizadas
  useEffect(() => {
    if (Array.isArray(customClass)) {
      let newString = '';
      for (const item of customClass) {
        newString += styles[item] + " ";         
      }
      setCustomStyles(newString)
    } else {
      setCustomStyles(customClass ? styles[customClass] : '') 
    }
  }, [customClass]);

  // função para ir para próximo item
  const goToNext = () => {
    if (!carouselRef.current) return;
    const width = carouselRef.current.clientWidth;
    carouselRef.current.scrollBy({ left: width, behavior: "smooth" });
  };

  // função para ir para item anterior
  const goToPrev = () => {
    if (!carouselRef.current) return;
    const width = carouselRef.current.clientWidth;
    carouselRef.current.scrollBy({ left: -width, behavior: "smooth" });
  };

  // troca automática de imagem a cada 5s
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${styles.conteiner} ${customStyles}`}>
      <div className={styles.carousel} ref={carouselRef}>
        {urlImages.map((post, idx) => (
          <div className={styles.carouselItem} key={idx + 'previewBanner'}>
            <Image
              src={handleUrl(post)} 
              alt={'foto'}
              width={1200}
              height={600}
              quality={100}
              style={{ width: "100%", height: "auto" }}
              priority
              unoptimized
            />
          </div>
        ))}
      </div>

      {/* Botões de Navegação */}
      {urlImages.length > 1 ? (
        <div className={styles.navigation}>
          <IoIosArrowBack onClick={goToPrev} className={styles.navButton} size={36}/>
          <IoIosArrowForward onClick={goToNext} className={styles.navButton} size={36}/>
        </div>
      ) : null}
    </div>
  )
}

export default Carrocel;
