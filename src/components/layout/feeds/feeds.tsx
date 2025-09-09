'use client'
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward  } from "react-icons/io";
import styles from './feeds.module.css';

type InstagramPost = {
  id: string;
  caption: string;
  media_type: string;
  media_url: string;
  permalink: string;
};

type Props = {
  limit?: number,
  customClass?: string[],
  carrocel?: boolean
}
const InstagramFeed = ({limit, customClass, carrocel}:Props) => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [customStyles, setCustomStyles] = useState('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Função para navegar para o próximo post
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length); // Vai para o próximo post e loopa
  };

  // Função para navegar para o post anterior
  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + posts.length) % posts.length); // Vai para o post anterior e loopa
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

  useEffect(() => {
    const fetchInstagramFeed = async () => {
      try {
        const response = await axios.post('/api/services',{ 
            service: 'feedInsta',
            limit: limit
        },{
            headers:{
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTORIZATION}`
            }
        });

        const data = response.data;

        setPosts(data.data);
      } catch (error) {
        console.error('Erro ao carregar o feed do Instagram:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramFeed();
  }, [limit]);

  // Troca automática de imagem a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext(); // Chama a função para ir para o próximo post
    }, 8000); // 5 segundos

    return () => clearInterval(interval); // Limpa o intervalo quando o componente for desmontado
  }, [posts]);


  if (loading) return <p>Carregando feed do Instagram...</p>;

  if(!carrocel){
    return(
        <div className={`${styles.conteiner} ${customStyles}`}>
          <h2>Feed do Instagram</h2>       
          <div className={styles.content}>
          {posts.map((post) => (
            <div key={post.id} className={styles.item}>
              {post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM' ? (
                <Image
                  src={post.media_url}
                  alt={'Post do Instagram'}
                  width={200}
                  height={200}
                  style={{ width: '100%', borderRadius: '8px' }}
                  quality={100}
                  priority
                  unoptimized
                />
              ) : post.media_type === 'VIDEO' ? (
                <video controls style={{ width: '100%' }}>
                  <source src={post.media_url} type="video/mp4" />
                </video>
              ) : null}
              <p>{post.caption}</p>
              <a href={post.permalink} target="_blank" rel="noopener noreferrer">
                Ver no Instagram
              </a>
            </div>
          ))}
        </div> 
        </div>
    )
  }else{
      return(
        <div className={`${styles.conteiner} ${customStyles}`}>
          <h2>Feed do Instagram</h2>
          <div className={styles.carousel}>
            <div className={styles.carouselWrapper} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {posts.map((post) => (
                <div className={styles.carouselItem} key={post.id}>
                  {post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM' ? (
                    <Image
                      src={post.media_url}
                      alt={'Post do Instagram'}
                      width={200}
                      height={200}
                      priority
                      unoptimized
                      quality={100}
                    />
                  ) : post.media_type === 'VIDEO' ? (
                    <video controls style={{ width: '100%' }}>
                      <source src={post.media_url} type="video/mp4" />
                    </video>
                  ) : null}
                  <p>{post.caption}</p>
                  <a href={post.permalink} target="_blank" rel="noopener noreferrer">
                    Ver no Instagram
                  </a>
                </div>
              ))}
            </div>

            {/* Botões de Navegação */}
            <div className={styles.navigation}>
              <IoIosArrowBack 
                onClick={goToPrev}
                className={styles.navButton}
                size={36}
              />
              <IoIosArrowForward 
                onClick={goToNext} 
                className={styles.navButton}
                size={36}
              />
            </div>
          </div>
        </div>
      )
  }
}

export default InstagramFeed;
