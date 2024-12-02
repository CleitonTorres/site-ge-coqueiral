'use client'
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
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
  customClass?: string[]
}
const InstagramFeed = ({limit, customClass}:Props) => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [customStyles, setCustomStyles] = useState('');

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
  }, []);

  if (loading) return <p>Carregando feed do Instagram...</p>;

  return (
    <div className={`${styles.conteiner} ${customStyles}`}>
      <h2>Feed do Instagram</h2>
      <div className={styles.content}>
        {posts.map((post) => (
          <div key={post.id}>
            {post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM' ? (
              <Image
                src={post.media_url}
                alt={'Post do Instagram'}
                width={200}
                height={200}
                style={{ width: '100%', borderRadius: '8px' }}
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
  );
};

export default InstagramFeed;
