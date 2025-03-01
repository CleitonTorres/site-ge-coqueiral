import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import Image from 'next/image';
import Carrocel from '@/components/layout/carrocel/carrocel';

export default function Page(){
    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <h1 className={styles.title}>Escoteiros pela Biodiversidade</h1>
            <div className={styles.conteiner}>
                <div className={styles.subConteiner}>
                    <Image 
                        alt=""
                        width={970}
                        height={350}
                        src={'/images/biodiversidade (1).jpg'}
                        className={styles.image}
                    />
                    <p className={styles.paragraph}>
                        Em fevereiro de 2024 os jovens do Grupo Escoteiro Coqueiral realizaram o projeto Escoteiros pela Biodiversidade. Cada ramo executou algum serviço
                        em prol da proteção da nossa biodiversidade nativa. Os lobinhos separararm sementes e prepararam saquinhos, os escoteiros fizeram caixas de coleteta 
                        de buchas de cozinha utilizadas para correto descarte e ajudaram na distribuíção das sementes pelo Bairro Coqueiral.
                        Os Seniors/Guias fizeram um tour ciclístico pelo bairro catalogando algumas espécies invasoras que estão proximos à mata ciliar da lagoa de Coqueiral.
                        Posteriormente foi feito pela tropa sênior um relatório com essas especíes catalogadas e encaminhadas para a Secretária de Meio Ambiente do Município.
                    </p>
                    <Carrocel urlImages={[
                        '/images/biodiversidade (1).jpeg',
                        '/images/biodiversidade (2).jpeg',
                        '/images/biodiversidade (3).jpeg',
                        '/images/biodiversidade (4).jpeg',
                        '/images/biodiversidade (5).jpeg',
                        '/images/biodiversidade (6).jpeg',
                        '/images/biodiversidade (7).jpeg',
                        '/images/biodiversidade (8).jpeg',
                        '/images/biodiversidade (1).jpg'
                    ]} />
                    <p className={styles.paragraph}>
                        A tropa Sênior participou de palestras e workshops para aprender sobre biodiversidade, elaboramos uma pedalada na comunidade para identificar espécies de plantas invasoras que tem se propagado pela região de mata atlântica existente na nossa comunidade. Então elaboramos um relatório com os dados coletados durante o pedal e enviamos para a Secretária de Meio Ambiente da nossa Cidade solicitando a remoção dessas espécies. Também adquirimos sementes de plantas, verduras e legumes e distribuímos.
                    </p>
                    <p className={styles.paragraph}>
                        Aprender sobre a biodiversidade e os impactos negativos causados por espécies invasoras na flora nativa e que a biodiversidade é fundamental para o controle climático e proteção da vida na terra, sendo necessário incentivar as comunidades a abraçar as causas ambientais.
                    </p>
                    <a 
                        href='https://sdgs.scout.org/project/escoteiros-pela-biodiversidade-0'
                        target='_blank'
                        className='link'
                    >
                        link do projeto na plataforma scouts for ODS
                    </a>
                </div>
            </div>
        </Section>
    )
}