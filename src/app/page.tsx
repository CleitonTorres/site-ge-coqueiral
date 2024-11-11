import Banner from '@/components/layout/banner/banner';
import Section from '@/components/layout/sections/section';
import type { Metadata } from 'next'
 
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
      />
      <Section>
        <h1 className='textLarge colorWhite'>Destaques</h1>
      </Section>
    </>
  );
}
