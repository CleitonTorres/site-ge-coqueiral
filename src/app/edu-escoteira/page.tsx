import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import Image from 'next/image';
import Carrocel from '@/components/layout/carrocel/carrocel';

export default function Page(){
    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <h1 className={styles.title}>Educação Escoteira</h1>
            <div className={styles.conteiner}>
                <div className={styles.subConteiner}>
                    <Image 
                        alt=""
                        width={970}
                        height={350}
                        src={'/images/edu-escoteira.jpg'}
                        className={styles.image}
                    />               
                    <h6>ch. Ana palestrando na escola CEPC de Coqueiral</h6>   
                    <br />

                    <p className={styles.paragraph}>
                        O EducAção Escoteira é um projeto que busca levar o Grupo Escoteiro ou Seção Escoteira Autônoma para dentro das escolas, oferecendo aos estudantes a oportunidade de conhecer mais sobre o Movimento Escoteiro e interagir com crianças, adolescentes e jovens em atividades educacionais divertidas. 
                    </p>
                    <br />
                    <h1 className={styles.subTitle}>
                        O projeto.
                    </h1>
                    <p className={styles.paragraph}>
                        O Educação Escoteira é um projeto anual que tem o objetivo mostrar para a comunidade um pouco do universo escoteiro nesse grande evento os escoteiros visitam escolas locais e aplicam atividades educativas baseadas no método escoteiro.
                        O 19º ES Grupo Escoteiro Coqueiral, em parceira com as escolas local de Coqueiral Primo Biti, EMEF Coqueiral, CMEI Balão Mágico, EMPI Três Palmeiras e Colibri, já realizou, e realiza anualmente, a Educação Escoteira neste dia as escolas abrem as portas para o movimento escoteiro e nossos educadores (chefes escoteiros) transmitem a mensagem e o método escoteiro para as crianças e adolescentes.
                    </p>
                </div>
            </div>
            <Carrocel 
                urlImages={[
                    '/images/edu-escoteira01.jpeg',
                    '/images/edu-escoteira02.jpeg'
                ]}
            />
        </Section>
    )
}