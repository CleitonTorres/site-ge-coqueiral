import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import Image from 'next/image';

export default function Page(){
    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <h1 className={styles.title}>Escoteiros do Brasil</h1>
            <div className={styles.conteiner}>
                <div className={styles.subConteiner}>
                    <Image 
                        alt=""
                        width={970}
                        height={350}
                        src={'/images/escoteiro02.jpg'}
                        className={styles.image}
                    />
                    <p className={styles.paragraph}>
                        A União dos Escoteiros do Brasil – UEB, fundada em 4 de novembro de 1924, é uma associação com atuação nacional, sem fins lucrativos, de caráter educacional, cultural, beneficente e filantrópico, que congrega todos que praticam o Escotismo no Brasil. A União dos Escoteiros do Brasil é a única organização brasileira reconhecida pela Organização Mundial do Movimento Escoteiro, sendo titular desse registro internacional desde sua fundação.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        A associação é responsável por dirigir e acompanhar as práticas escoteiras nas Unidades Escoteiras Locais, espalhadas em todo o território nacional brasileiro.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        Considerado como um movimento de educação não formal, o Escotismo ultrapassa as barreiras e se firma como um movimento educacional por proporcionar aos jovens o seu desenvolvimento pessoal em diferentes áreas, de forma sempre variada e atual, que vão ao encontro das necessidades das novas gerações.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        Por mais de 100 anos, os escoteiros têm aperfeiçoado técnicas, ações e conteúdos para que possam continuar sendo o maior movimento de jovens do mundo. E é por meio de um Programa Educativo e do Método Escoteiro que a proposta educativa do Movimento Escoteiro é levada a mais de cem mil pessoas.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        Os Escoteiros do Brasil têm como missão contribuir para a educação de jovens, por meio de um sistema de valores baseado na Promessa e na Lei Escoteira, para ajudar a construir um mundo melhor onde as pessoas se realizem como indivíduos e desempenhem um papel construtivo na sociedade.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        A organização também tem como visão que, até 2023, o Escotismo no Brasil será o mais relevante movimento de educação juvenil, possibilitando que 200 mil jovens sejam cidadãos e cidadãs ativos que inspirem mudanças positivas em suas comunidades e no mundo.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        <b>
                            Os Escoteiros do Brasil estão organizados em três níveis institucionais:
                        </b>
                    </p>
                    <br />
                    <ul>
                        <li className={styles.paragraph}>
                            <b>Nacional</b>: com autoridade em todo o território brasileiro, é dirigido pela Diretoria Executiva Nacional, que atua de forma voluntária e é responsável pela coordenação do Escotismo em todo o Brasil.
                        </li>
                        <li className={styles.paragraph}>
                            <b>Regional</b>: denominado Região Escoteira, abrange um Estado da federação, e atua como uma filial do nível nacional, sendo formado por Diretorias voluntárias eleitas localmente;
                        </li>
                        <li className={styles.paragraph}>
                            <b>Local</b>: constituído pelas Unidades Escoteiras Locais, como o 19º ES Grupo Escoteiro Coqueiral por exemplo, que podem ser Grupos escoteiros ou Seções Escoteiras Autônomas, onde são realizadas as atividades práticas do Escotismo e o contato direto com os jovens e a comunidade.
                        </li>
                    </ul>
                    <Image 
                        alt=""
                        width={970}
                        height={350}
                        src={'/images/escoteiros04.jpeg'}
                        className={styles.image}
                        priority
                    />
                    <p className={styles.paragraph}>
                        <b>
                            Missão
                        </b>
                    </p>
                    <p className={styles.paragraph}>
                        Contribuir para a educação de crianças, adolescentes e jovens, mediante um sistema de valores, baseado na Promessa e Lei Escoteiras, para que participem na construção de um mundo melhor, no qual se desenvolvam plenamente e desempenhem um papel construtivo na sociedade.
                    </p>
                    <p className={styles.paragraph}>
                        <b>
                            Visão
                        </b>
                    </p>
                    <p className={styles.paragraph}>
                        Ser reconhecida como uma organização de educação não formal relevante, que por meio de seu projeto educativo acessível e inclusivo, inspire crianças, adolescentes e jovens a promoverem mudanças positivas na sociedade.  
                    </p>
                    <p className={styles.paragraph}>
                        <b>
                            Valores
                        </b>
                    </p>
                    <ul>
                        <li className={styles.paragraph}>
                            <b>Diversidade</b> – Respeito às diferenças, em suas várias dimensões, e defesa permanente dos direitos humanos.
                        </li>
                        <li className={styles.paragraph}>
                            <b>Honestidade</b> – Respeito aos preceitos legais, morais, justos e éticos em todas as ações e relações.
                        </li>
                        <li className={styles.paragraph}>
                            <b>Excelência</b> – Busca pela eficácia, qualidade e melhoria contínua em todas as ações.
                        </li>
                        <li className={styles.paragraph}>
                            <b>Democracia</b> – Promoção do engajamento de todos e compartilhamento de opiniões, na busca de posições e decisões resultantes da reflexão coletiva.
                        </li>
                        <li className={styles.paragraph}>
                            <b>Inclusão</b> – Adequação para acolher as diferentes características e necessidades das pessoas que compõem a sociedade.
                        </li>
                        <li className={styles.paragraph}>
                            <b>Inovação</b> – Capacidade de implementar novas ideias e buscar soluções criativas para êxito e permanente atualização da organização.
                        </li>
                        <li className={styles.paragraph}>
                            <b>Compromisso</b> – Empenho com a transformação social, com a educação infantojuvenil e impacto gerado nas comunidades.
                        </li>
                        <li className={styles.paragraph}>
                            <b>Sustentabilidade</b> – Responsabilidade com o meio ambiente, os recursos e a sociedade, e adoção de práticas sustentáveis. 
                        </li>
                        <li className={styles.paragraph}>
                            <b>Cooperação</b> – Disposição em compartilhar experiências, valorizar o trabalho coletivo e manter relacionamentos com outras instituições.
                        </li>
                        <li className={styles.paragraph}>
                            <b>Transparência</b> – Ações visíveis e claras na gestão da organização e dos recursos em todos os níveis.
                        </li>
                        <li className={styles.paragraph}>
                            <b>Unidade</b> – Harmonia nas ações, em todos os níveis, fortalecendo a identidade unificada e a presença dos Escoteiros do Brasil na sociedade.
                        </li>
                    </ul>
                </div>
            </div>
        </Section>
    )
}