import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import Image from 'next/image';
import Carrocel from '@/components/layout/carrocel/carrocel';

export default function Page(){
    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <h1 className={styles.title}>Pipa Escoteira</h1>
            <div className={styles.conteiner}>
                <div className={styles.subConteiner}>
                    <Image 
                        alt=""
                        width={970}
                        height={350}
                        src={'/images/projetos/pipa-escoteira/pipas (2).jpg'}
                        className={styles.image}
                    />
                    <br />
                    <br />
                    <p className={styles.paragraph}>
                        O 19º Grupo Escoteiro Coqueiral tem trabalhado constantemente para indicado para fortalecer as atividades culturais familiares e tradicionais promovendo com regularidade anual atividades relacionadas as lembranças de infância de pais e avós. Um exemplo desse trabalho é nossa oficina de Pipas, que tem como objetivos integração das famílias envolvendo crianças, jovens, pais e filhos em uma atividade recreativa, integração social reunindo diversos segmentos da sociedade numa comunidade integrada para o mesmo fim, levando lazer, cultura e entretenimento à comunidade local.
                    </p>
                    <Carrocel urlImages={[
                        '/images/projetos/pipa-escoteira/pipas (1).jpeg',
                        '/images/projetos/pipa-escoteira/pipas (1).jpg',
                        '/images/projetos/pipa-escoteira/pipas (2).jpeg',
                        '/images/projetos/pipa-escoteira/pipas (2).jpg',
                        '/images/projetos/pipa-escoteira/pipas (3).jpeg',
                        '/images/projetos/pipa-escoteira/pipas (3).jpg',
                        '/images/projetos/pipa-escoteira/pipas (4).jpeg',
                        '/images/projetos/pipa-escoteira/pipas (5).jpeg',
                        '/images/projetos/pipa-escoteira/pipas (6).jpeg',
                        '/images/projetos/pipa-escoteira/pipas (7).jpeg',
                        '/images/projetos/pipa-escoteira/pipas (8).jpeg'
                    ]} />
                    <br />
                    <h2 className={styles.subtitle}>Objetivos deste projeto</h2>
                    <p className={styles.paragraph}>
                        1.	Desenvolver habilidades de vida ao ar livre. <br />
                        2.	Estimular o trabalho em equipe e a liderança. <br />
                        3.	Proporcionar situações em que os jovens assumam responsabilidades, tomem decisões e aprendam a liderar de forma cooperativa.<br />
                        4.	Fortalecer o espírito de fraternidade escoteira.<br />
                        5.	Criar momentos de integração, convivência saudável e amizade entre crianças, adolescentes e jovens de diversas idades.<br />
                        6.	Despertar consciência ambiental.<br />
                        7.	Despertar a responsabilidade social.<br />
                        8.	Estimular a superação pessoal e coletiva.<br />
                        9.	Encorajar os jovens a vencer seus próprios limites, desenvolver resiliência e enfrentar desafios com confiança e segurança.<br />
                        10.	Proporcionar experiências marcantes que contribuam com a formação do caráter.<br />
                        11.	Oferecer vivências únicas em contato com a natureza, fortalecendo a identidade e o pertencimento ao movimento escoteiro.<br />
                        12.	Estimular a criatividade.<br />
                        13.	Criar vínculos afetivos entre pais e filhos.<br />

                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        A primeira oficina de pipas foi idealizada por nosso chefe escoteiro Marcelo Guervich em meados de 2019, a tradição esteve parada durante a pandemia, tentamos retornar em 2024, mas sem sucesso. Em 2025 conseguimos retornar com a oficina de pipa e planejamos oficializar um concurso de pipas nos dias das Crianças.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        A abrangência do trabalho com pipas é municipal (Aracruz), com predominância dos bairros litorâneas como Coqueiral, Sauê, Praia dos Padres, Barra do Sahy etc.), mas e aberto a todos os públicos. 
                    </p>
                    <p className={styles.paragraph}>
                        Atualmente o responsável pelo projeto é o chefe Cleiton Torres Machado, mas o chefe Marcelo ainda participa como suporte e principal incentivador.
                    </p>
                    <br />

                    <h2 className={styles.subtitle}>Protetores da Tradição.</h2>
                    <p className={styles.paragraph}>
                        O 19º Grupo Escoteiro Coqueiral tem por vocação a paixão pela arte da Pipa. A pipa foi criada na China antiga há mais de 2.500 anos, sendo usada inicialmente para comunicação militar, fins místicos e científicos. Ela se espalhou pelo mundo, chegando ao Brasil com os colonizadores portugueses, onde se tornou um popular brinquedo, contudo, sua relevância história é incontestável e atestável em diversas frente tanto militar e científicos.
                    </p>
                    <p className={styles.paragraph}>
                        <strong>Avanços científicos</strong>: As pipas foram usadas para estudar a aerodinâmica e até mesmo para a invenção do para-raios, como no famoso experimento de Benjamin Franklin.
                    </p>
                    <p className={styles.paragraph}>
                        <strong>Uso militar</strong>: As primeiras pipas eram feitas de seda e bambu, e seus movimentos e cores serviam como sinais para transmitir mensagens entre destacamentos militares.
                    </p>
                    <p className={styles.paragraph}>
                        <strong>Chegada ao Ocidente</strong>: No século XVI, as pipas chegaram à Europa e às Américas.
                    </p>
                    <p className={styles.paragraph}>
                        <strong>No Brasil</strong>: A pipa chegou ao Brasil com os colonizadores portugueses em 1596. As pipas eram usadas para alertar sobre perigos e transmitir mensagens.
                    </p>
                    <p className={styles.paragraph}>
                        Aos poucos a pipa foi se tornando uma brincadeira de criança, mas hoje em dia está em risco de cair no esquecimento devido as grande avanço que a revolução dos jogos digitais tem alcançado.
                    </p>
                    <br />

                    <h2 className={styles.subtitle}>Fragilidade da geração atual.</h2>
                    <p className={styles.paragraph}>
                        Proteger a tradição de soltar pipas é preservar um elo afetivo entre gerações, um gesto simples que carrega em si a riqueza das memórias e dos vínculos humanos. Em um tempo em que a infância muitas vezes se perde em telas e tecnologias, soltar uma pipa representa um convite ao contato com o céu aberto, ao vento no rosto e à alegria genuína das brincadeiras ao ar livre. É também a cena terna do avô ensinando o neto a montar sua primeira pipa, compartilhando paciência, sabedoria e afeto em cada detalhe. Para os mais velhos, ver crianças correndo com pipas coloridas desperta lembranças de sua própria infância, reacendendo sentimentos de alegria e pertencimento. Assim, a pipa deixa de ser apenas brinquedo e torna-se símbolo de união, memória e continuidade daquilo que nos faz humanos.
                    </p>
                    <br />

                    <p className={styles.paragraph}>
                        Soltar pipas é muito mais do que brincar: é costurar memórias no céu. Em cada linha esticada há um elo entre gerações, onde o avô ensina o neto e a infância redescobre o vento. No colorido das pipas, guardam-se lembranças que atravessam o tempo e mantêm viva a essência simples e humana de brincar ao ar livre.
                    </p>
                </div>
            </div>
        </Section>
    )
}