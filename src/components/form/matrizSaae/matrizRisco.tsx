'use client'
import { useContext } from 'react';
import styles from './matrizRisco.module.css';
import { Context } from '@/components/context/context';

type Props = {
    readOnly: boolean
}
export default function MatrizRisco ({readOnly}:Props){
    const context = useContext(Context);
    
    return(
        <div className={styles.conteiner} style={{marginTop: readOnly ? '30px' : '0px'}}>
            <div className={`${styles.boxHead} ${styles.bgGreen}`}>
                <h6>item 9.2 da Política Nacional de Gestão de Risco</h6>
                <h1>4. Matriz de risco</h1>
            </div>
            <h3>Matriz de Probabilidade x Consequência</h3>
            
            <div className={`${styles.resultado}`}>
                <span>Maior resultado</span>
                <span 
                    style={{backgroundColor: context.dataSaae?.grauRisco?.color, fontWeight: '700'}}
                >
                    {context.dataSaae?.grauRisco?.value || ''}
                </span>
            </div>
            
            <div className={styles.matriz}>
                <span className={styles.rotuloProbabilidade} title='probabilidade 5'>
                    Quase certo
                </span>
                <span 
                    className={`${styles.valor} ${context.dataSaae?.grauRisco?.value === 5 ? styles.risco : ''}`} 
                    id='5' 
                    style={{
                        backgroundColor: 'yellow'
                    }}
                > 
                    5
                </span>
                <span 
                    className={`${styles.valor} ${context.dataSaae?.grauRisco?.value === 10 ? styles.risco : ''}`} 
                    id='10' 
                    style={{backgroundColor: 'orange'}}
                > 
                    10
                </span>
                <span 
                    className={`${styles.valor} ${context.dataSaae?.grauRisco?.value === 15 ? styles.risco : ''}`} 
                    id='15' 
                    style={{backgroundColor: 'red'}}
                > 
                    15
                </span>
                <span 
                    className={`${styles.valor} ${context.dataSaae?.grauRisco?.value === 20 ? styles.risco : ''}`} 
                    id='20' 
                    style={{
                        backgroundColor: 'red'
                    }}
                > 
                    20
                </span>
                <span 
                    className={`${styles.valor} ${context.dataSaae?.grauRisco?.value === 25 ? styles.risco : ''}`} 
                    id='25' 
                    style={{backgroundColor: 'red'}}
                > 
                    25
                </span>
                <span 
                    className={styles.rotuloProbabilidade} title='probabilidade 4'>
                    Provável
                </span>
                <span 
                    className={`${styles.valor} ${context.dataSaae?.grauRisco?.value === 4 ? styles.risco : ''}`} 
                    id='4' 
                    style={{backgroundColor: 'yellow'}}
                > 
                    4
                </span>
                <span 
                    className={`${styles.valor} ${context.dataSaae?.grauRisco?.value === 8 ? styles.risco : ''}`} 
                    id='8' 
                    style={{backgroundColor: 'orange'}}
                > 
                    8
                </span>
                <span 
                    className={`${styles.valor} ${context.dataSaae?.grauRisco?.value === 12 ? styles.risco : ''}`}
                    id='12' 
                    style={{backgroundColor: 'orange'}}
                > 
                    12
                </span>
                <span 
                    className={`${styles.valor} ${context.dataSaae?.grauRisco?.value === 16 ? styles.risco : ''}`}
                    id='16'
                    style={{backgroundColor: 'red'}}
                > 
                    16
                </span>
                <span 
                    className={`${styles.valor} ${context.dataSaae?.grauRisco?.value === 20 ? styles.risco : ''}`} 
                    id='20' 
                    style={{backgroundColor: 'red'}}
                > 
                    20
                </span>
                <span className={styles.rotuloProbabilidade} title='probabilidade 3'>
                    Possível
                </span>
                <span 
                    className={`${styles.valor} ${context.dataSaae?.grauRisco?.value === 3 ? styles.risco : ''}`} 
                    id='3' 
                    style={{backgroundColor: 'green'}}
                > 
                    3
                </span>
                <span 
                    className={`${styles.valor} ${context.dataSaae?.grauRisco?.value === 6 ? styles.risco : ''}`} 
                    id='6' 
                    style={{backgroundColor: 'yellow'}}
                > 
                    6
                </span>
                <span  
                    className={`${styles.valor} ${context.dataSaae?.grauRisco?.value === 9 ? styles.risco : ''}`}  
                    id='9' 
                    style={{backgroundColor: 'orange'}}
                > 
                    9
                </span>
                <span 
                    className={`${styles.valor} ${context.dataSaae?.grauRisco?.value === 12 ? styles.risco : ''}`} 
                    id='12' 
                    style={{backgroundColor: 'orange'}}> 
                    12
                </span>
                <span 
                    className={`${styles.valor} ${context.dataSaae?.grauRisco?.value === 15 ? styles.risco : ''}`} 
                    id='15' 
                    style={{backgroundColor: 'red'}}> 
                    15
                </span>
                <span className={styles.rotuloProbabilidade} title='probabilidade 2'>
                    Raro
                </span>
                <span 
                    className={`${styles.valor} ${context.dataSaae?.grauRisco?.value === 2 ? styles.risco : ''}`}  
                    id='2' 
                    style={{backgroundColor: 'green'}}
                > 
                    2
                </span>
                <span 
                    className={`${styles.valor} ${context.dataSaae?.grauRisco?.value === 4 ? styles.risco : ''}`} 
                    id='4' 
                    style={{backgroundColor: 'yellow'}}
                > 
                    4
                </span>
                <span 
                    className={`${styles.valor} ${context.dataSaae?.grauRisco?.value === 6 ? styles.risco : ''}`} 
                    id='6' 
                    style={{backgroundColor: 'yellow'}}
                > 
                    6
                </span>
                <span 
                    className={`${styles.valor} ${context.dataSaae?.grauRisco?.value === 8 ? styles.risco : ''}`} 
                    id='8' 
                    style={{backgroundColor: 'orange'}}
                > 
                    8
                </span>
                <span 
                    className={`${styles.valor} ${context.dataSaae?.grauRisco?.value === 10 ? styles.risco : ''}`} 
                    id='10' 
                    style={{backgroundColor: 'orange'}}
                > 
                    10
                </span>
                <span className={styles.rotuloProbabilidade} title='probabilidade 1'>
                    Improvável
                </span>
                <span 
                    className={`${styles.valor} ${context.dataSaae?.grauRisco?.value === 1 ? styles.risco : ''}`} 
                    id='1' 
                    style={{backgroundColor: 'green'}}
                > 
                    1
                </span>
                <span 
                    className={`${styles.valor} ${context.dataSaae?.grauRisco?.value === 2 ? styles.risco : ''}`} 
                    id='2'
                    style={{backgroundColor: 'green'}}
                > 
                    2
                </span>
                <span 
                    className={`${styles.valor} ${context.dataSaae?.grauRisco?.value === 3 ? styles.risco : ''}`}  
                    id='3' 
                    style={{backgroundColor: 'green'}}
                > 
                    3
                </span>
                <span 
                    className={`${styles.valor} ${context.dataSaae?.grauRisco?.value === 4 ? styles.risco : ''}`}  
                    id='4' 
                    style={{backgroundColor: 'yellow'}}
                > 
                    4
                </span>
                <span 
                    className={`${styles.valor} ${context.dataSaae?.grauRisco?.value === 5 ? styles.risco : ''}`} 
                    id='5' 
                    style={{backgroundColor: 'orange'}}
                > 
                    5
                </span>

                <span className={styles.width100} style={{margin: '1px'}}></span>

                <span className={`${styles.rotuloConsequencia}`} title='consequência 1'>
                    Desprezível
                </span>
                <span className={styles.rotuloConsequencia} title='consequência 2'>
                    Menor
                </span>
                <span className={styles.rotuloConsequencia} title='consequência 3'>
                    Moderada
                </span>
                <span className={styles.rotuloConsequencia} title='consequência 4'>
                    Maior
                </span>
                <span className={styles.rotuloConsequencia} title='consequência 5'>
                    Catastrófica
                </span>
            </div>
            
            <p className={styles.paragraph}>
                <b>Obs.:</b> as orientações abaixo são orientações mínimas para norte do preenchimento do Plano de Ação, o <b>nível de risco</b> deve ser efetivamente avaliado no Inventário de Risco de acordo com as nuances da 1. atividade (esforço físico, esforço mental), 2. do local (fauna e flora), 3. dos participantes (alergias e condicionamento físico), 4. da mobilidade (local de dificil acesso) e 5. das condições de clima e histórico de incidentes do local. 
            </p>

            <p className={styles.paragraph}>
                Nível <b style={{color: 'white', backgroundColor: 'green', padding: '0 3px'}}>Verde</b> são plenamente aceitaveis, não dependem de autorização da Região Escoteira, mas sim do Presidente da UEL. São atividade de cunho cívico, comunitário local, ambiental local, campanhas financeiras locais, ou de simples reuniões como palestras ou divulgação do movimento escoteiro. 
            </p>
            <br />
            <p className={styles.paragraph}>
                Nível <b style={{ backgroundColor: 'yellow', padding: '0 3px'}}>Amarelo</b> são atividades de grupo como acampamentos, caminhadas eventos anuais como MUTECO, MUTCON, Educação Escoteira etc. Que não envolvam grupos convidados ou atividade de alto risco como rapel, escalada, atividades aquáticas. São aceitáveis desde que as colunas Controle Operacional e Ações Mitigadoras estejam preenchida de forma coerente. Dependem de autorização da Região Escoteira.
            </p>
            <br />
            <p className={styles.paragraph}>
                Nível <b style={{backgroundColor: 'orange', padding: '0 3px'}}>Laranja</b> são atividades como acampamentos intergrupos, ou de grupo ou patrulha que envolvam atividades de carater mais esportivo como enduros/caminhas longas, escalaminhadas, montanhismo, travessias, jornadas, bivaques, acampamento volante etc. São aceitaveis apenas se as colunas  <b>Controle Operacional</b> e <b>Ações Mitigadoras</b>  estiverem preenchidas de forma coerente. Em casos de acampamentos intergrupos inclui a necessidade da instalação de um espaço de escuta e enfermaria. Dependem de autorização da Região Escoteira.
            </p>
            <br />
            <p className={styles.paragraph}>
                Nível <b style={{backgroundColor: 'red', padding: '0 3px'}}>Vermelho</b> São atividade complexas com mais de 2 dois dias de duração, ou que incluam atividade de carater radical (rapel, escalada, rafting, remada, corrida, excurções, natação) ou exposição a intempéries do tempo ou ameaças de animais selvagens (acampamentos, jornadas e trilhas em floresta nativa). São toleraveis, após análise da documentação pela Região Escoteira, sendo obrigatória a presença de profissionais da saúde/salvamento/especialista e o Plano de Emergencia completamente preenchido incluindo veículo e formas de comunicação para emergência. O Local de pronto socorro mais próximo não pode estar a mais de 50 KM de distância do local da atividade.
            </p>
        </div>
    )
}