"use client";

import { useState } from 'react';
import { FaShareAlt } from 'react-icons/fa';
import styles from './styles.module.css';

export default function ShareButton({ 
  title, 
  text, 
  url,
  imageUrl
}: { title: string; text: string; url: string, imageUrl?: string }) {
  const [showFallback, setShowFallback] = useState(false);

  const handleShare = async () => {
    // Verifica suporte a compartilhamento com arquivos
    const canShareFiles = navigator.canShare && navigator.canShare({ files: [] });

    if (navigator.share) {
      try {
        const shareData:{title: string, text: string, url: string, files: File[]} = { title, text, url, files: [] };

         if (canShareFiles && imageUrl) {
          // Baixa a imagem
          const response = await fetch(imageUrl);
          const blob = await response.blob();

          const file = new File([blob], "imagem.jpg", { type: blob.type });

          // Inclui o arquivo no share
          shareData.files = [file];
        }
        
        return await navigator.share(shareData);
      } catch (err) {
        console.log("Erro, compartilhamento cancelado", err);
      }
    } 

    // Se não suportar Web Share API → ativa o fallback de desktop
    setShowFallback(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    alert("Link copiado!");
  };

  return (
    <>
      <button
        onClick={handleShare}
        style={{
          background: "#0077ff",
          color: "#fff",
          border: "none",
          padding: "8px 14px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        <FaShareAlt size={18} fill="#fff" /> Compartilhar
      </button>
      
      {showFallback && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h3>Compartilhar</h3>

            <button className={styles.option} onClick={copyToClipboard}>
              Copiar link
            </button>

            <a
              className={styles.option}
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`}
              target="_blank"
            >
              WhatsApp
            </a>

            <a
              className={styles.option}
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
              target="_blank"
            >
              Facebook
            </a>

            <a
              className={styles.option}
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`}
              target="_blank"
            >
              X (Twitter)
            </a>

            <a
              className={styles.option}
              href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + "\n" + url)}`}
            >
              Email
            </a>

            <button className={styles.close} onClick={() => setShowFallback(false)}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
