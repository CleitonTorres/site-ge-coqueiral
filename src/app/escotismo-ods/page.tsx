import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import Image from 'next/image';

export default function Page(){
    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <h1 className={styles.title}>Escotismo e Desenvolvimento Sustentável</h1>
            <div className={styles.conteiner}>
                <div className={styles.subConteiner}>
                    <Image 
                        alt=""
                        width={970}
                        height={350}
                        src={'/images/grupo03.jpeg'}
                        className={styles.image}
                    />
                    <h1 className={styles.subTitle}>
                        Qual ligação tem o escotismo e os Objetivos de Desenvolvimento Sustentável?
                    </h1>
                    <p className={styles.paragraph}>
                        O Movimento Escoteiro é um movimento de educação não-formal, cuja proposta educativa está focada em “Educar para a Vida” por meio do desenvolvimento de conhecimentos, habilidades e atitudes. Nosso propósito é transformar os jovens em cidadãos ativos, que sejam úteis em suas comunidades e ajudem a construir um mundo melhor. Nesse contexto, os Objetivos de Desenvolvimento Sustentável são essenciais para que possamos atingir nossa proposta educativa.
                    </p>
                    <br />
                    <h1 className={styles.subTitle}>
                        A Educação leva ao Desenvolvimento Sustentável
                    </h1>
                    <p className={styles.paragraph}>
                        Quando usamos o 10º artigo da Lei Escoteira (O escoteiro é limpo de corpo e alma) estamos falando de boa saúde e bem-estar. Quando trabalhamos com os jovens o respeito às diversidades, estamos falando de redução das desigualdades. Quando desenvolvemos senso crítico e habilidades que melhoram o meio ambiente, ajudamos a vida aquática e a vida terrestre. Todos esses ensinamentos são ligados aos ODS.
                    </p>
                    <p className={styles.paragraph}>
                        Incluir as problemáticas chave para o desenvolvimento sustentável no processo de ensino aprendizagem é algo que trabalhamos desde o primeiro dia de caminhada do jovem na vida escoteira. Com participação ativa, os jovens se tornam protagonistas da história da Terra, e, consequentemente, imaginando cenários de futuro e tomando decisões de forma colaborativa.
                    </p>
                    <br />

                    <h1 className={styles.subTitle}>
                       Os Objetivos do Desenvolvimento Sustentável
                    </h1>
                    <p className={styles.paragraph}>
                        Os 17 Objetivos de Desenvolvimento Sustentável visam materializar os direitos humanos para todos, além de obter a igualdade de gênero, e o empoderamento feminino. Os ODS são integrados, indivisíveis, e igualam as três dimensões do desenvolvimento sustentável: a econômica, a social e a ambiental. Conheça abaixo os 17 ODS:
                    </p>
                    <Image 
                        alt=""
                        width={970}
                        height={350}
                        src={'/images/ods.png'}
                        className={styles.image}
                    />
                    <h1 className={styles.subTitle}>
                        Programa Educativo e os ODS
                    </h1>
                    <p className={styles.paragraph}>
                        O Programa Educativo, por meio de suas diversas ferramentas deve:
                    </p>
                    <br />
                    <ul>
                        <li className={styles.paragraph}>
                            <b>INSPIRAR</b> os jovens a serem cidadãos globais ativos, oferecendo educação, capacitação e oportunidades de aprendizagem por meio do Movimento Escoteiro, para explorar e atuar pelo desenvolvimento sustentável.
                        </li>
                        <li className={styles.paragraph}>
                            <b>HABILITAR</b> com ferramentas e informação para desenvolver competências chave para o desenvolvimento sustentável, oferecendo experiências educativas não formais de qualidade para crianças, adolescentes e jovens.
                        </li>
                        <li className={styles.paragraph}>
                            <b>ENTREGAR</b> ações locais conectadas aos ODS por meio de projetos de serviço e desenvolvimento comunitário, que se implementam como parte do programa Educativo e iniciativas dentro do marco “Mundo Melhor”.
                        </li>
                    </ul>
                    <br />
                    <p className={styles.paragraph}>
                        No caso do Escotismo, o seu foco principal de atuação está em conciliação com o ODS 4 (Educação de Qualidade), mais especificamente a meta 4.7, que trata da educação para o desenvolvimento sustentável:
                    </p>
                    <br />

                    <h1 className={styles.subTitle}>
                        Conheça a meta 4.7
                    </h1>
                    <p className={styles.paragraph}>
                        “até 2030, garantir que todos os alunos adquiram conhecimentos e habilidades necessárias para promover o desenvolvimento sustentável, inclusive, entre outros, por meio da educação para o desenvolvimento sustentável e estilos de vida sustentáveis, direitos humanos, igualdade de gênero, promoção de uma cultura de paz e não-violência, cidadania global, e valorização da diversidade cultural e da contribuição da cultura para o desenvolvimento sustentável.”
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        O Escotismo tem dois tipos de ações alinhadas com a educação para o desenvolvimento sustentável: ações pontuais, caracterizadas por atividades de grande impacto na comunidade e que buscam sensibilizar as pessoas para as questões relacionadas ao desenvolvimento sustentável, e ações contínuas, que fazem parte do sistema de progressão pessoal idealizado Programa Educativo do Movimento Escoteiro, e que buscam desenvolver competências de sustentabilidade nas crianças, adolescentes e jovens que praticam o Escotismo.
                    </p>
                    <p className={styles.paragraph}>
                        Como exemplos de ações pontuais, temos o Projeto Educação Escoteira e os Mutirões de Ação Ecológica e de Ação Comunitária.
                    </p>
                    <br />

                    <ul>
                        <li className={styles.paragraph}>
                            <b>Educação Escoteira:</b> é desenvolvido em maio de cada ano, em centenas de escolas do Brasil, e busca levar o tema dos ODS para o interior das escolas, por meio de jogos e atividades lúdicas.
                        </li>
                        <li className={styles.paragraph}>
                            <b>Mutirão de Ação Ecológica:</b> é realizado em junho, próximo ao Dia Mundial do Meio Ambiente, e mobiliza os escoteiros de todo o país na realização de atividades relacionadas com o meio ambiente, contribuindo com os ODS 11 (Cidades e Comunidades Sustentáveis), 12 (Consumo e Produção Responsáveis), 13 (Ação contra Mudança Global do Clima), 14 (Vida na Água) e 15 (Vida Terrestre).
                        </li>
                        <li className={styles.paragraph}>
                            <b>Mutirão Nacional Escoteiro de Ação Comunitária:</b> popularmente conhecido como MutCom, é uma atividade de mobilização nacional voltada à integração e colaboração dos Escoteiros do Brasil com a sociedade, contribuindo de maneira direta ou indireta com todos os ODS, dependendo do tema proposto. Para os jovens, é a oportunidade de exercer atividades de serviço que estimulam o envolvimento com a comunidade.
                        </li>
                    </ul>
                    <br />

                    <Image 
                        alt=""
                        width={300}
                        height={300}
                        src={'/icons/bonecos_ods-01-382x400.png'}
                    />
                    <p className={styles.paragraph}>
                        Também como estímulo, para a obtenção do distintivo do Mensageiros da Paz, o escoteiro deve criar e participar de projetos que desenvolvam algum dos 17 ODS. Já para conquistar a Insígnia Mundial do Meio Ambiente, os escoteiros precisam desenvolver e participar de projetos relacionados com as questões ambientais, contribuindo com os ODS 6 (Água Potável e Saneamento), 7 (Energia Limpa e Acessível), 11, 12, 13, 14 e 15 (já especificados acima).
                    </p>
                    <p className={styles.paragraph}>
                        A Insígnia Mares Limpos, por outro lado, é um desafio proposto aos escoteiros e visa incentivá-los a reduzir o consumo de plásticos descartáveis, em sintonia com os ODS 12 e 14.
                    </p>
                    <p className={styles.paragraph}>
                        Também no sistema de progressão pessoal se busca, pela experiência oferecida nas atividades, que os escoteiros conquistem inúmeras competências que se encontram no contexto dos ODS, como, por exemplo, uma competência para o Ramo Lobinho que propõe que a criança “compreenda e participe da economia de água e de energia elétrica, reconheça a importância da coleta seletiva do lixo e dispense cuidados às plantas e animais”, e que evolui, no Ramo Pioneiro, para a competência de “contribuir para a preservação da vida por intermédio de práticas sustentáveis no trato do ambiente natural e da convivência harmônica com a natureza”.
                    </p>
                    <p className={styles.paragraph}>
                        Além disso, o Escotismo, por meio do seu Programa Educativo, valoriza a igualdade de gênero (ODS 5) e a diversidade cultural (ODS 10), promove uma cultura de paz e não-violência (ODS 16), buscando fazer do escoteiro um cidadão global, numa sociedade cada vez mais globalizada e, ao mesmo tempo, heterogênea, contribuindo para que ele seja um agente de transformação em prol da construção de um mundo melhor e mais justo.
                    </p>
                    <p className={styles.paragraph}>
                        Confira na tabela abaixo como as atividades oferecidas pelo Programa Educativo se relacionam com os Objetivos do Desenvolvimento Sustentável.
                    </p>
                    <Image 
                        alt=""
                        width={970}
                        height={350}
                        src={'/icons/tabela_ods.jpg'}
                        className={styles.image2}
                    />
                </div>
            </div>
        </Section>
    )
}