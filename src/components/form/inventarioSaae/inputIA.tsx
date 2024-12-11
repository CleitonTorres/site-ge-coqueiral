'use client'
import { ChangeEvent, FocusEvent, KeyboardEvent, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { InventarioSaaeType } from '@/@types/types';
import styles from './inputIA.module.css';
import { FaPlus, FaMinus } from "react-icons/fa";
import Image from 'next/image';
import { Context } from '@/components/context/context';
import Texting from '@/components/layout/texting/texting';

const InventarioSaae = () => {
    const context = useContext(Context);
    const [atividadeCorrente, setAtividadeCorrente] = useState({} as InventarioSaaeType);

    const [inputForm, setInputForm] = useState<InventarioSaaeType[]>([]);
    const [loading, setLoading] = useState(false);
    const [useIA, setUseIA] = useState(true);
    const [commentIA, setCommentIA] = useState("Sempre Alerta chefe! Por favor, digite uma atividade para que eu possa lhe ajudar!");

    const handleCurrentAtivity = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>)=>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;

        setAtividadeCorrente((prev)=>{
            if(['probabilidade', 'consequencia', 'nivelRisco'].includes(name)){
                if(name === 'probabilidade'){
                    return{
                        ...prev,
                        probabilidade: JSON.parse(value),
                        nivelRisco: JSON.parse(value) * (prev.consequencia || 0)
                    }
                }else if(name === 'consequencia'){
                    return{
                        ...prev,
                        consequencia: JSON.parse(value),
                        nivelRisco: JSON.parse(value) * (prev.probabilidade || 0)
                    }
                }else{
                    return{
                        ...prev,
                        nivelRisco: JSON.parse(value),
                    }
                }
            }else{
                return{
                    ...prev,
                    [name]: value
                }
            }
        })
    }

    const handleForm = (
        e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>,
        idx: number
    )=>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;

        const newData = inputForm.map((ativ, index)=>{
            if(index === idx){
                if(['probabilidade', 'consequencia', 'nivelRisco'].includes(name)){
                    if(name === 'probabilidade'){
                        return{
                            ...ativ,
                            probabilidade: JSON.parse(value),
                            nivelRisco: JSON.parse(value) * (ativ.consequencia || 0)
                        }
                    }else if(name === 'consequencia'){
                        return{
                            ...ativ,
                            consequencia: JSON.parse(value),
                            nivelRisco: JSON.parse(value) * (ativ.probabilidade || 0)
                        }
                    }else{
                        return{
                            ...ativ,
                            nivelRisco: JSON.parse(value),
                        }
                    }
                }

                return{
                    ...ativ,
                    [name]: value
                }
            }else{
                return ativ
            }
        });

        setInputForm(newData);
        updateContext(newData);
    }

    const handleSubmit = async (e?: FocusEvent<HTMLTextAreaElement> | FocusEvent<HTMLInputElement>, valor?: string ) => {
        e?.preventDefault();
        const value = e?.target.value || valor;

        //console.log("no submit", value)
        if(!useIA)return;

        if(!value) return;

        const verify = inputForm.find(ativ=> ativ.atividade === value);
        if(verify) return;

        setLoading(true);
        try {
            const result = await axios.post(`${process.env.NEXT_PUBLIC_URL_SERVICES}`, { 
                    input: value,
                    service: 'iaSaae'
                },{
                headers:{
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTORIZATION}`
                }
            });

            console.log(result.data);
        
            const Response = result.data as {
                atividade: string, 
                comment: string,
                dados: [{
                    perigo:string, 
                    dano:string, 
                    controleOperacional: string,
                    acoesMitigadoras: string
            }]};

            const newData = Response.dados?.map(dados=> {
                return{
                    atividade: Response.atividade,
                    perigo: dados.perigo,
                    danos: dados.dano,
                    acoesMitigadoras: dados.acoesMitigadoras,
                    controleOperacional: dados.controleOperacional
                } as InventarioSaaeType
            });           
            setCommentIA(Response.comment || '')
            
            setInputForm([
                ...inputForm,
                ...newData
            ]);

            updateContext([
                ...inputForm,
                ...newData
            ]);

        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            alert("Ocorreu um erro ao gerar dados!")
        } finally {
            setLoading(false);
        }
    };

    const addItem = ()=>{
        const newDate = [...inputForm, {
            ...atividadeCorrente,
            probabilidade: !isNaN(atividadeCorrente.probabilidade) ? atividadeCorrente.probabilidade : 0,
            consequencia: !isNaN(atividadeCorrente.consequencia) ? atividadeCorrente.consequencia : 0,
            nivelRisco: !isNaN(atividadeCorrente.nivelRisco) ? atividadeCorrente.nivelRisco : 0
        } as InventarioSaaeType];
        setInputForm(newDate);
        updateContext(newDate);
        setAtividadeCorrente({} as InventarioSaaeType)
    }

    const removeItem = (idx:number)=>{
        const newDate = inputForm.filter((ativ, i)=> i !== idx);
        setInputForm(newDate);
        updateContext(newDate);
    }

    const updateContext = (newData:InventarioSaaeType[])=>{
        context.setDataSaae(inv=>{
            return{
                ...inv,
                inventarioRiscos: newData
            }
        });
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        
        if (e.key === 'Enter') {
            console.log("chamou", value)
            handleSubmit(undefined, value);
        }
    };

    useEffect(()=>{
        const value = atividadeCorrente.probabilidade * atividadeCorrente.consequencia;
        setAtividadeCorrente((prev)=>{
            return{
                ...prev,
                nivelRisco: value
            }
        })
    },[atividadeCorrente.probabilidade, atividadeCorrente.consequencia])
    
    useEffect(()=>{
        //pega as infos salvas no contexto.
        // Atualiza o contexto e define o estado local após isso
        const inventario = context.dataSaae?.inventarioRiscos || []; // Dados iniciais
        setInputForm(inventario);
    },[]);

    return (
        <div className={styles.conteiner}>
            {useIA ?
                <div className={styles.boxAvatar}> 
                    <Image 
                        alt='assistente Mathias'
                        width={90}
                        height={90}
                        src={'/icons/assistente-mathias.png'}
                    />
                    <Texting text={commentIA} speed={100}/>
                </div>
            :null}
            <h6>item 6.5.1 da ISO 21101 e itens 7.5, 7.6, 9.1 da Política Nacional de Gestão de Risco</h6>
            <h2>3. Inventário de Riscos:</h2>
            <div className={styles.boxCheckIA}>
                <label htmlFor="" style={{fontSize: '14px'}}>Usar IA Mathias?</label>
                <input  
                    style={{position: 'relative', marginLeft: '10px'}}
                    type="checkbox" 
                    checked={useIA} 
                    onChange={()=>setUseIA(prev=> !prev)}
                />
            </div>
            <div className={styles.table}>
                <div className={styles.content}>
                    <h1 className={styles.header}>
                        Etapa do Evento/Atividade
                    </h1>
                    <div className={styles.collum}>
                        {loading ? <span>gerando dados</span> : null}
                        <input
                            name='atividade'
                            value={atividadeCorrente?.atividade || ''}
                            onChange={(e) => handleCurrentAtivity(e)}
                            onBlur={(e)=>handleSubmit(e)}
                            onKeyDown={handleKeyDown}
                            placeholder="Exemplo: remada em caiaque"
                            style={{border: 'none', height: 40}}
                        />                       
                    </div>
                    {inputForm?.map((item, idx)=>(
                        <textarea
                            key={`${idx}-atividade`}
                            name='atividade'
                            value={item?.atividade || ''}
                            onChange={(e) => handleForm(e, idx)}
                            placeholder="Exemplo: remada em caiaque"
                            className={`${styles.collum}`}
                        /> 
                    ))}
                </div>
                <div className={styles.content}>
                    <h1 className={styles.header}>
                        Perigos
                    </h1>
                    <textarea
                        name='perigo'
                        value={atividadeCorrente?.perigo || ''}
                        onChange={(e) => handleCurrentAtivity(e)}
                        placeholder="Exemplo: insolação"
                        className={`${styles.collum}`}
                    />
                    {inputForm?.map((item, idx)=>(
                        <textarea
                            key={`${idx}-perigo`}
                            name='perigo'
                            value={item?.perigo || ''}
                            onChange={(e) => handleForm(e, idx)}
                            onBlur={(e)=>handleSubmit(e)}
                            placeholder="Exemplo: remada em caiaque"
                            className={`${styles.collum} ${styles.alingLeftText}`}
                        />
                    ))}
                </div>
                <div className={styles.content}>
                    <h1 className={styles.header}>
                        Danos
                    </h1>
                    <textarea
                        name='danos'
                        value={atividadeCorrente?.danos || ''}
                        onChange={(e) => handleCurrentAtivity(e)}
                        placeholder="Exemplo: nauseas, dor de cabeça, fraqueza, queimaduras na pele..."
                        className={`${styles.collum} `}
                    />
                    {inputForm?.map((item, idx)=>(
                        <textarea
                            key={`${idx}-danos`}
                            name='danos'
                            value={item?.danos || ''}
                            onChange={(e) => handleForm(e, idx)}
                            onBlur={(e)=>handleSubmit(e)}
                            placeholder="Exemplo: remada em caiaque"
                            className={`${styles.collum} ${styles.alingLeftText}`}
                        />
                    ))}
                </div>
                <div className={styles.content}>
                    <h1 className={styles.header}>
                        Controle Operacional
                    </h1>
                    <textarea
                        name='controleOperacional'
                        value={atividadeCorrente?.controleOperacional || ''}
                        onChange={(e) => handleCurrentAtivity(e)}
                        placeholder="Exemplo: orientação para usar roupas leves e adequadas para a atividade, usar cobertura de cabeça, se hidratar regularmente."
                        className={`${styles.collum} `}
                    />
                    {inputForm?.map((item, idx)=>(
                        <textarea
                            key={`${idx}-controleOperacional`}
                            name='controleOperacional'
                            value={item?.controleOperacional || ''}
                            onChange={(e) => handleForm(e, idx)}
                            onBlur={(e)=>handleSubmit(e)}
                            placeholder="Exemplo: remada em caiaque"
                            className={`${styles.collum} ${styles.alingLeftText}`}
                        />
                    ))}
                </div>
                <div className={styles.content}>
                    <h1 className={styles.header}>
                        Ações mitigadoras
                    </h1>
                    <textarea
                        name='acoesMitigadoras'
                        value={atividadeCorrente?.acoesMitigadoras || ''}
                        onChange={(e) => handleCurrentAtivity(e)}
                        placeholder="Exemplo: por o participante em repouso em local sombrado, oferecer hidratação lenta, umidecer nuca e o rosto."
                        className={`${styles.collum} `}
                    />
                    {inputForm?.map((item, idx)=>(
                        <textarea
                            key={`${idx}-acoesMitigadoras`}
                            name='acoesMitigadoras'
                            value={item?.acoesMitigadoras || ''}
                            onChange={(e) => handleForm(e, idx)}
                            onBlur={(e)=>handleSubmit(e)}
                            placeholder="Exemplo: remada em caiaque"
                            className={`${styles.collum} ${styles.alingLeftText}`}
                        />
                    ))}
                </div>
                <div className={styles.content}>
                    <h1 className={`${styles.header} ${styles.width100}`} title='Probabilidade do perigo ocorrer'>
                        Probabilidade
                    </h1>
                    <select
                        name='probabilidade'
                        value={atividadeCorrente?.probabilidade || ''}
                        onChange={(e) => handleCurrentAtivity(e)}
                        className={`${styles.collum} ${styles.width100}`}
                    >
                        <option value=""></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    {inputForm?.map((item, idx)=>(
                        <select 
                            key={`${idx}-probabilidade`}
                            name='probabilidade'
                            className={`${styles.collum} ${styles.width100} ${styles.alingLeftText}`}
                            value={item?.probabilidade}
                            onChange={(e)=>handleForm(e, idx)}
                        >
                             <option value=""></option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    ))}
                </div>
                <div className={styles.content}>
                    <h1 className={`${styles.header} ${styles.width100}`} title='Consequência caso o perigo ocorra'>
                        Consequência
                    </h1>
                    <select
                        name='consequencia'
                        value={atividadeCorrente?.consequencia || ''}
                        onChange={(e) => handleCurrentAtivity(e)}
                        className={`${styles.collum} ${styles.width100}`}
                    >
                        <option value=""></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    {inputForm?.map((item, idx)=>(
                        <select 
                            key={`${idx}-consequencia`}
                            name='consequencia'
                            className={`${styles.collum} ${styles.width100} ${styles.alingLeftText}`}
                            value={item?.consequencia}
                            onChange={(e)=>handleForm(e, idx)}
                        >
                            <option value=""></option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    ))}
                </div>
                <div className={styles.content}>
                    <h1 className={`${styles.header} ${styles.width100}`} title='Consequência caso o perigo ocorra'>
                        Nível de Risco
                    </h1>
                    <FaPlus 
                        className={styles.addItem} 
                        onClick={addItem} 
                        aria-label='adicionar este item'
                        title='adicionar este item'/>
                    <select
                        name='nivelRisco'
                        value={atividadeCorrente.nivelRisco || ''}
                        onChange={(e) => handleCurrentAtivity(e)}
                        className={`${styles.collum} ${styles.width100}`}
                    >
                        <option value={atividadeCorrente.nivelRisco || ''}>{(atividadeCorrente?.probabilidade * atividadeCorrente?.consequencia) || ''}</option>
                    </select>
                    {inputForm?.map((item, idx)=>(
                        <div key={`${idx}-nivelRisco`} style={{position: 'relative'}}>
                            <FaMinus 
                                className={styles.removeItem} 
                                onClick={()=>removeItem(idx)} 
                                aria-label='remover este item'
                                title='remover este item'/>
                            <select                                
                                name='nivelRisco'
                                value={item?.nivelRisco || ''}
                                onChange={(e) => handleForm(e, idx)}
                                className={`${styles.collum} ${styles.width100} ${styles.alingLeftText}`}
                            >
                                <option value={item?.nivelRisco}>{item?.nivelRisco}</option>
                            </select>
                        </div>
                        
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InventarioSaae;
