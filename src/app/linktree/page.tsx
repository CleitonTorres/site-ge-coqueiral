import styles from './linktree.module.css';

// Interface para tipagem dos links
interface LinkItem {
  id: number;
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

// Mock de dados (Altere com as suas informações)
const profile: ProfileData = {
  name: "19º Grupo Escoteiro Coqueiral",
  bio: "Desde 1988 formando cidadãos de valor.",
  avatarUrl: "/logo/logo.png",
  links: [
    { id: 1, label: "Site Institucional", url: "https://grupoescoteirocoqueiral.org.br" },
    { id: 2, label: "Nossos Projetos", url: "https://www.grupoescoteirocoqueiral.org.br/projetos" },
    { id: 3, label: "Nota Premiada Capixaba", url: "https://www.notapremiadacapixaba.es.gov.br/" },
    { id: 4, label: "Instagram", url: "https://www.instagram.com/19escoqueiral/" },
  ]
};

export default function Linktree() {
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