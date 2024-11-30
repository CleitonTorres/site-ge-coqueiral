'use client'
import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import Banner from '@/components/layout/banner/banner';
import Image from 'next/image';

export default function Page(){
    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <Banner 
                customClass={['responsive', 'espacoSeguro']}
                videoURL='https://escoteiros.org.br/wp-content/themes/escoteiros-theme/video/VideoEspacosSeguros.webm'
            />
            <Image 
                alt=''
                width={1000}
                height={300}
                src={'/images/ImagemCentralEspacosSeguros.png'}
                className={styles.image}
                style={{marginTop: "-20px", zIndex: 1}}
            />
            <div className={styles.conteiner}>
                <h1 className={`${styles.title} ${styles.green}`}>O que são Espaços Seguros no Movimento Escoteiro?</h1>
                <p className={styles.paragraph}>
                    No contexto do Movimento Escoteiro, manter as crianças, adolescentes, jovens e adultos protegidos, engloba todas as áreas da instituição e inclui uma gama de estratégias, sistemas e procedimentos que buscam promover o bem-estar, desenvolvimento e segurança dos associados dos Escoteiros do Brasil, como prioridade em todas as atividades relacionadas ao Escotismo.
                </p>
  
                <p className={styles.paragraph}>
                    <span className={styles.destaque}>Proteção de Crianças, Adolescentes, Jovens e Adultos:</span> Este termo é utilizado para definir a garantia e promoção do bem-estar de crianças, adolescentes, jovens e adultos, o que inclui: 
                </p>

                <div className={styles.subConteiner}>
                    <div className={`${styles.card}`}>
                        <Image 
                            alt=''
                            width={200}
                            height={200}
                            src={'/images/senior05.jpg'}
                        />
                        <p className={styles.paragraph}>                 
                            <b>Proteger</b> as crianças, adolescentes, jovens e adultos de <b>qualquer tipo de abusos</b>
                        </p>                    
                    </div>

                    <div className={`${styles.card}`}>
                        <Image 
                            alt=''
                            width={200}
                            height={200}
                            src={'/images/senior05.jpg'}
                        />
                        <p className={styles.paragraph}>                 
                            <b>Prevenir os riscos à saúde física, mental</b> e promover o desenvolvimento global dos associados
                        </p>                    
                    </div>

                    <div className={`${styles.card}`}>
                        <Image 
                            alt=''
                            width={200}
                            height={200}
                            src={'/images/senior05.jpg'}
                        />
                        <p className={styles.paragraph}>                 
                            Zelar para que o Movimento Escoteiro proporcione aos jovens um <b>ambiente seguro</b> no qual possam <b>crescer e se desenvolver</b>
                        </p>                    
                    </div>

                    <div className={`${styles.card}`}>
                        <Image 
                            alt=''
                            width={200}
                            height={200}
                            src={'/images/senior05.jpg'}
                        />
                        <p className={styles.paragraph}>                 
                            Adotar <b>medidas para promover a segurança física e psicológica</b> dos associados em todas as situações possíveis.
                        </p>                    
                    </div>
                </div>                

                <Image 
                    alt=''
                    width={200}
                    height={90}
                    src={'/images/espacos-seguros.png'}
                    style={{width: 400, objectFit: 'contain', marginTop: 40}}
                />

                <p className={styles.paragraph}>
                    Significa um <b>ambiente que promove e apoia o bem-estar das crianças, adolescentes, jovens e adultos</b>, assegurando a manifestação de sua individualidade e, ao mesmo tempo, busca prevenir as práticas potencialmente perigosas à saúde física e mental.
                </p>
                <p className={styles.paragraph}>
                    O <b>Movimento Escoteiro</b> possui alguns valores e elementos fundamentais, que devem ser adotados em todas as suas ações educativas. São eles:
                </p>
                <div className={styles.subConteiner}>
                    <div className={`${styles.card2}`}>
                        <Image 
                            alt=''
                            width={200}
                            height={150}
                            src={'/icons/topico-Promessa.png'}
                        />
                        <p className={styles.paragraph}>                 
                            A Lei e a <br/> <b style={{color: '#2BBC7D'}}>Promessa</b><br/> Escoteira
                        </p>       
                    </div>

                    <div className={`${styles.card2}`}>
                        <Image 
                            alt=''
                            width={200}
                            height={150}
                            src={'/icons/topico-Principios.png'}
                        />
                        <p className={styles.paragraph}>                 
                            Os <b style={{color: '#0096D6'}}>princípios</b> do Movimento Escoteiro
                        </p>       
                    </div>

                    <div className={`${styles.card2}`}>
                        <Image 
                            alt=''
                            width={200}
                            height={150}
                            src={'/icons/topico-Principios.png'}
                        />
                        <p className={styles.paragraph}>                 
                            Proporcionar <b style={{color: '#E8646E'}}>oportunidades iguais</b> a todos
                        </p>       
                    </div>

                    <div className={`${styles.card2}`}>
                        <Image 
                            alt=''
                            width={200}
                            height={150}
                            src={'/icons/topico-Oportunidades-Iguais.png'}
                        />
                        <p className={styles.paragraph}>                 
                            Proporcionar <b style={{color: '#E8646E'}}>oportunidades iguais</b> a todos
                        </p>       
                    </div>

                    <div className={`${styles.card2}`}>
                        <Image 
                            alt=''
                            width={200}
                            height={150}
                            src={'/icons/topico-Respeito.png'}
                        />
                        <p className={styles.paragraph}>                 
                            O <b style={{color: '#2BBC7D'}}>respeito a si mesmo e aos demais</b> (favorecendo a autoproteção e a proteção aos demais)
                        </p>       
                    </div>

                    <div className={`${styles.card2}`}>
                        <Image 
                            alt=''
                            width={200}
                            height={150}
                            src={'/icons/topico-Abertura-ao-Dialogo.png'}
                        />
                        <p className={styles.paragraph}>
                            Espaços que promovam a <b style={{color:'#0096D6'}}>abertura ao diálogo</b>: E diversidade de opiniões, sem o temor de que surjam reações intolerantes à expressão de opiniões diferentes
                        </p>       
                    </div>

                    <div className={`${styles.card2}`}>
                        <Image 
                            alt=''
                            width={200}
                            height={150}
                            src={'/icons/topico-Autodesenvolvimento.png'}
                        />
                        <p className={styles.paragraph}>
                            Um <b style={{color: '#E8646E'}}>espaço seguro</b> que permite o <b style={{color: '#E8646E'}}>autodesenvolvimento</b>: Bem como o desenvolvimento de relações interpessoais positivas e saudáveis entre todos os associados.
                        </p>       
                    </div>
                </div>
            </div>

            <div className={styles.faixa}>
                <Image 
                    alt=''
                    width={250}
                    height={250}
                    src={'/images/senior11.jpg'}
                />
                <p className={styles.paragraph}>
                    Para os <b>Escoteiros do Brasil</b> o desenvolvimento de ações que <span>proporcionem o bem-estar, o desenvolvimento saudável e a segurança de crianças, adolescentes e jovens,</span> bem como a promoção de um <b>ambiente seguro para todos</b> os seus participantes é uma prioridade.
                </p>
            </div>

            <h1 className={`${styles.title} ${styles.green}`}>Para tanto, potencializamos ações estratégicas que possibilitem:</h1>
            
            <div className={styles.subConteiner}>
                <div className={`${styles.card3} ${styles.borderGreen}`}>
                    <Image 
                        alt=''
                        width={200}
                        height={200}
                        src={'/icons/seguranca.png'}
                    />
                    <p className={styles.paragraph}>
                        Criar consciência sobre a importância de <b>garantir o ambiente seguro</b>
                    </p>       
                </div>

                <div className={`${styles.card3} ${styles.borderBlue}`}>
                    <Image 
                        alt=''
                        width={200}
                        height={200}
                        src={'/icons/educacao.png'}
                    />
                    <p className={styles.paragraph}>
                        Envolver todas as partes interessadas nas <b>práticas educativas e institucionais</b> (ex: crianças, adolescentes, jovens, adultos, famílias, outras organizações da sociedade de forma geral.)
                    </p>       
                </div>

                <div className={`${styles.card3} ${styles.borderRed}`}>
                    <Image 
                        alt=''
                        width={200}
                        height={200}
                        src={'/icons/proposito.png'}
                    />
                    <p className={styles.paragraph}>
                        Fortalecer o <b>propósito educativo</b> das atividades escoteiras
                    </p>       
                </div>

                <div className={`${styles.card3} ${styles.borderGreen}`}>
                    <Image 
                        alt=''
                        width={200}
                        height={200}
                        src={'/icons/seguranca-atividades.png'}
                    />
                    <p className={styles.paragraph}>
                        Priorizar a <b>segurança nas atividades</b> do Movimento Escoteiro
                    </p>       
                </div>

                <div className={`${styles.card3} ${styles.borderGreen}`}>
                    <Image 
                        alt=''
                        width={200}
                        height={200}
                        src={'/icons/positivo.png'}
                    />
                    <p className={styles.paragraph}>
                        Promover e fomentar o <b>comportamento positivo</b> em favor da criação de espaços seguros
                    </p>       
                </div>

                <div className={`${styles.card3} ${styles.borderBlue}`}>
                    <Image 
                        alt=''
                        width={200}
                        height={200}
                        src={'/icons/desenvolvimento.png'}
                    />
                    <p className={styles.paragraph}>
                        <b>Incentivar o desenvolvimento</b> (tanto para os jovens, quanto para os adultos) para <b>lidarem ou denunciarem qualquer situação de risco</b> que esteja ocorrendo ou que tenham vivenciado ou testemunhado, nas atividades ou ambientes escoteiros
                    </p>       
                </div>

                <div className={`${styles.card3} ${styles.borderGreen}`}>
                    <Image 
                        alt=''
                        width={200}
                        height={200}
                        src={'/icons/capacitar.png'}
                    />
                    <p className={styles.paragraph}>
                        <b>Capacitar adultos voluntários</b> para que tenham condutas condizentes com o que se espera de um educador, alinhando-os aos valores do Movimento Escoteiro
                    </p>       
                </div>
            </div>

            <div className={styles.conteiner}>
                <h1 className={`${styles.title} ${styles.blue}`}>Política Nacional de Espaços Seguros</h1>

                <p className={styles.paragraph}>
                    Estabelecer um <b>padrão de excelência e prática em todas as suas ações</b> é uma das missões dos <b>Escoteiros do Brasil</b>. Em relação a geração de Espaços Seguros, os Escoteiros do Brasil já contam com uma <b>Política Nacional de Proteção Infantojuvenil</b>, e claras regras de segurança, expressas no documento Princípios, Organização e Regras, nos capítulos 14 e 15 do documento.
                </p>
                <p className={styles.paragraph}>
                    O <b>Conselho de Administração Nacional (CAN)</b>, por meio da <a href="https://www.escoteiros.org.br/wp-content/uploads/2023/11/Resolucao-CAN-08-23-Estabelece-a-Politica-de-Espacos-Seguros.pdf">resolução 08/23</a> estabelece a Política Nacional de Espaços Seguros no âmbito dos Escoteiros do Brasil, que pode ser consultada no <a href="https://www.escoteiros.org.br/wp-content/uploads/2023/11/Politica_nacional_de_espacos_seguros-1.pdf">link</a>.
                </p>
                <p className={styles.paragraph}>
                    Considerando os <b>Espaços Seguros</b> uma prioridade, os Escoteiros do Brasil orientam suas diversas dimensões a partir de regulamentos, documentos e materiais educativos.
                </p>
            </div>

            <div className={`${styles.faixa} ${styles.heightSlim}`}>
                <p className={styles.titleCenter}>
                    Links para direcionamento e downloads:
                </p>
            </div>
            <div className={styles.subConteiner}>
                <div className={`${styles.card4} cursorPointer`} onClick={()=>window.open('https://www.youtube.com/watch?v=maCQVOglsTs&t=1s', '_blank')}>
                    <h4>Política Nacional de Espaços Seguros</h4>
                    <p className={styles.paragraph}>                 
                        Vídeo no Youtube:
                    </p>
                    <Image 
                        alt=''
                        width={200}
                        height={200}
                        src={'/icons/IconeDoc.png'}
                    />                    
                </div>

                <div className={`${styles.card4} cursorPointer`} onClick={()=>window.open('https://ueb-wordpress.s3.amazonaws.com/2023/Iniciativas+de+Prote%C3%A7%C3%A3o+Infantojuvenil+nos+Escoteiros+do+Brasil.pdf', '_blank')}>
                    <h4>Iniciativas de Proteção Infantojuvenil nos Escoteiros do Brasil</h4>
                    <p className={styles.paragraph}>                 
                        Acesse a página e confira todas as tratativas relacionadas
                    </p>
                    <Image 
                        alt=''
                        width={200}
                        height={200}
                        src={'/icons/IconeDoc.png'}
                    />                    
                </div>

                <div className={`${styles.card4} cursorPointer`} onClick={()=>window.open('http://www.ead.escoteiros.org.br/', '_blank')}>
                    <h4>Caixa de Ferramentas dos Escoteiros do Brasil</h4>
                    <p className={styles.paragraph}>                 
                        Acesse na página inicial do CEV (Campo Escola Virtual):
                    </p>
                    <Image 
                        alt=''
                        width={200}
                        height={200}
                        src={'/icons/IconeDoc.png'}
                    />                    
                </div>

                <div className={`${styles.card4} cursorPointer`} onClick={()=>window.open('https://www.youtube.com/watch?v=maCQVOglsTs&t=1s%22', '_blank')}>
                    <h4>Conheça o vídeo referente à prevenção ao uso de drogas</h4>
                    <p className={styles.paragraph}>                 
                        Vídeo no Youtube:
                    </p>
                    <Image 
                        alt=''
                        width={200}
                        height={200}
                        src={'/icons/IconeDoc.png'}
                    />                    
                </div>
            </div>
        </Section>
    )
}