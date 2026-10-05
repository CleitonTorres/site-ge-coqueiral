'use client';
import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { LinktreeProfile, validateLinktree } from '@/lib/linktree/model';
import styles from '../registration/styles.module.css';

export default function LinktreeAdmin() {
  const [draft, setDraft] = useState<LinktreeProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  async function load() {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/linktree?admin=1', { cache: 'no-store' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setDraft(data);
    } catch (error) { setError(error instanceof Error ? error.message : 'Não foi possível carregar o perfil.'); }
    finally { setLoading(false); }
  }
  useEffect(() => { void load(); }, []);

  function update(patch: Partial<LinktreeProfile>) {
    setDraft(current => current ? { ...current, ...patch } : current);
    setMessage('');
  }
  async function save(event: FormEvent) {
    event.preventDefault();
    if (!draft || busy) return;
    setBusy(true); setError(''); setMessage('');
    try {
      const profile = validateLinktree(draft);
      const response = await fetch('/api/linktree', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(profile),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setDraft(data);
      setMessage('Linktree salvo. As alterações já estão disponíveis na página pública.');
    } catch (error) { setError(error instanceof Error ? error.message : 'Não foi possível salvar.'); }
    finally { setBusy(false); }
  }

  return <section className={styles.page} aria-labelledby="linktree-admin-title">
    <form className={styles.panel} onSubmit={save} aria-busy={loading || busy}>
      <span className={styles.eyebrow}>Links do grupo</span>
      <h2 id="linktree-admin-title">Editar Linktree</h2>
      <p>Atualize o perfil e os links importantes. As alterações são publicadas ao salvar.</p>
      <Link href="/linktree" target="_blank" rel="noopener noreferrer">Ver página pública ↗</Link>
      {loading && <p role="status">Carregando Linktree…</p>}
      {error && <p role="alert" className={styles.error}>{error}</p>}
      {message && <p role="status" className={styles.notice}>{message}</p>}
      {!draft && !loading && <div className={styles.row}>
        <button type="button" className={styles.button} onClick={() => void load()}>Tentar novamente</button>
        <Link className={`${styles.button} ${styles.secondary}`} href="/administrativo">Entrar novamente</Link>
      </div>}
      {draft && <>
        <fieldset disabled={busy} className={styles.panel}>
          <legend className={styles.legend}>Perfil</legend>
          <div className={styles.field}><label htmlFor="linktree-name">Nome</label>
            <input id="linktree-name" required maxLength={200} value={draft.name} onChange={e => update({ name: e.target.value })} /></div>
          <div className={styles.field}><label htmlFor="linktree-bio">Descrição</label>
            <textarea id="linktree-bio" maxLength={2000} value={draft.bio} onChange={e => update({ bio: e.target.value })} /></div>
          <div className={styles.field}><label htmlFor="linktree-avatar">URL da imagem</label>
            <input id="linktree-avatar" required value={draft.avatarUrl} onChange={e => update({ avatarUrl: e.target.value })} />
            <p className={styles.hint}>Use uma URL completa ou um caminho do site, como /logo/logo.png.</p></div>
        </fieldset>
        <fieldset disabled={busy} className={styles.panel}>
          <legend className={styles.legend}>Links</legend>
          {!draft.links.length && <p>Nenhum link. Adicione o primeiro abaixo.</p>}
          {draft.links.map((link, index) => <div key={link.id} className={styles.card}>
            <h3>Link {index + 1}</h3>
            <div className={styles.field}><label htmlFor={`linktree-label-${index}`}>Título</label>
              <input id={`linktree-label-${index}`} required maxLength={200} value={link.label} onChange={e => update({ links: draft.links.map((item, i) => i === index ? { ...item, label: e.target.value } : item) })} /></div>
            <div className={styles.field}><label htmlFor={`linktree-url-${index}`}>URL</label>
              <input id={`linktree-url-${index}`} required maxLength={2048} placeholder="https://…" value={link.url} onChange={e => update({ links: draft.links.map((item, i) => i === index ? { ...item, url: e.target.value } : item) })} /></div>
            <div className={styles.row}>
              <button type="button" className={`${styles.button} ${styles.secondary}`} onClick={() => update({ links: draft.links.filter((_, i) => i !== index) })} aria-label={`Remover link ${index + 1}: ${link.label}`}>Remover link</button>
            </div>
          </div>)}
          <button type="button" className={`${styles.button} ${styles.secondary}`} disabled={draft.links.length >= 100} onClick={() => update({ links: [...draft.links, { id: crypto.randomUUID(), label: '', url: '' }] })}>Adicionar link</button>
          <p className={styles.hint}>Inclusões e remoções só são publicadas quando você salva.</p>
        </fieldset>
        <button type="submit" className={styles.button} disabled={busy}>{busy ? 'Salvando…' : 'Salvar Linktree'}</button>
      </>}
    </form>
  </section>;
}
