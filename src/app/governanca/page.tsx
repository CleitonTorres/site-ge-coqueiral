'use client'
import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import Image from 'next/image';

export default function Page(){
    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <h1 className={styles.title}>Governança Institucional</h1>
            <div className={styles.conteiner}>
                <div className={styles.subConteiner}>
                    <Image 
                        alt=""
                        width={970}
                        height={350}
                        src={'/images/bannergovernanca.png'}
                        className={styles.image}
                    />
                    <p className={styles.paragraph}>
                        Os Escoteiros do Brasil têm como principal objetivo o incentivo e desenvolvimento do Movimento Escoteiro no Brasil, com a propagação de seus princípios e valores.                    
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        O atingimento desse objetivo passa, obrigatoriamente e cada vez mais, pela adoção de boas práticas de Governança.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        Essas boas práticas podem ser traduzidas pela adoção de medidas que incentivem a transparência, a prestação de contas, a responsabilidade das ações dos dirigentes, associados e profissionais e diálogo claro para que todos os associados manifestem sua opinião e tenham seus direitos respeitados.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        Através da adoção desses 4 pilares (transparência, responsabilidade, equidade e prestação de contas) a Escoteiros do Brasil converte princípios em recomendações objetivas e práticas, com a finalidade de preservar e otimizar os valores e princípios da organização, contribuindo para a qualidade da gestão, sua longevidade e o bem comum.
                    </p>
                    <br />

                    <h1 className={styles.subTitle}>
                        Transparência, Equidade, Responsabilidade e Prestação de Contas
                    </h1>
                    <p className={styles.paragraph}>
                        <b>Transparência</b>: envolve a divulgação de informações de interesse público, prezando por seu tratamento adequado e disponibilizando as partes interessadas não só as informações impostas por leis ou regulamentos, mas toda e qualquer solicitação realizada pelos diversos órgãos de controle e fiscalização.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        <b>Equidade</b>: caracteriza-se pelo tratamento justo e isonômico de todas as partes envolvidas na condução e manutenção da instituição, quais sejam, os associados, o Conselho de Administração, a Comissão Fiscal Nacional, a Diretoria Executiva e demais partes interessadas (stakeholders), levando em consideração seus direitos, deveres, necessidades, interesses e expectativas.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        <b>Responsabilidade</b>: pode ser entendida também como conformidade ou integridade, onde todos os processos, procedimentos e decisões adotadas pelos agentes da Governança Institucional (Associados, Conselhos, Diretoria, Auditoria Externa, profissionais e prestadores de serviços) devem agir e adotar Políticas no cumprimento de normas reguladoras, expressas nos estatutos sociais, nos regulamentos internos, políticas e nas instituições legais no país.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        <b>Prestação de Contas</b>: todos os agentes de governança (Associados, Conselho.s, Diretoria, profissionais e terceiros) devem prestar contas de sua atuação de modo claro, conciso, compreensível e tempestivo, assumindo integralmente as consequências de seus atos e omissões e atuando com diligência e responsabilidade no âmbito dos seus papéis, fundamentados nas melhores práticas contábeis e de auditoria.
                    </p>

                    <br />
                    <p className={styles.paragraph}>
                        Crédito da Foto: Guilherme Caselani
                    </p>
                    <br />

                    <h1 className={styles.subTitle}>
                        Documentos
                    </h1>
                    <ul className={styles.boxLinks}>
                        <li className='boxShadow cursoPointer'>
                            <Image alt='' width={80} height={100} src={'/icons/IconeDoc.png'}/>
                            <a href="https://drive.google.com/file/d/1WK2V1144XU3_c9-3zBGMxbUydm2siZk0/view?usp=sharing" target='_blank'>Estatuto</a>
                        </li>
                        <li className='boxShadow cursoPointer'>
                            <Image alt='' width={80} height={100} src={'/icons/IconeDoc.png'}/>
                            <a href="https://drive.google.com/file/d/1Ou9twuEVwzVTZPehaTneQC2iKTRvZaAP/view?usp=sharing" target='_blank'>Regimento Interno</a>
                        </li>
                    </ul>
                    <br />
                    <h1 className={styles.subTitle}>
                        Transparência 2024
                    </h1>
                    <ul className={styles.boxLinks}>
                        <li className='boxShadow cursoPointer'>
                            <Image alt='' width={80} height={100} src={'/icons/IconeDoc.png'}/>
                            <a href="https://drive.google.com/file/d/1lQxWNaJAWJsEeja5TaF6h1HyLmT_m17A/view?usp=sharing" target='_blank'>Balanço Consolidado 2024</a>
                        </li>
                        <li className='boxShadow cursoPointer'>
                            <Image alt='' width={80} height={100} src={'/icons/IconeDoc.png'}/>
                            <a href="https://drive.google.com/file/d/1aiIe26AHB76TTpt2nzEoWsnu0lqXRZzh/view?usp=sharing">Parecer Comissão Fiscal AGO 2025</a>
                        </li>
                    </ul>
                </div>
            </div>
        </Section>
    )
}