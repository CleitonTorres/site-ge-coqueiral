'use client'
import { ChangeEvent, FocusEvent, KeyboardEvent, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { InventarioSaaeType } from '@/@types/types';
import styles from './inputIA.module.css';
import { FaPlus, FaMinus } from "react-icons/fa";
import { Context } from '@/components/context/context';
import { setColor } from '@/scripts/globais';
import Mathias from '@/components/layout/mathias/mathias';

type Props = {
    readOnly: boolean,
    localData: InventarioSaaeType[],
    print?: boolean
}

/**
 * Componente que gerencia o inventário de riscos de uma SAAE.
 * @param {boolean} readOnly - Define se o componente é somente leitura.
 * @param {InventarioSaaeType[]} localData - Dados locais do componente.
 * @param {boolean} print - Define se o componente será impresso.
 */
const InventarioSaae = ({readOnly, localData, print}:Props) => {
    const context = useContext(Context);

    const [atividadeCorrente, setAtividadeCorrente] = useState({} as InventarioSaaeType);

    const [loading, setLoading] = useState(false);
    const [useIA, setUseIA] = useState(false);
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

        context.setDataSaae((prev)=>{
            const newData = prev.inventarioRiscos.map((ativ, index)=>{
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

            const nivelRisco = calcNivelRisco(newData)

            return{
                ...prev,
                grauRisco: nivelRisco,
                inventarioRiscos: newData
            }
        })        
    }

    const handleSubmit = async (e?: FocusEvent<HTMLTextAreaElement> | FocusEvent<HTMLInputElement>, valor?: string ) => {
        e?.preventDefault();
        const value = e?.target.value || valor;

        //console.log("no submit", value)
        if(!useIA)return;

        if(!value) return;

        const verify = localData?.find(ativ=> ativ.atividade === atividadeCorrente.atividade);
        console.log(verify);
        if(verify) return;

        setLoading(true);
        try { 
            const formData = new FormData();
            formData.append('input', value);
            formData.append('service', 'iaSaae');

            const result = await axios.post(`${process.env.NEXT_PUBLIC_URL_UPLOAD}/mathias`, formData,{
                headers:{
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTORIZATION}`
                }
            });
        
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
                    controleOperacional: dados.controleOperacional,
                    consequencia: 0,
                    probabilidade: 0,
                    nivelRisco: 0
                } as InventarioSaaeType
            });           
            setCommentIA(Response.comment || '')
            
            context.setDataSaae((prev)=>{
                const data = [
                    ...prev.inventarioRiscos,
                    ...newData
                ];
                const nivelRisco = calcNivelRisco(data);
                
                return{
                    ...prev,
                    grauRisco: nivelRisco,
                    inventarioRiscos: data
                }
            })

        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            alert("Ocorreu um erro ao gerar dados!")
        } finally {
            setLoading(false);
        }
    };

    const addItem = ()=>{
        context.setDataSaae((prev)=>{
            const newData = [
                ...prev.inventarioRiscos || [], {
                ...atividadeCorrente,
                probabilidade: !isNaN(atividadeCorrente.probabilidade) ? atividadeCorrente.probabilidade : 0,
                consequencia: !isNaN(atividadeCorrente.consequencia) ? atividadeCorrente.consequencia : 0,
                nivelRisco: !isNaN(atividadeCorrente.nivelRisco) ? atividadeCorrente.nivelRisco : 0
            } as InventarioSaaeType];

            const nivelRisco = calcNivelRisco(newData)
            
            return {
                ...prev,
                inventarioRiscos: newData,
                grauRisco: nivelRisco
            }
        })

        setAtividadeCorrente({} as InventarioSaaeType)
    }

    const removeItem = (idx:number)=>{
        context.setDataSaae((prev)=>{
            const newData = prev.inventarioRiscos.filter((ativ, i)=> i !== idx);
            return{
                ...prev,
                inventarioRiscos: newData
            }
        })
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        const value = e.currentTarget.value;
        
        if (e.key === 'Enter') {
            console.log("chamou", value)
            handleSubmit(undefined, value);
        }
    };

    const calcNivelRisco = (data:InventarioSaaeType[])=>{
        if(data){
            const maiorRisco = data.reduce((prev, current)=>{
                return prev.nivelRisco > current.nivelRisco ? prev : current;
            },data[0]);
  
            if(!maiorRisco) return {
                color: '' as  "" | "green" | "yellow" | "orange" | "red",
                value: 0
            };
  
            return {
                color: setColor(maiorRisco.nivelRisco) as  "" | "green" | "yellow" | "orange" | "red",
                value: maiorRisco.nivelRisco
            }
        }else{
            return {
                color: '' as  "" | "green" | "yellow" | "orange" | "red",
                value: 0
            };
        }
    }

    useEffect(()=>{
        const value = atividadeCorrente.probabilidade * atividadeCorrente.consequencia;
        setAtividadeCorrente((prev)=>{
            return{
                ...prev,
                nivelRisco: value
            }
        });
    },[atividadeCorrente.probabilidade, atividadeCorrente.consequencia])

    return (
        <div className={styles.conteiner} style={{marginTop: readOnly ? '30px' : '0px'}}>
            <div className={`${styles.boxHead} ${styles.bgGreen}`}>
                
                <Mathias text={commentIA} show={useIA}/>
                
                <h6>item 6.5.1 da ISO 21101 e itens 7.5, 7.6, 9.1 da Política Nacional de Gestão de Risco</h6>
                <h1>3. Inventário de Riscos:</h1>
            </div>
            {!readOnly ?
                <div className={styles.boxCheckIA}>
                <label htmlFor="" style={{fontSize: '14px'}}>Usar IA Mathias?</label>
                <input  
                    style={{position: 'relative', marginLeft: '10px'}}
                    type="checkbox" 
                    checked={useIA} 
                    onChange={()=>setUseIA(prev=> !prev)}
                />
                </div>
            :null}
            <div className={`${styles.table} ${print ? styles.print : ''}`}> 
                {/* cabeçalho */}
                <div className={styles.line} >
                    <h1 className={styles.header}>
                        Etapa do Evento/Atividade
                    </h1>
                    <h1 className={styles.header}>
                        Perigos
                    </h1>
                    <h1 className={styles.header}>
                        Danos
                    </h1>
                    <h1 className={styles.header}>
                        Controle Operacional
                    </h1>
                    <h1 className={styles.header}>
                        Ações mitigadoras
                    </h1>
                    <h1 
                        className={`${styles.header} ${styles.collum2}`} 
                        title='Probabilidade do perigo ocorrer'
                    >
                        <span style={{transform: 'rotate(-90deg)'}}>Probabilidade</span>
                    </h1>
                    <h1 
                        className={`${styles.header} ${styles.collum2}`} 
                        title='Consequência caso o perigo ocorra'
                    >
                        <span style={{transform: 'rotate(-90deg)'}}>Consequência</span>
                    </h1>
                    <h1 className={`${styles.header} ${styles.collum2}`} title='Consequência caso o perigo ocorra'>
                        Nível de Risco
                    </h1>
                </div>

                {/* inputs */}
                {!readOnly ?
                    <div className={styles.line}>
                        <div className={styles.collum}>
                            {loading ? <span>gerando dados</span> : null}
                            <textarea
                                name='atividade'
                                value={atividadeCorrente?.atividade || ''}
                                onChange={(e) => handleCurrentAtivity(e)}
                                onBlur={(e)=>handleSubmit(e)}
                                onKeyDown={handleKeyDown}
                                placeholder="Exemplo: remada em caiaque"
                                style={{
                                    border: 'none', 
                                    width: '96%',
                                    height: '100%',
                                    fontSize: '11px',
                                }}
                            />                       
                        </div>
                        <textarea
                            name='perigo'
                            value={atividadeCorrente?.perigo || ''}
                            onChange={(e) => handleCurrentAtivity(e)}
                            placeholder="Exemplo: insolação"
                            className={`${styles.collum}`}
                            readOnly={readOnly}
                        />
                        <textarea
                            name='danos'
                            value={atividadeCorrente?.danos || ''}
                            onChange={(e) => handleCurrentAtivity(e)}
                            placeholder="Exemplo: nauseas, dor de cabeça, fraqueza, queimaduras na pele..."
                            className={`${styles.collum} `}
                        />
                        <textarea
                            name='controleOperacional'
                            value={atividadeCorrente?.controleOperacional || ''}
                            onChange={(e) => handleCurrentAtivity(e)}
                            placeholder="Exemplo: orientação para usar roupas leves e adequadas para a atividade, usar cobertura de cabeça, se hidratar regularmente."
                            className={`${styles.collum} `}
                        />
                        <textarea
                            name='acoesMitigadoras'
                            value={atividadeCorrente?.acoesMitigadoras || ''}
                            onChange={(e) => handleCurrentAtivity(e)}
                            placeholder="Exemplo: Colocar o participante em repouso em um local sombreado, oferecer hidratação lenta, umedecer a nuca e o rosto."
                            className={`${styles.collum} `}
                        />
                        <select
                            name='probabilidade'
                            value={atividadeCorrente?.probabilidade || ''}
                            onChange={(e) => handleCurrentAtivity(e)}
                            className={`${styles.collum} ${styles.collum2}`}
                        >
                            <option value=""></option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <select
                            name='consequencia'
                            value={atividadeCorrente?.consequencia || ''}
                            onChange={(e) => handleCurrentAtivity(e)}
                            className={`${styles.collum} ${styles.collum2}`}
                        >
                            <option value=""></option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <select
                            name='nivelRisco'
                            value={atividadeCorrente.nivelRisco || ''}
                            onChange={(e) => handleCurrentAtivity(e)}
                            className={`${styles.collum} ${styles.collum2}`}
                        >
                            <option value={atividadeCorrente.nivelRisco || ''}>{(atividadeCorrente?.probabilidade * atividadeCorrente?.consequencia) || ''}</option>
                        </select>
                        <FaPlus 
                            className={styles.addItem} 
                            onClick={addItem} 
                            aria-label='adicionar este item'
                            title='adicionar este item'/>
                    </div>
                :null}

                {/* dados */}
                {localData?.map((item, idx)=>(
                    <div className={styles.line} key={`${idx}-atividade`}>
                        <textarea
                            key={`${idx}-atividade`}
                            name='atividade'
                            value={item?.atividade || ''}
                            onChange={(e) => handleForm(e, idx)}
                            className={`${styles.collum}`}
                            readOnly={readOnly}
                        />
                        {
                            !readOnly ? <textarea
                            key={`${idx}-perigo`}
                            name='perigo'
                            value={item?.perigo || ''}
                            onChange={(e) => handleForm(e, idx)}
                            onBlur={(e)=>handleSubmit(e)}
                            className={`${styles.collum} ${styles.alingLeftText}`}
                            readOnly={readOnly}
                        />:
                         <p 
                            key={`${idx}-perigo`}
                            className={`${styles.collum} ${styles.alingLeftText}`}
                        >
                                {item?.perigo || ''}
                        </p>
                        }
                        {
                            !readOnly ? <textarea
                            key={`${idx}-danos`}
                            name='danos'
                            value={item?.danos || ''}
                            onChange={(e) => handleForm(e, idx)}
                            onBlur={(e)=>handleSubmit(e)}
                            className={`${styles.collum} ${styles.alingLeftText}`}
                            readOnly={readOnly}
                        />
                        : <p 
                            key={`${idx}-danos`}
                            className={`${styles.collum} ${styles.alingLeftText}`}
                        >
                            {item?.danos || ''}
                        </p>
                        }
                        {
                            !readOnly ? <textarea
                            key={`${idx}-controleOperacional`}
                            name='controleOperacional'
                            value={item?.controleOperacional || ''}
                            onChange={(e) => handleForm(e, idx)}
                            onBlur={(e)=>handleSubmit(e)}
                            className={`${styles.collum} ${styles.alingLeftText}`}
                            readOnly={readOnly}
                        />
                        : <p 
                            key={`${idx}-controleOperacional`}
                            className={`${styles.collum} ${styles.alingLeftText}`}
                        >
                            {item?.controleOperacional || ''}
                        </p>
                        }
                        {
                            !readOnly ? <textarea
                            key={`${idx}-acoesMitigadoras`}
                            name='acoesMitigadoras'
                            value={item?.acoesMitigadoras || ''}
                            onChange={(e) => handleForm(e, idx)}
                            onBlur={(e)=>handleSubmit(e)}
                            className={`${styles.collum} ${styles.alingLeftText}`}
                            readOnly={readOnly}
                        />
                        : <p 
                            key={`${idx}-acoesMitigadoras`}
                            className={`${styles.collum} ${styles.alingLeftText}`}
                        >
                            {item?.acoesMitigadoras || ''}
                        </p>
                        }
                        {
                        !readOnly ?
                            <select 
                                key={`${idx}-probabilidade`}
                                name='probabilidade'
                                className={`${styles.collum2} ${styles.alingLeftText}`}
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
                        :
                            <input 
                                key={`${idx}-probabilidade`}
                                defaultValue={item?.probabilidade}
                                readOnly={readOnly}
                                className={`${styles.collum2} ${styles.alingLeftText}`}
                            />
                        }
                        {
                        !readOnly ?
                            <select 
                                key={`${idx}-consequencia`}
                                name='consequencia'
                                className={`${styles.collum2} ${styles.alingLeftText}`}
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
                        :
                            <input 
                                key={`${idx}-consequencia`}
                                defaultValue={item?.consequencia}
                                className={`${styles.collum2} ${styles.alingLeftText}`}
                                readOnly={readOnly}
                            />
                        }
                        {!readOnly ?
                            <select                                
                                name='nivelRisco'
                                value={item?.nivelRisco || ''}
                                onChange={(e) => handleForm(e, idx)}
                                className={`${styles.collum2} ${styles.alingLeftText}`}
                            >
                                <option value={item?.nivelRisco}>{item?.nivelRisco}</option>
                            </select>
                            :
                            <input 
                                defaultValue={item?.nivelRisco || ''}
                                readOnly={readOnly}
                                className={`${styles.collum2} ${styles.alingLeftText}`}
                            />
                        }
                        {!readOnly ? 
                            <FaMinus 
                                className={styles.removeItem} 
                                onClick={()=>removeItem(idx)} 
                                aria-label='remover este item'
                                title='remover este item'/>
                        :null}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InventarioSaae;
