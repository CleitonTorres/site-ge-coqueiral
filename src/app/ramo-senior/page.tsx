import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import Image from 'next/image';

export default function Page(){
    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <h1 className={styles.title}>Ramo Sênior</h1>
            <div className={styles.conteiner}>
                <div className={styles.subConteiner}>
                    <Image 
                        alt=""
                        width={970}
                        height={350}
                        src={'/images/senior01.jpeg'}
                        className={styles.image}
                    />
                    <p className={styles.paragraph}>
                        O Ramo Sênior é formado por jovens com idade entre 15 e 17 anos. Nós já nos conhecemos melhor, aceitamos nossas características e as diferenças de um jeito mais simples, e estamos entendendo melhor nossa própria personalidade. Aqui a exploração se converte em desafios pessoais e somos estimulados a superar estes desafios.
                    </p>
                    <br />
                    <div className={styles.coluna}>
                        <p className={`${styles.paragraph} ${styles.widthAuto}`}>
                            Nossas atividades nos desafiam e nos encorajam a superar dificuldades, seja escalando montanhas, navegando, conhecendo novas tecnologias, acampando por vários dias, fazendo trilhas, aprendendo novas habilidades e muitas outras coisas.<br/>
                            Como diz nosso lema, estamos Sempre Alerta a tudo que acontece ao nosso redor. Temos nossa patrulha, um grupo de amigos que vivenciam conosco experiências inesquecíveis e nos apoiam nos momentos de dificuldades.<br/>
                            A partir do momento que completamos 17 anos, e no máximo antes dos 18, precisamos nos despedir da tropa sênior e partir para o Ramo Pioneiro, após uma Cerimônia de Passagem.
                        </p>
                        <ul className={`${styles.boxLinks} ${styles.widthAuto}`}>
                            <li>
                                <a href="https://www.youtube.com/watch?v=dCrE2AQqkAA" target='blank'>Conheça o Ramo Sênior</a>
                            </li>
                            <li>
                                <a href="https://www.escoteiros.org.br/insignias-do-ramo-senior/" target='blank'>Insígnias</a>
                            </li>
                            <li>
                                <a href="https://www.escoteiros.org.br/especialidades/" target='blank'>Especialidades</a>
                            </li>
                            <li>
                                <a href="https://escoteiros.org.br/wp-content/uploads/2022/09/Fluxogramas_de_progressao_ramo_senior.pdf" target='blank'>Fluxograma Progressão Pessoal</a>
                            </li>
                            <li>
                                <a href="https://www.youtube.com/watch?v=wLCJu56qoW8&feature=emb_title" target='blank'>Tutorial mAPPa</a>
                            </li>
                        </ul>
                    </div>
                    <br />
                    <h1 className={styles.subTitle}>
                        O Desafio Sênior
                    </h1>                    
                    <p className={styles.paragraph}>
                        São tantas as aventuras que você vive no Ramo Sênior, você aprende a superar obstáculos, medos, se desafia e se supera constantemente – sempre acompanhado dos amigos. Sua caminhada, se realizada com dedicação, vai levar você diretamente para o Escoteiro da Pátria, o distintivo especial do seu Ramo.
                    </p>
                    <p className={styles.paragraph}>
                        Para acompanhar essa jornada, você tem à mão o mapa de progressão e o aplicativo de Progressão do Ramo Sênior, em que você pode registrar todas as suas conquistas e acompanhar em que áreas você precisa se desenvolver ainda mais.
                    </p>
                    <p className={styles.paragraph}>
                        Como parte do seu desafio, você ainda vai precisar de 10 noites acampado com sua patrulha ou tropa do Ramo Sênior, conquistar o cordão dourado, uma das Insígnias de Interesse Especial e uma das Insígnias da Modalidade do seu atual Ramo. Capriche, seu Escotista e a Corte de Honra também vão ter que indicar você para alcançar o Escoteiro da Pátria.
                    </p>
                    <p className={styles.paragraph}>
                        Supere seus próprios desafios! Essa é a hora!
                    </p>
                </div>
            </div>
        </Section>
    )
}