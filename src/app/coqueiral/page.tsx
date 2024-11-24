import Section from "@/components/layout/sections/section";
import styles from './page.module.css';
import Image from "next/image";

export default function Coqueiral (){
    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <h1 className={styles.title}>Escoteiros em Coqueiral, Aracruz/ES</h1>
            <div className={styles.conteiner}>
                <Image 
                    alt=""
                    width={350}
                    height={600}
                    src={'/images/jornal01.png'}
                    className={styles.image}
                />
                <div className={styles.subConteiner}>
                    <h2 className={styles.subTitle}>Fundação</h2>
                    <p className={styles.paragraph}>
                        Graças a uma iniciativa do então CCC (Centro Comunitário de Coqueiral) e da disposição do nosso chefe fundador Fernando Girelli no dia 30/05/1988 deu-se origem ao 19º ES Grupo Escoteiro Coqueiral que logo mais em 04/09/1988 e após os devidos tramites legais foi autorizado pela União dos Escoteiros do Brasil a aplicar o método escoteiro escoteiro, posteriormente em 2003 foi reconhecido como entidade de interesse público municipal pela Lei nº 2651, de 16 de dezembro de 2003 e em 2024 reconhecido como Entidade de Interesse Público Estadual (Lei 12.133/24).
                    </p>
                    <Image
                        alt=""
                        width={640}
                        height={370}
                        src={'/images/jornal02.png'}
                        className={styles.image}
                    />
                </div>
            </div>
            <br />
            <div className={styles.sectionsBtn}> 
                <h2 className={styles.subTitle}>Na comunidade</h2>
            </div>
            <div className={styles.conteinerSections}>   
                <div className="flexRowTop">
                    <p className={styles.paragraph}>
                        A relevância das relações do movimento escoteiro tem sido comprovada mediante diversas atividades realizadas em conjunto com a Prefeitura de Aracruz e a Comunidade do Bairro Coqueiral. Um dos reconhecimentos da relevância do Movimento Escoteiro foi expresso mediante a publicação da lei municipal 4.206/2018 que instituiu a “semana municipal do escoteiro”.
                        Além da participação ativa junto a comunidade com reuniões semanais que acontecem aos sábados de 15:00 às 17:30, e as instituições administrativas e ambientais locais, o 19/ES GE Coqueiral, elabora anualmente as seguintes atividades (em Coqueiral).
                    </p>
                    <Image
                        alt=""
                        width={600}
                        height={284}
                        src={'/images/foto03.jpeg'}
                        className={styles.image}
                    />
                </div>             
                
                <p>
                    <b>- MUTECO:</b> é uma grande ação ecológica que movimenta as crianças e jovens escoteiros de todo o País, além de ser uma grande oportunidade para que todo reflitam sobre a importância do Meio Ambiente em suas vidas. Neste evento é comumente realizado projetos de limpeza das praia, bosques, e distribuição de sementes ou mudas.
                </p>
                <p>
                    <b>-MUTICOM:</b> é uma atividade de mobilização nacional voltada à integração e colaboração dos Escoteiros do Brasil com a sociedade, espalhadas em todo o território nacional. O MutCom é uma oportunidade de proporcionar as crianças, adolescentes e jovens atividades de serviço comunitário que exerçam a função de estimular seu envolvimento com a comunidade, no intuito de promover a formação do indivíduo que queremos entregar à sociedade.
                </p>
                <p>
                    <b>- EDUCAÇÃO ESCOTEIRA:</b> O Educação Escoteira é um projeto anual com o objetivo mostrar para a comunidade um pouco do universo escoteiro nesse grande evento os escoteiros visitam escolas locais e aplicam atividades educativas baseadas no método escoteiro.
                    O 19/ES GE Coqueiral, em parceira com as escolas local de Coqueiral Primo Biti, EMEF Coqueiral e Colibri, já realizou, e realiza anualmente, a Educação Escoteira neste dia as escolas abrem as portas para o movimento escoteiro e nossos educadores (chefes escoteiros) transmitem a mensagem e o método escoteiro para as crianças e adolescentes.
                </p>
            </div>      
        </Section>
    )
}