import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Banner from '@/components/layout/banner/banner';
import Projetos from '@/components/layout/projetos/projetos';
import NewsHomeSection from '@/components/layout/newsHomeSection/newsHomeSection';
import InstagramFeed from '@/components/layout/feeds/feeds';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: '19º ES Grupo Escoteiro Coqueiral',
  description: 'Educação para a vida em Coqueiral, Aracruz. Conheça o 19º Grupo Escoteiro Coqueiral, nossos projetos e como participar.',
  metadataBase: new URL('https://19.escoteiroses.org.br'),
  openGraph: { title: '19º ES Grupo Escoteiro Coqueiral', description: 'Aventura, amizade e educação para a vida.', url: 'https://19.escoteiroses.org.br/', images: ['/images/projetos/acampa-canoa/acampa-canoa01.jpg'] },
};

const partners = [
  { name: 'Paralegal Soluções', logo: 'paraLegal.png', url: 'https://www.paralegalsolucoes.com.br/' },
  { name: 'Vaa Canoeiros', logo: 'vaaCanoneiros.png', url: 'https://www.instagram.com/vaacanoeiros/' },
  { name: 'Radical Oficial', logo: 'logoRadical.png', url: 'https://radicaloficial.com.br/' },
  { name: 'Club da Orla', logo: 'logoClub.jpg', url: 'https://www.instagram.com/clubedaorla/' },
];

const stats = [
  ['66.787', 'jovens atendidos', '40.png'],
  ['25.408', 'voluntários', '41.png'],
  ['1.416', 'unidades escoteiras', '42.png'],
  ['7.536.668', 'horas de voluntariado em 2024', '43.png'],
];

export default function Home() {
  return (
    <div className={styles.home}>
      <Banner title="Aventura que ensina. Amizades para a vida." subTitle="19º ES Grupo Escoteiro Coqueiral" paragraph="Na natureza e na comunidade, cada descoberta é uma oportunidade de crescer. Venha viver o escotismo com a gente." videoURL="/videos/banner.webm" imageURL="/logo/logo.png" />
      <section className={styles.intro} aria-labelledby="intro-heading">
        <div><span className={styles.eyebrow}>Educação para a vida</span><h2 id="intro-heading">Um mundo de descobertas começa aqui.</h2></div>
        <div><p>Somos parte de um movimento que reúne jovens e voluntários para aprender fazendo, cuidar do próximo e construir um mundo melhor.</p><Link href="/coqueiral">Conheça o nosso grupo <span aria-hidden="true">→</span></Link></div>
      </section>
      <section className={styles.stats} aria-label="O movimento escoteiro no Brasil">
        <div className={styles.statsInner}>
          {stats.map(([value, label, icon]) => <div className={styles.stat} key={icon}><Image src={`/icons/${icon}`} width={64} height={64} alt="" /><strong>{value}</strong><span>{label}</span></div>)}
        </div>
        <p>O movimento escoteiro no Brasil</p>
      </section>
      <Projetos resume />
      <section className={styles.opportunities} aria-labelledby="opportunities-heading">
        <div className={styles.sectionHeading}><span className={styles.eyebrow}>Encontre seu caminho</span><h2 id="opportunities-heading">O escotismo também é para você.</h2></div>
        <div className={styles.opportunityGrid}>
          <Link href="/seja-escoteiro" className={styles.opportunity}><span className={styles.number}>01</span><h3>Venha ser escoteiro</h3><p>Descubra como participar do grupo, como jovem ou voluntário.</p><span className={styles.action}>Quero participar →</span></Link>
          <Link href="/empresa-parceira" className={styles.opportunity}><span className={styles.number}>02</span><h3>Apoie novas histórias</h3><p>Sua empresa pode contribuir com a educação de crianças e jovens.</p><span className={styles.action}>Seja uma empresa parceira →</span></Link>
          <Link href="/espacos-seguros" className={styles.opportunity}><span className={styles.number}>03</span><h3>Cuidado em cada atividade</h3><p>Conheça nosso compromisso com espaços seguros e acolhedores.</p><span className={styles.action}>Conheça os espaços seguros →</span></Link>
        </div>
      </section>
      <div className={styles.news}><NewsHomeSection apenasEventos /><NewsHomeSection /></div>
      <section className={styles.partners} aria-labelledby="partners-heading">
        <span className={styles.eyebrow}>Uma rede que faz a diferença</span><h2 id="partners-heading">Quem apoia o escotismo em Coqueiral</h2>
        <ul>{partners.map(partner => <li key={partner.name}><a href={partner.url} target="_blank" rel="noopener noreferrer" aria-label={`${partner.name} (abre em nova aba)`}><Image src={`/logo/empresas-parceira/${partner.logo}`} width={180} height={100} alt={partner.name} /></a></li>)}</ul>
      </section>
      <section className={styles.quote} aria-label="Uma inspiração para o nosso trabalho">
        <blockquote>“Não há ensino que se compare ao exemplo.”<cite>Baden-Powell</cite></blockquote>
        <Image src="/icons/scout.png" alt="" width={220} height={220} />
      </section>
      <section className={styles.instagram} aria-label="Acompanhe o grupo no Instagram">
        <InstagramFeed limit={9} carrocel />
      </section>
    </div>
  );
}
