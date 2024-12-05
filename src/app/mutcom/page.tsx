import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import Image from 'next/image';
import Carrocel from '@/components/layout/carrocel/carrocel';

export default function Page(){
    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <h1 className={styles.title}>MutCom</h1>
            <div className={styles.conteiner}>
                <div className={styles.subConteiner}>
                    <Image 
                        alt=""
                        width={970}
                        height={350}
                        src={'/images/mutcom.jpg'}
                        className={styles.image}
                    />                    
                    <p className={styles.paragraph}>
                        O Mutirão Nacional Escoteiro de Ação Comunitária é um projeto de mobilização nacional que visa integrar grupos escoteiros com suas comunidades. O objetivo é promover atividades que geram impacto social e encorajam o senso crítico de jovens, reforçando a mensagem de que as grandes mudanças começam ao nosso redor.
                    </p>
                    <br />
                    <h1 className={styles.subTitle}>
                        O projeto.
                    </h1>
                    <p className={styles.paragraph}>
                        É uma atividade de mobilização nacional voltada à integração e colaboração dos Escoteiros do Brasil com a sociedade, espalhadas em todo o território nacional. O MutCom é uma oportunidade de proporcionar às crianças, adolescentes e jovens atividades de serviço comunitário que exerçam a função de estimular seu envolvimento com a comunidade, no intuito de promover a formação do indivíduo que queremos entregar à sociedade. 
                        Anualmente realizamos ações de recuperação de áreas consideradas pontos de descarte irregular de lixo, além de fazer a instalação de placas informativas e de conscientização. Atualmente estamos com o projeto em fase de elaboração de uma feira comunitária que vai ser realizada em rodízio nos bairros do litoral como Coqueiral, Santa Cruz, Sauê, e outros no qual serão ofertados serviços de cuidados básicos como corte de cabelos masculino e feminino, exames de vista, playground para crianças, aferição de pressão e glicose.
                    </p>
                </div>
            </div>
            <Carrocel 
                urlImages={[
                    '/images/mutcom01.jpg',
                    '/images/mutcom02.jpg',
                    '/images/mutcom03.jpg',
                    '/images/mutcom04.jpg',
                ]}
            />
        </Section>
    )
}