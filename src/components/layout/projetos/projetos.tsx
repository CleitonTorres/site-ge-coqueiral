import Link from 'next/link';
import Image from 'next/image';
import styles from './projetos.module.css';

const projects = [
  { slug: 'acampa-canoa', title: 'Acampa Canoa', category: 'Esporte e educação', image: '/images/projetos/acampa-canoa/acampa-canoa01.jpg', description: 'Aventura, trabalho em equipe e aprendizado em contato com a natureza.' },
  { slug: 'pipa-escoteira', title: 'Pipa Escoteira', category: 'Cultura', image: '/images/projetos/pipa-escoteira/pipa-escoteira01.jpeg', description: 'Brincadeiras e tradições que aproximam gerações e valorizam nossa cultura.' },
  { slug: 'oleo-na-reciclagem', title: 'De Óleo na Reciclagem', category: 'Meio ambiente', image: '/images/projetos/oleo/oleo.png', description: 'Coleta de óleo de cozinha usado para dar um destino responsável a esse resíduo.' },
  { slug: 'escoteiros-pela-biodiversidade', title: 'Escoteiros pela Biodiversidade', category: 'Meio ambiente', image: '/images/biodiversidade (1).jpg', description: 'Conhecer e cuidar da vida ao nosso redor, com ações de educação ambiental.' },
  { slug: 'escoteiro-dev', title: 'Escoteiro Dev', category: 'Educação e tecnologia', image: '/images/escoteiro-dev.jpg', description: 'Cultura digital e tecnologia como caminhos para aprender, criar e compartilhar.' },
  { slug: 'dia-de-semear-paz', title: 'Dia de Semear Paz', category: 'Comunidade', image: '/images/mensageiros-da-paz (4).jpg', description: 'Voluntariado e ações na comunidade para cultivar uma cultura de paz.' },
];

export default function Projetos({ resume }: { resume: boolean }) {
  return (
    <section className={styles.section} aria-labelledby="projects-heading">
      <div className={styles.heading}>
        <div>
          <span className={styles.eyebrow}>Aprender fazendo</span>
          <h2 id="projects-heading">{resume ? 'Pequenas ações. Grandes descobertas.' : 'Conheça nossas iniciativas'}</h2>
          <p>Educação, cultura e cuidado com o meio ambiente. Descubra o que construímos juntos em Coqueiral.</p>
        </div>
        {resume && <Link className={styles.all} href="/projetos">Todos os projetos <span aria-hidden="true">↗</span></Link>}
      </div>
      <ul className={styles.grid}>
        {(resume ? projects.slice(0, 3) : projects).map((project) => (
          <li key={project.slug}>
            <Link href={`/projetos/${project.slug}`} className={styles.card}>
              <Image src={project.image} alt="" width={600} height={375} sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw" className={styles.image} />
              <div className={styles.body}>
                <span className={styles.category}>{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <span className={styles.more}>Conhecer projeto <span aria-hidden="true">→</span></span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
