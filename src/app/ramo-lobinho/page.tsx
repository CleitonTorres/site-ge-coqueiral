import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import Image from 'next/image';

export default function Page(){
    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <h1 className={styles.title}>Ramo Lobinho</h1>
            <div className={styles.conteiner}>
                <div className={styles.subConteiner}>
                    <Image 
                        alt=""
                        width={970}
                        height={350}
                        src={'/images/lobos01.jpg'}
                        className={styles.image}
                    />
                    <p className={styles.paragraph}>
                        Entre os 6,5 e os 10 anos, somos lobinhos. Aprendemos muito sobre a vida em meio à natureza, a viver em grupo e desenvolvemos nossa socialização. “O Livro da Jângal”, que retrata as aventuras de Mowgli, o menino lobo, é o marco simbólico que inspira a organização do Ramo Lobinho.
                    </p>
                    <div className={styles.coluna}>
                        <p className={`${styles.paragraph} ${styles.widthAuto}`}>
                        Juntos, formamos uma alcateia, que é dividida em pequenos grupos chamados matilhas. Cada matilha tem de quatro a seis lobinhos, entre meninos e meninas, com os quais compartilhamos as atividades durante todo o período em que ficamos nesse Ramo.<br/>
                        Com esses amigos, fazemos jogos, brincadeiras, vivemos aventuras, aprendemos sobre a importância da boa ação diária e ainda somos incentivados a fazer sempre o nosso Melhor Possível, que é o lema dos Lobinhos e Lobinhas.
                        </p>
                        <ul className={`${styles.boxLinks} ${styles.widthAuto}`}>
                            <li>
                                <a href="https://www.youtube.com/watch?v=W6VK6w7H95s" target='blank'>Conheça o Ramo Lobinho</a>
                            </li>
                            <li>
                                <a href="https://www.escoteiros.org.br/insignias-do-ramo-lobinho/" target='blank'>Insígnias</a>
                            </li>
                            <li>
                                <a href="https://www.escoteiros.org.br/especialidades/" target='blank'>Especialidades</a>
                            </li>
                            <li>
                                <a href="https://escoteiros.org.br/wp-content/uploads/2022/09/Fluxogramas_de_progressao_ramo_lobinho.pdf" target='blank'>Fluxograma Progressão Pessoal</a>
                            </li>
                            <li>
                                <a href="https://www.youtube.com/watch?v=wLCJu56qoW8&feature=emb_title" target='blank'>Tutorial mAPPa</a>
                            </li>
                        </ul>
                    </div>
                    <br />
                    <h1 className={styles.subTitle}>
                        Temos nossa própria lei, a Lei do Lobinho, que traz cinco artigos:
                    </h1>
                    <ol>
                        <li className={`${styles.paragraph} ${styles.marginLeft}`}>
                            O Lobinho ouve sempre os Velhos Lobos;
                        </li>
                        <li className={`${styles.paragraph} ${styles.marginLeft}`}>
                            O Lobinho pensa primeiro nos outros;
                        </li>
                        <li className={`${styles.paragraph} ${styles.marginLeft}`}>
                            O Lobinho abre os olhos e os ouvidos;
                        </li>
                        <li className={`${styles.paragraph} ${styles.marginLeft}`}>
                            O lobinho é limpo e está sempre alegre;
                        </li>
                        <li className={`${styles.paragraph} ${styles.marginLeft}`}>
                            O Lobinho diz sempre a verdade.
                        </li>
                    </ol>
                    <br />
                    <p className={styles.paragraph}>
                        Antes que possamos completar 11 anos somos encaminhados para o <a href="/ramo-escoteiro">Ramo Escoteiro</a>. Nesse período, é feita uma Cerimônia de Passagem, para que possamos nos despedir da alcateia.
                    </p>
                    <br />
                    <h1 className={styles.subTitle}>
                        Caminho da Jângal
                    </h1>
                    <p className={styles.paragraph}>
                        O mapa de progressão é uma forma de ajudar você a conquistar o Cruzeiro do Sul, o distintivo mais importante do seu Ramo! Como lobinho, você tem muitas responsabilidades, mas também muita diversão pela frente.
                    </p>
                    <p className={styles.paragraph}>
                        Para deixar essa caminhada mais fácil, o mapa de progressão do Ramo Lobinho pode ser usado para marcar todo o seu crescimento.
                    </p>
                    <p className={styles.paragraph}>
                        A partir de sua entrada na alcateia, o Akelá vai acompanhar seu desenvolvimento, dando uma ajudinha sempre que você precisar. Ao aprender tarefas simples, que são feitas no nosso dia a dia, você mostra que consegue se cuidar e que sabe o quanto é importante cada um fazer a sua parte.
                    </p>
                    <p className={styles.paragraph}>
                        Para chegar ao Cruzeiro do Sul, há um caminho que você precisa seguir – para cada item que você completar, um sinalzinho deve ser feito no mapa.
                    </p>
                    <p className={styles.paragraph}>
                        Isso vai ajudar você e o Akelá a lembrar de todos os detalhes de sua jornada. Além disso, você precisa conquistar cinco especialidades, uma Insígnia de Interesse Especial, participar de três acampamentos ou acantonamentos e ir na maioria dos sábados de atividade no seu grupo escoteiro.
                    </p>
                    <p className={styles.paragraph}>
                        Mãos à obra, lobinho!
                    </p>
                </div>
            </div>
        </Section>
    )
}