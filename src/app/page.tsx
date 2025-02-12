'use client'
import { Context } from '@/components/context/context';
import Botton from '@/components/form/botton/botton';
import Banner from '@/components/layout/banner/banner';
import Box from '@/components/layout/box/box';
import Card from '@/components/layout/card/card';
import CardEmpresaParceira from '@/components/layout/cardEmpresaParceira/cardEmpresaParceira';
import InstagramFeed from '@/components/layout/feeds/feeds';
import Section from '@/components/layout/sections/section';
import Image from 'next/image';
import { useContext } from 'react';
import { v4 } from 'uuid';

function Home() {
  const context = useContext(Context);

  return (
    <>
      <Banner 
        title='19º/ES Grupo Escoteiro Coqueiral.' 
        subTitle='Educação para a vida'
        paragraph='Venha fazer parte deste Movimento que já conta com mais de 57 milhões de pessoas em todo o mundo.'
        imageURL='/logo/logo.png'
        videoURL='/videos/banner.webm'
      />

      {/* estatisticas */}
      <Section customClass={['fullWidth', 'flexRowCenter', 'minWidth']}> 
        <Box customClass={['flexCollCenter']}>
          <Image 
            alt='imagem seja escoteiro'
            width={181}
            height={181}
            src={'/icons/40.png'}
          />
          <span style={{fontSize: 32, fontWeight: 600}}>66.787</span>
          <span style={{fontWeight: 300, width: 200, textAlign: 'center', marginLeft: '20px',  marginRight: '20px'}}>jovens atendidos no Brasil</span>
        </Box>
        <Box customClass={['flexCollCenter']}>
          <Image 
            alt='imagem seja escoteiro'
            width={181}
            height={181}
            src={'/icons/41.png'}
          />
          <span style={{fontSize: 32, fontWeight: 600}}>25.408</span>
          <span style={{fontWeight: 300, width: 200, textAlign: 'center', marginLeft: '20px',  marginRight: '20px'}}>voluntários no Brasil</span>
        </Box>
        <Box customClass={['flexCollCenter']}>
          <Image 
            alt='imagem seja escoteiro'
            width={181}
            height={181}
            src={'/icons/42.png'}
          />
          <span style={{fontSize: 32, fontWeight: 600}}>1.416</span>
          <span style={{fontWeight: 300, width: 200, textAlign: 'center', marginLeft: '20px',  marginRight: '20px'}}>unidades escoteiras no Brasil</span>
        </Box>
        <Box customClass={['flexCollCenter']}>
          <Image 
            alt='imagem seja escoteiro'
            width={181}
            height={181}
            src={'/icons/43.png'}
          />
          <span style={{fontSize: 32, fontWeight: 600}}>7.536.668</span>
          <span style={{fontWeight: 300, width: 200, textAlign: 'center', marginLeft: '20px',  marginRight: '20px'}}>horas de voluntariado em 2024 no Brasil</span>
        </Box>
      </Section>

      {/* destaques */}
      <Section customClass={['fullWidth', 'minWidth']}>
        <h1 className='textLarge' style={{color: 'var(--azul-escuro)'}}>Destaques</h1>
        <Box customClass={['margin', 'flexRowWrap']}>
          <a 
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
          </a>
          <a 
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
              left: '50%', 
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
              fontSize: 12,
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
          </a>
          <a 
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
          </a>
        </Box>
        <Botton
          title='VER TODOS'
          action={()=>window.open('/eventos', '_self')}
        />
      </Section>
    
      {/* notícias */}
      <Section customClass={['fullWidth']}>
        <h1 className='textLarge' style={{color: 'var(--azul-escuro)'}}>Notícias</h1>
        
        <Box customClass={['fullWidth', 'flexRowTopWrap']}>
          {context?.dataNews?.filter(news=> !news.destaque).map((news)=>{            
            return(
              <Card
                key={v4()}
                dataNews={{
                  date: news.date || "",
                  title:  news.title || "",
                  paragraph:  news.paragraph || "",
                  imageID: news.imageID,
                  _id: news._id,
                  linkMaps: '',
                  keywords:[''],
                  evento: false,
                  destaque: news.destaque
                }}           
              />
            )
          })

          }
        </Box>
        <Botton
          title='VER TODAS'
          action={()=>window.open('/noticias', '_self')}
        />
      </Section>

      {/* empresas parceiras */}
      <Section customClass={['fullWidth', 'flexCollTop']}>
        <h1 
          className='textLarge textResponsive' 
          style={{color: 'var(--azul-escuro)', textAlign: 'center'}}
        >
          Empresas que apoiam o escotismo em Coqueiral
        </h1>
        <Box customClass={['margin', 'flexRowWrap']}>
          <CardEmpresaParceira 
            nameEmpresa='Paralegal Soluções' 
            logoURL='/logo/empresas-parceira/paraLegal.png'
            linkSiteEmpresa={'https://www.paralegalsolucoes.com.br/'}
          />
        </Box>
        <Box customClass={['margin', 'flexRowWrap']}>
          <CardEmpresaParceira 
            nameEmpresa='Vaa Canoeiros' 
            logoURL='/logo/empresas-parceira/vaaCanoneiros.png'
            linkSiteEmpresa={'https://www.instagram.com/vaacanoeiros.cpp/#'}
          />
        </Box>
        <Box customClass={['margin', 'flexRowWrap']}>
          <CardEmpresaParceira 
            nameEmpresa='Radical Oficial' 
            logoURL='/logo/empresas-parceira/logoRadical.png'
            linkSiteEmpresa={'https://radicaloficial.com.br/'}
          />
        </Box>
      </Section>

      <Section customClass={['fullWidth', 'flexCollTop']}>
        <h1 
          style={{fontSize: '8vw', fontWeight: 300, width: '100%', marginLeft: '20px'}}
        >
          Não há ensino que se compare ao exemplo.
        </h1>
        <Image 
          alt='imagem seja escoteiro'
          width={340}
          height={108}
          src={'/icons/home-phrase.png'}
          style={{marginLeft: 300, objectFit: 'contain'}}
        />
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