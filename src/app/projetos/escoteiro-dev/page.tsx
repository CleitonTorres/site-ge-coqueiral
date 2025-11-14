import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import Image from 'next/image';
import { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Escoteiro Dev",
    description:
      "O Escoteiro Dev é um curso é oferecido pelo 19º ES Grupo Escoteiro Coqueiral, CNPJ nº 05.991.537/0001-84, fundado em 04/09/1988, associação civil de direito privado e sem fins lucrativos...",
    keywords:
      "cultura, comunidade, impacto social, trabalho voluntário, projetos sociais, meio ambiente, educação, social, crianças, dia de semear paz",
    authors: [{ name: "19 Grupo Escoteiro Coqueiral" }],
    icons: {
      icon: "/favicon.ico",
    },
    metadataBase: new URL('https://www.19.escoteiroses.org.br/projetos/escoteiro-dev'),
    openGraph: {
        title: "Escoteiro Dev",
        description:
            "O Escoteiro Dev é um curso é oferecido pelo 19º ES Grupo Escoteiro Coqueiral, CNPJ nº 05.991.537/0001-84, fundado em 04/09/1988, associação civil de direito privado e sem fins lucrativos...",
        images: [],
        url: 'www.19.escoteiroses.org.br/projetos/escoteiro-dev'
    }
  };
}

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
                        <b>Nome do Projeto</b>: Escoteiro Dev <br />
                        <b>Proponente</b>: 19º Grupo Escoteiro Coqueiral - 05.991.537/0001-84 <br />
                        <b>Responsável</b>: Rubia Veiga Ribeiro Machado – Coordenador Geral <br />
                        <b>Tutor</b>: Cleiton Torres Machado – Programador Fullstack desde 2013 <br />
                        <b>Eixo de atuação</b>: Cultura Digital / Inclusão Social / Tecnologia / Inclusão Digital <br />
                        <b>Local de execução</b>: Coqueiral, Aracruz/ES.
                    </p>
                    <p className={styles.paragraph}>
                        O Projeto Escoteiro Dev (Dev de developer ou desenvolvedor em inglês) nasceu a fim de atender a uma demanda educativa no ramo de conhecimento Ciência e Tecnologia, e, em decorrência do comprometimento do 19º Grupo Escoteiro Coqueiral com os ODSs, em especial o ODS 4 (Educação de qualidade) e ODS 9 (Indústria, inovação e infraestrutura), e visando proporcionar a nossa comunidade mais opções de educação com viés tecnológico que seja acessível a todos o 19º GE Coqueiral decidiu implementar o projeto Escoteiro Dev com o seguinte objetivo.                    
                    </p>
                    <p className={styles.paragraph}>
                        O Projeto consiste no oferecimento de aulas gratuitas de Informática e Programação Básica a jovens de entre 11 e 17 anos de idade, adultos e povos originários moradores do litoral de Aracruz, escoteiros ou não escoteiros. A duração prevista do curso é de 10 meses, sendo uma aula semanal de 2 horas, com carga horaria total de 80 horas.
                    </p>
                    <br />
                    <h1 className={styles.subTitle}>
                        Das Inscrições
                    </h1>
                    <p className={styles.paragraph}>
                        As inscrições são feitas por um adulto legalmente responsável por meio do preenchimento do formulário de inscrição, de forma gratuita e voluntária. Não há custos de participação, havendo como requisito o interesse do participante pelo assunto, o respeito aos demais participantes e aos princípios de ética e moral.
                    </p>
                    <br />

                    <h1 className={styles.subTitle}>Das Condições</h1>
                    <p className={styles.paragraph}>
                        Os interessados precisam possuir mais de 11 anos de idade, ter afinidade por tecnologia, boa capacidade de leitura e cálculos básicos, possuir um equipamento notebook para estudo. Por se tratar de um projeto voluntário e que envolve crianças menores, a inscrição será feita em nome de um de seus responsáveis legais, sendo a criança cadastrada como beneficiária. Também fica combinado entre a organização e os responsáveis subscritos que este deve contribuir para garantir a segurança dos alunos e devem combinar com os outros responsáveis uma escala para que sempre tenha ao menos 1 responsável presente durante a tutoria.
                    </p>
                    <br />

                    <h1 className={styles.subTitle}>
                        Objetivo Geral
                    </h1>
                    <p className={styles.paragraph}>
                        Ofertar aulas de informática e programação básica visando garantir a conectividade, inclusão social, a cultura digital, a capacitação profissional e o acesso de comunidades carentes ou povos originários a tecnologias digitais a fim de fortalecer suas respectivas comunidades.
                    </p>
                    <br />

                    <h1 className={styles.subTitle}>
                        Objetivos Específicos
                    </h1>
                    <p className={styles.paragraph}>
                        •	Estimular a criatividade e o convívio social por meio tecnologia e criação de jogos eletrônicos. <br />
                        •	Oferecer aulas gratuitas de informática e programação básica para crianças, adolescentes, jovens e adultos. <br />
                        •	Alfabetização tecnológica para adultos e povos originários a fim de incluí-los no mercado de trabalho. <br />
                        •	Promover o acesso democrático à cultura digital e à tecnologia. <br />
                        •	Estimular o pensamento lógico e criativo por meio de metodologias práticas de aprendizagem. <br />
                        •	Incentivar o protagonismo juvenil e o trabalho em equipe através da criação de projetos digitais colaborativos. <br />
                        •	Despertar o interesse por carreiras tecnológicas e contribuir para a inclusão produtiva e social. <br />
                        •	Difundir a cultura do software livre e da cidadania digital.

                    </p>
                    <br />

                    <h1 className={styles.subTitle}>
                        Do conteúdo da tutoria.
                    </h1>
                    <p className={styles.paragraph}>
                        A curso será baseado, <b>mas não se limitando:</b>
                    </p>
                    <p className={styles.paragraph}>
                        •	Nos primeiros 3 meses em informática básica. <br />
                        •	Nos 7 meses seguinte: <b>programação:</b> 1) conhecer a importância dos programas e aplicativos nas tarefas do dia-dia. 2) fundamentos e funções básicas da programação. 3) Conhecer as principais linguagens de programação e em critérios de hardware e software elas podem ser rodadas. 4) escrever seu primeiro programa de web que mostre a mensagem “Hello World”. 5) aprender sobre software livre. 6) aprender sobre as licenças de programas. 7) desenvolver um jogo ou aplicativo com temática escoteira. 8) conhecer funções avançadas e entender como ler ou encontrar sua documentação. 9) Conhecer os repositórios de código remotos. 10) Conhecer as IDEs. 11) conhecer algumas empresas de desenvolvimento de jogos digitais. 12) Conhecer o que são emuladores. 
                        <b>Web Design:</b> 1) Conhecer o que faz um web design. 2) conhecer o significado de web design, layout, wireframe, mapa do site, HTML, XHTML, JavaScript, CSS, acessibilidade e outros e conhecer os principais programas utilizados por web designers. 3) Construir o mapa de um site. 4) construir um layout de site. 5) escrever o código HTML do layout construído.
                    </p>
                    <br />
                    <h1 className={styles.subTitle}>
                        Horários.
                    </h1>
                    <p className={styles.paragraph}>
                        As aulas ocorrerão às quartas-feiras de 18:00 às 20:00, o dia é hora pode ser reajustado conforme a necessidade do tutor ou da maioria dos alunos.
                    </p>
                    <br />
                    <h1 className={styles.subTitle}>
                        Justificativa
                    </h1>
                    <p className={styles.paragraph}>
                        A sociedade contemporânea é profundamente influenciada pela tecnologia digital, tornando essencial o domínio de ferramentas de informática e noções básicas de programação. Entretanto, muitos jovens - especialmente de comunidades periféricas, tradicionais e rurais - ainda não têm acesso equitativo a esses conhecimentos.
                    </p>
                    <p className={styles.paragraph}>
                        O projeto Escoteiro Dev surge como uma resposta a essa lacuna, unindo a proposta educativa do movimento escoteiro à cultura digital, e promovendo o ODS 4 (Educação de Qualidade) e ODS 9 (Indústria, Inovação e Infraestrutura).
                    </p>
                    <p className={styles.paragraph}>
                        Ao proporcionar um espaço de aprendizagem gratuita, colaborativa e prática, o projeto fomenta inclusão social, criatividade, inovação e protagonismo juvenil, transformando o acesso à tecnologia em uma ferramenta de cidadania e desenvolvimento cultural.
                    </p>
                    <br />

                    <h1 className={styles.subTitle}>
                        Metodologia
                    </h1>
                    <p className={styles.paragraph}>
                        A metodologia do projeto será baseada no “aprender fazendo” (learning by doing) e no “aprendizado por meio de projetos”, inspirando-se em práticas pedagógicas ativas.
                    </p>
                    <p className={styles.paragraph}>
                        As aulas serão divididas em dois módulos:
                    </p>
                    <p className={styles.paragraph}>
                        1.	Informática Básica: domínio das funções fundamentais do computador, segurança digital, hardware e software. <br />
                        2.	Programação e Web Design: introdução à lógica de programação, HTML, CSS, JavaScript e criação de pequenos projetos interativos.
                    </p>
                    <p className={styles.paragraph}>
                        Cada turma desenvolverá um projeto final autoral, como um site, jogo ou aplicativo com temática escoteira ou comunitária, aplicando na prática os conhecimentos adquiridos.
                        As atividades priorizam o trabalho em grupo, a resolução de problemas reais e a criação colaborativa, estimulando a autonomia e o protagonismo dos participantes.
                    </p>
                    <br />
                    <h1 className={styles.subTitle}>
                        Resultados Esperados
                    </h1>
                    <p className={styles.paragraph}>
                        •	Formação de jovens com competências digitais básicas e intermediárias. <br />
                        •	Produção de pelo menos 3 projetos digitais desenvolvidos pelos alunos. <br />
                        •	Ampliação do interesse pela cultura digital e pelo uso criativo da tecnologia. <br />
                        •	Inclusão de jovens e adultos em situação de vulnerabilidade no universo tecnológico. <br />
                        •	Criação de uma rede de aprendizado colaborativo com tutores, escoteiros e comunidade. <br />
                        •	Realização de um evento de culminância para apresentação pública dos projetos desenvolvidos.
                    </p>
                    <br />
                    <h1 className={styles.subTitle}>
                        Contrapartidas Sociais
                    </h1>
                    <p className={styles.paragraph}>
                        •	Acesso gratuito às aulas e materiais didáticos. <br />
                        •	Disponibilização pública e gratuita dos projetos criados (licença livre). <br />
                        •	Oficina aberta à comunidade sobre segurança digital e uso consciente da internet. <br />
                        •	Exposição ou mostra pública dos resultados em espaço cultural ou escola local. <br />
                        •	Produção de vídeos tutoriais com as principais lições aprendidas, divulgados nas redes sociais do grupo escoteiro.

                    </p>
                    <br />
                    <h1 className={styles.subTitle}>
                        Sustentabilidade
                    </h1>
                    <p className={styles.paragraph}>
                        O Escoteiro Dev é estruturado para receber financiamentos via leis de incentivo fiscais e editais de cultura, educação e tecnologia. Após o primeiro ciclo, o projeto:    
                    </p>
                    <p className={styles.paragraph}>
                        •	Deixará uma base de material didático e estrutura tecnológica para novas turmas. <br />
                        •	Formará monitores jovens (ex-alunos) para atuarem como multiplicadores voluntários. <br />
                        •	Buscará parcerias com escolas, empresas de tecnologia e secretarias municipais de educação e cultura. <br />
                        •	Manterá uma versão digital dos conteúdos e projetos produzidos, criando um laboratório comunitário de cultura digital em Coqueiral.
                    </p>
                    <br />

                    <h1 className={styles.subTitle}>
                        Público Alvo
                    </h1>
                    <p className={styles.paragraph}>
                        Adolescente, jovens e adultos com idade igual ou superior a 11 anos, residentes na comunidade local de povos originários. <br />
                        Estimativa: 30 participantes diretos e 200 beneficiários indiretos (famílias, visitantes, público das exposições).
                    </p>
                    <br />

                    <h1 className={styles.subTitle}>
                        Recursos e materiais necessários
                    </h1>
                    <p className={styles.paragraph}>
                        ●	Notebook Dell 8GB RAM, 512GB SSD (para alunos que não tem o equipamento). <br />
                        ●	Notebook do tutor. <br />
                        ●	Rede Wi-Fi. <br />
                        ●	Projetor digital. <br />
                        ●	Energia elétrica. <br />
                        ●	Ambiente climatizado. <br />
                        ●	Material didático digital e impresso (apostilas do curso). <br />
                        ●	Um tutor especializado e com vivência em informática e programação. <br />
                        ●	Um assistente para apoio durante as aulas. <br />
                    </p>
                    <br />

                    <h1 className={styles.subTitle}>
                        Material individual
                    </h1>
                    <p className={styles.paragraph}>
                        ●	Notebook pessoal (se possuir). <br />
                        ●	Caderno de anotações. <br />
                        ●	Caneta ou lápis.
                    </p>
                    <br />

                    <h1 className={styles.subTitle}>
                        Custos para Captação via Lei de Incentivo
                    </h1>
                    <p className={styles.paragraph}>
                        ●   Tutor e assistente (10 meses): R$ 9.200,00. <br />
                        ●   Coordenação e captação de recurso (10 meses): R$ 4.000,00. <br />
                        ●   Materiais e insumos (10 meses): R$ 1.687,20. <br />
                        ●   Divulgação, campanhas, impressão de folhetos e materiais gráficos (10 meses): R$ 1.000,00.
                    </p>
                </div>
            </div>
            <div style={{
                border: '1px solid var(--cinza-escuro)', 
                borderRadius: '8px',
                width: 300, 
                height: 'auto',
                padding: 10,
                marginTop: 40,
                flexWrap: 'wrap',
            }}>
                <Link 
                    href={'https://photos.app.goo.gl/EdWwgRt2nPbC73aH6'} 
                    target='_blank'
                >
                    <h2 
                        className={styles.subtitle}
                        style={{textAlign: 'center'}}
                    >
                        Veja nosso álbum de fotos.
                    </h2>                    
                    <Image 
                        alt='esporte, escoteiros, aracruz, coqueiral, nautico, canoa, velas, caiaque, rio, mar, lagoa'
                        src={'/images/projetos/escoteiro-dev/banner-doacao.png'}
                        width={300}
                        height={200}
                        style={{objectFit: 'contain', height: 'auto', width: '100%'}}
                    />
                </Link>
            </div>
        </Section>
    )
}