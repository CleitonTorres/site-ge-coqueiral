'use client';

import { useEffect, useState } from 'react';
import styles from './linktree.module.css';

// Interface para tipagem dos links
interface LinkItem {
  id: number | string;
  label: string;
  url: string;
}

// Interface para os dados do perfil
interface ProfileData {
  name: string;
  bio: string;
  avatarUrl: string;
  links: LinkItem[];
}

export default function Linktree() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setError(false);

    async function loadProfile() {
      try {
        const response = await fetch('/api/linktree', {
          cache: 'no-store',
          signal: controller.signal,
        });
        if (!response.ok) throw new Error('Falha ao carregar Linktree.');
        const data: ProfileData = await response.json();
        if (!controller.signal.aborted) setProfile(data);
      } catch {
        if (!controller.signal.aborted) setError(true);
      }
    }

    void loadProfile();
    return () => controller.abort();
  }, [attempt]);

  if (!profile) {
    return (
      <div className={styles.container}>
        <main className={styles.linksContainer}>
          <p role={error ? 'alert' : 'status'}>
            {error ? 'Não foi possível carregar os links. Tente novamente.' : 'Carregando links...'}
          </p>
          {error && (
            <button type="button" className={styles.linkButton} onClick={() => setAttempt(value => value + 1)}>
              Tentar novamente
            </button>
          )}
        </main>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img 
          src={profile.avatarUrl} 
          alt={`Foto de perfil de ${profile.name}`} 
          className={styles.avatar}
        />
        <h1 className={styles.name}>{profile.name}</h1>
        <p className={styles.bio}>{profile.bio}</p>
      </header>

      <main className={styles.linksContainer}>
        {profile.links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkButton}
          >
            {link.label}
          </a>
        ))}
      </main>
    </div>
  );
}