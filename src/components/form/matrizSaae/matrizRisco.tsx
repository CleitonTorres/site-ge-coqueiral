'use client'
import { useContext, useEffect, useState } from 'react';
import styles from './matrizRisco.module.css';
import { Context } from '@/components/context/context';
import { InventarioSaaeType } from '@/@types/types';

export default function MatrizRisco (){
    const context = useContext(Context);
    const [nivelRisco, setNivelRisco] = useState<InventarioSaaeType | undefined>(undefined); 

    const setColor = ()=>{
        if(!nivelRisco) return '';

        if(nivelRisco.nivelRisco > 0 && nivelRisco.nivelRisco < 4){
            return 'green';
        }else if(nivelRisco.nivelRisco > 3 && nivelRisco.nivelRisco < 8){
            return 'yellow';
        }else if(nivelRisco.nivelRisco > 7 && nivelRisco.nivelRisco < 13){
            return 'orange';
        }else{
            return 'red';
        }
    }
    
    useEffect(()=>{
        setNivelRisco(()=>{
            const maiorRisco = context.dataSaae?.inventarioRiscos?.sort((a,b)=> {
                if(a.nivelRisco > b.nivelRisco){
                    return - 1
                }else if(a.nivelRisco > b.nivelRisco){
                    return 1
                }else{
                    return 0
                }
            });

            return maiorRisco ? maiorRisco[maiorRisco.length-1] : undefined;
        });        
    },[]);

    return(
        <div className={styles.conteiner}>
            <h6>item 9.2 da Política Nacional de Gestão de Risco</h6>
            <h2>4. Matriz de risco</h2>
            <h3>Matriz de Probabilidade x Consequência</h3>
            
            <div className={`${styles.resultado}`}>
                <span>Maior resultado</span>
                <span 
                    style={{backgroundColor: setColor(), fontWeight: '700'}}
                >
                    {nivelRisco?.nivelRisco}
                </span>
            </div>
            
            <div className={styles.matriz}>
                <span className={styles.rotuloProbabilidade} title='probabilidade 5'>
                    Quase certo
                </span>
                <span 
                    className={`${styles.valor} ${nivelRisco?.nivelRisco === 5 ? styles.risco : ''}`} 
                    id='5' 
                    style={{
                        backgroundColor: 'yellow'
                    }}
                > 
                    5
                </span>
                <span 
                    className={`${styles.valor} ${nivelRisco?.nivelRisco === 10 ? styles.risco : ''}`} 
                    id='10' 
                    style={{backgroundColor: 'orange'}}
                > 
                    10
                </span>
                <span 
                    className={`${styles.valor} ${nivelRisco?.nivelRisco === 15 ? styles.risco : ''}`} 
                    id='15' 
                    style={{backgroundColor: 'red'}}
                > 
                    15
                </span>
                <span 
                    className={`${styles.valor} ${nivelRisco?.nivelRisco === 20 ? styles.risco : ''}`} 
                    id='20' 
                    style={{
                        backgroundColor: 'red'
                    }}
                > 
                    20
                </span>
                <span 
                    className={`${styles.valor} ${nivelRisco?.nivelRisco === 25 ? styles.risco : ''}`} 
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
                    className={`${styles.valor} ${nivelRisco?.nivelRisco === 4 ? styles.risco : ''}`} 
                    id='4' 
                    style={{backgroundColor: 'yellow'}}
                > 
                    4
                </span>
                <span 
                    className={`${styles.valor} ${nivelRisco?.nivelRisco === 8 ? styles.risco : ''}`} 
                    id='8' 
                    style={{backgroundColor: 'orange'}}
                > 
                    8
                </span>
                <span 
                    className={`${styles.valor} ${nivelRisco?.nivelRisco === 12 ? styles.risco : ''}`}
                    id='12' 
                    style={{backgroundColor: 'orange'}}
                > 
                    12
                </span>
                <span 
                    className={`${styles.valor} ${nivelRisco?.nivelRisco === 16 ? styles.risco : ''}`}
                    id='16'
                    style={{backgroundColor: 'red'}}
                > 
                    16
                </span>
                <span 
                    className={`${styles.valor} ${nivelRisco?.nivelRisco === 20 ? styles.risco : ''}`} 
                    id='20' 
                    style={{backgroundColor: 'red'}}
                > 
                    20
                </span>
                <span className={styles.rotuloProbabilidade} title='probabilidade 3'>
                    Possível
                </span>
                <span 
                    className={`${styles.valor} ${nivelRisco?.nivelRisco === 3 ? styles.risco : ''}`} 
                    id='3' 
                    style={{backgroundColor: 'green'}}
                > 
                    3
                </span>
                <span 
                    className={`${styles.valor} ${nivelRisco?.nivelRisco === 6 ? styles.risco : ''}`} 
                    id='6' 
                    style={{backgroundColor: 'yellow'}}
                > 
                    6
                </span>
                <span  
                    className={`${styles.valor} ${nivelRisco?.nivelRisco === 9 ? styles.risco : ''}`}  
                    id='9' 
                    style={{backgroundColor: 'orange'}}
                > 
                    9
                </span>
                <span 
                    className={`${styles.valor} ${nivelRisco?.nivelRisco === 12 ? styles.risco : ''}`} 
                    id='12' 
                    style={{backgroundColor: 'orange'}}> 
                    12
                </span>
                <span 
                    className={`${styles.valor} ${nivelRisco?.nivelRisco === 15 ? styles.risco : ''}`} 
                    id='15' 
                    style={{backgroundColor: 'red'}}> 
                    15
                </span>
                <span className={styles.rotuloProbabilidade} title='probabilidade 2'>
                    Raro
                </span>
                <span 
                    className={`${styles.valor} ${nivelRisco?.nivelRisco === 2 ? styles.risco : ''}`}  
                    id='2' 
                    style={{backgroundColor: 'green'}}
                > 
                    2
                </span>
                <span 
                    className={`${styles.valor} ${nivelRisco?.nivelRisco === 4 ? styles.risco : ''}`} 
                    id='4' 
                    style={{backgroundColor: 'yellow'}}
                > 
                    4
                </span>
                <span 
                    className={`${styles.valor} ${nivelRisco?.nivelRisco === 6 ? styles.risco : ''}`} 
                    id='6' 
                    style={{backgroundColor: 'yellow'}}
                > 
                    6
                </span>
                <span 
                    className={`${styles.valor} ${nivelRisco?.nivelRisco === 8 ? styles.risco : ''}`} 
                    id='8' 
                    style={{backgroundColor: 'orange'}}
                > 
                    8
                </span>
                <span 
                    className={`${styles.valor} ${nivelRisco?.nivelRisco === 10 ? styles.risco : ''}`} 
                    id='10' 
                    style={{backgroundColor: 'orange'}}
                > 
                    10
                </span>
                <span className={styles.rotuloProbabilidade} title='probabilidade 1'>
                    Improvável
                </span>
                <span 
                    className={`${styles.valor} ${nivelRisco?.nivelRisco === 1 ? styles.risco : ''}`} 
                    id='1' 
                    style={{backgroundColor: 'green'}}
                > 
                    1
                </span>
                <span 
                    className={`${styles.valor} ${nivelRisco?.nivelRisco === 2 ? styles.risco : ''}`} 
                    id='2'
                    style={{backgroundColor: 'green'}}
                > 
                    2
                </span>
                <span 
                    className={`${styles.valor} ${nivelRisco?.nivelRisco === 3 ? styles.risco : ''}`}  
                    id='3' 
                    style={{backgroundColor: 'green'}}
                > 
                    3
                </span>
                <span 
                    className={`${styles.valor} ${nivelRisco?.nivelRisco === 4 ? styles.risco : ''}`}  
                    id='4' 
                    style={{backgroundColor: 'yellow'}}
                > 
                    4
                </span>
                <span 
                    className={`${styles.valor} ${nivelRisco?.nivelRisco === 5 ? styles.risco : ''}`} 
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
                Nível <b style={{color: 'white', backgroundColor: 'green', padding: '0 3px'}}>Verde</b> são plenamente aceitaveis, não dependem de autorização da Região Escoteira, mas sim do Presidente da UEL. São atividade de cunho cívico, comunitário local, ambiental local, campanhas financeiras locais, ou de simples reuniões como palestras ou divulgação do movimento escoteiro. Mas precisa preencher o Plano de Emergência do item 1 ao 3. 
            </p>
            <br />
            <p className={styles.paragraph}>
                Nível <b style={{ backgroundColor: 'yellow', padding: '0 3px'}}>Amarelo</b> são aceitáveis desde que as colunas Controle Operacional e Ações Mitigadoras estejam preenchida de forma coerente. E os itens de 1 a 4 do Plano de Emergência. Dependem de autorização da Região Escoteira.
            </p>
            <br />
            <p className={styles.paragraph}>
                Nível <b style={{backgroundColor: 'orange', padding: '0 3px'}}>Laranja</b> são aceitaveis apenas se as colunas  <b>Controle Operacional</b> e <b>Ações Mitigadoras</b>  estiverem preenchidas de forma coerente. Incluindo a presença de um profissional da saúde/salvamento/especialista durante a atividade, quando aplicavel. E os itens de 1 a 6 do Plano de Emergência preenchidos. Dependem de autorização da Região Escoteira.
            </p>
            <br />
            <p className={styles.paragraph}>
                Nível <b style={{backgroundColor: 'red', padding: '0 3px'}}>Vermelho</b> são toleraveis, após análise da documentação pela Região Escoteira, sendo obrigatória a presença de profissionais da saúde/salvamento/especialista e o Plano de Emergencia completamente preenchido incluindo veículo e formas de comunicação para emergência. O Local de pronto socorro mais próximo não pode estar a mais de 50 KM de distância do local da atividade.
            </p>
        </div>
    )
}