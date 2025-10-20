import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import Image from 'next/image';

export default function Page(){
    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <h1 className={styles.title}>Escoteiro Dev</h1>
            <div className={styles.conteiner}>
                <div className={styles.subConteiner}>
                    <Image 
                        alt=""
                        width={970}
                        height={350}
                        src={'/images/escoteiro-dev.jpg'}
                        className={styles.image}
                    /> 
                    <h6>presentes na foto: Tânia representando a parceira Number One, tutor ch. Cleiton e jovens alunos escoteiros e não escoteiros.</h6>
                    <br />
                    
                    <p className={styles.paragraph}>
                        A presente curso é oferecido pelo 19º ES Grupo Escoteiro Coqueiral, CNPJ nº 05.991.537/0001-84, fundado em 04/09/1988, associação civil de direito privado e sem fins lucrativos, entidade de utilidade pública municipal, de caráter educacional, cultural, beneficente, filantrópico e comunitário, destinado à prática da educação informal sob a forma do Escotismo, com sede na Av. dos Coqueiros, s/n, anexo a Oficina de Artes, Coqueiral, Aracruz/ES, CEP 29.199-054.                    
                    </p>
                    <br />
                    <h1 className={styles.subTitle}>
                        O projeto.
                    </h1>
                    <p className={styles.paragraph}>
                        A fim de atender a uma demanda educativa no ramo de conhecimento Ciência e Tecnologia, e em decorrência do nosso comprometimento com os ODSs, em especial o ODS 4 (Educação de qualidade) e ODS 9 (Indústria, inovação e infraestrutura), e visando proporcionar a nossa comunidade mais opções de educação com viés tecnológico que seja acessível a todos o 19º GE Coqueiral abriu vagas para interessados da comunidade (não escoteiros) para serem beneficiados por esse projeto.
                    </p>
                    <br />
                    <h1 className={styles.subTitle}>
                        Das inscrições.
                    </h1>
                    <p className={styles.paragraph}>
                        As inscrições são feitas por meio do preenchimento do formulário abaixo, de forma gratuita e voluntária. Não há custos de participação, havendo como requisito o interesse do participante pelo assunto, o respeito aos demais participantes e aos princípios de ética e moral.
                    </p>
                    <br />

                    <h1 className={styles.subTitle}>
                        Das condições
                    </h1>
                    <p className={styles.paragraph}>
                        Os interessados precisam ter mais de 10 anos e meio, ter afinidade por tecnologia, boa capacidade de leitura, possuir um equipamento notebook para estudo e aulas. Por se tratar de um projeto voluntário e que envolve crianças menores, a inscrição será feita em nome de um de seus responsáveis legais, sendo a criança cadastrada como beneficiária. Também deve ficar combinado entre a organização e os responsáveis/pais que este deve contribuir para garantir a segurança dos alunos e devem combinar com os outros responsáveis uma escala para que sempre tenha ao menos 1 responsável presente durante a tutoria.
                    </p>
                    <br />

                    <h1 className={styles.subTitle}>
                        Do conteúdo da tutoria.
                    </h1>
                    <p className={styles.paragraph}>
                        A curso será baseado, <b>mas não se limitando:</b>
                    </p>
                    <ul>
                        <li className={styles.paragraph}>
                            Nos primeiros 3 meses em informática básica.
                        </li>
                        <li className={styles.paragraph}>
                            Nos itens de especialidade de Programação e Web Design, quais são: <b>programação:</b> 1) conhecer a importância dos programas e aplicativos nas tarefas do dia-dia. 2) fundamentos e funções básicas da programação. 3) Conhecer as principais linguagens de programação e em critérios de hardware e software elas podem ser rodadas. 4) escrever seu primeiro programa de web que mostre a mensagem “Hello World”. 5) aprender sobre software livre. 6) aprender sobre as licenças de programas. 7) desenvolver um jogo ou aplicativo com temática escoteira. 8) conhecer funções avançadas e entender como ler ou encontrar sua documentação. 9) Conhecer os repositórios de código remotos. 10) Conhecer as IDEs. 11) conhecer algumas empresas de desenvolvimento de jogos digitais. 12) Conhecer o que são emuladores. 
                        </li>
                        <li className={styles.paragraph}>
                            <b>Web Design:</b> 1) Conhecer o que faz um web design. 2) conhecer o significado de web design, layout, wireframe, mapa do site, HTML, XHTML, JavaScript, CSS, acessibilidade e outros e conhecer os principais programas utilizados por web designers. 3) Construir o mapa de um site. 4) contribuir um wireframes. 5) construir um layout de site. 6) escrever o código HTML do layout construído.
                        </li>
                    </ul>
                    <br />
                    <h1 className={styles.subTitle}>
                        Horários.
                    </h1>
                    <p className={styles.paragraph}>
                        As aulas ocorrerão às quartas-feiras de 18:00 às 20:00, o dia é hora pode ser reajustado conforme a necessidade do tutor ou da maioria dos alunos.
                    </p>
                </div>
            </div>
        </Section>
    )
}