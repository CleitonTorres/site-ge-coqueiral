import Botton from '@/components/form/botton/botton';
import Banner from '@/components/layout/banner/banner';
import Box from '@/components/layout/box/box';
import Card from '@/components/layout/card/card';
import Section from '@/components/layout/sections/section';
import type { Metadata } from 'next'
import Image from 'next/image';
 
export const metadata: Metadata = {
  title: '19º/ES Grupo Escoteiro Coqueiral',
}

export default function Home() {
  return (
    <>
      <Banner 
        title='19º/ES Grupo Escoteiro Coqueiral.' 
        subTitle='Educação para a vida'
        paragraph='Venha fazer parte deste Movimento que já conta com mais de 57 milhões de pessoas em todo o mundo.'
        imageURL='/logo/logo.png'
        videoURL='/videos/videoinst.mp4'
      />

      {/* estatisticas */}
      <Section customClass={['fullWidth', 'flexRowCenter']}>
        <Box customClass={['flexCollCenter']}>
          <Image 
            alt='imagem seja escoteiro'
            width={181}
            height={181}
            src={'/icons/40.png'}
          />
          <span style={{fontSize: 32, fontWeight: 600}}>66.787</span>
          <span style={{fontWeight: 300}}>jovens atendidos no Brasil</span>
        </Box>
        <Box customClass={['flexCollCenter']}>
          <Image 
            alt='imagem seja escoteiro'
            width={181}
            height={181}
            src={'/icons/41.png'}
          />
          <span style={{fontSize: 32, fontWeight: 600}}>25.408</span>
          <span style={{fontWeight: 300}}>voluntários no Brasil</span>
        </Box>
        <Box customClass={['flexCollCenter']}>
          <Image 
            alt='imagem seja escoteiro'
            width={181}
            height={181}
            src={'/icons/42.png'}
          />
          <span style={{fontSize: 32, fontWeight: 600}}>1.416</span>
          <span style={{fontWeight: 300}}>unidades escoteiras no Brasil</span>
        </Box>
        <Box customClass={['flexCollCenter']}>
          <Image 
            alt='imagem seja escoteiro'
            width={181}
            height={181}
            src={'/icons/43.png'}
          />
          <span style={{fontSize: 32, fontWeight: 600}}>7.536.668</span>
          <span style={{fontWeight: 300}}>horas de voluntariado em 2024 no Brasil</span>
        </Box>
      </Section>

      {/* destaques */}
      <Section customClass={['fullWidth']}>
        <h1 className='textLarge' style={{color: 'var(--azul-escuro)'}}>Destaques</h1>
        <Box customClass={['margin', 'flexRowWrap']}>
          <Image 
            alt='imagem seja escoteiro'
            width={408}
            height={178}
            src={'/images/ePrancheta-1-1.png'}
            style={{objectFit: 'contain'}}
          />
          <Image 
            alt='imagem seja escoteiro'
            width={408}
            height={178}
            src={'/images/espacoseguro.png'}
            style={{objectFit: 'contain'}}
          />
        </Box>
      </Section>
    
      {/* notícias */}
      <Section customClass={['fullWidth']}>
        <h1 className='textLarge' style={{color: 'var(--azul-escuro)'}}>Notícias</h1>
        <Box customClass={['fullWidth', 'flexRowWrap']}>
          <Card
            textData='07 de dezembro de 2024'
            title='Última atividade do ano | início das férias'
            paragraph='Em fim estamos chegando em mais um final de ciclo e que ciclo em! Este ano foi cheio de atividades'
            imageURL='/images/banner-ferias.webp'
          />
          <Card
            textData='07 de dezembro de 2024'
            title='Última atividade do ano | início das férias'
            paragraph='Em fim estamos chegando em mais um final de ciclo e que ciclo em! Este ano foi cheio de atividades'
            imageURL='/images/banner-ferias.webp'
          />
          <Card
            textData='07 de dezembro de 2024'
            title='Última atividade do ano | início das férias'
            paragraph='Em fim estamos chegando em mais um final de ciclo e que ciclo em! Este ano foi cheio de atividades'
            imageURL='/images/banner-ferias.webp'
          />
        </Box>
        <Botton
          title='VER TODAS'
        />
      </Section>

      <Section customClass={['fullWidth', 'flexCollTop']}>
        <h1 
          style={{fontSize: '8vw', fontWeight: 300, width: '100%', margin: '10px'}}
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
    </>
  );
}
