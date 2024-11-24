'use client'
import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import Image from 'next/image';

export default function Page(){
    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <h1 className={styles.title}>Tribo da Terra</h1>
            <div className={styles.conteiner}>
                <div className={styles.subConteiner}>
                    <Image 
                        alt=""
                        width={970}
                        height={350}
                        src={'/images/senior02.jpg'}
                        className={styles.image}
                    />
                    <p className={styles.paragraph}>
                        A colaboração do Movimento Escoteiro com o Fundo Mundial para a Natureza (WWF) remonta à década de 1970, quando o primeiro distintivo escoteiro de conservacionismo foi criado, como forma de reconhecer a preocupação do Movimento Escoteiro com a proteção do meio ambiente.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        Em 2008, o Programa Escoteiro Mundial para o Meio Ambiente (WSEP – sigla em inglês) foi criado para oferecer uma proposta atualizada de educação ambiental. Em 2016, o Comitê Escoteiro Mundial consolidou os programas mundiais Mensageiros da Paz (MoP), Programa Escoteiro Mundial para o Meio Ambiente (PSMMA) e o reconhecimento Escoteiros do Mundo (SDM) sob a plataforma Mundo Melhor, de modo a oferecer uma estrutura integrada e um sistema de suporte para desenvolver capacidades, otimizar recursos e alinhar objetivos compartilhados.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        Em 2018, o Escritório Mundial Escoteiro criou a iniciativa Escoteiros pelos ODS, e todas as iniciativas da plataforma Mundo Melhor iniciaram o processo de alinhamento de sua proposta educativa com os 17 Objetivos de Desenvolvimento Sustentável (ODS) e a Educação para o Desenvolvimento Sustentável (ESD), incluindo as oito competências-chave para a sustentabilidade e as Características Essenciais do Escotismo como marco de educação não formal.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        Para estabelecer uma visão de futuro sobre educação para sustentabilidade no escotismo, a Organização Mundial do Movimento Escoteiro (OMME) identificou diferentes áreas de atuação, com foco no desenvolvimento de oportunidades de aprendizagem dentro do programa educativo, visando abordar a participação dos jovens em questões comunitárias, bem como oferecer atividades que contribuíssem para seu crescimento pessoal. Essas áreas refletem os principais desafios e tendências que os jovens enfrentam hoje e no futuro próximo em suas comunidades, conforme descrito no Relatório Mundial da Juventude das Nações Unidas.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        A iniciativa Tribo da Terra (Earth Tribe) e seus desafios buscam especificamente abordar questões ambientais e de sustentabilidade, tais como mudanças climáticas, promoção de hábitos sustentáveis para um estilo de vida ecológica e saudável, e a conexão com a natureza através de iniciativas que busquem protegê-la.  E para isso, surgiram as três insígnias novas, apresentadas nos manuais abaixo, são elas: Campeões da Natureza, Reduzir Reciclar e Reutilizar e Escoteiros pela Energia Solar.
                    </p>
                    <br />
                    <Image 
                        alt=""
                        width={970}
                        height={350}
                        src={'/images/tribo-terra.png'}
                        className={styles.image}
                    />
                    <p className={styles.paragraph}>
                        A iniciativa Tribo da Terra fomenta o desenvolvimento de competências em crianças, adolescentes e jovens, incentivando-os a alcançar seu pleno potencial físico, intelectual, afetivo, social e espiritual como indivíduos e cidadãos responsáveis e ativos em suas comunidades locais, nacionais e internacionais. 
                    </p>
                    <br />

                    <h1 className={styles.subTitle}>
                        POR QUE UMA TRIBO PARA A TERRA? 
                    </h1>
                    <p className={styles.paragraph}>
                        A tribo é a forma mais antiga de organização do ser humano em todas as origens culturais ou geográficas. Os membros de uma tribo apóiam-se mutuamente para descobrir seu caminho individual e particular. A tribo sobrevive apenas através do esforço coletivo de seus membros.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        Historicamente e ainda nos dias de hoje, as tribos indígenas permanecem conectadas com a natureza, reconhecendo a interdependência entre as pessoas, o planeta e todas as espécies que nele habitam. Os valores da tribo, de respeito e de conexão com o planeta e com a natureza, existem há séculos, e a Tribo da Terra é uma forma de compartilhar esses ideais positivos com uma comunidade mais ampla de jovens de todas as origens. 
                    </p>
                    <br />
                    <h1 className={styles.subTitle}>
                        O QUE É A TRIBO DA TERRA?  
                    </h1>
                    <p className={styles.paragraph}>
                        A Tribo da Terra é uma comunidade global de jovens apaixonados pelo meio ambiente, que participam ativamente como cidadãos globais para preservar e proteger nosso planeta.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        A Tribo da Terra estimula os jovens a percorrerem uma jornada educativa para desenvolver a consciência, as competências e as habilidades de liderança necessárias para criar mudanças ambientais positivas em suas comunidades. 
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        Por meio de uma série de desafios propostos pela Tribo da Terra, os jovens aprendem a se conectar com a natureza, se tornam responsáveis pela sustentabilidade e se comprometem a agir em prol do meio ambiente. 
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        Ser membro da Tribo da Terra é um compromisso pessoal para melhorar a saúde do planeta e tornar o mundo um lugar melhor. 
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        A Tribo da Terra contribui para o desenvolvimento de crianças, adolescentes e jovens possibilitando o alcance de competências para o desenvolvimento sustentável na área de educação ambiental.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        <b>
                            Para saber tudo sobre as novas insígnias, acesse os manuais a seguir e vamos juntos fazer a diferença no planeta!  
                        </b>
                    </p>
                    <br />
                    <div className={styles.boxLinks}>
                        <ul>
                            <li className={`${styles.paragraph} ${styles.recuo}`}>
                               <b>Material de Referência</b>
                            </li>
                            <ul>
                                <li className={`${styles.paragraph} ${styles.recuo}`}>
                                    <a href="https://www.escoteiros.org.br/wp-content/uploads/2022/02/TRIBOS-DA-TERRA-RAMO-LOBINHO-V2.pdf">Guia Tribo da Terra – Ramo Lobinho</a>
                                </li>
                                <li className={`${styles.paragraph} ${styles.recuo}`}>
                                    <a href="https://www.escoteiros.org.br/wp-content/uploads/2022/02/TRIBOS-DA-TERRA-RAMO-ESCOTEIRO-v2-1.pdf">Guia Tribo da Terra – Ramo Escoteiro</a>
                                </li>
                                <li className={`${styles.paragraph} ${styles.recuo}`}>
                                    <a href="https://www.escoteiros.org.br/wp-content/uploads/2022/02/TRIBOS-DA-TERRA-RAMO-SENIOR-v2.pdf">Guia Tribo da Terra – Ramo Sênior</a>
                                </li>
                                <li className={`${styles.paragraph} ${styles.recuo}`}>
                                    <a href="https://www.escoteiros.org.br/wp-content/uploads/2022/02/TRIBOS-DA-TERRA-VOLUNTARIOS-v2.pdf">Guia Tribo da Terra – Voluntários</a>
                                </li>
                            </ul>
                        </ul>

                        <ul>
                            <li className={`${styles.paragraph} ${styles.recuo}`}>
                                <b>Materiais de Apoio</b>
                            </li>
                            <ul>
                                <li className={`${styles.paragraph} ${styles.recuo}`}>
                                    <a href="https://www.escoteiros.org.br/wp-content/uploads/2023/11/CERTIFICADOS-campeoes-da-natureza-lobinho.pdf">Certificado Campeões da Natureza – Ramo Lobinho</a>
                                </li>
                                <li className={`${styles.paragraph} ${styles.recuo}`}>
                                    <a href="https://www.escoteiros.org.br/wp-content/uploads/2023/11/CERTIFICADOS-campeoes-da-natureza-escoteiro.pdf">Certificado Campeões da Natureza – Ramo Escoteiro</a>
                                </li>
                                <li className={`${styles.paragraph} ${styles.recuo}`}>
                                    <a href="https://www.escoteiros.org.br/wp-content/uploads/2023/11/CERTIFICADOS-campeoes-da-natureza-senior.pdf">Certificado Campeões da Natureza – Ramo Sênior</a>
                                </li>
                                <li className={`${styles.paragraph} ${styles.recuo}`}>
                                    <a href="https://www.escoteiros.org.br/wp-content/uploads/2023/03/Manual_de_energia_solar-v180523.pdf">Manual Escoteiros pela Energia Solar</a>
                                </li>
                                <li className={`${styles.paragraph} ${styles.recuo}`}>
                                    <a href="https://www.escoteiros.org.br/wp-content/uploads/2022/09/Orientacoes-Insignias-Campeoes-da-Natureza.pdf">Aquisição das Insígnias</a>
                                </li>
                            </ul>
                        </ul>
                    </div>
                    <Image 
                        alt=""
                        width={970}
                        height={350}
                        src={'/images/campo-escola-tribo-terra.png'}
                        className={`${styles.image} cursorPointer`}
                        onClick={()=>window.open('https://ead.escoteiros.org.br/enrol/index.php?id=1149', '_blanck')}
                    />

                    <div className={styles.boxLinks}>
                        <p className={styles.paragraph} style={{textAlign: 'center'}}>
                            <b>
                                Guias Tribo da Terra
                            </b>
                        </p>
                        <Image 
                            alt=""
                            width={80}
                            height={100}
                            className={'cursorPointer boxShadow'}
                            src={'/icons/iconeDoc.png'}
                            onClick={()=>window.open('https://www.escoteiros.org.br/wp-content/uploads/2023/08/PLANEJAMENTO-MONITORAMENTO-E-AVALIACAO-DO-PROJETO-1.docx', '_blanck')}
                        />
                    </div>
                </div>
            </div>
        </Section>
    )
}