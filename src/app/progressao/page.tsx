'use client'
import Section from "@/components/layout/sections/section";
import styles from './page.module.css';
import Image from "next/image";

export default function Progressao(){
    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <h1 className={styles.title}>Progressão</h1>
            
            <div className={styles.conteiner}>
                {/* ramo Lobinho */}
                <div className={styles.subConteiner}>
                    <div className={styles.boxSubTitle}>
                        <Image 
                            alt=""
                            width={60}
                            height={80}
                            src={'/icons/lobinhoIcon.png'}
                        />
                        <span className={styles.subTitle}>RAMO LOBINHO</span>
                    </div>
                    
                    <ol>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            <b>Caminho do Integrar:</b> Quando completar o Caminho do Integrar é sinal que você já está pronto(a) para a Cerimônia de Integração e para fazer a sua Promessa de Lobinho. Os “Velhos Lobos” vão preparar um momento especial para apresentar você e sua família para todo o grupo escoteiro. Nesta cerimônia você receberá o lenço escoteiro e alguns distintivos para costurar em sua camisa ou blusa.
                        </li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            <b>Caminho do Descobrir:</b> Para conquistar o distintivo de Lobo Saltador, você precisa fazer pelo menos a metade das atividades propostas no seu guia/aplicativo.
                        </li>
                        <Image 
                            alt=""
                            width={970}
                            height={350}
                            src={'/images/lobos01.jpg'}
                            className={styles.image}
                        />
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            <b>Caminho do Rastrear:</b> Para conquistar o distintivo de Lobo Rastreador, você precisa fazer as atividades que restam, e assim cumprir 100% das atividades.
                        </li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            <b>Caminho do Caçar:</b> Para conquistar o distintivo de Lobo Caçador, você deve realizar a metade das atividades deste bloco. 
                        </li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            <b>Caminho das Estrelas:</b> Depois você deve fazer as atividades que restaram do bloco, para conquistar a estrela ALFA, sua próxima meta é a estrela BETA: para conquista-lá você deve participar de três acampamentos ou acantonamentos com a sua Alcateia; Para conquistar a estrela DELTA: o lobinho deverá conquistar cinco especialidades de três ramos de conhecimentos diferentes; Para a estrela GAMA: deve conquistar pelo menos uma das Insígnias de Interesse Especial do Ramo Lobinho: Insígnia da Boa Ação, Insígnia da Lusofonia, Insígnia Cone Sul, Insígnia do Aprender, Insígnia Campeões da Natureza, Insígnia Escoteiros pela Energia Solar ou Insígnia Reduzir, Reciclar, Reutilizar. Pense qual você quer conquistar e vamos em frente! Para conquistar a estrela EPSILON: o lobinho precisa ser recomendado pelos “Velhos Lobos” e pela Roca do Conselho por ser um lobinho dedicado, frequente às atividades da Alcateia e cumpridor da Lei e da Promessa do Lobinho. Quando tiver as cinco estrelas você receberá o Cruzeiro do Sul, o último e mais importante distintivo de sua Progressão Pessoal no Ramo Lobinho.
                        </li>
                    </ol>
                    <br />
                    <p className={styles.paragraph}>
                        <b>Lembre-se você pode contar sempre com um “Velho Lobo”. Ele dirá quais atividades você deverá fazer.</b>
                    </p>
                    <br/>
                    <div 
                        className={`${styles.boxCliqueAqui} ${styles.colorLobinho}`}
                        onClick={()=>{
                            window.open('https://escoteiros.org.br/wp-content/uploads/2022/09/Fluxogramas_de_progressao_ramo_lobinho.pdf', '_blanck')
                        }}
                    >
                        <span>
                            Clique aqui para baixar o fluxograma da sua progressão do ramo Lobinho.
                        </span>
                    </div>                    
                </div>
                
                {/* ramo Escoteiro */}
                <div className={styles.subConteiner}>
                    <div className={styles.boxSubTitle}>
                        <Image 
                            alt=""
                            width={60}
                            height={80}
                            src={'/icons/escoteiroIcon.png'}
                        />
                        <span className={styles.subTitle}>RAMO ESCOTEIRO</span>
                    </div>
                    <p className={styles.paragraph}>
                        Todo escoteiro gosta de viver uma boa aventura com o seu grupo de amigos, não é mesmo?! Mas também está ligado na sua Progressão Pessoal. 
                    </p>
                    <p className={styles.paragraph}>
                        A nossa “progressão pessoal” é o caminho escolhido para seguirmos sempre em frente, é uma referência que serve para saber o que você aprendeu, quais coisas você ainda deve aprender, o quanto cresceu e se desenvolveu.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        <b>No Movimento Escoteiro aprende-se de muitas formas:</b>
                    </p>
                    <ul>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>Pela participação em diversas Atividades;</li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>Com atividades junto aos outros;</li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>Com atividades dentro e fora do Movimento;</li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>Fazendo coisas no dia-a-dia e não fazendo provas;</li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>Realizando atividades com sucesso, mas também quando as atividades não acontecem como planejamos.</li>
                    </ul>
                    <p className={styles.paragraph}>
                        Nós marcamos nosso aprendizado por Distintivos de Progressão, que são quatro: <b>Pistas, Trilha, Rumo e Travessia</b>, e que se completa com o <b>Distintivo de Escoteiro Lis de Ouro</b>. Você saberá pelo seu chefe qual distintivo de progressão receberá após o “Período Introdutório”.
                    </p>
                    <ol>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            <b>O “Período Introdutório”:</b> Uma de suas primeiras tarefas quando ingressar na tropa, você deverá conquistar um conjunto de itens que vão permitir a sua integração no Movimento Escoteiro. Ao final do Período Introdutório você passará pela Cerimônia de Integração (se ainda não é membro do Grupo). Nela receberá o lenço do seu Grupo Escoteiro e o seu primeiro Distintivo de Progressão. Neste momento você também poderá fazer sua Cerimônia de Promessa e receber seu Distintivo de Promessa. Caso não se sinta pronto e deseje aguardar mais um pouco, converse com seu chefe escoteiro.
                        </li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Se o seu primeiro distintivo de progressão recebido for o distintivo de <b>Pistas:</b> Para conquistar o distintivo de Trilha – você precisa realizar a metade das atividades oferecidas para Pistas e Trilhas. 
                        </li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Se tiver recebido o distintivo de <b>Trilha:</b> Para conquistar o distintivo de Rumo – faça 100% das atividades oferecidos para Pistas e Trilhas. 
                        </li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Se tiver recebido o distintivo de <b>Rumo:</b> É necessário conquistar a metade das atividades oferecidas para Rumo e Travessia, assim poderá receber o distintivo de Travessia.
                        </li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Completando a totalidade das atividades oferecidas para Rumo e Travessia, você conquistará o distintivo <b>Travessia</b>. 
                        </li>
                    </ol>
                    <Image 
                        alt=""
                        width={970}
                        height={350}
                        src={'/images/escoteiros01.png'}
                        className={styles.image}
                    />
                    <p className={styles.paragraph}>
                        E antes que esteja pronto para fazer sua transição para o Ramo Sênior, que tal conquistar o <b>Distintivo de Escoteiro Lis de Ouro</b>? 
                    </p>
                    <p className={styles.paragraph}>
                        <b>
                            Você também tem a oportunidade de conquistar muitos outros distintivos:
                        </b>
                    </p>
                    <ul>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Como as especialidades; 
                        </li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Insígnias de Interesse Especial – Insígnia do Cone Sul, Insígnia da Lusofonia, Insígnia da Ação Comunitária, Insígnia do Aprender, Insígnia Campeões da Natureza, Insígnia Escoteiros pela Energia Solar e Insígnia Reduzir, Reciclar, Reutilizar;
                        </li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Insígnia da Modalidade – Explorador, Grumete, Aviador; 
                        </li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Cordões – Verde e Amarelo, e o Vermelho e Branco; 
                        </li>
                    </ul>
                    <br />
                    <p className={styles.paragraph}>
                        <b>
                            Vamos ao check list para ser um Escoteiro Lis de Ouro:
                        </b>
                    </p>
                    <ul>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Tenha realizado a totalidade das atividades previstas no Guia da Aventura Escoteira – Rumo e Travessia;
                        </li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Possuir o Cordão Vermelho e Branco;
                        </li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Possuir uma das seguintes Insígnias de Interesse Especial do Ramo Escoteiro: Insígnia do Cone Sul, Insígnia da Lusofonia, Insígnia da Ação Comunitária, Insígnia do Aprender, Insígnia Campeões da Natureza, Insígnia Escoteiros pela Energia Solar e Insígnia Reduzir, Reciclar, Reutilizar;
                        </li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Possuir pelo menos 10 noites de acampamento com sua Patrulha ou Tropa Escoteira.
                        </li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Possuir uma das Insígnias da Modalidade do Ramo Escoteiro (Aviador, Grumete ou Explorador).
                        </li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Seja especialmente recomendado pelos Escotistas e pela Corte de Honra da Tropa.
                        </li>
                    </ul>
                    <p className={styles.paragraph}>
                        Se você quiser saber mais sobre a progressão pessoal recomendamos os guias da “Aventura Escoteira”. São dois livros, um para as etapas de <b>Pista e Trilha</b> e outro para <b>Rumo e Travessia</b>. Neles você poderá encontrar todas as informações necessárias para a sua progressão. Ah, e tem um detalhe a mais: Caso faça parte de uma tropa da <b>Modalidade Ar</b> ou <b>Modalidade Mar</b>, você terá um conjunto a mais de atividades para conquistar, que é específico para a sua Modalidade, e consta na parte final de cada guia.
                    </p>
                    <p className={styles.paragraph}>
                        Muitas das atividades propostas nos guias também podem ser consideradas na realização de requisitos de diversas especialidades. Confira <a href="https://www.escoteiros.org.br/especialidades/" target="_blanck">as Especialidades </a> no site da UEB e converse com seu escotista.
                    </p>
                    <br/>
                    <div 
                        className={`${styles.boxCliqueAqui} ${styles.colorEscoteiro}`}
                        onClick={()=>{
                            window.open('https://escoteiros.org.br/wp-content/uploads/2022/09/Fluxogramas_de_progressao_ramo_escoteiro.pdf', '_blanck')
                        }}
                    >
                        <span>
                            Clique aqui para baixar o fluxograma da sua progressão do ramo Escoteiro.
                        </span>
                    </div> 
                </div>

                {/* ramo Sênior */}
                <div className={styles.subConteiner}>
                    <div className={styles.boxSubTitle}>
                        <Image 
                            alt=""
                            width={60}
                            height={80}
                            src={'/icons/seniorIcon.png'}
                        />
                        <span className={styles.subTitle}>RAMO SÊNIOR</span>
                    </div>
                    <p className={styles.paragraph}>
                        O sênior ou a guia é aquele (a) que encara desafios de maneira responsável com os amigos. Tudo isso sem deixar de se preocupar com sua Progressão Pessoal.
                    </p>
                    <p className={styles.paragraph}>
                        A participação em atividades e projetos não pode ser somente divertida, ela também nos ajuda a aprender sobre diversos temas de nosso interesse e a progredir. 
                    </p>
                    <p className={styles.paragraph}>
                        A Progressão Pessoal é uma referência que serve para saber o que você aprendeu, quais coisas você ainda deve aprender, o quanto cresceu e se desenvolveu.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        <b>
                            No Movimento Escoteiro aprende-se de muitas formas:
                        </b>
                    </p>
                    <ul>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Pela participação em atividades e projetos diversos;
                        </li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Interagindo com outras pessoas;
                        </li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Com atividades dentro e fora do Movimento;
                        </li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Fazendo coisas no dia-a-dia e não fazendo provas;
                        </li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Realizando atividades e projetos com sucesso, mas também quando as atividades e projetos não acontecem exatamente como planejamos;
                        </li>
                    </ul>
                    <p className={styles.paragraph}>
                        Nós marcamos nosso aprendizado por distintivos de Progressão, que são <b>Escalada, Conquista e Azimute</b>. Você saberá pelo seu chefe qual distintivo de progressão receberá após o “Período Introdutório”.
                    </p>
                    <ol>
                        <li className={styles.paragraph}>
                            <b>Período Introdutório</b>: Quando você entra na Tropa Sênior/Guia o primeiro passo da sua progressão pessoal é o Período Introdutório, no qual você irá conquistar um conjunto de itens que irão permitir a sua integração de forma mais rápida e eficiente. Ao finalizar o período introdutório se realizará uma Cerimônia de Integração e você receberá o seu primeiro distintivo de progressão, além do lenço do Grupo Escoteiro. A entrega do lenço não ocorrerá se você veio da Tropa Escoteira, porque seguramente você já o recebeu durante sua permanência nela.
                        </li>
                    </ol>
                    <p className={styles.paragraph}>
                        As etapas de Progressão Pessoal do Ramo Sênior são <b>Escalada, Conquista e Azimute</b>:
                    </p>
                    <ol>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Se tiver recebido o distintivo de <b>Escalada</b>:  Para receber o distintivo de Conquista, você deverá realizar 1/3 das atividades oferecidas, ou seja, 25 atividades.
                        </li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Se tiver recebido o distintivo de <b>Conquista</b>: E tenha interesse em receber o distintivo de Azimute, é necessário realizar outro terço das atividades oferecidas, ou mais 25 atividades.
                        </li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Ao completar a totalidade das atividades você conquista o distintivo <b>Azimute</b>. 
                        </li>
                    </ol>
                    <Image 
                        alt=""
                        width={970}
                        height={350}
                        src={'/images/senior01.jpeg'}
                        className={styles.image}
                    />
                    <br />
                    <p className={styles.paragraph}>
                        E antes que esteja pronto para fazer sua transição para o Ramo Pioneiro, que tal conquistar o <b>Distintivo de Escoteiro da Pátria</b>?!
                    </p>
                    <p className={styles.paragraph}>
                        <b>
                            Além das etapas, você também tem a oportunidade de conquistar outros distintivos como:
                        </b>
                    </p>
                    <ul>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>Especialidades</li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Insígnias de Interesse Especial – Insígnia do Cone Sul, Insígnia da Lusofonia,  Insígnia do Desafio Comunitário, Insígnia do Aprender, Insígnia Campeões da Natureza, Insígnia Escoteiros pela Energia Solar e Insígnia Reduzir, Reciclar, Reutilizar;
                        </li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Cordões de Eficiência – Cordão do Desafio Sênior e Cordão Dourado;
                        </li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Insígnias de Modalidades – Aeronauta, Naval ou Mateiro.
                        </li>
                    </ul>
                    <br />
                    <p className={styles.paragraph}>
                        <b>
                            Vamos ao check list para ser um Escoteiro da Pátria:
                        </b>
                    </p>
                    <ul>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Tenha realizado a totalidade das atividades na Etapa Azimute;
                        </li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Tenha conquistado o Cordão Dourado;
                        </li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Possua uma das seguintes Insígnias de Interesse Especial do Ramo Sênior:Insígnia do Cone Sul, Insígnia da Lusofonia,  Insígnia do Desafio Comunitário, Insígnia do Aprender, Insígnia Campeões da Natureza, Insígnia Escoteiros pela Energia Solar e Insígnia Reduzir, Reciclar, Reutilizar;
                        </li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Possua pelo menos 10 noites de acampamento, como Sênior, com sua Patrulha ou Tropa.
                        </li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Possua uma das Insígnias da Modalidade do Ramo Sênior (Aeronauta, Naval ou Mateiro).
                        </li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Seja especialmente recomendado pelos Escotistas e pela Corte de Honra da Tropa.
                        </li>
                    </ul>
                    <p className={styles.paragraph}>
                        Se quiser saber mais sobre a Progressão Pessoal, recomendamos que você consulte o “Guia do Desafio Sênior”, um livro onde você poderá encontrar toda a informação necessária para progredir. Ah, e tem um detalhe a mais: Caso faça parte de uma Tropa da Modalidade Ar ou Modalidade Mar, você terá um conjunto a mais de atividades para conquistar, que é específico para a sua modalidade, e consta na parte final de cada guia.
                    </p>
                    <p className={styles.paragraph}>
                        Muitas das atividades propostas nos guias também podem ser consideradas na realização de requisitos de diversas especialidades. Confira as <a href="https://www.escoteiros.org.br/especialidades/" target="_blanck"> Especialidades </a> no site da UEB e converse com seu escotista.
                    </p>
                    <br/>
                    <div 
                        className={`${styles.boxCliqueAqui} ${styles.colorSenior}`}
                        onClick={()=>{
                            window.open('https://escoteiros.org.br/wp-content/uploads/2022/09/Fluxogramas_de_progressao_ramo_senior.pdf', '_blanck')
                        }}
                    >
                        <span>
                            Clique aqui para baixar o fluxograma da sua progressão do ramo Sênior.
                        </span>
                    </div> 
                </div>

                {/*ramo pioneiro*/}
                <div className={styles.subConteiner}>
                    <div className={styles.boxSubTitle}>
                        <Image 
                            alt=""
                            width={60}
                            height={80}
                            src={'/icons/pioIcon.png'}
                        />
                        <span className={styles.subTitle}>RAMO PIONEIRO</span>
                    </div>
                    <p className={styles.paragraph}>
                        O pioneiro e a pioneira encontra formas e caminhos que vão, abrindo trilhas, praticando o serviço aos outros para construir um mundo melhor. Sem esquecer sua Progressão Pessoal.
                    </p>
                    <p className={styles.paragraph}>
                        Sua Progressão Pessoal, o ingresso no mundo adulto, é tomar decisões e ser responsável por elas. É disso que trata a Progressão Pessoal do Ramo Pioneiro.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        <b>
                            No Movimento Escoteiro aprende-se de muitas formas:
                        </b>
                    </p>
                    <ul>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Participando de projetos e atividades diversas;
                        </li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Por intermédio dos projetos e atividades que realizamos dentro e fora do Movimento;
                        </li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Adaptando as competências e atividades;
                        </li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Autoavaliação do seu próprio avanço;
                        </li>
                    </ul>
                    <br />
                    <p>
                        <b>
                            O Sistema de Progressão foi idealizado da seguinte maneira:
                        </b>
                    </p>                    
                    <ol>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            O ingresso pode ser feito por um jovem que veio do Ramo Sênior. Normalmente, nesse caso, ele está na faixa etária entre 17 e 18 anos. Mas o ingresso também pode ser feito por um jovem que não veio da Tropa Sênior, e cuja idade pode estar acima de 18 anos;
                        </li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Todos ingressam no Clã Pioneiro em um PERÍODO INTRODUTÓRIO: O jovem deverá realizar um conjunto de itens que contribuirão com sua integração e ambientação no Clã Pioneiro; Independente de ter vindo do Ramo Sênior ou não, você deverá executar as atividades. Ao final do Período Introdutório o jovem passará pela Cerimônia de Integração, na qual receberá o Lenço do Grupo Escoteiro (se ainda não é membro do Grupo) e seu primeiro distintivo de progressão. Recomenda-se que no mesmo momento o jovem faça sua Promessa, recebendo seu distintivo de Promessa.
                        </li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Para passar da Etapa Comprometimento para Etapa de Cidadania: ter realizado 50% das atividades propostas no seu Guia do Projeto Pioneiro, participar de um projeto em andamento e elaborar o Plano de Desenvolvimento Pessoal (Projeto de Vida). 
                        </li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Para passar da Etapa Cidadania para a Insígnia de B-P: ter realizado 100% das atividades do Guia do Projeto Pioneiro, elaborar e executar um projeto de relevância (Projeto de Vida) e revisar o seu Plano de Desenvolvimento Pessoal. 
                        </li>
                    </ol>
                    <Image 
                        alt=""
                        width={970}
                        height={350}
                        src={'/images/cla01.jpeg'}
                        className={styles.image}
                    />
                    <p className={styles.paragraph}>
                        Pontos importantes para a Conquista da Insígnia de B-P:
                    </p>
                    <p className={styles.paragraph}>
                        <b>
                            Ao jovem especialmente recomendado pelos Mestres Pioneiros e pelo Conselho de Clã, que:  
                        </b>
                    </p>
                    <ul>
                        <li className={`${styles.paragraph} ${styles.recuo}`}> 
                            Tenha realizado 100% das atividades do Guia do Projeto Pioneiro;
                        </li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Tenha revisado seu Plano de Desenvolvimento Pessoal (Projeto de Vida);
                        </li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Tenha elaborado e executado um projeto pessoal, de relevância, com duração de no mínimo quatro meses, de sua livre escolha, cujo conteúdo seja aprovado pela Comissão Administrativa do Clã, que deverá cobrir os seguintes aspectos:
                        </li>
                        <ol>
                            <li className={`${styles.paragraph} ${styles.recuo}`}>
                                Cujo conteúdo atenda uma das áreas prioritárias: Serviço, Natureza, Trabalho ou Viagem;
                            </li>
                            <li className={`${styles.paragraph} ${styles.recuo}`}>
                                Escolha da ideia;
                            </li>
                            <li className={`${styles.paragraph} ${styles.recuo}`}>
                                Planejamento e programação;
                            </li>
                            <li className={`${styles.paragraph} ${styles.recuo}`}>
                                Organização;
                            </li>
                            <li className={`${styles.paragraph} ${styles.recuo}`}>
                                Coordenação;
                            </li>
                            <li className={`${styles.paragraph} ${styles.recuo}`}>
                                Execução;
                            </li>
                            <li className={`${styles.paragraph} ${styles.recuo}`}>
                                Avaliação;
                            </li>
                            <li className={`${styles.paragraph} ${styles.recuo}`}>
                                Relatório;
                            </li>
                        </ol>
                    </ul>
                    <br />
                    <p className={styles.paragraph}>
                        <b>
                            Além dos distintivos de progressão e da Insígnia de B-P, o Ramo Pioneiro conta também com mais três insígnias:
                        </b>
                    </p>
                    <ul>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Insígnia do Cone Sul;
                        </li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                            Insígnia da Lusofonia;
                        </li>
                        <li className={`${styles.paragraph} ${styles.recuo}`}>
                        I   Insígnia do Aprender.
                        </li>
                    </ul>
                    <p className={styles.paragraph}>
                        Se quiser saber mais sobre a Progressão Pessoal, recomendamos que você consulte o “Guia do Projeto Pioneiro”, um livro onde você poderá encontrar toda a informação necessária para progredir.
                    </p>
                    <br/>
                    <div 
                        className={`${styles.boxCliqueAqui} ${styles.colorPio}`}
                        onClick={()=>{
                            window.open('https://escoteiros.org.br/wp-content/uploads/2022/09/Fluxogramas_de_progressao_ramo_pioneiro.pdf', '_blanck')
                        }}
                    >
                        <span>
                            Clique aqui para baixar o fluxograma da sua progressão do ramo Pioneiro.
                        </span>
                    </div>  
                </div>
            </div>
        </Section>
    )
}