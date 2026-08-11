import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import Image from 'next/image';
import Carrocel from '@/components/layout/carrocel/carrocel';
import Box from '@/components/layout/box/box';
import CardEmpresaParceira from '@/components/layout/cardEmpresaParceira/cardEmpresaParceira';
import Link from 'next/link';
import { Metadata } from 'next';
import ShareButton from '@/components/layout/shareButton/shareButton';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Acampa Canoa",
    description:
      "O Acampa Canoa é um acampamento escoteiro para jovens de 15 a 17 anos, de ambos os sexos, do ramo Sênior, organizado e idealizado pela...",
    keywords:
      "cultura, comunidade, impacto social, trabalho voluntário, projetos sociais, meio ambiente, educação, esporte, escoteiro dev, acampa canoa, esporte nautico, velas, caiaque, pesca, tracking",
    authors: [{ name: "19 Grupo Escoteiro Coqueiral" }],
    icons: {
      icon: "/favicon.ico",
    },
    metadataBase: new URL('https://www.19.escoteiroses.org.br/projetos/acampa-canoa'),
    openGraph: {
        title: "Acampa Canoa",
        description:
            "O Acampa Canoa é um acampamento escoteiro para jovens de 15 a 17 anos, de ambos os sexos, do ramo Sênior, organizado e idealizado pela...",
        images: [`${process.env.NEXT_PUBLIC_ROOT_URL}/images/projetos/acampa-canoa/acampa-canoa01.jpg`],
        url: 'www.19.escoteiroses.org.br/projetos/acampa-canoa'
    }
  };
}

