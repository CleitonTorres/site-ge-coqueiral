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
  const [currentIndex, setCurrentIndex] = useState(0);

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
    carouselRef.current.scrollBy({ left: width, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  // função para ir para item anterior
  const goToPrev = () => {
    if (!carouselRef.current) return;
    const width = carouselRef.current.clientWidth;
    carouselRef.current.scrollBy({ left: -width, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  return (
    <div className={`${styles.conteiner} ${customStyles}`}>
      <div className={styles.carousel} ref={carouselRef} role="region" aria-label="Galeria de fotos" tabIndex={0} onScroll={event => {
        const element = event.currentTarget;
        setCurrentIndex(Math.round(element.scrollLeft / Math.max(1, element.clientWidth)));
      }}>
        {urlImages.map((post, idx) => (
          <div className={styles.carouselItem} key={idx + 'previewBanner'}>
            <Image
              src={handleUrl(post)} 
              alt={`Foto ${idx + 1} da galeria`}
              width={1200}
              height={600}
              quality={100}
              unoptimized
            />
          </div>
        ))}
      </div>

      {/* Botões de Navegação */}
      {urlImages.length > 1 ? (
        <div className={styles.navigation}>
          <button type="button" onClick={goToPrev} className={styles.navButton} aria-label="Foto anterior" disabled={currentIndex === 0}><IoIosArrowBack aria-hidden="true" size={24}/></button>
          <span role="status" aria-live="polite">{Math.min(currentIndex + 1, urlImages.length)} de {urlImages.length}</span>
          <button type="button" onClick={goToNext} className={styles.navButton} aria-label="Próxima foto" disabled={currentIndex >= urlImages.length - 1}><IoIosArrowForward aria-hidden="true" size={24}/></button>
        </div>
      ) : null}
    </div>
  )
}

export default Carrocel;
