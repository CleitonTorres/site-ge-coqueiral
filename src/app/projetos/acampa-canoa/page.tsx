import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import Image from 'next/image';
import Carrocel from '@/components/layout/carrocel/carrocel';
import Box from '@/components/layout/box/box';
import CardEmpresaParceira from '@/components/layout/cardEmpresaParceira/cardEmpresaParceira';
import Link from 'next/link';
import { Metadata } from 'next';

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
        images: [],
        url: 'www.19.escoteiroses.org.br/projetos/acampa-canoa'
    }
  };
}

export default function Page(){
    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <h1 className={styles.title}>Acampa Canoa</h1>
            <div className={styles.conteiner}>
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
                        O Acampa Canoa é um acampamento escoteiro para jovens de 15 a 17 anos, de ambos os sexos, do ramo Sênior, organizado e idealizado pela chefia Sênior do 19º Grupo Escoteiro Coqueiral, Coqueiral, Aracruz/ES, que tem a finalidade de aprimorar os jovens em técnicas náuticas como condução de embarcações a remo e pesca. A 2ª Edição do Acampa Canoa que irá acontecer em 23 a 25/01/2026.
                    </p>
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
                    <ol>
                        <ul className={styles.subTitle}>
                            Objetivos do Acampa Canoa – Ramo Sênior
                        </ul>
                        <li className={styles.paragraph}>
                            Desenvolver habilidades de vida ao ar livre.
                        </li>
                        <li className={styles.paragraph}>
                            Promover a prática de técnicas de pernoite ao relento, orientação e segurança em atividades aquáticas, condução de embarcações a remo e pesca.
                        </li>
                        <li className={styles.paragraph}>
                            Estimular o trabalho em equipe e a liderança.                    
                        </li>
                        <li className={styles.paragraph}>
                            Proporcionar situações em que os jovens assumam responsabilidades, tomem decisões e aprendam a liderar de forma cooperativa.
                        </li>
                        <li className={styles.paragraph}>
                            Valorizar a prática do Escotismo Náutico.
                        </li>
                        <li className={styles.paragraph}>
                            Incentivar o contato com a canoagem e outras modalidades aquáticas como oportunidade de lazer, disciplina e superação de desafios.
                        </li>
                        <li className={styles.paragraph}>
                            Fortalecer o espírito de fraternidade escoteira.
                        </li>
                        <li className={styles.paragraph}>
                            Criar momentos de integração, convivência saudável e amizade entre os jovens do Ramo Sênior (14,5 a 17 anos).
                        </li>
                        <li className={styles.paragraph}>
                            Despertar consciência ambiental.
                        </li>
                        <li className={styles.paragraph}>
                            Estimular o cuidado com os rios, lagoas e áreas naturais utilizadas, reforçando atitudes de preservação e respeito ao meio ambiente.
                        </li>
                        <li className={styles.paragraph}>
                            Estimular a superação pessoal e coletiva.
                        </li>
                        <li className={styles.paragraph}>
                            Encorajar os jovens a vencer seus próprios limites, desenvolver resiliência e enfrentar desafios com confiança e segurança.
                        </li>
                        <li className={styles.paragraph}>
                            Proporcionar experiências marcantes que contribuam com a formação do caráter.
                        </li>
                        <li className={styles.paragraph}>
                            Oferecer vivências únicas em contato com a natureza, fortalecendo a identidade e o pertencimento ao movimento escoteiro.
                        </li>
                    </ol>
                    <br />
                    <p className={styles.paragraph}>
                        A primeira edição do foi o Acampa Canoa 2025, que aconteceu de 07 à 09/02/2025, reuniu 22 jovens de diferentes grupos escoteiros, de diferentes localidades como Cachoeiro de Itapemirim, Vila Velha, Vitória e Aracruz. E a expectativa para o Acampa Canoa 2026 é aumentar nossa capacidade de infra para atender ao menos 32 jovens, incluindo jovens escoteiros de Linhares.<br/>
                        Não podemos deixar de ressalvar que já contamos com o apoio do: <br/>
                        - Capitania dos Portos do Espírito Santo.
                        - Corpo de Bombeiros ES com a segurança. <br />
                        - <Link href={'https://www.instagram.com/vaacanoeiros/'} target='_blank' style={{fontWeight: 500}}> Equipe VAA Canoeiros</Link> e <Link href={'https://radicaloficial.com.br/'} target='_blank' style={{fontWeight: 500}}>Equipe Radical Oficial</Link> com as oficinas e equipamentos náuticos,<br />
                        - Com disponibilização do local para pernoite temos o <Link href={'https://www.instagram.com/clubedaorla/'} target='_blank' style={{fontWeight: 500}}>Club da Orla (Coqueiral/ES)</Link> e Secretária de Educação Municipal (EMEF Coqueiral). <br />
                        - Equipes de chefes escoteiros do 19º Grupo Escoteiro Coqueiral na coordenação do evento.
                    </p>
                    <br />
                    <iframe 
                        width="560" 
                        height="315" 
                        src="https://www.youtube.com/embed/YLkBr_TdjeM?si=AywYpcNHWKTxTCdZ" 
                        title="YouTube video player" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    >
                    </iframe><br />
                    <p className={styles.paragraph}>Acampa Canoa 1ª Edição (07 à 09/02/2025)</p>
                    <br /><br />

                    <h2 className={styles.subTitle}>Justificativa do Projeto</h2>
                    <p className={styles.paragraph}>
                        O Acampa Canoa nasceu a partir de uma demanda real dos jovens escoteiros do Espírito Santo, que manifestaram o desejo de vivenciar experiências práticas relacionadas à náutica — uma área pouco explorada dentro do escotismo capixaba, apesar do enorme potencial natural da nossa região.
                    </p>
                    <p className={styles.paragraph}>
                        Vivemos cercados por rios, mar e lagoas, mas muitos jovens nunca tiveram a oportunidade de aprender técnicas seguras de navegação, pesca, sobrevivência aquática e trabalho em equipe em ambientes naturais. Esse projeto responde a essa lacuna, oferecendo uma vivência educativa completa, que vai muito além do lazer: forma caráter, disciplina, resiliência e senso de responsabilidade ambiental e comunitária.
                    </p>
                    <p className={styles.paragraph}>
                        Ao apoiar este evento, sua empresa não estará apenas vinculando sua marca a um momento de aventura. Ela estará investindo diretamente na formação de jovens líderes, que aprendem na prática valores como cooperação, respeito, superação de desafios e cuidado com o meio ambiente — pilares cada vez mais valorizados por marcas que desejam se posicionar com relevância social.
                    </p>
                    <p className={styles.paragraph}>
                        Além disso, o escotismo é um movimento reconhecido mundialmente pela seriedade, credibilidade e impacto positivo na juventude. Estar ao lado desse projeto é também associar sua marca a um propósito legítimo, com alto potencial de visibilidade regional, digital e institucional — com participações de grupos de diferentes cidades e ampla divulgação nas redes sociais dos escoteiros e dos participantes, que registram e compartilham intensamente essas experiências.
                    </p>
                </div>
                <div className={styles.subConteiner}>
                    <h2 className={styles.subTitle}>O Acampa Canoa 2026</h2>
                    <p className={styles.paragraph}>
                        O método educativo escoteiro vem se consolidando a mais de 100 anos e tem como meio de ensino a vida em equipes, vida ao ar livre, aprender fazendo e contato com a natureza.
                    </p>
                    <p className={styles.paragraph}>
                        Pensando nisso o Acampa Canoa tem como proposito desafiar os jovens a uma jornada que chamamos de “acampamento volante” no qual na primeira noite, sexta para sábado, eles irão “bivacar” (dormir em sacos de dormir ao relento) na Sede Náutica, Praia da Balsa, Aracruz/ES, sendo no primeiro dia sábado eles caminharão até a Aldeia Temática onde participarão de uma oficina de canoa polinésia seguida de uma competição náutica que consiste na corrida em canoas polinésias de aproximadamente 1,9 km e terão um momento de intercâmbio cultural com os representantes da aldeia.
                    </p>
                    <Image
                        src={'/images/projetos/acampa-canoa/mapacompeticao2026.png'}
                        className={styles.image}
                        width={970}
                        height={400}
                        alt='aldeia temática/Rio Piraque-Açu'
                    />
                    <p className={styles.paragraph}>
                        A tarde até umas 14 horas, eles caminharão até o Club da Orla em Coqueiral para um momento de lazer, depois seguirão para a EMEF (Escola Municipal de Ensino Fundamental) para pernoitarem a segunda noite.
                    </p>
                    <p className={styles.paragraph}>
                        No domingo pela manhã acontece uma remada na lagoa de Coqueiral até a barragem da ETA (estação de tratamento de água) de Coqueiral. Lá eles terão oficinas de pesca com temas montagem de vara, arremesso com molinete, pesca com tarrafa e pesca com armadilha em boia.
                    </p>
                    <Image
                        src={'/images/projetos/acampa-canoa/mapalagoa.png'}
                        className={styles.image}
                        width={970}
                        height={400}
                        alt='lagoa coqueiral'
                    />
                    <p className={styles.paragraph}>
                        A previsão de encerramento é por volta das 15h do domingo. 
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
                        •	Uso do selo institucional “Empresa Parceira do Esporte e da Juventude” para fins institucionais e de responsabilidade social (ESG). <br />
                    </p>
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
                        justifyContent: 'center'
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
                    </div>
                </div>
            </div>
        </Section>
    )
}