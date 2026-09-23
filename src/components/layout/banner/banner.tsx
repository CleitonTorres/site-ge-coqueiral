'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styles from './banner.module.css';

type Props = { title?: string; subTitle?: string; paragraph?: string; imageURL?: string; videoURL?: string; customClass?: string[] };
export default function Banner({ title, subTitle, paragraph, imageURL, videoURL, customClass = [] }: Props) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const isHome = videoURL === '/videos/banner.webm';
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      if (!video.current) return;
      if (preference.matches) video.current.pause();
      else void video.current.play().catch(() => setPlaying(false));
    };
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, [videoURL]);
  return (
    <section className={`${styles.conteiner} ${customClass.map(name => styles[name] || '').join(' ')}`}>
      {videoURL && <video ref={video} muted loop playsInline preload="metadata" poster={isHome ? '/images/projetos/acampa-canoa/acampa-canoa01.jpg' : undefined} className={styles.video} aria-hidden="true" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}><source src={videoURL} type={videoURL.endsWith('.webm') ? 'video/webm' : 'video/mp4'} /></video>}
      <div className={styles.filter} />
      <div className={styles.rotulo}>
        {imageURL && <Image width={76} height={76} alt="Grupo Escoteiro Coqueiral" src={imageURL} className={styles.logo} priority={isHome} />}
        {subTitle && <p className={styles.subTitle}>{subTitle}</p>}
        {title && <h1 className={styles.title}>{title}</h1>}
        {paragraph && <p className={styles.paragraph}>{paragraph}</p>}
        {isHome && <div className={styles.actions}><Link href="/seja-escoteiro">Quero ser escoteiro <span aria-hidden="true">→</span></Link><Link href="/projetos">Conheça nossos projetos</Link></div>}
      </div>
      {videoURL && <button type="button" className={styles.control} aria-label={playing ? 'Pausar vídeo de fundo' : 'Reproduzir vídeo de fundo'} onClick={() => { if (playing) video.current?.pause(); else void video.current?.play().catch(() => setPlaying(false)); }}>{playing ? 'Ⅱ Pausar vídeo' : '▷ Reproduzir vídeo'}</button>}
    </section>
  );
}
