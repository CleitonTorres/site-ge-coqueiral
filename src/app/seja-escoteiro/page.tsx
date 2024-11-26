'use client'
import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import Image from 'next/image';
import Banner from '@/components/layout/banner/banner';

export default function Page(){
    return(
        <>
        <Section customClass={['flexCollTop', 'fullWidth', 'margin0']}>
            <Image 
                alt=""
                width={350}
                height={200}
                src={'/images/logo_seja_escoteiro.png'}
                className={styles.logoSejaEscoteiro}
            />
            <Banner 
                paragraph='Junte-se aos Escoteiros do Brasil e faça parte do maior movimento juvenil de educação não-formal do mundo'
                videoURL='/videos/videoinst.mp4'
                customClass={['justifyBottom', 'greenFilter']}
            />
        </Section>
        
        <Section customClass={['flexCollTop', 'fullWidth', 'colorGrennDark', 'margin0']}>
            <h1 className={styles.title}>O que é ser escoteiro?</h1>
            <div className={styles.conteiner}>
                <div className={`${styles.card} boxShadow`}>
                    <Image 
                        alt=''
                        width={200}
                        height={200}
                        src={'/images/senior05.jpg'}
                    />
                    <p>
                        Fazer parte de uma fraternidade global com mais de 57 milhões de pessoas mundo afora. Como escoteiro, estamos diretamente conectados com povos dos quatro cantos do Planeta, compartilhando valores e construindo laços que duram a vida inteira.
                    </p>                    
                </div>
                <div className={`${styles.card} boxShadow`}>
                    <Image 
                        alt=''
                        width={200}
                        height={200}
                        src={'/images/senior05.jpg'}
                    />
                    <p>
                        Ser amante da natureza de forma ativa. Isso quer dizer: buscar para si mesmo e para a sociedade um desenvolvimento sustentável, contribuindo com a preservação do meio ambiente e dos ecossistemas que dele fazem parte.
                    </p>                    
                </div>
                <div className={`${styles.card} boxShadow`}>
                    <Image 
                        alt=''
                        width={200}
                        height={200}
                        src={'/images/senior05.jpg'}
                    />
                    <p>
                        Buscar seu crescimento pessoal continuamente, a fim de alcançar sua autonomia para tornar-se capaz de tomar suas próprias decisões e traçar um projeto de vida em conformidade com os seus valores e princípios. 
                    </p>                    
                </div>
                <div className={`${styles.card} boxShadow`}>
                    <Image 
                        alt=''
                        width={200}
                        height={200}
                        src={'/images/senior05.jpg'}
                    />
                    <p>
                        Trabalhar em benefício do próximo e em prol da paz, sendo solidário a seus semelhantes e sensível às questões sociais através do voluntariado e da participação ativa em questões determinantes da sua comunidade.
                    </p>                    
                </div>
                <div className={`${styles.card} boxShadow`}>
                    <Image 
                        alt=''
                        width={200}
                        height={200}
                        src={'/images/senior05.jpg'}
                    />
                    <p>
                        Responsabilizar-se pelo bem-estar coletivo, bem como por sua própria saúde, seja ela física, mental ou espiritual, atuando de maneira consciente e equilibrada na sua vida pessoal e nas demais relações de convívio social.
                    </p>                    
                </div>
                <div className={`${styles.card} boxShadow`}>
                    <Image 
                        alt=''
                        width={200}
                        height={200}
                        src={'/images/senior05.jpg'}
                    />
                    <p>
                        Descobrir e aprimorar suas potencialidades, criando oportunidades para exercitar sua criatividade e realizando análise crítica sobre suas atitudes, a fim de tornar-se um cidadão e líder responsável, pioneiro na construção de um mundo melhor.
                    </p>                    
                </div>
            </div>
            
            <div className={styles.bgAmarelo}>
                <Image 
                    alt=''
                    width={150}
                    height={150}
                    src={'/images/bussola.png'}
                    className={styles.bussola}
                />
                <h1 className={`${styles.title} ${styles.colorGreen}`}>Por que ser escoteiro?</h1>
                <Image 
                    alt=''
                    width={500}
                    height={200}
                    src={'/images/porque_ser_escoteiro.png'}
                    className={styles.porserescoteiro}
                />
            </div> 
            <div className={styles.boxParagraph2}>
                <h1 className={styles.title}>Quem pode ser escoteiro?</h1>
                <div className={styles.paragraphs2}>
                    <p className={styles.paragraph2}>
                        O Escotismo é um movimento feito por jovens e para jovens, mas a presença dos adultos nos ajuda a garantir um ambiente mais seguro para todos. Sendo assim, o Escotismo não tem idade e, a partir dos 6,5 anos, qualquer pessoa é bem-vinda, não importando a cor, etnia, orientação sexual ou credo.
                    </p>
                    <p className={styles.paragraph2}>
                        Os adultos voluntários possuem um papel fundamental no nosso projeto educativo e é por isso que oferecemos também um programa de formação continuada para os voluntários, com o objetivo de garantirmos a qualidade na entrega dos resultados esperados pelo Movimento.
                    </p>
                </div>
            </div>   
            
            <div className={`${styles.bgAmarelo} ${styles.paddingBottom0}`}>
                <h1 className={`${styles.title} ${styles.colorGreenDark}`}>Já conhece os ramos?</h1>
                <div className={styles.subConteiner}>
                    <div className={`${styles.card2} boxShadow ${styles.bgGreen} ${styles.minHeight462}`}>
                        <Image 
                            alt=''
                            width={200}
                            height={200}
                            src={'/images/senior05.jpg'}
                        />
                        <h1 className={styles.titleRamos}>Ramo Lobinho</h1>
                        <p className={styles.paragraphRamos}>
                            Crianças entre 6,5 e 10 anos que queiram descobrir o mundo.
                        </p>                    
                    </div>
                    <div className={`${styles.card2} boxShadow ${styles.bgGreen} ${styles.minHeight462}`}>
                        <Image 
                            alt=''
                            width={200}
                            height={200}
                            src={'/images/senior05.jpg'}
                        />
                        <h1 className={styles.titleRamos}>Ramo escoteiro</h1>
                        <p className={styles.paragraphRamos}>
                            Adolescentes a partir de 11 a 14 anos com vontade de viver aventuras.
                        </p>                    
                    </div>
                    <div className={`${styles.card2} boxShadow ${styles.bgGreen} ${styles.minHeight462}`}>
                        <Image 
                            alt=''
                            width={200}
                            height={200}
                            src={'/images/senior05.jpg'}
                        />
                        <h1 className={styles.titleRamos}>Ramo sênior</h1>
                        <p className={styles.paragraphRamos}>
                            Jovens de 15 a 17 anos que encaram qualquer desafio.
                        </p>                    
                    </div>
                    <div className={`${styles.card2} boxShadow ${styles.bgGreen} ${styles.minHeight462}`}>
                        <Image 
                            alt=''
                            width={200}
                            height={200}
                            src={'/images/senior05.jpg'}
                        />
                        <h1 className={styles.titleRamos}>Ramo pioneiro</h1>
                        <p className={styles.paragraphRamos}>
                            Jovens dos 18 aos 20 anos prontos para trilhar seu próprio caminho.
                        </p>                    
                    </div>
                    <div className={`${styles.card2} boxShadow ${styles.bgGreen} ${styles.minHeight462}`}>
                        <Image 
                            alt=''
                            width={200}
                            height={200}
                            src={'/images/senior05.jpg'}
                        />
                        <h1 className={styles.titleRamos}>Adulto voluntário</h1>
                        <p className={styles.paragraphRamos}>
                            Adultos a partir dos 21 anos em busca de um mundo melhor.
                        </p>                    
                    </div>
                </div>
            </div>

            <div className={`${styles.conteiner} ${styles.paddingBottom40}`}>
                <h1 className={`${styles.title} ${styles.colorWhite}`}>Então, vamos?</h1>
                <div className={`${styles.card2} boxShadow cursorPointer`} onClick={()=>window.open('https://forms.gle/f2KAtTNn2F6ovqFk6', '_blank')}>
                    <Image 
                        alt=''
                        width={200}
                        height={200}
                        src={'/images/senior05.jpg'}
                    />
                    <p>
                        Seja um escoteiro                   
                    </p>                    
                </div>
                <div className={`${styles.card2} boxShadow cursorPointer`} onClick={()=>window.open('https://forms.gle/f2KAtTNn2F6ovqFk6', '_blank')}>
                    <Image 
                        alt=''
                        width={200}
                        height={200}
                        src={'/images/senior05.jpg'}
                    />
                    <p>
                        Seja um voluntário                   
                    </p>                    
                </div>
                <div className={`${styles.card2} boxShadow cursorPointer`} onClick={()=>window.open('/como-abrir-uma-uel', '_self')}>
                    <Image 
                        alt=''
                        width={200}
                        height={200}
                        src={'/images/senior05.jpg'}
                    />
                    <p>
                        abra sua UEL                    
                    </p>                    
                </div>
            </div>
        </Section>
        </>
    )
}