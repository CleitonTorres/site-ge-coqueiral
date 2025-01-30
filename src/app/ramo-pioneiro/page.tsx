import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import Image from 'next/image';

export default function Page(){
    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <h1 className={styles.title}>Ramo Pioneiro</h1>
            <div className={styles.conteiner}>
                <div className={styles.subConteiner}>
                    <Image 
                        alt=""
                        width={970}
                        height={350}
                        src={'/images/cla01.jpeg'}
                        className={styles.image}
                    />
                    <div className={styles.coluna}>
                        <p className={`${styles.paragraph} ${styles.widthAuto}`}>
                            A partir dos 18 anos, e até os 21 incompletos, integramos o Ramo Pioneiro. Nossa equipe forma o clã, e é onde nos apoiamos e descobrimos interesses em comum. Levamos a sério nosso lema “Servir”, já que vivemos uma aventura que não é mais simbólica ou imaginária, pois experimentamos o papel real do adulto por meio do serviço e das atividades de desenvolvimento comunitário.<br/>
                            O cotidiano no clã nos dá bastante liberdade, mas já estamos cientes da responsabilidade que isso traz – somos nós que organizamos nossas próprias atividades. Esse é o período em que entramos na vida adulta, e estamos concluindo a formação de nossos valores e princípios.
                        </p>
                        <ul className={`${styles.boxLinks} ${styles.widthAuto}`}>
                            <li>
                                <a href="https://www.youtube.com/watch?v=ZsJrDGnBLdw" target='blank'>Conheça o Ramo Pioneiro</a>
                            </li>
                            <li>
                                <a href="https://www.escoteiros.org.br/campo-escola-virtual/" target='blank'>Educação à Distância</a>
                            </li>
                            <li>
                                <a href="https://www.escoteiros.org.br/insignias-do-ramo-pioneiro/" target='blank'>Insígnias</a>
                            </li>
                            <li>
                                <a href="https://escoteiros.org.br/wp-content/uploads/2022/09/Fluxogramas_de_progressao_ramo_pioneiro.pdf" target='blank'>Fluxograma Progressão Pessoal</a>
                            </li>
                            <li>
                                <a href="https://www.youtube.com/watch?v=wLCJu56qoW8&feature=emb_title" target='blank'>Tutorial mAPPa</a>
                            </li>
                        </ul>
                    </div>                   
                    <p className={styles.paragraph}>
                    </p>
                    <p className={styles.paragraph}>
                        Mesmo estando no clã, já podemos participar como adultos voluntários em outros Ramos atuar ativamente em nossas comunidades. Prestes a completar 21 anos, é chegada a hora de encerrar nossa caminhada como jovem no Movimento Escoteiro. A Cerimônia de Partida marca essa etapa, que pode ser seguida pela vida escoteira no papel de voluntário, como escotista ou dirigente.
                    </p>
                    <br />
                    <h1 className={styles.subTitle}>
                        O Projeto Pioneiro
                    </h1>                    
                    <p className={styles.paragraph}>
                        Como pioneiro, você simboliza um trajeto de muito aprendizado e superação, independente de quando tenha entrado no Movimento Escoteiro. Suas experiências, erros e conquistas fazem toda a diferença agora – observando seu caminho percorrido, você deverá reconhecer suas competências e as áreas em que precisa crescer ainda mais.                    </p>
                    <p className={styles.paragraph}>
                        Para isso, existe um percurso a ser percorrido: conquistar as Insígnias de Cidadania e do Comprometimento, revisar seu projeto de vida, e desenvolver um projeto pessoal que tenha duração superior a quatro meses e que possua todas as etapas propostas.
                    </p>
                    <p className={styles.paragraph}>
                        Como consequência do seu desenvolvimento, é possível chegar à Insígnia de BP, representando todas as vivências e etapas que você cumpriu no Ramo Pioneiro.
                    </p>
                    <p className={styles.paragraph}>
                        Aproveite seu período no Ramo Pioneiro e prepare-se, em breve você poderá proporcionar a outros jovens uma experiência tão incrível quanto a sua!
                    </p>
                </div>
                
            </div>
        </Section>
    )
}