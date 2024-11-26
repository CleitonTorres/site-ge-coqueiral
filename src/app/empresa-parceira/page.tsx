'use client'
import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import Image from 'next/image';
import Botton from '@/components/form/botton/botton';

export default function Page(){
    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <h1 className={styles.title}>Empresa Parceira</h1>
            <div className={styles.conteiner}>
                <div className={styles.subConteiner}>
                    <Image 
                        alt=""
                        width={970}
                        height={350}
                        src={'/images/empresaParceira02.png'}
                        className={styles.image}
                    />
                    <h1 className={styles.subTitle}>
                        Bem-vindo ao Empresa Parceira!
                    </h1>
                    <p className={styles.paragraph}>
                        Uma iniciativa do 19º Grupo Escoteiro Coqueiral, veja abaixo as vantagens para sua empresa e o perfil de nosso Grupo Escoteiro:
                    </p>
                    <ul className={styles.boxLinks}>
                        <li className={`${styles.card} boxShadow cursoPointer`}>
                            <Image alt='' width={80} height={40} src={'/icons/florLis.png'}/>
                            <a href=""><span className={styles.destaque}>36</span> anos de existência</a>
                        </li>
                        <li className={`${styles.cardTop} boxShadow cursoPointer`}>
                            <Image 
                                alt='' 
                                width={80} 
                                height={40} 
                                style={{position: 'absolute', bottom: 50}}
                                src={'/icons/florLis.png'}
                            />
                            <a href="">com <span className={styles.destaque}>50</span> membros associados</a>
                        </li>
                        <li className={`${styles.card} boxShadow cursoPointer`}>
                            <Image alt='' width={80} height={40} src={'/icons/florLis.png'}/>
                            <a href="">Atuante no bairro <span className={styles.destaque}>Coqueiral</span> e litoral de Aracruz</a>
                        </li>
                        <li className={`${styles.cardTop} boxShadow cursoPointer`}>
                            <Image 
                                alt='' 
                                width={80} 
                                height={40} 
                                style={{position: 'absolute', bottom: 40}}
                                src={'/icons/florLis.png'}
                            />
                            <a href="">acesso <span className={styles.destaque}>antecipado</span> a agenda do grupo</a>
                        </li>
                        <li className={`${styles.cardTop} boxShadow cursoPointer`}>
                            <Image 
                                alt='' 
                                width={80} 
                                height={40} 
                                style={{position: 'absolute', bottom: 20}}
                                src={'/icons/florLis.png'}
                            />
                            <a href="">sua <span className={styles.destaque}>empresa</span> pode atuar como voluntária em eventos</a>
                        </li>
                        <li className={`${styles.card} boxShadow cursoPointer`}>
                            <Image alt='' width={80} height={40} src={'/icons/florLis.png'}/>
                            <a href="">Divulgação da sua marca em nossas mídias <span className={styles.destaque}>Sociais</span></a>
                        </li>
                        <li className={`${styles.cardTop} boxShadow cursoPointer`}>
                            <Image 
                                alt='' 
                                width={80} 
                                height={40} 
                                src={'/icons/florLis.png'}
                                style={{position: 'absolute', bottom: 20}}
                            />
                            <a href="">Ofereça um dia de atividade <span className={styles.destaque}>Escoteira</span> para seus funcionários</a>
                        </li>
                    </ul>
                    <br />
                    <h1 className={styles.subTitle}>
                        Missão do Programa
                    </h1>
                    <p className={styles.paragraph}>
                        O objetivo do programa Empresa Parceira é incentivar e reconhecer empresas que desejam fazer a diferença. Buscamos parceiros comprometidos com a geração de impacto positivo, apoiando a educação não formal e o Escotismo no Bairro Coqueiral. 
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        Isso é feito através do estabelecimento de parcerias sólidas entre os Escoteiros de Coqueiral e empresas socialmente responsáveis, que se comprometem com doações recorrentes. As doações são destinada a melhoria constante e ampliação do Escotismo em nossa comunidade.
                    </p>
                    <br />
                   
                   <Botton  
                        title='Quero ser um parceiro' 
                        action={()=>window.open('https://forms.gle/N8nZeHppNmf4BtPe6', '_blank')}
                        customClass={['width300', 'margin0']}
                    />
                    <br />
                    <br />
                    <p className={styles.paragraph}>
                        A relevância das relações do movimento escoteiro tem sido comprovada mediante diversas atividades realizadas em conjunto com a Prefeitura de Aracruz e a Comunidade do Bairro Coqueiral. 
                        Um dos reconhecimentos da relevância do Movimento Escoteiro em Coqueiral foi seu reconhecimento como Entidade de Interesse Público Municipal (Lei 2651/03) e e Estadual (Lei 12.133/24).
                        Também temos a publicação da lei municipal 4.206/2018 que institui a “Semana Municipal do Escoteiro”.
                        Como compromisso fixos anuais o 19º/ES GE Coqueiral as seguintes atividades locais (em Coqueiral e litoral aracruzense).
                    </p>
                    <br />
                    <ul>
                        <li className={`${styles.paragraph}`}>
                            <b>MUTECO</b>: é uma grande ação ecológica que movimenta os escoteiros de todo o País, além de ser uma grande oportunidade para que todos os jovens reflitam sobre a importância do Meio Ambiente em suas vidas, nos 19º GE Coqueiral anualmente realizamos e atuamos como parceiros em eventos de recolhimento de resíduos sólidos de praias, mangues, restinga e bosques da nossa comunidade e litoral. Também realizamos ações de proteção direta do bosque chamado Trilha dos Camarás na qual fazemos a limpeza e mantemos o nosso Campo Escola, bem como o plantio de árvores e distribuição de sementes. O 19º GE Coqueiral tem especial apreço pela APA Costa das Algas atuando como educadores e conscientizadores da importância da proteção dessa APA que é uma Unidade de Conservação da vida marinha e que tem abrangência do litoral de Serra à Aracruz.
                        </li>
                        <br />
                        <li className={`${styles.paragraph}`}>
                            <b>MUTICOM</b>: é uma atividade de mobilização nacional voltada à integração e colaboração dos Escoteiros do Brasil com a sociedade, espalhadas em todo o território nacional. O MutCom é uma oportunidade de proporcionar às crianças, adolescentes e jovens atividades de serviço comunitário que exerçam a função de estimular seu envolvimento com a comunidade, no intuito de promover a formação do indivíduo que queremos entregar à sociedade. 
                        </li>
                        <br />
                        <li className={`${styles.paragraph}`}>
                            <b>EDUCAÇÃO ESCOTEIRA</b>: O Educação Escoteira é um projeto anual que tem o objetivo mostrar para a comunidade um pouco do universo escoteiro nesse grande evento os escoteiros visitam escolas locais e aplicam atividades educativas baseadas no método escoteiro.
                            O GE 19/ES Coqueiral, em parceira com as escolas local de Coqueiral Primo Biti, EMEF Coqueiral, CMEI Balão Mágico, EMPI Três Palmeiras e Colibri, já realizou, e realiza anualmente, a Educação Escoteira neste dia as escolas abrem as portas para o movimento escoteiro e nossos educadores (chefes escoteiros) transmitem a mensagem e o método escoteiro para as crianças e adolescentes.
                            Além das ações acima, iniciamos recentemente o projeto Escoteiro Dev que consiste na oferta gratuita aulas de programação básica e princípios de Web Design para crianças e jovens a partir dos 11 anos que visando atender a uma demanda educativa no ramo de conhecimento Ciência e Tecnologia, e em decorrência do nosso comprometimento com os ODSs, em especial o ODS 4 (Educação de qualidade) e ODS 9 (Indústria, inovação e infraestrutura), proporcionando a nossa comunidade mais opções de educação com viés tecnológico que seja acessível a todos.
                        </li>
                        <br />
                        <li className={`${styles.paragraph}`}>
                            <b>PROJETO ESCOTEIRO DEV</b>: O presente projeto é oferecido pelo 19º Grupo Escoteiro Coqueiral, tem a finalidade de atender uma demanda educativa no ramo de conhecimento Ciência e Tecnologia, e em decorrência do nosso comprometimento com os ODSs (Objetivos de Desenvolvimento Sustentáveis - https://brasil.un.org/pt-br), em especial o ODS 4 (Educação de qualidade) e ODS 9 (Indústria, inovação e infraestrutura), e ODS (Tecnologia) 17.8. E visando proporcionar a nossa comunidade mais opções de educação com viés tecnológico que seja acessível a todos, o 19º GE Coqueiral abriu vagas para interessados da comunidade (não escoteiros) para serem beneficiados por esse projeto.
                            Como todo projeto em início de carreira existem desafios a serem superados, como a falta de um local apropriado para as aulas pois atualmente usamos nossa sala na sede escoteira que não tem ar condicionado nem uma estrutura apropriada projeção digital como TV ou tela de projeção e devido a sede ser exposta diariamente ao sol intenso isso causa uma temperatura bem elevada nas salas o que é bem desagradável para os jovens e voluntários. Precisamos também adiquirir alguns notebooks para serem usados na aula por alunos que eventualmente não possuem esse equipamento.
                        </li>
                    </ul>
                </div>
            </div>
        </Section>
    )
}