import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import Image from 'next/image';

export default function Page(){
    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <h1 className={styles.title}>Ciclo de Vida</h1>
            <div className={styles.conteiner}>
                <div className={styles.subConteiner}>
                    <Image 
                        alt=""
                        width={970}
                        height={350}
                        src={'/images/senior02.jpg'}
                        className={styles.image}
                    />
                    <h1 className={styles.subTitle}>
                        Modelo de Gestão de adultos 
                    </h1>
                    <p className={styles.paragraph}>
                        O modelo de Gestão de adultos dos Escoteiros do Brasil traz ênfase no Ciclo de vida.
                    </p>
                    <p className={styles.paragraph}>
                        O processo do ciclo de vida é um processo que garante a qualidade de vida dos adultos dentro da organização. É uma ferramenta que trata de valorizar a presença do adulto, possibilitando que ele possa sempre entregar o seu melhor, lembrando sempre às estruturas diretivas da organização, o cuidado e reconhecimento necessário a todos que se dedicam ao escotismo.
                    </p>
                    <p className={styles.paragraph}>
                        No Movimento Escoteiro, a participação de adultos comprometidos e aptos para a prática do Escotismo garante a qualidade na entrega dos resultados esperados pela Organização. 
                    </p>
                    <br />
                    <h1 className={styles.subTitle}>
                        O Sistema de Formação de Adultos
                    </h1>
                    <p className={styles.paragraph}>
                        O Sistema de Formação de Adultos é parte fundamental no processo de aprendizagem do voluntário. Todo adulto que venha a desempenhar cargo ou função, como escotista ou dirigente, tem o direito e o dever de se aperfeiçoar ao máximo possível para desempenhar suas responsabilidades no Escotismo da melhor forma.
                    </p>
                    <p className={styles.paragraph}>
                        O processo de formação dos adultos compreende todo o ciclo de vida do adulto no Movimento Escoteiro, por meio de uma formação personalizada e contínua, estimulando a autoaprendizagem e o desenvolvimento de competências em três áreas: conhecimento e como aplicá-lo na solução de problemas; habilidades desenvolvidas por meio da experiência real; e valores e atitudes.
                    </p>
                    <p className={styles.paragraph}>
                        O processo de formação é composto por duas linhas:
                    </p>
                    <br />
                    <ul>
                        <li className={styles.paragraph}>
                            <b>Escotista</b> (que atua diretamente com os jovens);
                        </li>
                        <li className={styles.paragraph}>
                            <b>Dirigente</b> (que trabalha na administração do grupo escoteiro).
                        </li>
                    </ul>
                    <br />
                    <p className={styles.paragraph}>
                        Cada linha de formação se dá a partir da vivência de rotas de aprendizagem específicas (divididas em 3 níveis progressivos),  com o objetivo de desenvolver um conjunto de competências que contribui para a boa prática do Escotismo.
                    </p>
                    <ul>
                        <li className={styles.paragraph}>
                            <b>Nível Preliminar</b> – É evidenciado com comportamentos que demonstram a capacidade de realizar relações simples entre conceitos e elementos próprios do cargo/função e seu dia a dia.
                        </li>
                        <li className={styles.paragraph}>
                            <b>Nível Intermediário</b> – É evidenciado a partir de comportamentos que demonstram a execução, aplicação e análise permitindo relações entre conceitos e elementos próprios do cargo/função e seu dia a dia, possibilitando a percepção de causa-efeito de suas ações.
                        </li>
                        <li className={styles.paragraph}>
                            <b>Nível Avançado</b> – : É evidenciado em comportamentos que demonstram a capacidade de sintetizar conceitos, propor novas ideias e a melhoria contínua a partir da autoavaliação/avaliação crítica dos conceitos e elementos próprios do cargo/função e seu dia a dia.
                        </li>
                    </ul>
                    <br />
                    <p className={styles.paragraph}>
                        Ao concluir o Nível Avançado o voluntário então recebe a certificação da Insígnia de Madeira.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        <b>
                            Manuais de Competências e Rotas de Aprendizagem
                        </b>
                    </p>
                    <ul className={styles.boxLinks}>
                        <li className='boxShadow'>
                            <Image alt='' width={80} height={100} src={'/icons/IconeDoc.png'}/>
                            <a href="https://www.escoteiros.org.br/wp-content/uploads/2020/07/Compete%CC%82ncias-e-Rotas-de-Aprendizagem-Ramo-Lobinho.pdf" target='_blank'>Ramo Lobinho</a>
                        </li>
                        <li className='boxShadow'>
                            <Image alt='' width={80} height={100} src={'/icons/IconeDoc.png'}/>
                            <a href="https://www.escoteiros.org.br/wp-content/uploads/2020/07/COMPETENCIAS-ESPECIFICAS-RAMO-ESCOTEIRO.pdf" target='_blank'>Ramo Escoteiro</a>
                        </li>
                        <li className='boxShadow'>
                            <Image alt='' width={80} height={100} src={'/icons/IconeDoc.png'}/>
                            <a href="https://www.escoteiros.org.br/wp-content/uploads/2020/07/COMPETENCIAS-ESPECIFICAS-RAMO-SENIOR.pdf" target='_blank'>Ramo Sênior</a>
                        </li>
                        <li className='boxShadow'>
                            <Image alt='' width={80} height={100} src={'/icons/IconeDoc.png'}/>
                            <a href="https://www.escoteiros.org.br/wp-content/uploads/2020/07/COMPETENCIAS-ESPECI%CC%81FICAS-RAMO-PIONEIRO.pdf" target='_blank'>Ramo Pioneiro</a>
                        </li>
                        <li className='boxShadow'>
                            <Image alt='' width={80} height={100} src={'/icons/IconeDoc.png'}/>
                            <a href="https://www.escoteiros.org.br/wp-content/uploads/2020/07/Competencias-e-Rotas-de-Aprendizagem-Dirigente.pdf" target='_blank'>Dirigente</a>
                        </li>
                    </ul>
                </div>
            </div>
        </Section>
    )
}