import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import Image from 'next/image';

export default function Page(){
    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <h1 className={styles.title}>Método Escoteiro</h1>
            <div className={styles.conteiner}>
                <div className={styles.subConteiner}>
                <div style={{position: 'relative'}}>
                        <Image 
                            alt=""
                            width={970}
                            height={350}
                            src={'/images/escoteiros07.jpg'}
                            className={styles.image}
                        />
                        <div className={`${styles.vinheta} ${styles.ajuste}`}></div>
                    </div>
                    
                    <p className={styles.paragraph}>
                        A abordagem educacional do Escotismo é implementada através do Método Educativo Escoteiro, um sistema educacional original que promove a autoeducação, o empoderamento e o aprendizado cooperativo. Tal como em qualquer método educacional, o Método Educativo Escoteiro é o instrumento que aproxima os jovens dos aprendizados que se esperam que eles adquiram.
                    </p>
                    <p className={styles.paragraph}>
                        Com atividades variadas e atraentes, o Escotismo incentiva os jovens a assumirem seu próprio desenvolvimento. Através da vivência nas Unidades Escoteiras Locais, os jovens aprendem e tomam gosto por se envolverem com a comunidade, se transformando em verdadeiros líderes. Por meio da proatividade e da preocupação com o próximo e com o meio ambiente, os jovens são engajados em construir um mundo melhor, mais justo e mais fraterno.
                    </p>
                    <p className={styles.paragraph}>
                        O Método Educativo Escoteiro compreende alguns elementos interdependentes que formam um conjunto unificado e integrado. Tais elementos, igualmente importantes, trabalhando juntos como um sistema coeso, e sua implementação, de maneira combinada e equilibrada, adaptada a cada faixa etária, são o que tornam o Escotismo único.
                    </p>
                    <br />
                    <p className={styles.subTitle}>
                        Os elementos do Método Escoteiro:
                    </p>
                    <div style={{position: 'relative'}}>
                        <Image 
                            alt=""
                            width={970}
                            height={350}
                            src={'/images/senior22.jpg'}
                            className={`${styles.image}`}
                        />
                        <div className={`${styles.vinheta} ${styles.ajuste}`}></div>
                        <span className={styles.textImage}>A Lei e Promessa Escoteira</span>
                    </div>                    
                    <p className={styles.subTitle}>
                        A Promessa e a Lei Escoteira
                    </p>
                    <p className={styles.paragraph}>
                        A Promessa Escoteira é um compromisso voluntário e pessoal com a Lei Escoteira, ou seja, com um conjunto de valores inclusivos e compartilhados que são a base de tudo o que o Escoteiro faz e de como ele quer ser. Através da Promessa, cada escoteiro toma uma decisão consciente e voluntária de adotar a Lei Escoteira, comprometendo-se a “fazer o melhor possível”; de usá-la como código de comportamento individual e social; e de assim assumir a responsabilidade por seu desenvolvimento pessoal. Realizar a Promessa Escoteira é o primeiro passo simbólico no processo de autoeducação.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        A Lei Escoteira é um código de vida positivo através do qual o Escotismo propõe seus valores universais aos jovens, de maneira concreta e prática. Os valores contidos na Lei Escoteira e adotados através da Promessa Escoteira moldam os jovens em seu comportamento e em sua vida de grupo. Ao longo de sua jornada no Escotismo, o entendimento dos jovens sobre a Promessa e a Lei Escoteira irá evoluir e significar cada vez mais para eles. Essa jornada de aprendizado é uma parte determinante do desenvolvimento intelectual, emocional, social e espiritual vivenciado através do Escotismo e evidencia seus princípios fundamentais.
                    </p>
                    <br />

                    <div style={{position: 'relative'}}>
                        <Image 
                            alt=""
                            width={970}
                            height={350}
                            src={'/images/senior21.jpg'}
                            className={styles.image}
                        />
                        <div className={`${styles.vinheta} ${styles.ajuste}`}></div>
                        <span className={styles.textImage}>Aprender fazendo</span>
                    </div>
                    <p className={styles.subTitle}>
                        Aprender Fazendo
                    </p>                    
                    <p className={styles.paragraph}>
                        O Escotismo utiliza ações práticas (experiências da vida real) e reflexões para facilitar o aprendizado e o desenvolvimento contínuos. O aprender fazendo mostra a abordagem prática do Escotismo sobre a educação, como resultado da experiência direta em vez de apenas uma instrução teórica. Baseia-se no aprendizado através das oportunidades de experiências que surgem da busca por interesses e do lidar com a vida cotidiana. No Escotismo, a aquisição de novas competências educativas – conhecimentos, habilidades, atitudes e valores – é alcançada através da prática de atividades variadas, divertidas e relevantes, que levam os jovens a agir, cometer erros, refletir e descobrir, permitindo-lhes o desenvolvimento em todas as dimensões de sua personalidade ao extrair o que é pessoalmente significativo de tudo aquilo que experimentam.
                    </p>
                    <br />
                    <p className={styles.subTitle}>
                        Progressão Pessoal
                    </p>
                    <p className={styles.paragraph}>
                        A expressão mais visível e atraente do Método Educativo Escoteiro, onde se integram em absoluta harmonia todos os seus outros componentes, é seu variado programa de atividades, que representa para o jovem uma oferta coincidente com seus interesses e dentro da qual eles escolhem o que desejam fazer. Estas atividades permitem aos jovens extrair experiências pessoais que levam ao alcance das competências educativas que o Movimento lhes propõe para as diferentes etapas do seu desenvolvimento.
                    </p>
                    <p className={styles.paragraph}>
                        As competências educativas se encaminham progressivamente para o cumprimento do Projeto Educativo do Movimento, se baseiam nas necessidades do desenvolvimento harmônico dos jovens e se ajustam a suas possibilidades nas diferentes idades. As atividades propostas significam desafios que estimulam o jovem a se superar, permitem experiências que dão lugar a uma aprendizagem efetiva, produzem a sensação de haver tirado algum proveito e despertam o interesse por desenvolvê-las. Por isso dizemos que são desafiantes, úteis, recompensantes e atraentes.
                    </p>
                    <br />
                    <div style={{position: 'relative'}}>
                        <Image 
                            alt=""
                            width={970}
                            height={350}
                            src={'/images/senior23.jpg'}
                            className={styles.image}
                        />
                        <div className={`${styles.vinheta} ${styles.ajuste}`}></div>
                        <span className={styles.textImage}>Sistema de equipes</span>
                    </div>
                    <p className={styles.subTitle}>
                        Sistema de Equipes
                    </p>
                    <p className={styles.paragraph}>
                        O Escotismo utiliza pequenas equipes, como patrulhas, para que os indivíduos participem do aprendizado colaborativo e das tomadas de decisão, com o objetivo de desenvolver o trabalho em equipe eficaz, as habilidades interpessoais, a liderança, e criar um senso de responsabilidade e pertencimento. Essa abordagem facilita e enriquece a vida de grupo. Além disso, pode ser uma ferramenta eficaz para o empoderamento dos jovens, capacitando-os a trabalhar suas competências pessoais e coletivas através da formação de equipes e do desenvolvimento das habilidades, talentos e experiências individuais. Também ajuda a construir um espírito de equipe em que o apoio é mútuo e os problemas são resolvidos coletivamente.
                    </p>
                    <p className={styles.paragraph}>
                        A estrutura organizacional básica frequentemente usada nas unidades locais compreende equipes de seis a oito jovens, com base em sua tendência natural de formar pequenos grupos. Esse sistema também é aplicável a todos os tipos de pequenos grupos para tomada de decisão cooperativa (por exemplo, conselhos locais, comitês distritais, equipes de organização de eventos, equipes executivas de projetos etc.). Além disso, oferece oportunidades de liderança e valorização da diversidade, ajudando os escoteiros a desenvolver  relacionamentos construtivos com outros jovens e parcerias com adultos, além de aprender a viver segundo uma forma democrática de autogoverno.
                    </p>
                    <br />

                    <div style={{position: 'relative'}}>
                        <Image 
                            alt=""
                            width={970}
                            height={350}
                            src={'/images/cla04.png'}
                            className={styles.image}
                        />
                        <div className={`${styles.vinheta} ${styles.ajuste}`}></div>
                        <span className={styles.textImage}>Suporte do adulto</span>
                    </div>
                    <p className={styles.subTitle}>
                        Suporte do Adulto
                    </p>
                    <p className={styles.paragraph}>
                        O Escotismo conta com adultos que apoiam os jovens e facilitam a criação de oportunidades de aprendizado por meio de uma cultura de parceria, para transformar tais oportunidades em experiências significativas. 
                    </p>
                    <p className={styles.paragraph}>
                        Oferecemos  uma  parceria  de  entusiasmo  e  experiência  entre jovens  e  adultos,  com  base  no  respeito  mútuo,  na  confiança  e na aceitação do outro como pessoa. O adulto proporciona apoio educacional, emocional, informativo e avaliativo aos jovens em seu próprio desenvolvimento.  
                    </p>
                    <p className={styles.paragraph}>
                        De modo geral, os adultos estão presentes para ajudar os jovens a se preparar, bem como para apoiar, guiar, orientar e facilitar as experiências de aprendizado. Essencialmente, o papel do adulto no Escotismo é reforçar a natureza do programa: ser liderado por jovens e apoiado por adultos.
                    </p>
                    <br />

                    <div style={{position: 'relative'}}>
                        <Image 
                            alt=""
                            width={970}
                            height={350}
                            src={'/images/senior06.jpeg'}
                            className={styles.image}
                        />
                        <div className={`${styles.vinheta} ${styles.ajuste}`}></div>
                        <span className={styles.textImage}>Marco Simbólico</span>
                    </div>
                    <p className={styles.subTitle}>
                        Marco Simbólico
                    </p>
                    <p className={styles.paragraph}>
                        O marco simbólico é um conjunto de símbolos, temas e histórias que desenvolve senso de pertencimento, ajuda a transmitir uma mensagem educacional e estimula a coesão e a solidariedade no próprio grupo e no Movimento em nível global.  O marco simbólico ajuda os jovens a se identificar com o Propósito e os valores do Escotismo. 
                    </p>
                    <p className={styles.paragraph}>
                        O marco simbólico é apresentado de maneira progressiva, adaptando-se às necessidades e interesses de crianças, adolescentes e jovens nas distintas faixas etárias, indo da fantasia do universo infantil até a realidade concreta do mundo adulto.
                    </p>
                    <br />

                    <div style={{position: 'relative'}}>
                        <Image 
                            alt=""
                            width={970}
                            height={350}
                            src={'/images/senior24.jpg'}
                            className={styles.image}
                        />
                        <div className={`${styles.vinheta} ${styles.ajuste}`}></div>
                        <span className={styles.textImage}>Contato com a natureza</span>
                    </div>
                    <p className={styles.subTitle}>
                        Natureza
                    </p>
                    <p className={styles.paragraph}>
                        O Escotismo cria possibilidades de aprendizagem ao ar livre que incentivam uma melhor compreensão da relação do ser humano com o meio ambiente.
                    </p>
                    <p className={styles.paragraph}>
                        Este elemento do Método Educativo Escoteiro envolve o valor educacional  do  desafio  de  estar  na  natureza,  que  incentiva crianças, adolescentes e jovens a serem criativos e crescerem. Também envolve a abordagem da sustentabilidade, que proporciona  uma  melhor  percepção  ética,  respeito  e  conexão com a natureza, incentivando comportamentos sustentáveis.
                    </p>
                    <br />
                    
                    <div style={{position: 'relative'}}>
                        <Image 
                            alt=""
                            width={970}
                            height={350}
                            src={'/images/grupo02.jpg'}
                            className={styles.image}
                        />
                        <div className={`${styles.vinheta} ${styles.ajuste}`}></div>
                        <span className={styles.textImage}>Envolvimento comunitário</span>
                    </div>
                    <p className={styles.subTitle}>
                        Envolvimento Comunitário
                    </p>
                    <p className={styles.paragraph}>
                        O Escotismo oferece oportunidades para a exploração ativa e o comprometimento com as comunidades e o mundo mais amplo, promovendo maior valorização e entendimento entre as pessoas.
                    </p>
                    <p className={styles.paragraph}>
                        O envolvimento comunitário inclui ajudar os jovens a criar um mundo melhor, uma jornada que eles não podem seguir sozinhos. O engajamento dos jovens no serviço comunitário os capacita  para  que,  a  partir  do  comprometimento com a cidadania global ativa, considerando seu contexto imediato e com a responsabilidade pessoal de entender seu papel como cidadãs e cidadãos, compreendam como podem ajudar a transformar sua comunidade para melhor, sem que tenham que esperar a idade adulta.
                    </p>
                </div>
            </div>
        </Section>
    )
}