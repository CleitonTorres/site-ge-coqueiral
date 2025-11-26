import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import Image from 'next/image';
import { Metadata } from 'next';
import Carrocel from '@/components/layout/carrocel/carrocel';
import Link from 'next/link';
import ShareButton from '@/components/layout/shareButton/shareButton';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "De Óleo na Reciclagem",
    description:
      "O projeto De Óleo na Reciclagem é um projeto que busca destinar o óleo usado de cozinha para sua devida reciclagem...",
    keywords:
      "meio ambiente, comunidade, impacto social, trabalho voluntário, projetos sociais, logistica reversa, educação, social, crianças, dia de semear paz",
    authors: [{ name: "19 Grupo Escoteiro Coqueiral" }],
    icons: {
      icon: "/favicon.ico",
    },
    metadataBase: new URL('https://www.19.escoteiroses.org.br/projetos/oleo-na-reciclagem/'),
    openGraph: {
        title: "Escoteiro Dev",
        description:
            "O projeto De Óleo na Reciclagem é um projeto que busca destinar o óleo usado de cozinha para sua devida reciclagem...",
        images: [],
        url: 'www.19.escoteiroses.org.br/projetos/oleo-na-reciclagem/'
    }
  };
}

export default function Page(){
    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <h1 className={styles.title}>De Oléo na Reciclagem</h1>
            <div className={styles.conteiner}>
                <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', padding: 10}}>
                    <ShareButton
                        title={"De Óleo na Reciclagem"}
                        text={"O objetivo deste projeto é estruturar e operacionalizar um serviço de coleta, transporte e destinação adequada de óleo vegetal usado, gerado por residências e pequenos comércios e residências nos bairros Coqueiral, Sauê e Santa Cruz..."}
                        url={`${process.env.NEXT_PUBLIC_ROOT_URL}/projetos/oleo-na-reciclagem/`}
                        imageUrl={`${process.env.NEXT_PUBLIC_ROOT_URL}/images/projetos/oleo/oleo.png`}
                    />
                </div>
                <div className={styles.subConteiner}>
                    <Image 
                        alt=""
                        width={970}
                        height={350}
                        src={'/images/projetos/oleo/oleo.png'}
                        className={styles.image}
                    /> 
                    <br />
                    
                    <h1 className={styles.subTitle}>
                        Do Objetivo.
                    </h1>
                    <p className={styles.paragraph}>
                        O objetivo deste projeto é estruturar e operacionalizar um serviço de coleta, transporte e destinação adequada de óleo vegetal usado, gerado por residências e pequenos comércios e residências nos bairros Coqueiral, Sauê e Santa Cruz, através da aquisição de veículo específico (Fiat Strada 2020), bem como custear seu combustível/manutenção pelo periodo minimo de 4 anos e remunerar um coletor com carga de trabalho 4 vezes por semana (4 horas por dia). O óleo coletado será encaminhado para empresa recicladora parceira para reciclagem ou transformação.
                    </p>
                    <br />
                    <h1 className={styles.subTitle}>
                        Problemas a serem resolvidos.
                    </h1>
                    <p className={styles.paragraph}>
                        O descarte inadequado do óleo vegetal usado por residências e pequenos comércios compromete o meio ambiente: entupimento de redes de esgoto, contaminação de solo e água, aumento do custo de tratamento de efluentes.
                    </p>
                    <p className={styles.paragraph}>
                        Falta de logística reversa organizada para esse resíduo específico na área de atuação (Coqueiral, Sauê e Santa Cruz) e baixo engajamento da comunidade local com práticas de conservação e reciclagem.
                    </p>
                    <p className={styles.paragraph}>
                        Ausência de infraestrutura local que reúna transporte, coleta e destinação integrada do óleo vegetal, o que gera perda de recurso reciclável e reduz a viabilidade econômica da cadeia de reciclagem desse resíduo.
                    </p>
                    <p className={styles.paragraph}>
                        A necessidade de inclusão social e geração de trabalho/ocupação local em cadeias produtivas mais sustentáveis, alinhadas à economia circular.
                    </p>
                    <br />

                    <Carrocel urlImages={[
                        '/images/projetos/oleo/oleo.png',
                        '/images/projetos/oleo/oleo (1).jpg',
                        '/images/projetos/oleo/oleo (2).jpg',
                    ]} />

                    <h1 className={styles.subTitle}>
                        Relação entre os objetivos e as diretrizes da Lei de Incentivo à Reciclagem.
                    </h1>
                    <p className={styles.paragraph}>
                        A Lei nº 14.260/2021 estabelece como objetivo “incentivar a cadeia produtiva da reciclagem, com vistas a fomentar o uso de matérias-primas e de insumos de materiais recicláveis e reciclados” (Art. 1º).  Além disso, conforme regulamentação, projetos que envolvem “aquisição de equipamentos e de veículos para a coleta seletiva, a reutilização, o beneficiamento, o tratamento e a reciclagem de materiais” são elegíveis para apoio. 
                    </p>
                    <br />

                    <p className={styles.paragraph}>
                        Portanto, o presente projeto se alinha diretamente com as diretrizes da Lei, pois:
                    </p>
                    <p className={styles.paragraph}>
                        •	promove a logística reversa e coleta de resíduo (óleo usado) que seria descartado indevidamente; <br />
                        •	adquire veículo específico para coleta (infraestrutura de apoio à reciclagem); <br />
                        •	envolve destinação para empresa recicladora (uso de insumos recicláveis/re¬uso); <br />
                        •	favorece a mobilização comunitária em torno da reciclagem e conscientização ambiental.
                    </p>
                    <br />

                    <h1 className={styles.subTitle}>
                        Público-alvo.
                    </h1>
                    <p className={styles.paragraph}>
                        •	Direto: moradores e pequenos comércios dos bairros Coqueiral - Aracruz/ES, Sauê - Aracruz/ES e Santa Cruz - Aracruz/ES, que geram óleo vegetal usado. <br />
                        •	Indireto: comunidade do município que se beneficia da diminuição de rejeitos inadequados, melhoria da limpeza urbana e valorização da economia circular local.
                    </p>
                    <br />

                    <h1 className={styles.subTitle}>
                        Resultados esperados
                    </h1>
                    <p className={styles.paragraph}>
                        •	Ampliar a coleta para 100 residências cadastradas. <br />
                        •	Implementação de uma operação de coleta de óleo vegetal usado com veículo próprio (Fiat Strada 2020) e equipe dedicada, operando quatro vezes por semana. <br />
                        •	Remoção de quantidade estimada de óleo vegetal usado de 1 tolenada, ao final do projeto, das residências e comércios dos bairros-alvo, evitando descarte indevido em rede e esgoto ou solo. <br />
                        •	Destinação correta desse óleo à empresa recicladora, garantindo reaproveitamento ou tratamento com aproveitamento do recurso e reduzindo o impacto ambiental. <br />
                        •	Aumento da conscientização ambiental entre moradores e comerciantes locais sobre a importância da reciclagem e da logística reversa de resíduos como óleo vegetal usado. <br />
                        •	Contribuição para a economia circular local: resíduos transformados em recursos, fortalecendo cadeia produtiva da reciclagem, conforme previsto na Lei 14.260/21. <br />
                        •	Geração de trabalho local: contratação de coletor com carga estabelecida (8 horas/dia, 4 dias por semana, pelo período de 4 anos ed projeto). <br />
                        •	Melhoria da qualidade ambiental urbana nos bairros-alvo, redução de risco de contaminação e entupimento de sistema de esgoto/pluvial, aumento do engajamento comunitário em práticas sustentáveis.
                    </p>
                    <br />
                </div>
            </div>
            <Link 
                href={'https://photos.app.goo.gl/Yn5JQcgKcwGL7pjH6'} 
                target='_blank'
            >
                <h2 
                    className={styles.subtitle}
                    style={{textAlign: 'center'}}
                >
                    Veja nosso álbum de fotos.
                </h2>                    
                <Image 
                    alt='esporte, escoteiros, aracruz, coqueiral, nautico, canoa, velas, caiaque, rio, mar, lagoa'
                    src={'/images/projetos/oleo/oleo (2).jpg'}
                    width={300}
                    height={200}
                    style={{objectFit: 'contain', height: 'auto', width: '100%'}}
                />
            </Link>
        </Section>
    )
}