export default function Page(){
    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <h1 className={styles.title}>Acampa Canoa</h1>
            <div className={styles.conteiner}>
                <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', padding: 10}}>
                    <ShareButton
                        title={"Acampa Canoa Sênior"}
                        text={"O Acampa Canoa é um projeto socioesportivo para jovens de 15 a 17 anos, de ambos os sexos, escoteiros ou não, organizado e idealizado pela chefia Sênior do 19º Grupo Escoteiro Coqueiral, Coqueiral, Aracruz/ES, que tem a finalidade de aprimorar os jovens em técnicas náuticas como condução de embarcações a remo e pesca."}
                        url={`${process.env.NEXT_PUBLIC_ROOT_URL}/projetos/acampa-canoa/`}
                        imageUrl={`${process.env.NEXT_PUBLIC_ROOT_URL}/images/projetos/acampa-canoa/acampa-canoa01.jpg`}
                    />
                </div>
                <div className={styles.subConteiner}>
                    <Image 
                        alt=""
                        width={970}
                        height={350}
                        src={'/images/projetos/acampa-canoa/acampa-canoa01.jpg'}
                        className={styles.image}
                    />
                    <br />
                    <br />
                    <p className={styles.paragraph}>
                        O Acampa Canoa é uma iniciativa pioneira do 19º Grupo Escoteiro Coqueiral, entidade social, reconhecida como Entidade de Utilidade Pública Municipal e Estadual, Ponto de Cultura, que integra a método educativo não formal do Movimento Escoteiro ao potencial náutico do litoral de Aracruz, Espírito Santo. Em sua terceira edição, o projeto se consolida como um catalisador de transformação social, unindo o esporte capixaba à formação cidadã de jovens entre 14 e 17 anos de diversas regiões do Estado como Aracruz (organização), Linhares, Cachoeiro, Vitória, São Mateus e outras localidades. Através da metodologia "aprender fazendo", o evento promove a transmissão de saberes tradicionais e a prática de modalidades náuticas, como a Pesca Esportiva e Tradicional, Canoa Havaiana e o Surf de Canoa.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        O Acampa Canoa é um acampamento volante que integra Escotismo, comunidade e o Esporte Capixaba. Ao longo de dois dias os jovens se deslocam, hora a pé, hora embarcados, do ponto A ao Ponto B, vivenciando uma experiência imersiva no esporte náutico e na cultura tradicional de Aracruz como Pesca Esportiva e Tradicional, Intercambio Cultural com Povos Originários e Canoa Havaiana. Ao longo do percurso os jovens são integrados ao território Aracruzense como Rio Piraquê-Açu, Praia da Balsa, Praia de Santa Cruz, Praia de Coqueiral, Lagoa de Coqueiral e aldeias Guaranis.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        O projeto culmina em uma competição náutica que acontece no último dia. Atualmente a competição tem se consolidado como uma competição de desempenho em canoas havaianas (OC4), mas pode-se variada em qualquer modalidade a remo ou velas.
                    </p>
                    <br />
                    <Carrocel urlImages={[
                        '/images/projetos/acampa-canoa/acampa-canoa (1).jpeg',
                        '/images/projetos/acampa-canoa/acampa-canoa (1).jpg',
                        '/images/projetos/acampa-canoa/acampa-canoa (2).jpeg',
                        '/images/projetos/acampa-canoa/acampa-canoa (2).jpg',
                        '/images/projetos/acampa-canoa/acampa-canoa (3).jpeg',
                        '/images/projetos/acampa-canoa/acampa-canoa (3).jpg',
                        '/images/projetos/acampa-canoa/acampa-canoa (4).jpg',
                        '/images/projetos/acampa-canoa/acampa-canoa (5).jpg',
                        '/images/projetos/acampa-canoa/acampa-canoa (6).jpg',
                        '/images/projetos/acampa-canoa/acampa-canoa (7).jpg',
                    ]} />
                    <br />

                    <div className={styles.subConteiner}>
                        <h2 className={styles.subTitle}>
                            Objetivos do Acampa Canoa – Ramo Sênior
                        </h2>
                        <p className={styles.paragraph}>
                            1 - Desenvolver habilidades de vida ao ar livre.
                        </p>
                        <p className={styles.paragraph}>
                            2 - Integrar comunidade e escotismo.
                        </p>
                        <p className={styles.paragraph}>
                            3 - Fortalecer o esporte náutico capixaba.
                        </p>
                         <p className={styles.paragraph}>
                            4 - Despertar consciência ambiental e o respeito aos recursos hidricos.
                        </p>
                        <p className={styles.paragraph}>
                            5 - Estimular o trabalho em equipe e a liderança.                    
                        </p>
                        <p className={styles.paragraph}>
                            6 - Proporcionar situações em que os jovens assumam responsabilidades, tomem decisões e aprendam a liderar de forma cooperativa.
                        </p>
                        <p className={styles.paragraph}>
                            7 - Valorizar a prática do Escotismo Náutico.
                        </p>
                        <p className={styles.paragraph}>
                            8 - Incentivar o contato com a canoagem e outras modalidades aquáticas como oportunidade de esporte, saúde mental, lazer, disciplina e superação de desafios.
                        </p>
                        <p className={styles.paragraph}>
                            9 - Criar momentos de integração, convivência saudável e amizade entre os jovens do Ramo Sênior (14,5 a 17 anos).
                        </p>                       
                        <p className={styles.paragraph}>
                            10 - Estimular a superação pessoal e coletiva.
                        </p>
                        <p className={styles.paragraph}>
                            11 - Encorajar os jovens a vencer seus próprios limites, desenvolver resiliência e enfrentar desafios com confiança e segurança.
                        </p>
                        <p className={styles.paragraph}>
                            12 - Proporcionar experiências marcantes que contribuam com a formação do caráter.
                        </p>
                        <p className={styles.paragraph}>
                            13 - Oferecer vivências únicas em contato com a natureza, fortalecendo a identidade e o pertencimento ao movimento escoteiro.
                        </p>
                    </div>

                    <h2 className={styles.subTitle}>Primeira Edição do Acampa Canoa (2025)</h2>
                    <p className={styles.paragraph}>
                        A primeira edição do foi o Acampa Canoa 2025, que aconteceu de 07 à 09/02/2025, reuniu 22 jovens de diferentes grupos escoteiros, de diferentes localidades como Cachoeiro de Itapemirim, Vila Velha, Vitória e Aracruz. E a expectativa para o Acampa Canoa 2026 é aumentar nossa capacidade de infra para atender ao menos 32 jovens, incluindo jovens escoteiros de Linhares.<br/>
                    </p>
                    <br />
                    <h2 className={styles.subTitle}>A Segunda Edição do Acampa Canoa (2026)</h2>
                    <p className={styles.paragraph}>
                        A segunda edição do Acampa Canoa aconteceu de 23 a 25/01/2026, e contou com a participação de jovens escoteiros do Ramo Sênior (15 a 17 anos) de diversos grupos escoteiros do Espírito Santo, totalizando 38 participantes jovem e 25 adultos voluntários distribuidos entre escotistas e equipe de serviço.
                    </p>
                    <br />
                    <iframe 
                        className={styles.video}
                        src="https://www.youtube.com/embed/YLkBr_TdjeM?si=AywYpcNHWKTxTCdZ" 
                        title="YouTube video player" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    >
                    </iframe><br />
                    <p className={styles.paragraph}>Acampa Canoa 1ª Edição (07 à 09/02/2025)</p>
                    <br /><br />

                    <h2 className={styles.subTitle}>Justificativa do Projeto</h2>
                    <p className={styles.paragraph}>
                        O projeto responde à necessidade de conectar a juventude capixaba com a riqueza natural e cultural de seu território. Aracruz, com seu complexo de rios, mar e lagoas, é o cenário ideal para uma vivência que vai além do esporte: é um exercício de pertencimento territorial. O Acampa Canoa atua na salvaguarda de saberes, promovendo o intercâmbio entre atletas profissionais, pescadores atletas/artesanais e a juventude, garantindo que o conhecimento sobre o manejo das águas e as tradições locais seja transmitido entre gerações.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        Além disso, o escotismo é um movimento reconhecido mundialmente pela seriedade, credibilidade e impacto positivo na juventude. Estar ao lado desse projeto é também associar sua marca a um propósito legítimo, com alto potencial de visibilidade regional, digital e institucional — com participações de grupos de diferentes cidades e ampla divulgação nas redes sociais dos escoteiros e dos participantes, que registram e compartilham intensamente essas experiências.
                    </p>
                </div>
                <div className={styles.subConteiner}>
                    <h2 className={styles.subTitle}>O Acampa Canoa 2025</h2>
                    <p className={styles.paragraph}>
                        Percuso da competição náutica de 2025, realizado em caiaques duplos. Aproximadamente 5 km de percurso, com saída da Praia da Balsa.
                    </p>
                    <Image
                        src={'/images/projetos/acampa-canoa/mapacompeticao2025.png'}
                        className={styles.image}
                        width={970}
                        height={400}
                        alt='praia da balsa/Rio Piraque-Açu'
                    />
                    <br />

                    <h2 className={styles.subTitle}>O Acampa Canoa 2026</h2>
                    <p className={styles.paragraph}>
                        Percuso da competição náutica de 2026, realizado em canoas havaianas. Aproximadamente 2.2 km de percurso, com saída da Praia da Aldeia Temática.
                    </p>
                    <Image
                        src={'/images/projetos/acampa-canoa/mapacompeticao2026.png'}
                        className={styles.image}
                        width={970}
                        height={400}
                        alt='aldeia temática/Rio Piraque-Açu'
                    />
                    <br />

                    <p className={styles.paragraph}>
                        No domingo pela manhã acontece uma remada na lagoa de Coqueiral até a barragem da ETA (estação de tratamento de água) de Coqueiral. Lá eles aconteceu as oficinas de pesca com temas montagem de vara, arremesso com molinete, pesca com tarrafa e pesca com armadilha em boia.
                    </p>
                    <Image
                        src={'/images/projetos/acampa-canoa/mapalagoa.png'}
                        className={styles.image}
                        width={970}
                        height={400}
                        alt='lagoa coqueiral'
                    />
                </div>
                <div className={styles.subConteiner}>
                    <h2 className={styles.subTitle}>Bolsa Atleta</h2>
                    <p className={styles.paragraph}>
                        O Bolsa Atleta são vagas gratuitas disponibilizadas para jovens <b>não</b> escoteiros de (15 a 17 anos), residentes em Aracruz, com o objetivo de incentivar o esporte náutico e a canoagem. As bolsas são concedidas com base em critérios ordem de inscrição, 
                    </p>
                    <p className={styles.paragraph}>
                        O Bolsa Atleta é financiado por patrocinadores na categoria <b>Patrocinador Padrinho</b>.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        Leia o regulamento do Bolsa Atleta no link: 
                        <a className={styles.link} href='https://docs.google.com/document/d/1trdwb0WwgKGnnsIrFKKTw88zOClcqzqI/edit?usp=sharing&ouid=116004798520201029660&rtpof=true&sd=true' target='_blank'>Regulamento da Competição Náutica</a>
                    </p>
                </div>

                <div className={styles.subConteiner}>
                    <h2 className={styles.subTitle}>Seja um patrocinado</h2>
                    <h2 className={styles.subTitle}>Plano de Visibilidade e Retorno de Marca</h2>
                    <p className={styles.paragraph}><br />
                        O projeto oferece amplos canais de visibilidade para patrocinadores: <br />
                        •	Inserção de logomarca nas camisetas oficiais do evento, bonés, pulseiras e materiais esportivos; <br />
                        •	Exposição no site institucional do Grupo Escoteiro por 12 meses; <br />
                        •	Destaque permanente na área “Apoiadores” do Instagram oficial; <br />
                        •	Post exclusivo agradecendo o patrocinador, com foto institucional da empresa para reforço de imagem; <br />
                        •	Registro fotográfico e audiovisual com referência à marca apoiadora nos materiais oficiais do evento; <br />
                        •   Certificado digital de agradecimento e reconhecimento pela parceria e apoio ao projeto social; <br />
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        Na categoria de <b>Patrocinador Padrinho</b> seu patrocínio permitirá a abertura de até 8 bolsas para jovens não escoteiros de Aracruz, com idade entre 15 e 17 anos, a participarem da Competição Náutica com oferta de canoas, capitão/leme, equipamentos e kit do evento, além de cobrir custos materiais institucionais do projeto.
                    </p>
                    <br />

                    <a href="https://www.instagram.com/19escoqueiral/" className={styles.link} target='_blank'>
                        Entre em Contato e saiba mais como apoiar esse projeto!
                    </a>
                </div>
                <div className={styles.subConteiner}>
                    <h2 
                        className='textLarge textResponsive' 
                        style={{color: 'var(--azul-escuro)', textAlign: 'center'}}
                    >
                        Empresas que apoiam esse Projeto
                    </h2>
                    <div style={{
                        display: 'flex', 
                        gap: 20, 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                    }}>
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
                        <Box customClass={['margin', 'flexRowWrap', 'width300']}>
                            <CardEmpresaParceira 
                                nameEmpresa='Sicredi' 
                                logoURL='/logo/empresas-parceira/logo-sicredi.webp'
                                linkSiteEmpresa={'https://www.sicredi.com.br/coop/interestados/'}
                            />
                        </Box>
                        <Box customClass={['margin', 'flexRowWrap', 'width300']}>
                            <CardEmpresaParceira 
                                nameEmpresa='Weld Pro' 
                                logoURL='/logo/empresas-parceira/logo-weld.png'
                                linkSiteEmpresa={'https://www.linkedin.com/company/weldpro-comercio/'}
                            />
                        </Box>
                    </div>
                </div>
            </div>
            <div style={{
                display: 'flex', 
                gap: 20, 
                justifyContent: 'center', 
                alignItems: 'center',                
                marginTop: 40,
                flexWrap: 'wrap',
            }}>
                <Link 
                    href={'https://photos.app.goo.gl/7J37NqUfdenihuLs7'} 
                    target='_blank'
                    style={{
                        border: '1px solid var(--cinza-escuro)', 
                        borderRadius: '8px',
                        padding: 10,
                    }}  
                >
                    <h2 
                        className={styles.subtitle}
                        style={{textAlign: 'center'}}
                    >
                        Veja nosso álbum de fotos - 2025.
                    </h2>                    
                    <Image 
                        alt='esporte, escoteiros, aracruz, coqueiral, nautico, canoa, velas, caiaque, rio, mar, lagoa'
                        src={'/images/projetos/acampa-canoa/acampa-canoa (3).jpg'}
                        width={300}
                        height={200}
                        style={{
                            objectFit: 'contain', 
                            height: 'auto', 
                            width: '100%', 
                            borderRadius: 8
                        }}
                    />
                </Link>
                <Link 
                    href={'https://photos.app.goo.gl/m59ZTaMkWQUzwWap9'} 
                    target='_blank'
                    style={{
                        border: '1px solid var(--cinza-escuro)', 
                        borderRadius: '8px',
                        padding: 10,
                    }} 
                >
                    <h2 
                        className={styles.subtitle}
                        style={{textAlign: 'center'}}
                    >
                        Veja nosso álbum de fotos - 2026.
                    </h2>                    
                    <Image 
                        alt='esporte, escoteiros, aracruz, coqueiral, nautico, canoa, velas, caiaque, rio, mar, lagoa'
                        src={'/images/projetos/acampa-canoa/acampa.png'}
                        width={300}
                        height={200}
                        style={{
                            objectFit: 'contain', 
                            height: 'auto', 
                            width: '100%', 
                            borderRadius: 8
                        }}
                    />
                </Link>
            </div>
        </Section>
    )
}