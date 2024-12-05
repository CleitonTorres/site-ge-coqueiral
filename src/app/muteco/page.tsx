import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import Image from 'next/image';
import Carrocel from '@/components/layout/carrocel/carrocel';

export default function Page(){
    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <h1 className={styles.title}>MutEco</h1>
            <div className={styles.conteiner}>
                <div className={styles.subConteiner}>
                    <Image 
                        alt=""
                        width={970}
                        height={350}
                        src={'/images/muteco.jpg'}
                        className={styles.image}
                    />                    
                    <p className={styles.paragraph}>
                        O Mutirão Nacional Escoteiro de Ação Ecológica – MutEco é uma grande ação ecológica que movimenta os escoteiros nos quatro cantos do país, além de ser uma grande oportunidade para que todo os jovens reflitam sobre a importância do Meio Ambiente em suas vidas e conquistem as novas insígnias da iniciativa Tribo da Terra, contribuindo com a melhora da consciência ecológica, além de fortalecer a imagem do Movimento Escoteiro na sociedade
                    </p>
                    <br />
                    <h1 className={styles.subTitle}>
                        O projeto.
                    </h1>
                    <p className={styles.paragraph}>
                        É uma grande ação ecológica que movimenta os escoteiros de todo o País, além de ser uma grande oportunidade para que todos os jovens reflitam sobre a importância do Meio Ambiente em suas vidas, nos 19º GE Coqueiral anualmente realizamos e atuamos como parceiros em eventos de recolhimento de resíduos sólidos de praias, mangues, restinga e bosques da nossa comunidade e litoral. Também realizamos ações de proteção direta do bosque chamado Trilha dos Camarás na qual fazemos a limpeza e mantemos o nosso Campo Escola, bem como o plantio de árvores e distribuição de sementes. O 19º GE Coqueiral tem especial apreço pela APA Costa das Algas atuando como educadores e conscientizadores da importância da proteção dessa APA que é uma Unidade de Conservação da vida marinha e que tem abrangência do litoral de Serra à Aracruz.
                    </p>
                </div>
            </div>
            <Carrocel 
                urlImages={[
                    '/images/senior25.jpg',
                    '/images/escoteiros06.png',
                    '/images/senior09.jpg',
                    '/images/senior24.jpg',
                ]}
            />
        </Section>
    )
}