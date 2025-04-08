import styles from './relatorioSaae.module.css';
import { ChangeEvent, useContext, useState } from 'react';
import { Context } from '@/components/context/context';
import { adressToString, dateFormat2 } from '@/scripts/globais';
import { FaPlus, FaTrash } from 'react-icons/fa';
import Botton from '../botton/botton';
import Confirme from '@/components/layout/confirme/confirme';

type Props= {
    readOnly?: boolean
    print?:boolean
}
export default function RelatorioSaae({readOnly}:Props) {
    const context = useContext(Context);
    const [curentOcorrenciasEnf, setCurrentOcorrenciasEnf] = useState<string>('');
    const [curentOcorrenciasGraves, setCurrentOcorrenciasGraves] = useState<string>('');
    
    const handleCurrentForm = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        if(name === 'curentOcorrenciasEnf'){
            setCurrentOcorrenciasEnf(value);
        }else{
            setCurrentOcorrenciasGraves(value)
        }
    }
    const handleForm = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, idxItem?:number)=>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;

        context.setDataSaae((prev)=>{
            if(['ocorrenciasEnfermaria', 'ocorrenciasGraves'].includes(name)){
                const field = name as 'ocorrenciasEnfermaria' | 'ocorrenciasGraves';
                const newArray = (prev.relatorio || {})[field]?.map((item, index)=> {
                    if(index === idxItem){
                        return value;
                    }else{
                        return item;
                    }
                }) || [];

                return {
                    ...prev,
                    relatorio: {
                        ...prev.relatorio,
                        [field]: newArray
                    }
                }
            } else{
                return {
                    ...prev,
                    relatorio: {
                        ...prev.relatorio,
                        [name]: value
                    }
                }
            }
        })
    }

    const addOcorrencia = (tipo: 'ocorrenciasEnfermaria' | 'ocorrenciasGraves')=>{        
        context.setDataSaae((prev)=>{
            const obj = (prev.relatorio || {})[tipo];
            const newArray = obj?.concat(tipo === 'ocorrenciasEnfermaria' ? `${obj.length+1} - ${curentOcorrenciasEnf}` : `${obj.length+1} - ${curentOcorrenciasGraves}`) 
                || [tipo === 'ocorrenciasEnfermaria' ? `${obj.length+1} - ${curentOcorrenciasEnf}` : `${obj.length+1} - ${curentOcorrenciasGraves}`];

            return {
                ...prev,
                relatorio: {
                    ...prev.relatorio,
                    [tipo]: newArray
                }
            }
        });
        setCurrentOcorrenciasEnf('');
        setCurrentOcorrenciasGraves('');
    }

    const removeOcorrencia = (tipo: 'ocorrenciasEnfermaria' | 'ocorrenciasGraves', idxItem:number)=>{
        context.setDataSaae((prev)=>{
            const newData = (prev.relatorio || {})[tipo]?.filter((i, index)=> index !== idxItem);
            return {
                ...prev,
                relatorio: {
                    ...prev.relatorio,
                    [tipo]: newData
                }
            }
        })
    }   

    return (
        <div className={styles.container} style={{marginTop: readOnly ? '30px' : '0px'}}>
            <h2 className={styles.bgGreen}>Relatório Saae</h2>
            <div className={styles.table}>
                <div className={styles.line}>
                    <div className={styles.collum}>
                        <h1>Nome da atividade</h1>
                        <p>{context.dataSaae?.dadosGerais?.nomeAtividade || ''}</p>
                    </div>
                    <div className={styles.collum}>
                        <h1>Local</h1>
                        <p>{adressToString(context.dataSaae?.dadosGerais?.localInicio)}</p>
                    </div>
                    <div className={styles.collum}>
                        <h1>Data início</h1>
                        <p>{dateFormat2(context.dataSaae?.dadosGerais?.dataInicio) || ''}</p>
                    </div>
                    <div className={styles.collum}>
                        <h1>Data fim</h1>
                        <p>{dateFormat2(context.dataSaae?.dadosGerais?.dataFim) || ''}</p>
                    </div>
                    <div className={styles.collum}>
                        <h1>Coordenador da atividade</h1>
                        <p>{context.dataSaae?.dadosGerais?.coordenador || ''}</p>
                    </div>
                    <div className={styles.collum}>
                        <h1>Quantidade de Jovens</h1>
                        {!readOnly ? <input 
                            type='number'
                            name='quantidadeJovens'
                            value={context.dataSaae?.relatorio?.quantidadeJovens || ''}
                            onChange={(e)=>handleForm(e)}
                        /> :
                            <p>{context.dataSaae?.relatorio?.quantidadeJovens || ''}</p>
                        }
                    </div>
                    <div className={styles.collum}>
                        <h1>Quantidade de Voluntários</h1>
                        {!readOnly ? <input 
                            type='number'
                            name='quantidadeVoluntarios'
                            value={context.dataSaae?.relatorio?.quantidadeVoluntarios || ''}
                            onChange={(e)=>handleForm(e)}
                        /> :
                            <p>{context.dataSaae?.relatorio?.quantidadeVoluntarios || ''}</p>
                        }
                    </div>
                    <div className={styles.collum}>
                        <h1>Link com os feedbacks dos participantes</h1>
                        {!readOnly ? <input 
                            type='text'
                            name='linkFeedbacks'
                            value={context.dataSaae?.relatorio?.linkFeedbacks || ''}
                            onChange={(e)=>handleForm(e)}
                        /> :
                            <p>{context.dataSaae?.relatorio?.linkFeedbacks || ''}</p>
                        }
                    </div>
                </div>
                <div className={styles.line}>
                    <div className={styles.collum}>
                        <h1>Relatório da atividade</h1>
                        <textarea 
                            name='relatorio'
                            value={context.dataSaae?.relatorio?.relatorio || ''}
                            onChange={(e)=>handleForm(e)}
                        />
                    </div>
                </div>

                <div className={styles.line}> 
                    <div className={styles.collum}>
                        <h1>Ocorrências de enfermaria</h1>
                        {!readOnly ? <div>                        
                            <textarea 
                                name='curentOcorrenciasEnf'
                                value={curentOcorrenciasEnf || ''}
                                onChange={(e)=>handleCurrentForm(e)}
                            />
                            <FaPlus 
                                className={styles.btnAddOcorrencia}
                                onClick={()=>addOcorrencia('ocorrenciasEnfermaria')} 
                            />
                        </div> : null}
                    
                        {context.dataSaae?.relatorio?.ocorrenciasEnfermaria?.map((item, index)=>(
                            <div key={index+'enf'} className={styles.collum}>
                                {!readOnly ?
                                    <>
                                    <textarea 
                                        name='ocorrenciasEnfermaria'
                                        value={item}
                                        onChange={(e)=>handleForm(e, index)}
                                    /> 
                                    <FaTrash 
                                        className={styles.btnRemOcorrencia}
                                        onClick={()=>removeOcorrencia('ocorrenciasEnfermaria', index)}
                                    />
                                    </> 
                                : <p>{item}</p>}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.line}> 
                    <div className={styles.collum}>
                        <h1>Ocorrências de graves</h1>
                        {!readOnly ? <div>
                            <textarea 
                                name='curentOcorrenciasGraves'
                                value={curentOcorrenciasGraves || ''} 
                                onChange={(e)=>handleCurrentForm(e)}
                            />
                            <FaPlus 
                                className={styles.btnAddOcorrencia}
                                onClick={()=>addOcorrencia('ocorrenciasGraves')} 
                            />
                        </div> : null}
                        {context.dataSaae?.relatorio?.ocorrenciasGraves?.map((item, index)=>(
                            <div key={index+'graves'} className={styles.collum}>
                                {!readOnly ? 
                                    <>
                                    <textarea 
                                        name='ocorrenciasGraves'
                                        value={item}
                                        onChange={(e)=>handleForm(e, index)}
                                    /> 
                                    <FaTrash 
                                        className={styles.btnRemOcorrencia}
                                        onClick={()=>removeOcorrencia('ocorrenciasGraves', index)}
                                    />
                                    </>
                                : <p>{item}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {!readOnly ? 
            <div className={styles.boxButton}>
                <Botton 
                    customClass={['marginTop20']}
                    title='Enviar' 
                    titleHover='Enviar para análise'
                    action={()=>{
                    context.setShowModal({
                        element: <Confirme
                            message='Deseja enviar sua SAAE para análise?'
                            confirme={async()=>{
                                return await context.handleSendSaae({...context.dataSaae});
                            }}
                            cancele={()=> context.setShowModal(null)}
                        />,
                        styles:['backgroundBlue']
                    })
                }}/>
            </div>
            :null}
        </div>
    )
}