'use client';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './feeds.module.css';

type InstagramPost = { id: string; caption: string; media_type: string; media_url: string; permalink: string };
type Props = { limit?: number; customClass?: string[]; carrocel?: boolean };
export default function InstagramFeed({ limit, customClass = [], carrocel }: Props) {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const response = await axios.post('/api/services', { service: 'feedInsta', limit }, { headers: { Authorization: `Bearer ${process.env.AUTORIZATION}` }, signal: controller.signal, timeout: 10000 });
        if (!controller.signal.aborted) setPosts(Array.isArray(response.data.data) ? response.data.data : []);
      } catch { /* O link para o perfil continua disponível quando o serviço falhar. */ }
      finally { if (!controller.signal.aborted) setLoading(false); }
    }
    void load();
    return () => controller.abort();
  }, [limit]);

  const visiblePosts = carrocel ? posts.slice(currentIndex, currentIndex + 1) : posts;
  return <div className={`${styles.conteiner} ${customClass.map(name => styles[name] || '').join(' ')}`}>
    <h2>Nosso dia a dia no Instagram</h2>
    {loading ? <p role="status">Carregando publicações…</p> : posts.length === 0 ? <p>Continue acompanhando nossas atividades pelo perfil do grupo.</p> : <>
      <div className={styles.content}>
        {visiblePosts.map(post => <article className={styles.item} key={post.id}>
          {post.media_type === 'VIDEO' ? <video controls preload="metadata" aria-label={post.caption?.slice(0, 100) || 'Vídeo do grupo'} src={post.media_url} /> : <Image src={post.media_url} alt={post.caption?.slice(0, 150) || 'Publicação do Grupo Escoteiro Coqueiral'} width={600} height={600} unoptimized />}
          {post.caption && <p>{post.caption}</p>}
          <a href={post.permalink} target="_blank" rel="noopener noreferrer">Ver publicação no Instagram<span className="sr-only"> (abre em nova aba)</span></a>
        </article>)}
      </div>
      {carrocel && posts.length > 1 && <div className={styles.navigation}>
        <button type="button" aria-label="Publicação anterior" onClick={() => setCurrentIndex((currentIndex - 1 + posts.length) % posts.length)}>← Anterior</button>
        <span role="status" aria-live="polite">{currentIndex + 1} de {posts.length}</span>
        <button type="button" aria-label="Próxima publicação" onClick={() => setCurrentIndex((currentIndex + 1) % posts.length)}>Próxima →</button>
      </div>}
    </>}
    <a className={styles.profile} href="https://www.instagram.com/19escoqueiral/" target="_blank" rel="noopener noreferrer">Siga @19escoqueiral<span className="sr-only"> (abre em nova aba)</span></a>
  </div>;
}
