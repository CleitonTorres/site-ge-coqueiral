'use client'
import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import Image from 'next/image';

export default function Page(){
    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <h1 className={styles.title}>Proteção Infantojuvenil</h1>
            <div className={styles.conteiner}>
                <div className={styles.subConteiner}>
                    <div className={`${styles.subConteiner}`}>
                        <Image 
                            alt=""
                            width={970}
                            height={350}
                            src={'/images/lobos01.jpg'}
                            className={`${styles.image}`}
                        />
                        <div className={styles.filter}></div>
                        <Image 
                            alt=""
                            width={200}
                            height={200}
                            src={'/icons/protecaoInfanto.png'}
                            className={styles.imageAbsolute}
                        />
                    </div>
                    <p className={styles.paragraph}>
                        Os Escoteiros do Brasil, como é de amplo conhecimento, é uma Instituição que tem como objeto a educação não-formal do público infantojuvenil. A atuação da nossa Instituição se norteia pelos valores descritos na Lei e Promessa Escoteira, e prima pelo máximo de cuidado e respeito para com o próximo.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        Com base nisso, há alguns anos os Escoteiros do Brasil criaram o Programa de Proteção Infantojuvenil, tal programa foi idealizado com o objetivo de fornecer instrumentos capazes de prevenir, proteger e coibir que situações de abuso ou violência contra crianças e jovens ocorram dentro do Movimento Escoteiro, por conseguinte, tal programa também beneficia nossos jovens e adultos para fora do Movimento, vez que o mesmo cria nas pessoas uma cultura de proteção.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        Hoje o Programa de Proteção Infantojuvenil dos Escoteiros do Brasil conta com o Curso EAD de Proteção Infantojuvenil, bem como com um teste a ser realizado pelo cursante ao final de sua capacitação. Tal curso é obrigatório e faz parte do processo de ingresso voluntário do movimento escoteiro, inclusive para aqueles jovens que antes eram beneficiários (jovens) e estão iniciando sua vida escoteira como adultos.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        Além do curso e do teste, os Escoteiros do Brasil têm pré-definido o perfil desejado do voluntário do Movimento Escoteiro, de modo que para ingressar, o adulto passa por uma entrevista com o Diretor do Grupo Escoteiro designado para tal tarefa, que verifica se o candidato a voluntário se enquadra no perfil requisitado. Tal perfil deve ser compatível com os valores e objetivos do Movimento Escoteiro.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        Como terceiro instrumento balizador da entrada de um novo voluntário no Movimento Escoteiro, é necessário que o candidato apresente sua ficha negativa de antecedentes criminais, para que a Instituição tenha conhecimento da vida pregressa daquela pessoa que está se candidatando a trabalhar com crianças e jovens. Tais medidas são realizadas com apenas um objetivo, resguardar nossas crianças e jovens de qualquer ameaça a sua integridade física e emocional.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        Ademais, ao longo da sua permanência na associação, o voluntário é instado a refazer o curso nas seguintes situações: antes de atividades nacionais de grande porte ou atividades escoteiras internacionais. Tão importante quanto capacitar o voluntário, é fomentar uma cultura permanente a respeito da proteção infantojuvenil.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        No que toca a promoção da cultura de proteção da criança e do jovem, cumpre destacar que existem instrumentos dentro do programa escoteiro para fomentar essa cultura, como: a presença permanente de mais de um adulto em atividades fora da sede do Grupo Escoteiro, e em caso de patrulhas mista, pede-se que tenham Chefes de ambos os sexos; o contato físico entre pares e entre jovens e adultos deve ser respeitoso, sem contatos íntimos; não deve haver contatos individuais entre jovens e adultos sem que estejam à vista de outros jovens ou Chefes, adultos e jovens devem respeitar a privacidade uns dos outros, de modo que banheiros e barracas devem ser separados, respeitando ainda a divisão destes por gênero; todos precisam participar das atividades com trajes adequados à ocasião, jamais utilizando-se de trajes íntimos ou nudez; entre outros instrumentos que podem ser encontrados nos materiais acerca do tema dentro do nosso site.
                    </p>
                    <br />

                    <Image 
                        alt=""
                        width={970}
                        height={350}
                        src={'/images/grupo00.jpg'}
                        className={styles.image}
                    />

                    <p className={styles.paragraph}>
                        Importante destacar que a presença dos pais/responsáveis é fundamental, senão, vital para a vida do Grupo Escoteiros, tendo em vista que na maioria das vezes os voluntários são pais de jovens que ingressam no movimento junto de seus filhos e acabam por acompanhar a vida escoteira do filho internamente. Os pais costumam compor a Diretoria do Grupo Escoteiro, atuando como Dirigentes, ou ainda atuam como Escotistas, nas sessões escoteiras.
                    </p>
                    <br />

                    <p className={styles.paragraph}>
                        Destacamos que são os Diretores dos Grupos Escoteiros quem nomeiam os voluntários, Escotistas, que atuarão diretamente com os jovens, e que também podem retirar a nomeação em caso de falta de confiança no voluntário. Assim verificamos quão importante é a presença dos pais/responsáveis no dia-a-dia da vida escoteira do seu filho.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        Além desses instrumentos que já são prática rotineira dos Escoteiros do Brasil, estamos atualizando o nosso Programa de Proteção Infantojuvenil para aprimorá-lo e adequá-lo ao programa que vem sendo instituído pela Organização Mundial do Movimento Escoteiro para eventos internacionais escoteiros, como acampamentos internacionais e afins, que numa tradução literal se chama A Salvo do Perigo (Safe from Harm).
                    </p>   
                    <br />
                    <p className={styles.paragraph}>
                        Esta atualização abarca a criação da Política que servirá para orientar o Programa de Safe from Harm, o qual será um programa que abrangerá mais aspectos dos que aqueles abrangidos pelo nosso atual Programa de Proteção Infantojuvenil. Algumas das nossas principais iniciativas dentro dessa atualização, além da criação da referida Política, é a implementação de um sistema de responsabilização compartilhada entre os chefes escoteiros e os pais/responsável, para que tenhamos pais mais ativos na vida de seus filhos, acompanhando o meio em que seu filho está inserido.
                    </p>   
                    <br />
                    <p className={styles.paragraph}>
                        Ainda, da instrução para pais e voluntários, o novo programa terá também seu foco voltado para a maior disseminação da cultura da proteção infantojuvenil entre os jovens, de modo que lançaremos instrumentos capazes de fazer com que os jovens reconheçam situações e indícios de práticas de abuso ou de violência infantojuvenil, de modo que tal cultura de proteção permeie todos dentro dos Escoteiros do Brasil.
                    </p>   
                    <br />

                    <a href="https://ead.escoteiros.org.br/course/view.php?id=390" target='_blank'>
                        <Image 
                            alt='' 
                            width={280} 
                            height={120} 
                            src={'/icons/botao2-768x309.jpg'}
                            style={{objectFit: "contain"}}
                        />
                    </a>
                    <h1 className={styles.subTitle}>
                        Downloads Proteção Infantojuvenil
                    </h1>

                    <ul className={styles.boxLinks}>
                        <li className='boxShadow cursoPointer'>
                            <Image alt='' width={80} height={90} src={'/icons/IconeDoc.png'}/>
                            <a href="https://www.escoteiros.org.br/wp-content/uploads/2022/04/SFH-v2.pdf" target='_blank'>
                                Iniciativas de Proteção InfantoJuvenil
                            </a>
                        </li>
                        <li className='boxShadow cursoPointer'>
                            <Image alt='' width={80} height={90} src={'/icons/IconeDoc.png'}/>
                            <a href="https://www.escoteiros.org.br/wp-content/uploads/2020/07/protecao_da_crianca_e_do_adolescente_manual_para_pais.pdf" target='_blank'>
                                Proteção da Criança e do Adolescente
                            </a>
                            <h5>Manual dos pais</h5>
                        </li>
                        <li className='boxShadow cursoPointer'>
                            <Image alt='' width={80} height={90} src={'/icons/IconeDoc.png'}/>
                            <a href="https://www.escoteiros.org.br/wp-content/uploads/2020/07/protecao_da_crianca_e_do_adolecente_manual_para_escotistas.pdf" target='_blank'>
                                Proteção da Criança e do Adolescente
                            </a>
                            <h5>Manual para Escotistas</h5>
                        </li>
                        <li className='boxShadow cursoPointer'>
                            <Image alt='' width={80} height={90} src={'/icons/IconeDoc.png'}/>
                            <a href="https://www.escoteiros.org.br/wp-content/uploads/2020/07/papo_reto.pdf" target='_blank'>
                                Cartilha Papo Reto
                            </a>
                            <h5>Cartilha sobre drogas</h5>
                        </li>
                        <li className='boxShadow cursoPointer'>
                            <Image alt='' width={80} height={90} src={'/icons/IconeDoc.png'}/>
                            <a href="https://www.escoteiros.org.br/wp-content/uploads/2020/07/O_que_e%CC%81_o_bullying.pdf" target='_blank'>
                                O que é bullying?
                            </a>
                        </li>
                        <li className='boxShadow cursoPointer'>
                            <Image alt='' width={80} height={90} src={'/icons/IconeDoc.png'}/>
                            <a href="https://www.escoteiros.org.br/wp-content/uploads/2020/07/O_que_e%CC%81_o_bullying.pdf" target='_blank'>
                                Bullying e Cyberbullying
                            </a>
                            <h5>O que todos devem saber no Movimento Escoteiro</h5>
                        </li>
                        <li className='boxShadow cursoPointer'>
                            <Image alt='' width={80} height={90} src={'/icons/IconeDoc.png'}/>
                            <a href="https://www.escoteiros.org.br/wp-content/uploads/2020/07/Sendo_humano.pdf" target='_blank'>
                                Bullying - Sendo Humano
                            </a>
                        </li>
                        <li className='boxShadow cursoPointer'>
                            <Image alt='' width={80} height={90} src={'/icons/IconeDoc.png'}/>
                            <a href="https://www.escoteiros.org.br/wp-content/uploads/2020/07/Declarac%CC%A7a%CC%83o-contra-o-Bullying-Regia%CC%83o-Interamericana.pdf" target='_blank'>
                                Declaração contra o Bullying
                            </a>
                            <h5>Documento da Região Interamericana</h5>
                        </li>
                        <li className='boxShadow cursoPointer'>
                            <Image alt='' width={80} height={90} src={'/icons/IconeDoc.png'}/>
                            <a href="https://www.escoteiros.org.br/wp-content/uploads/2020/07/ficha_tecnica_bullying.pdf" target='_blank'>
                                Ficha Técnica Bullying
                            </a>
                        </li>
                        <li className='boxShadow cursoPointer'>
                            <Image alt='' width={80} height={90} src={'/icons/IconeDoc.png'}/>
                            <a href="https://www.escoteiros.org.br/wp-content/uploads/2020/07/Resgate.pdf" target='_blank'>
                                Quadrinho - Resgate
                            </a>
                        </li>
                        <li className='boxShadow cursoPointer'>
                            <Image alt='' width={80} height={90} src={'/icons/IconeDoc.png'}/>
                            <a href="https://www.escoteiros.org.br/wp-content/uploads/2020/07/Encurralada.pdf" target='_blank'>
                                Quadrinho - Encurralada
                            </a>
                        </li>
                    </ul>
                    <br />
                </div>
            </div>
        </Section>
    )
}