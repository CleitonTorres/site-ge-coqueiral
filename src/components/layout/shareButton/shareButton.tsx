'use client';
import { useId, useRef, useState } from 'react';
import { FaShareAlt } from 'react-icons/fa';
import styles from './styles.module.css';

export default function ShareButton({ title, text, url }: { title: string; text: string; url: string; imageUrl?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const headingId = useId();
  const [status, setStatus] = useState('');
  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title, text, url }); return; }
      catch (error) { if (error instanceof DOMException && error.name === 'AbortError') return; }
    }
    setStatus('');
    dialog.current?.showModal();
  };
  return <>
    <button ref={trigger} type="button" className={styles.trigger} onClick={handleShare}><FaShareAlt aria-hidden="true" /> Compartilhar</button>
    <dialog ref={dialog} className={styles.modal} aria-labelledby={headingId} onClose={() => trigger.current?.focus()}>
      <h2 id={headingId}>Compartilhar</h2>
      <button type="button" className={styles.option} onClick={async () => {
        try { await navigator.clipboard.writeText(url); setStatus('Link copiado!'); }
        catch { setStatus('Não foi possível copiar. Selecione o link abaixo.'); }
      }}>Copiar link</button>
      <a className={styles.option} href={`https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`} target="_blank" rel="noopener noreferrer">WhatsApp<span className="sr-only"> (abre em nova aba)</span></a>
      <a className={styles.option} href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">Facebook<span className="sr-only"> (abre em nova aba)</span></a>
      <a className={styles.option} href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">X (Twitter)<span className="sr-only"> (abre em nova aba)</span></a>
      <a className={styles.option} href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n' + url)}`}>E-mail</a>
      <label className={styles.linkLabel}>Link da página<input readOnly value={url} onFocus={event => event.currentTarget.select()} /></label>
      <p role="status" className={styles.status}>{status}</p>
      <button type="button" className={styles.close} onClick={() => dialog.current?.close()}>Fechar</button>
    </dialog>
  </>;
}
