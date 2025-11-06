'use server'
import Banner from '@/components/layout/banner/banner';
import Box from '@/components/layout/box/box';
import CardEmpresaParceira from '@/components/layout/cardEmpresaParceira/cardEmpresaParceira';
import InstagramFeed from '@/components/layout/feeds/feeds';
import NewsHomeSection from '@/components/layout/newsHomeSection/newsHomeSection';
import Projetos from '@/components/layout/projetos/projetos';
import Section from '@/components/layout/sections/section';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

// Configurar SEO dinâmico
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "19º ES Grupo Escoteiro Coqueiral",
    description:
      "O 19º Grupo Escoteiro Coqueiral (19º GE Coqueiral), é filiado à União dos Escoteiros do Brasil (UEB) ...",
    keywords:
      "escoteiros, ueb, capixaba, coqueiral, aracruz, litoral, praia mais bonita do es, educação não formal, cultura, comunidade, impacto social, trabalho voluntário, projetos sociais, meio ambiente, educação, esporte, escoteiro dev, acampa canoa, escoteiros pela biodiversidade, dia de semear paz, pipa escoteira",
    authors: [{ name: "19 Grupo Escoteiro Coqueiral" }],
    icons: {
      icon: "/favicon.ico",
    },
    metadataBase: new URL("https://19.escoteiroses.org.br"),
    openGraph: {
          title: "19º ES Grupo Escoteiro Coqueiral",
          description: "O 19º Grupo Escoteiro Coqueiral (19º GE Coqueiral), é filiado à União dos Escoteiros do Brasil (UEB) ...",
          images: [],
          url: 'https://19.escoteiroses.org.br/'
    }
  };
}

