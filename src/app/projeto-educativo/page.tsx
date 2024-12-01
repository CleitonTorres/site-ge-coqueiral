import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import Image from 'next/image';

export default function Page(){
    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <h1 className={styles.title}>Projeto Educativo</h1>
            <div className={styles.conteiner}>
                <div className={styles.subConteiner}>
                    <Image 
                        alt=""
                        width={970}
                        height={350}
                        src={'/images/senior20.jpeg'}
                        className={styles.image}
                    />
                    <p className={styles.paragraph}>
                        O Movimento Escoteiro foi criado, por essência, para ser um movimento voltado para o jovem, e também feito por eles, com o auxílio de adultos voluntários. Se chama movimento por estar sempre em constante transformação, acompanhando as mudanças da geração, mas sem perder seu propósito educacional.
                    </p>
                    <p className={styles.paragraph}>
                        Com atividades variadas e atraentes, o Escotismo incentiva os jovens a assumirem seu próprio desenvolvimento. Através da vivência nas Unidades Escoteiras Locais, os jovens aprendem e tomam gosto por se envolverem com a comunidade, se transformando em verdadeiros líderes. Por meio da proatividade e da preocupação com o próximo e com o meio ambiente, os jovens são engajados em construir um mundo melhor, mais justo e mais fraterno.
                    </p>
                    <p className={styles.paragraph}>
                        É no grupo escoteiro que o Escotismo verdadeiramente acontece. Quem aplica as atividades, dinâmicas e ajuda os escoteiros são os adultos voluntários, conhecidos por escotistas. Os jovens, por sua vez, são divididos conforme sua faixa etária para que o Programa Educativo possa ser trabalhado nas seis áreas de desenvolvimento: físico, intelectual, social, afetivo, espiritual e de caráter, com base nas características individuais de cada fase.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        O Programa Educativo foi pensando para estar inserido no cotidiano dos jovens, de acordo com suas necessidades de crescimento e do meio onde os jovens se desenvolvem, se adaptando a diferentes realidades e respeitando sua autonomia.
                    </p>
                    <p className={styles.paragraph}>
                        Pensando global e agindo local, o Escotismo acredita que, por meio de boas e pequenas ações, podemos transformar o mundo. Mundialmente, o Movimento Escoteiro pretende ser o mais importante movimento educacional juvenil do mundo, possibilitando que 100 milhões de jovens sejam cidadãos ativos em suas comunidades e no mundo, baseados em valores comuns.
                    </p>
                    <br />
                    <p className={styles.subTitle}>
                        Educação para a Vida
                    </p>
                    <p className={styles.paragraph}>
                        Entendemos que a educação é um processo que se estende ao longo da vida e que promove o desenvolvimento integral e permanente do potencial  de  uma pessoa,  como indivíduo  e  como membro da sociedade. Nossa proposta educativa busca ajudar na construção de um mundo melhor, através de uma sociedade mais justa, solidária e equitativa, onde as pessoas se realizem como indivíduos e desempenhem um papel construtivo na sociedade. 
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        O Movimento Escoteiro proporciona, de forma progressiva, oportunidades para que crianças, adolescentes e jovens cresçam como pessoas, desenvolvendo-se como indivíduos responsáveis, solidários, autônomos e comprometidos, de acordo com um sistema de valores baseado na Lei e Promessa Escoteira. Colaboramos de maneira determinante para a aquisição de competências para a vida, tais como autonomia, autoconfiança, determinação, liderança, respeito pela diversidade, habilidades para lidar com a complexidade, entre outros.
                    </p>
                    <br />
                    
                    <p className={styles.subTitle}>
                        Projeto Educativo
                    </p>
                    
                    <p className={styles.paragraph}>
                        O Projeto Educativo dos Escoteiros do Brasil é o conjunto de ideias e definições fundamentais que outorgam identidade e propósito à nossa organização, explicitando nossa proposta educativa e especificando os meios necessários para alcançá-la. É, em síntese, uma proclamação que justifica a nossa existência.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        Finalmente, nosso Projeto Educativo descreve o perfil de pessoas que aspiramos, expressando o conjunto de características desejáveis ao final de sua permanência no Movimento Escoteiro.
                    </p>
                    <ul className={styles.boxLinks}>
                        <li className='boxShadow cursoPointer'>
                            <Image alt='' width={80} height={100} src={'/icons/IconeDoc.png'}/>
                            <a href="https://www.escoteiros.org.br/wp-content/uploads/2021/09/ProjetoEducativo_2021.pdf" target='_blank'>Projeto Educativo</a>
                        </li>
                    </ul>
                </div>
            </div>
        </Section>
    )
}