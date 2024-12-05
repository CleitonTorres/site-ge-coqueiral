import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import Image from 'next/image';

export default function Page(){
    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <h1 className={styles.title}>Ramo Escoteiro</h1>
            <div className={styles.conteiner}>
                <div className={styles.subConteiner}>
                    <Image 
                        alt=""
                        width={970}
                        height={350}
                        src={'/images/escoteiros05.jpg'}
                        className={styles.image}
                    />
                    <p className={styles.paragraph}>
                        Entre os 11 e 14 anos fazemos parte do Ramo Escoteiro – somos patrulhas de 5 a 8 jovens, de meninos e meninas, que juntas formam uma tropa. Aqui, além de trabalhar em equipe e entender a importância de respeitar a natureza, aprendemos diversas coisas que nos deixam mais confiantes e decididos.
                    </p>
                    <div className={styles.coluna}>
                        <p className={`${styles.paragraph} ${styles.widthAuto}`}>
                            Cada patrulha tem seu próprio bastão e bandeirola, onde gravamos lembranças marcantes das nossas experiências juntos, assim como o livro de patrulha, que tem todas as informações sobre os membros e fotografias das nossas ações. Elegemos um monitor, que age como um líder dentro de nosso grupo, e desenvolvemos algumas atividades por conta própria, como ir ao campo, ao cinema, jogar algum jogo, etc.<br/>
                            Atividades como acampamentos e excursões fazem parte da nossa vivência no Ramo Escoteiro, sempre com a orientação de adultos. Com nosso lema “Sempre Alerta”, estamos interessados em explorar novos territórios, conhecer coisas novas, sempre com o nosso grupo de amigos.<br/>
                            Antes de completar 15 anos, passamos por um período de transição em que nos adaptamos à realidade do Ramo Sênior, e nos despedimos da tropa escoteira com a Cerimônia de Passagem.<br/>
                        </p>
                        <ul className={`${styles.boxLinks} ${styles.widthAuto}`}>
                            <li>
                                <a href="https://www.youtube.com/watch?v=GWZnPtCSres" target='blank'>Conheça o Ramo Escoteiro</a>
                            </li>
                            <li>
                                <a href="https://www.escoteiros.org.br/insignias-do-ramo-escoteiro/" target='blank'>Insígnias</a>
                            </li>
                            <li>
                                <a href="https://www.escoteiros.org.br/especialidades/" target='blank'>Especialidades</a>
                            </li>
                            <li>
                                <a href="https://escoteiros.org.br/wp-content/uploads/2022/09/Fluxogramas_de_progressao_ramo_escoteiro.pdf" target='blank'>Fluxograma Progressão Pessoal</a>
                            </li>
                            <li>
                                <a href="https://www.youtube.com/watch?v=wLCJu56qoW8&feature=emb_title" target='blank'>Tutorial mAPPa</a>
                            </li>
                        </ul>
                    </div>
                    <br />
                    <h1 className={styles.subTitle}>
                        Aventura Escoteira
                    </h1>                    
                    <p className={styles.paragraph}>
                        No Ramo Escoteiro você realiza tantas atividades que anotar todas elas facilita bastante na hora de conquistar sua Lis de Ouro! Para isso, você tem duas ferramentas bem simples à sua disposição: o mapa de progressão e o aplicativo de Progressão do Ramo Escoteiro – os dois servem para marcar as atividades realizadas durante sua “Aventura Escoteira”.
                    </p>
                    <p className={styles.paragraph}>
                        Cada item que você completa significa que você está um passo mais perto do distintivo de Escoteiro Lis de Ouro. E não é só isso, você mostra para seu chefe e amigos o quanto você é responsável e capaz de se virar em todo tipo de situação; ao ver você se desenvolvendo tão rapidamente, seus companheiros de patrulha vão querer o mesmo e você vai poder ajudá-los! Deixe seu chefe por dentro de todas as suas conquistas: ele poderá dar uma mãozinha quando você precisar.
                    </p>
                    <p className={styles.paragraph}>
                        Além do trajeto que está no mapa, você vai precisar tirar pelo menos uma Insígnia de Interesse Especial, ter o cordão de eficiência vermelho e branco, ter 10 noites de acampamento com sua patrulha ou tropa e conquistar uma das Insígnias da Modalidade do Ramo Escoteiro. Mas esteja “Sempre Alerta”, depois de tudo isso, você ainda precisa de uma indicação da Corte de Honra e do Escotista. Conquistar a Lis de Ouro mostra que você se divertiu muito, mas também se desenvolveu demais.
                    </p>
                    <p className={styles.paragraph}>
                        Mãos à obra, Escoteiro?,
                    </p>
                </div>
            </div>
        </Section>
    )
}