function Home() {
  return (
    <>
      <Banner 
        title='19º ES Grupo Escoteiro Coqueiral.' 
        subTitle='Educação para a vida'
        paragraph='Venha fazer parte deste Movimento que já conta com mais de 57 milhões de pessoas em todo o mundo.'
        imageURL='/logo/logo.png'
        videoURL='/videos/banner.webm'
      />

      {/* estatisticas */}
      <Section customClass={['fullWidth', 'flexRowCenter', 'minWidth']}> 
        <Box customClass={['flexColl', 'width300']}> 
          <Image 
            alt='imagem seja escoteiro'
            width={181}
            height={181}
            src={'/icons/40.png'}
          />
          <span style={{fontSize: 32, fontWeight: 600}}>66.787</span>
          <span style={{fontWeight: 300, textAlign: 'center'}}>jovens atendidos no Brasil</span>
        </Box>
        <Box customClass={['flexColl', 'width300']}>
          <Image 
            alt='imagem seja escoteiro'
            width={181}
            height={181}
            src={'/icons/41.png'}
          />
          <span style={{fontSize: 32, fontWeight: 600}}>25.408</span>
          <span style={{fontWeight: 300, textAlign: 'center'}}>voluntários no Brasil</span>
        </Box>
        <Box customClass={['flexColl', 'width300']}>
          <Image 
            alt='imagem seja escoteiro'
            width={181}
            height={181}
            src={'/icons/42.png'}
          />
          <span style={{fontSize: 32, fontWeight: 600}}>1.416</span>
          <span style={{fontWeight: 300, textAlign: 'center'}}>unidades escoteiras no Brasil</span>
        </Box>
        <Box customClass={['flexColl', 'width300']}>
          <Image 
            alt='imagem seja escoteiro'
            width={181}
            height={181}
            src={'/icons/43.png'}
          />
          <span style={{fontSize: 32, fontWeight: 600}}>7.536.668</span>
          <span style={{fontWeight: 300, textAlign: 'center'}}>horas de voluntariado em 2024 no Brasil</span>
        </Box>
      </Section>

      {/* Projetos */}
      <Projetos resume/>

      {/* destaques */}
      <Section customClass={['fullWidth', 'minWidth']}>
        <h1 className='textLarge' style={{color: 'var(--azul-escuro)'}}>Destaques</h1>
        <Box customClass={['margin', 'flexRowWrap']}>
          <Link 
            href='/seja-escoteiro' 
            target='_self' 
            style={{position: 'relative'}}
            className='destaquesImg'
          >
            <Image 
              alt='imagem seja escoteiro'
              width={408}
              height={178}
              src={'/images/ePrancheta-1-1.png'}
              style={{objectFit: 'contain'}}
              className='destaquesImg'
            />
          </Link>
          <Link 
            href='/empresa-parceira' 
            target='_self' 
            style={{position: 'relative'}} 
            className='destaquesImg'
          >
            <Image 
              alt='imagem seja escoteiro'
              width={408}
              height={135}
              src={'/images/empresaParceira.jpg'}
              className='destaquesImg'
            />
            <span style={{
              position: 'absolute', 
              left: '53%', 
              top: '40%',
              transform: 'translate(-50%, -50%)',
              fontSize: 24,
              textWrap: 'nowrap',
              color: 'var(--white)',
              fontWeight: 600
            }}>Seja uma Empresa Parceira</span>
            <span style={{
              position: 'absolute', 
              left: '50%', 
              top: '60%',
              transform: 'translate(-50%, -50%)',
              fontSize: 10,
              color: 'var(--white)',
              fontWeight: 600
            }}>saiba como</span>
            <Image 
              alt=''
              width={26}
              height={26}
              src={'https://upload.wikimedia.org/wikipedia/commons/3/3c/Fleur-de-lis-fill.svg'}
              style={{
                position: 'absolute', 
                right: 0, 
                top: '60%',
                transform: 'translate(-50%, 0%)',
                backgroundColor:'var(--white)',
                borderRadius: '50%',
                padding: 3
              }}
            />
          </Link>
          <Link 
            href='/espacos-seguros' 
            target='_self' 
            style={{position: 'relative'}}
            className='destaquesImg'
          >
            <Image 
              alt='imagem seja escoteiro'
              width={408}
              height={178}
              src={'/images/espacoseguro.png'}
              style={{objectFit: 'contain'}}
              className='destaquesImg'
            />
          </Link>
        </Box>
        <Link href='/eventos' target='_self'></Link>
      </Section>
            
      {/* notícias */}
      <NewsHomeSection />

      {/* empresas parceiras */}
      <Section customClass={['fullWidth', 'flexCollTop']}>
        <h1 
          className='textLarge textResponsive' 
          style={{color: 'var(--azul-escuro)', textAlign: 'center'}}
        >
          Empresas que apoiam o escotismo em Coqueiral
        </h1>
        <Section customClass={['fullWidth',  'flexRowCenter', 'minWidth']}>
          <Box customClass={['margin', 'flexRowWrap', 'width300']}>
            <CardEmpresaParceira 
              nameEmpresa='Paralegal Soluções' 
              logoURL='/logo/empresas-parceira/paraLegal.png'
              linkSiteEmpresa={'https://www.paralegalsolucoes.com.br/'}
            />
          </Box>
          <Box customClass={['margin', 'flexRowWrap', 'width300']}>
            <CardEmpresaParceira 
              nameEmpresa='Vaa Canoeiros' 
              logoURL='/logo/empresas-parceira/vaaCanoneiros.png'
              linkSiteEmpresa={'https://www.instagram.com/vaacanoeiros/'}
            />
          </Box>
          <Box customClass={['margin', 'flexRowWrap', 'width300']}>
            <CardEmpresaParceira 
              nameEmpresa='Radical Oficial' 
              logoURL='/logo/empresas-parceira/logoRadical.png'
              linkSiteEmpresa={'https://radicaloficial.com.br/'}
            />
          </Box>
          <Box customClass={['margin', 'flexRowWrap', 'width300']}>
              <CardEmpresaParceira 
                  nameEmpresa='Club da Orla'
                  logoURL='/logo/empresas-parceira/logoClub.jpg'
                  linkSiteEmpresa='https://www.instagram.com/clubedaorla/'
              />
          </Box>
        </Section>
      </Section>

      <Section customClass={['fullWidth', 'flexCollTop']}>
        <div className='boxFraseBP'>
          <h1 
            style={{fontSize: '4em', fontWeight: 300, width: '100%', textAlign: 'center'}}
          >
            Não há ensino que se compare ao exemplo.
          </h1>
          <Image 
            alt='assinatura baden powell'
            width={340}
            height={108}
            src={'/icons/home-phrase.png'}
            style={{objectFit: 'contain'}}
          />
        </div>
        <Image 
          alt='figura de um escoteiro'
          width={300}
          height={300}
          src={'/icons/scout.png'}
          style={{position: 'absolute', right: 0, width: '30vw', objectFit: 'contain', maxWidth: 296 }}
        />
      </Section>

      {/* feeds do insta */}
        <Section customClass={['fullWidth', 'flexCollTop']}>
            <InstagramFeed limit={9} carrocel/>
        </Section>
    </>
  );
}

export default Home;