'use client'
import { ChangeEvent, FocusEvent, Fragment, KeyboardEvent, useContext, useEffect, useState } from 'react';
import styles from './dadosGerais.module.css';
import { DadosGeraisSaae, Endereco, ProgramacaoAtividade } from '@/@types/types';
import { v4 } from 'uuid';
import { addTime, cleamText, dateFormat1, dateFormat2, formatToHourMin, getDadosCEP, maskcep, maskMoeda, masktel, temApenasNumeros } from '@/scripts/globais';
import { FaMinus, FaPlus } from "react-icons/fa";
import { dataBaseSaae, Odss, tiposAtividade, uels } from '@/components/data-training/data-training';
import { Context } from '@/components/context/context';

import MapsComponent from '@/components/layout/mapsViewer/mapsViewer';
import RouteMapComponent from '@/components/layout/mapsRotas/mapsRotas';
import { FaTrash } from 'react-icons/fa6';

type Props = {
    readOnly: boolean,
    localData: DadosGeraisSaae,
    obsSaae?: string,
    statusSaae?: string,
    idSaae?: string,
    print?: boolean
}
/**
 * Componente que exibe a o formulário de Dados Gerais da SAAE.
 * @param {DadosGeraisSaae} localData - dados básicos usado pelo componente "Grau de Risco".
 * @param {boolean} readOnly - booleano que define se o usuário pode ou não editar os dados.
 * @param {string} obsSaae - observação da SAAE.
 * @param {string} idSaae - id da SAAE.
 * @param {string} statusSaae - status da SAAE.
 */
export default function DadosGerais({readOnly, localData, obsSaae, idSaae, statusSaae, print}:Props){
    const context = useContext(Context);

    const [currentProgramacao, setCurrentProgramacao] = useState({} as ProgramacaoAtividade);
    const [atividade, setAtividade] = useState('');
    const [odss, setOdss] = useState('');
    const [inputRamo, setInputRamo] = useState('');
    const [inputGruposConvidados, setInputGruposConvidados] = useState('');
    const [atividadesList, setAtividadesList] = useState<string[]>([]);
    const [inicioFim, setInicioFim] = useState(false);
    const [resetMap, setResetMap] = useState(false);
    const [resetMapFim, setResetMapFim] = useState(false);

    const handleForm = (e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>)=>{
        e.preventDefault();
        const name = e.target.name;
        const value= e.target.value;

        console.log("monitor", name, value)
        context.setDataSaae((prev)=>{
            let newData = prev.dadosGerais;
            if(['horaInicio', 'horaFim'].includes(name)){
                newData = {
                    ...newData,
                    [name]: formatToHourMin(value)
                }
            }else if(name.includes("localInicio")){
                //localInicio.coordenadas.long
                if(name.includes('coordenadas')){
                    const nameSplit = name.split('.')[2] as 'lat' | 'long';
                    const coordenadas = newData?.localInicio?.coordenadas ? {
                        ...newData?.localInicio?.coordenadas,
                        [nameSplit]: value ? parseFloat(value) : ''
                    } : {
                        [nameSplit]: value ? parseFloat(value) : ''
                    } as unknown as {
                        lat: number, long: number
                    }
    
                    newData = {
                        ...newData,
                        localInicio: {
                            ...newData.localInicio,
                            coordenadas: coordenadas
                        }
                    }
                }else{
                    const nameSplit = name.split('.')[1] as 'logradouro' | 'bairro' | 'municipio' | 'uf' | 'cep';
                    const local:Endereco = newData.localInicio ? {
                        ...newData.localInicio,
                        [nameSplit]: nameSplit === "cep" ? maskcep(value) : value
                    } as Endereco
                    : {
                        [nameSplit]: nameSplit === "cep" ? maskcep(value) : value
                    } as unknown as  Endereco;
    
                    newData = {
                        ...newData,
                        localInicio: local
                    }
                }
            }else if(name.includes("localFim")){
                if(name.includes('coordenadas')){
                    const nameSplit = name.split('.')[2] as 'lat' | 'long';
                    const coordenadas = newData.localFim?.coordenadas ? {
                        ...newData.localFim.coordenadas,
                        [nameSplit]: parseInt(value)
                    } : {
                        [nameSplit]: parseInt(value)
                    } as unknown as {
                        lat: number, long: number
                    }
    
                    newData = {
                        ...newData,
                        localFim: newData.localFim ? {
                            ...newData.localFim,
                            coordenadas: coordenadas
                        } : {
                            coordenadas: coordenadas
                        } as unknown as Endereco
                    }
                }else{
                    const nameSplit = name.split('.')[1] as 'logradouro' | 'bairro' | 'municipio' | 'uf' | 'cep';
                    const local:Endereco = newData.localFim ? {
                        ...newData.localFim,
                        [nameSplit]: nameSplit === "cep" ? maskcep(value) : value
                    } as Endereco: {
                        [nameSplit]: nameSplit === "cep" ? maskcep(value) : value
                    } as unknown as  Endereco;
    
                    newData = {
                        ...newData,
                        localFim: local
                    }
                }
            }else if(["dataInicio", 'dataFim'].includes(name)){
                let newValue:string | Date = value;
                
                if (value.length === 10) {  // Garantir que tenha o formato completo "YYYY-MM-DD"
                    const ano = value.split('-')[0]//pega o ano;
                    if(parseInt(ano) < 2000) newValue = value;
                    else newValue = new Date(value + "T00:00:00"); 
                } else {
                    newValue = value; // Permite digitação parcial sem quebrar o estado
                }

                console.log('data teste', newValue);
                newData = {
                    ...newData,
                    [name]: newValue
                }
            }else if(name.includes('custoIndividual')){
                newData = {
                    ...newData,
                    [name]: maskMoeda(value)
                }
            }else if(['telCoordenador', 'telSupervisor'].includes(name)){
                newData = {
                    ...newData,
                    [name]: masktel(value)
                }
            }else if(name === 'coordenador'){
                const responsavel = context.tester || context.dataUser;
                const verify = value === responsavel?.name;
                if(verify){
                    newData = {
                        ...newData,
                        coordenador: value,
                        regCoordenador: responsavel.registro ||'',
                        telCoordenador: masktel(responsavel.tel ||''),
                        emailCoordenador: responsavel.email ||'',
                        nivelFormacaoCoordenador: responsavel.nivelFormacao  as "Preliminar" | "Intermediário" | "Avançado", 
                    }
                }else{
                    newData= {
                        ...newData,
                        [name]: value
                    }
                }

            }else if(name.includes('dadosUel')){
                const nameSplit = name.split('.')[1];
                newData = {
                    ...newData,
                    dadosUel: {
                        ...newData.dadosUel,
                        [nameSplit]: value
                    }
                }
            }else{
                newData = {
                    ...newData,
                    [name]: value
                }
            }

            return {
                ...prev,
                dadosGerais: newData
            };
        })        
    }

    const handleFormProgramacao= (e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>)=>{
        e.preventDefault();
        const name = e.target.name;
        const value= e.target.value;

        setCurrentProgramacao((prev)=>{
            if(name === "data"){
                let newValue:string | Date = value;
                
                if (value.length === 10) {  // Garantir que tenha o formato completo "YYYY-MM-DD"
                    const ano = value.split('-')[0]//pega o ano;
                    if(parseInt(ano) < 2000) newValue = value;
                    else newValue = new Date(value + "T00:00:00"); 
                } else {
                    newValue = value; // Permite digitação parcial sem quebrar o estado
                }
                return{
                    ...prev,
                    data: newValue
                }
            }else if(['hora', 'duracao'].includes(name)){
                return{
                    ...prev,
                    [name]: formatToHourMin(value)
                }
            }
            return{
                ...prev,
                [name]: value
            }
        })
    }

    const handleEditProgramacao = (e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>, itemId: number)=>{
        e.preventDefault();
        const name = e.target.name;
        const value= e.target.value;
        try{
            context.setDataSaae((prev)=>{
                const newProgragacao = (prev.dadosGerais.programacao || []).map((p)=>{
                    if(p.id === itemId){
                        if(name === "data"){
                            let newValue:string | Date = value;
                
                            if (value.length === 10) {  // Garantir que tenha o formato completo "YYYY-MM-DD"
                                const ano = value.split('-')[0]//pega o ano;
                                if(parseInt(ano) < 2000) newValue = value;
                                else newValue = new Date(value + "T00:00:00"); 
                            } else {
                                newValue = value; // Permite digitação parcial sem quebrar o estado
                            }

                            return{
                                ...p,
                                data: newValue
                            }
                        }
                        else if(['hora', 'duracao'].includes(name)){
                            return{
                                ...p,
                                [name]: formatToHourMin(value)
                            }
                        }
                        return{
                            ...p,
                            [name]: value
                        }
                    }else{
                        return p
                    }
                });

                return {
                    ...prev,
                    dadosGerais:{
                        ...prev.dadosGerais,
                        programacao: newProgragacao
                    }
                };
            });
        }catch(e){
            console.log(e);
        }
    }

    const addAtividade = async()=>{
        if(!currentProgramacao.data || !currentProgramacao.duracao || !currentProgramacao.hora || !currentProgramacao.descricao){
            alert("Faltam campos obrigatórios na programação!")
            return;
        }
        if(!addTime(currentProgramacao.hora, currentProgramacao.duracao)){
            alert(`Formato inválido. Use o formato HH:MM. Hora informada: ${currentProgramacao.hora}, minutos informados: ${currentProgramacao.duracao}`);
            return
        }

        await updateContext(currentProgramacao)

        setCurrentProgramacao((prev)=>{
            const { time } = addTime(prev.hora, prev.duracao);
            return{
                data: prev.data || '',
                hora: time
            } as ProgramacaoAtividade
        });
    }    
    
    const updateContext = async (programacao:ProgramacaoAtividade)=>{
        try{
            context.setDataSaae((prev)=>{
                const newProgragacao = prev.dadosGerais.programacao ? [
                    ...prev.dadosGerais.programacao,
                    {
                        ...programacao, 
                        descricao: programacao.descricao || '',
                        responsavel: programacao.responsavel || '',
                        materialNecessario: programacao.materialNecessario || '',
                        id: prev.dadosGerais.programacao.length+1,
                    } as ProgramacaoAtividade
                ] : [{...programacao, id: 1}]
    
                return{
                    ...prev,
                    dadosGerais: {
                        ...prev.dadosGerais,
                        programacao: newProgragacao
                    }
                }
            });
        }catch(e){
            console.log(e);
        }
    }
    const removeAtividade = (idx:number)=>{
        context.setDataSaae((prev)=>{
            const filter = prev.dadosGerais.programacao.filter(prog=> prog.id !== idx);
            const rename = filter.map((prog, idx)=> {
                return{
                    ...prog,
                    id: idx+1
                } as ProgramacaoAtividade
            });
    
            const dadosGerais= {
                ...prev.dadosGerais, 
                programacao: rename
            }
    
            return{
                ...prev,
                dadosGerais
            }
        })
        //updateContext(newData);
    }

    const getAtividade = (e: FocusEvent<HTMLInputElement, Element>)=>{
        e.preventDefault();
        const value = e.target.value;

        if(value === ""){
            return;
        }

        context.setDataSaae((prev)=>{
            const atividade = dataBaseSaae.find(ativ=> ativ.produto?.includes(value));
            let newData= prev.dadosGerais;
            
            if(atividade){
                setInicioFim(atividade.localFim ? true : false);
                newData = {
                    ...newData,
                    nomeAtividade: atividade.produto,
                    tipoAtividade: atividade.atividade,
                    odss: atividade.ods,
                    localInicio: {
                        logradouro: atividade.localInicio?.logradouro,
                        bairro: atividade.localInicio?.bairro,
                        municipio: atividade.localInicio.municipio,
                        uf: atividade.localInicio.uf,
                        cep: atividade.localInicio.cep
                    },
                    localFim: atividade.localFim ? {
                        logradouro: atividade.localFim?.logradouro,
                        bairro: atividade.localFim?.bairro,
                        municipio: atividade.localFim.municipio,
                        uf: atividade.localFim.uf,
                        cep: atividade.localFim.cep
                    } : undefined
                } as DadosGeraisSaae;
            }

            return {
                ...prev,
                dadosGerais: newData
            }
        })
    }

    //busca o endereço da empresa.
    const getCep = (e:ChangeEvent<HTMLInputElement>)=>{
        const value = cleamText(e.target.value);
        const initialName = e.target.name.split('.')[0] as 'localInicio' | 'localFim';

        if(value !== '' && value.length === 8 && temApenasNumeros(value)){
            getDadosCEP(value)
            .then((resp)=> {
                const segmentos:Array<string> = resp.logradouro.split(" ")
                const tipo_logradouro = segmentos[0];
                let logradouro = '';

                for (let index = 1; index < segmentos.length; index++) {
                    if(segmentos.length > 0 && segmentos.length <= 2){
                        logradouro = segmentos[index];
                    }
                    else{
                        logradouro += `${segmentos[index]} `;
                    }
                }
                if(resp){
                    const logra = resp.complemento ? tipo_logradouro+ " " + logradouro + ', '+ resp.complemento : tipo_logradouro + " " + logradouro;
                    context.setDataSaae((prev)=>{
                        const newData = {
                            ...prev.dadosGerais,  
                            [initialName]: {
                                ...prev.dadosGerais[initialName] || {},
                                logradouro: logra,
                                bairro: resp.bairro,
                                municipio: resp.localidade,
                                uf: resp.uf
                            }
                        }
                        return {
                            ...prev,
                            dadosGerais: newData
                        }
                    })
                }
            })
            .catch(err=> console.log(err))
        }
    }

    const handleKeyBlur = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const value = e.target.value;
        const name = e.target.name as 'tipoAtividade' | 'odss' | 'gruposConvidados';

        // Adicionar o valor ao array se não for vazio e não for duplicado
        const trimmedValue = value.trim();

        if(!trimmedValue) return;

        context.setDataSaae((prev)=>{
            if(name === 'gruposConvidados'){
                const findUel = uels.find(i=> i.nameUel.includes(trimmedValue));
                const existe = prev.dadosGerais?.gruposConvidados?.find(i=> i.nameUel.includes(trimmedValue));
                if(existe) return prev;

                const newData = [...(prev.dadosGerais.gruposConvidados || []), findUel];
                return{
                    ...prev,
                    dadosGerais: {
                        ...prev.dadosGerais,
                        gruposConvidados: newData
                    }
                }
            }
            else if (!prev.dadosGerais[name]?.includes(trimmedValue)) {
                const newArray = prev.dadosGerais[name] ? [
                    ...prev.dadosGerais[name],
                    trimmedValue
                ] : [trimmedValue];
    
                const newData= {
                    ...prev.dadosGerais,
                    [name]: newArray
                }
                return{
                    ...prev,
                    dadosGerais: newData
                }
            }else{
                return prev
            }
        });

        setAtividade(''); // Limpa o input
        setOdss(''); // Limpa o input
        setInputRamo(''); // Limpa o input
        setInputGruposConvidados(''); // Limpa o input
    };

    const handleKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const value = e.target.value;
        const name = e.target.name as 'tipoAtividade' | 'odss' | 'gruposConvidados';

        if (value.includes(',')) {
            // Adicionar o valor ao array se não for vazio e não for duplicado
            const trimmedValue = value.trim();
            context.setDataSaae((prev)=>{
                if(name === 'gruposConvidados'){
                    const findUel = uels.find(i=> i.nameUel.includes(trimmedValue));
                    const newData = [...(prev.dadosGerais.gruposConvidados || []), findUel];
                    return{
                        ...prev,
                        dadosGerais: {
                            ...prev.dadosGerais,
                            gruposConvidados: newData
                        }
                    }
                }
                else if (trimmedValue && !prev.dadosGerais[name]?.includes(trimmedValue)) {
                    const newArray = prev.dadosGerais[name] ? [
                        ...prev.dadosGerais[name],
                        trimmedValue
                    ] : [trimmedValue];
    
                    const newData= {
                        ...prev.dadosGerais,
                        [name]: newArray
                    }
    
                    return{
                        ...prev,
                        dadosGerais: newData
                    }
                }else{
                    return prev
                }
            })
            setAtividade(''); // Limpa o input
            setOdss(''); // Limpa o input
            setInputRamo(''); // Limpa o input
            setInputGruposConvidados(''); // Limpa o input
        }
    };
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name as 'tipoAtividade' | 'odss' | 'gruposConvidados';
        if (e.key === 'Enter') {
            // Adicionar o valor ao array se não for vazio e não for duplicado
            const trimmedValue = value.trim();
            context.setDataSaae((prev)=>{
                if(name === 'gruposConvidados'){
                    const findUel = uels.find(i=> i.nameUel.includes(trimmedValue));
                    const newData = [...(prev.dadosGerais.gruposConvidados || []), findUel];
                    return{
                        ...prev,
                        dadosGerais: {
                            ...prev.dadosGerais,
                            gruposConvidados: newData
                        }
                    }
                }
                else if (trimmedValue && !prev.dadosGerais[name]?.includes(trimmedValue)) {
                    const newArray = prev.dadosGerais[name] ? [
                        ...prev.dadosGerais[name],
                        trimmedValue
                    ] : [trimmedValue];
    
                    const newData= {
                        ...prev.dadosGerais,
                        [name]: newArray
                    }
                    //updateContext(newData);
                    return{
                        ...prev,
                        dadosGerais: newData
                    }
                }else{
                    return prev;
                }
            })
            setAtividade(''); // Limpa o input
            setOdss(''); // Limpa o input
            setInputRamo(''); // Limpa o input
            setInputGruposConvidados(''); // Limpa o input
        }
    };

    const handleRemoveTag = (index: number, name:'tipoAtividade' | 'odss' | 'ramo' | 'gruposConvidados') => {
        context.setDataSaae((prev)=>{
            const newArray = prev.dadosGerais[name].filter((_, i) => i !== index)
            
            const newData= {
                ...prev.dadosGerais,
                [name]: newArray
            }
            return{
                ...prev,
                dadosGerais: newData
            }
        })
    };

    const latLongSet = async (lat: number, lng: number, label: 'localInicio' | 'localFim', address?: string)=>{
        
        context.setDataSaae((prev)=>{
            let newData = prev.dadosGerais;

            if(address){
                console.log("endereço recebido do clique", address);

                newData = {
                    ...newData,
                    [label]:{
                        ...newData[label],
                        address: address,
                        coordenadas:{
                            lat: lat,
                            long: lng
                        }
                    }
                }
            }else{
                newData = newData[label] ? {
                    ...newData,
                    [label]:{
                        ...newData[label],
                        coordenadas: {
                            lat: lat,
                            long: lng
                        }
                    }
                } :{
                    ...newData,
                    [label]:{
                        coordenadas: {
                            lat: lat,
                            long: lng
                        }
                    }
                }
            }

            return{
                ...prev,
                dadosGerais: newData
            }
        })
        setResetMap(!resetMap);//atualiza o mapa.
        setResetMapFim(!resetMapFim); //atualiza o mapa.
        //updateContext(newData);
    }

    useEffect(()=>{
        //carrega a lista de atividades.
        setAtividadesList(()=>{
            const newData = dataBaseSaae?.map(ativ=> `${ativ.produto}`)
            return newData
        });
    },[])

    if(!localData) return <span>formulário não carregado</span>
    
    return(
        <div 
            className={`${styles.conteiner}`} 
            style={{marginTop: readOnly ? '30px' : '0px'}}
        >
            <h1 className={styles.bgGreen}>1. Dados gerais da atividade</h1>
            {idSaae ? <h6 className={styles.bgGreen}>ID: {idSaae}</h6> :null}    
            <div className={styles.table}>
                {obsSaae ?
                    <div className={styles.line}>
                        <p>Resposta da sua SAAE: {statusSaae?.toUpperCase()} -  {obsSaae || ''}</p>
                    </div>
                :null}
                {/* nome/tipo/ods */}
                <div className={styles.line}>
                    <div className={styles.collum}>
                        <h1>
                            Nome da atividade
                        </h1>
                        {!print ? <input
                            type='text'
                            name='nomeAtividade'
                            list='listAtividades'
                            value={localData?.nomeAtividade || ''}
                            onChange={(e) => handleForm(e)}
                            onBlur={(e)=>getAtividade(e)}
                            placeholder="nome da atividade"
                            className={`${styles.collum}`}
                            readOnly={readOnly}
                        /> : <p>{localData?.nomeAtividade || ''}</p>}
                        <datalist id='listAtividades'>
                            {atividadesList.map(ativ=> (
                                <option value={ativ} key={ativ}>{ativ}</option>
                            ))}
                        </datalist>
                    </div>
                    <div className={styles.collum3}>
                        <h1>
                            Tipo de atividade
                        </h1>
                        <input 
                            list="options" 
                            name='tipoAtividade'
                            value={atividade}
                            placeholder='precione Enter ou vírgula para inserir'
                            onChange={(e) => {
                                setAtividade(e.target.value);
                                handleKeyChange(e);
                            }}
                            onKeyDown={handleKeyDown}
                            onBlur={handleKeyBlur}
                            className={`${styles.collum}`}
                            readOnly={readOnly}
                        />
                        <datalist id="options">
                            {tiposAtividade.sort((a,b)=> a.localeCompare(b)).map(ativ=> (
                                <option value={ativ} key={ativ}>{ativ}</option>
                            ))}
                        </datalist>
                        
                        <div style={{
                            display: 'flex', 
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                        }}>
                            {localData?.tipoAtividade?.sort((a,b)=> a.localeCompare(b))?.map((tag, index) => (
                                <div
                                    key={index+'tags'}
                                    className={styles.boxTags}
                                >
                                {tag}
                                    {!readOnly ? 
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault(); 
                                                handleRemoveTag(index, 'tipoAtividade')
                                            }}
                                        >
                                            x
                                        </button>
                                    :null}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.collum3}>
                        <h1>
                            ODSs
                        </h1>
                        <input 
                            list="optionsODS" 
                            name='odss'
                            value={odss}
                            placeholder='pressione Enter ou vírgula para inserir'
                            onChange={(e) => {
                                setOdss(e.target.value);
                                handleKeyChange(e);
                            }}
                            onKeyDown={handleKeyDown}
                            onBlur={handleKeyBlur}
                            className={`${styles.collum}`}
                            readOnly={readOnly}
                        />
                        <datalist id="optionsODS">
                            {Odss.sort((a,b)=>{
                                const item1 = parseInt(a.split('.')[0]);
                                const item2 = parseInt(b.split('.')[0]);
                                if(item1 > item2){
                                    return 1
                                }else if(item1 < item2){
                                    return -1
                                }else return 0;
                            }).map(ods=> (
                                <option value={ods} key={ods}>{ods}</option>
                            ))}
                        </datalist>
                        
                        <div style={{
                            display: 'flex', 
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                        }}>
                            {localData?.odss?.sort((a,b)=> a.localeCompare(b))?.map((tag, index) => (
                                <div
                                    key={index+'tags'}
                                    className={styles.boxTags}
                                >
                                {tag}
                                {!readOnly ? 
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault(); 
                                            handleRemoveTag(index, 'odss')
                                        }}
                                    >
                                        x
                                    </button>
                                :null}
                                </div>                                
                            ))}
                        </div>
                    </div>      
                    <div className={styles.collum}>
                        <h1>
                            Ramo(s)
                        </h1>
                        <input
                            type='text'
                            name='ramo'
                            list='listRamos'
                            value={inputRamo || ''}
                            onChange={(e) => {
                                e.preventDefault();
                                setInputRamo(e.target.value);
                                handleKeyChange(e);
                            }}
                            onBlur={handleKeyBlur}
                            onKeyDown={handleKeyDown}
                            placeholder="precione Enter ou vírgula para inserir"
                            className={`${styles.collum}`}
                            readOnly={readOnly}
                        />
                        <datalist id='listRamos'>
                            <option value='Lobinho'>Lobinho</option>
                            <option value='Escoteiro'>Escoteiro</option>
                            <option value='Sênior'>Sênior</option>
                            <option value='Pioneiro'>Pioneiro</option>
                            <option value='Escotista/Dirigente'>Escotista/Dirigente</option>
                        </datalist>
                        
                        <div style={{
                            display: 'flex', 
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                        }}>
                            {localData?.ramo?.sort((a,b)=> a.localeCompare(b))?.map((tag, index) => (
                                <div
                                    key={index+'tags'}
                                    className={styles.boxTags}
                                >
                                {tag}
                                {!readOnly ?
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault(); 
                                            handleRemoveTag(index, 'ramo')
                                        }}
                                    >
                                        x
                                    </button>
                                :null}
                                </div>
                            ))}
                        </div>
                    </div>  
                    <div className={`${styles.collum3} ${styles.width100}`}>
                        <h1>
                            Atividade de Patrulha não supervisionada
                        </h1>
                        {!readOnly ?
                            <select
                                name='atividadeNaoSupervisionada'
                                value={localData?.atividadeNaoSupervisionada || ''}
                                onChange={(e) => handleForm(e)}
                                className={`${styles.collum}`}
                            >
                                <option value=""></option>
                                <option value="Sim">Sim</option>
                                <option value="Não">Não</option>
                            </select>
                            :
                            <input 
                                defaultValue={localData?.atividadeNaoSupervisionada || ''}
                                className={`${styles.collum}`}
                                readOnly={readOnly}
                            />
                        }
                    </div>  
                    <div className={`${styles.collum3} ${styles.width100}`}>
                        <h1>
                            Uso de transporte Intermunicipal (público ou privado)?
                        </h1>
                        {!readOnly ?
                            <select
                                name='usoTransporteInterMunicipal'
                                value={localData?.usoTransporteInterMunicipal || ''}
                                onChange={(e) => handleForm(e)}
                                className={`${styles.collum}`}
                            >
                                <option value=""></option>
                                <option value="Sim">Sim</option>
                                <option value="Não">Não</option>
                            </select>
                            :
                            <input 
                                defaultValue={localData?.usoTransporteInterMunicipal || ''}
                                readOnly={readOnly}
                                className={`${styles.collum}`}
                            />
                        }
                    </div>    
                </div>
                
                {/* dados da UEL */}
                <div className={styles.line}>
                    <h5 style={{width: '100%'}}>Dados da UEL</h5>
                    <div className={styles.collum}>
                        <h1>
                            Numeral da UEL
                        </h1>
                        {!print ? <input
                            type='text'
                            name='dadosUel.numUel'
                            value={localData?.dadosUel?.numUel || ''}
                            onChange={(e) => handleForm(e)}
                            className={`${styles.collum}`}
                            readOnly={readOnly}
                        /> : <p>{localData?.dadosUel?.numUel || ''}</p>}
                    </div>
                    <div className={styles.collum}>
                        <h1>
                            Nome da UEL
                        </h1>
                        {!print ? <input
                            type='text'
                            name='dadosUel.nameUel'
                            value={localData?.dadosUel?.nameUel || ''}
                            onChange={(e) => handleForm(e)}
                            className={`${styles.collum}`}
                            readOnly={readOnly}
                        /> : <p>{localData?.dadosUel?.nameUel || ''}</p>}
                    </div>
                    <div className={styles.collum}>
                        <h1>
                            Cidade da UEL
                        </h1>
                        {!print ? <input
                            type='text'
                            name='dadosUel.cidadeUels'
                            value={localData?.dadosUel?.cidadeUels || ''}
                            onChange={(e) => handleForm(e)}
                            className={`${styles.collum}`}
                            readOnly={readOnly}
                        /> : <p>{localData?.dadosUel?.cidadeUels || ''}</p>}
                    </div>
                    <div className={styles.collum}>
                        <h1>
                            UF da UEL
                        </h1>
                        {!print ? <input
                            type='text'
                            name='dadosUel.ufUel'
                            value={localData?.dadosUel?.ufUel || ''}
                            onChange={(e) => handleForm(e)}
                            className={`${styles.collum}`}
                            readOnly={readOnly}
                        /> : <p>{localData?.dadosUel?.ufUel || ''}</p>}
                    </div>
                    <div className={styles.collum}>
                        <h1>
                            Presidente da UEL
                        </h1>
                        {!print ? <input
                            type='text'
                            name='dadosUel.presidenteUel'
                            value={localData?.dadosUel?.presidenteUel || ''}
                            onChange={(e) => handleForm(e)}
                            className={`${styles.collum}`}
                            readOnly={readOnly}
                        /> : <p>{localData?.dadosUel?.presidenteUel || ''}</p>}
                    </div>
                    <div className={styles.collum}>
                        <h1>
                            Registro Escoteiros do(a) Presidente
                        </h1>
                        {!print ? <input
                            type='text'
                            name='dadosUel.regEscoteiroPresidente'
                            value={localData?.dadosUel?.regEscoteiroPresidente || ''}
                            onChange={(e) => handleForm(e)}
                            className={`${styles.collum}`}
                            readOnly={readOnly}
                        /> : <p>{localData?.dadosUel?.regEscoteiroPresidente || ''}</p>}
                    </div>
                    <div className={styles.collum}>
                        <h1>
                            Contato do(a) Presidente
                        </h1>
                        {!print ? <input
                            type='text'
                            name='dadosUel.telPresidente'
                            value={localData?.dadosUel?.telPresidente || ''}
                            onChange={(e) => handleForm(e)}
                            className={`${styles.collum}`}
                            readOnly={readOnly}
                        /> : <p>{localData?.dadosUel?.telPresidente || ''}</p>}
                    </div>
                </div>

                {/* grupos convidados */}
                <div className={styles.line}>
                    <div className={styles.collum3}>
                        <h1>
                            Grupos convidados
                        </h1>
                        <input 
                            name='gruposConvidados'
                            value={inputGruposConvidados}
                            placeholder='pressione Enter ou vírgula para inserir'
                            list='optionsUels'
                            onChange={(e) => {
                                setInputGruposConvidados(e.target.value);
                                handleKeyChange(e);
                            }}
                            onKeyDown={handleKeyDown}
                            onBlur={handleKeyBlur}
                            className={`${styles.collum}`}
                            readOnly={readOnly}
                        />
                        <datalist id="optionsUels">
                            {uels.sort((a,b)=>{
                                const item1 = a.numUel;
                                const item2 = b.numUel;
                                if(item1 > item2){
                                    return 1
                                }else if(item1 < item2){
                                    return -1
                                }else return 0;
                            }).map(uel=> (
                                <option value={uel.nameUel} key={uel.nameUel}>{`${uel.numUel || ''} ${uel.ufUel || ''} - ${uel.nameUel || ''}`}</option>
                            ))}
                        </datalist>
                        
                        <div style={{
                            display: 'flex', 
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                        }}>
                            {localData?.gruposConvidados?.sort((a,b)=> a.numUel - b.numUel)?.map((tag, index) => (
                                <div
                                    key={index+'tags'}
                                    className={styles.boxTags}
                                >
                                {`${tag.numUel} ${tag.ufUel} - ${tag.nameUel}`}
                                {!readOnly ? 
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault(); 
                                            handleRemoveTag(index, 'gruposConvidados')
                                        }}
                                    >
                                        x
                                    </button>
                                :null}
                                </div>                                
                            ))}
                        </div>
                    </div>
                </div>
                {/* local/endereço */}
                <div className={`${styles.line} ${styles.margin0}`}>                    
                    {!readOnly ? 
                    <div className={styles.boxCheck}>
                        <span title="Local onde será realizada?">
                            Local início é diferente do local fim?
                        </span>
                        <input 
                            type="checkbox" 
                            name="inicio-fim" 
                            checked={inicioFim}
                            onChange={()=>{
                                if(inicioFim){
                                    context.setDataSaae((prev)=>{
                                        return{
                                            ...prev,
                                            dadosGerais:{
                                                ...prev.dadosGerais,
                                                localFim: undefined
                                            }
                                        }
                                    });
                                    setInicioFim(false);
                                }else{
                                    setInicioFim(true);
                                }
                            }}
                            readOnly={readOnly}
                        />
                    </div>
                    :null}
                </div>
                <div className={styles.line}>
                    <div className={styles.collum}>
                        <h1>
                            CEP do local/local início
                        </h1>
                        <input
                            type='text'
                            name='localInicio.cep'
                            value={localData?.localInicio?.cep || ''}
                            onChange={(e) => handleForm(e)}
                            onBlur={(e)=>{
                                getCep(e);
                                setResetMap(!resetMap);
                            }}
                            placeholder="CEP do local da atividade"
                            className={`${styles.collum}`}
                            readOnly={readOnly}
                        />  
                    </div>
                    <div className={styles.collum}>
                        <h1>
                            Logradouro
                        </h1>
                        {!print ? <textarea
                            name='localInicio.logradouro'
                            value={localData?.localInicio?.logradouro || ''}
                            onChange={(e) => handleForm(e)}
                            onBlur={()=>setResetMap(!resetMap)}
                            placeholder="logradouro"
                            className={`${styles.collum}`}
                            readOnly={readOnly}
                        /> : <p>{localData?.localInicio?.logradouro || ''}</p>}
                    </div>
                    <div className={styles.collum}>
                        <h1>
                            Bairro
                        </h1>
                        <input
                            type='text'
                            name='localInicio.bairro'
                            value={localData?.localInicio?.bairro || ''}
                            onChange={(e) => handleForm(e)}
                            onBlur={()=>setResetMap(!resetMap)}
                            className={`${styles.collum}`}
                            readOnly={readOnly}
                        />
                    </div>
                    <div className={styles.collum}>
                        <h1>
                            Município
                        </h1>
                        <input
                            type='text'
                            name='localInicio.municipio'
                            value={localData?.localInicio?.municipio || ''}
                            onChange={(e) => handleForm(e)}
                            onBlur={()=>setResetMap(!resetMap)}
                            className={`${styles.collum}`}
                            readOnly={readOnly}
                        />
                    </div>
                    <div className={styles.collum}>
                        <h1>
                            UF
                        </h1>
                        <textarea
                            name='localInicio.uf'
                            value={localData?.localInicio?.uf || ''}
                            onChange={(e) => handleForm(e)}
                            onBlur={()=>setResetMap(!resetMap)}
                            className={`${styles.collum}`}
                            readOnly={readOnly}
                        />   
                    </div>
                </div>
               {localData?.localInicio?.address ?
                <div className={styles.line}>
                    <div className={styles.collum3}>
                        <h1>
                            Endereço coletado do mapa (local início).
                        </h1>
                        <span>{
                            localData?.localInicio?.address || ''
                        }</span>
                    </div>
                </div>
                :null}

                {inicioFim || localData?.localFim ?
                <>
                    <div className={styles.line}>
                        <div className={styles.collum}>
                            <h1>
                                CEP do local final
                            </h1>
                            <input
                                type='text'
                                name='localFim.cep'
                                value={localData?.localFim?.cep || ''}
                                onChange={(e) => handleForm(e)}
                                onBlur={(e)=>{
                                    getCep(e);
                                    setResetMapFim(!resetMapFim);
                                }}
                                placeholder="CEP do local da atividade"
                                className={`${styles.collum}`}
                                readOnly={readOnly}
                            />  
                        </div>
                        <div className={styles.collum}>
                            <h1>
                                Logradouro
                            </h1>
                            {!readOnly ? <textarea
                                name='localFim.logradouro'
                                value={localData?.localFim?.logradouro || ''}
                                onChange={(e) => handleForm(e)}
                                onBlur={()=>setResetMapFim(!resetMapFim)}
                                placeholder="logradouro"
                                className={`${styles.collum}`}
                                readOnly={readOnly}
                            /> : <p>{localData?.localFim?.logradouro || ''}</p>}
                        </div>
                        <div className={styles.collum}>
                            <h1>
                                Bairro
                            </h1>
                            <input
                                type='text'
                                name='localFim.bairro'
                                value={localData?.localFim?.bairro || ''}
                                onChange={(e) => handleForm(e)}
                                onBlur={()=>setResetMapFim(!resetMapFim)}
                                className={`${styles.collum}`}
                                readOnly={readOnly}
                            />
                        </div>
                        <div className={styles.collum}>
                            <h1>
                                Município
                            </h1>
                            <input
                                type='text'
                                name='localFim.municipio'
                                value={localData?.localFim?.municipio || ''}
                                onChange={(e) => handleForm(e)}
                                onBlur={()=>setResetMapFim(!resetMapFim)}
                                className={`${styles.collum}`}
                                readOnly={readOnly}
                            />
                        </div>
                        <div className={styles.collum}>
                            <h1>
                                UF
                            </h1>
                            <textarea
                                name='localFim.uf'
                                value={localData?.localFim?.uf || ''}
                                onChange={(e) => handleForm(e)}
                                onBlur={()=>setResetMapFim(!resetMapFim)}
                                className={`${styles.collum}`}
                                readOnly={readOnly}
                            />   
                        </div>

                    </div>
                    {localData?.localFim?.address ?
                        <div className={styles.line}>
                            <div className={styles.collum}>
                            <h1>
                                Descrição do endereço.
                            </h1>
                                <span>{
                                    localData?.localFim?.address 
                                }</span>
                            </div>
                        </div>
                    :null}
                </>
                :null}

                {/* metodologia/objetivo */}
                <div className={styles.line}>
                    <div className={styles.collum2}>
                        <h1>
                            Métodologia usada na atividade
                        </h1>
                        {!print ? 
                            <textarea
                            name='metodologia'
                            value={localData?.metodologia || ''}
                            onChange={(e) => handleForm(e)}
                            readOnly={readOnly}
                            />
                        : <p>
                            {localData?.metodologia || ''}
                        </p>}
                    </div>
                    <div className={styles.collum2}>
                        <h1>
                            Objetivo da atividade
                        </h1>
                        {!print ? <textarea
                            name='objetivo'
                            value={localData?.objetivo || ''}
                            onChange={(e) => handleForm(e)}
                            readOnly={readOnly}
                        /> 
                        : <p>
                            {localData?.objetivo || ''}
                        </p>}
                    </div>
                </div>
                
                {/*data/inicio/fim */}
                <div className={styles.line}>
                    <div className={`${styles.collum} ${styles.width120}`}>
                        <h1>
                            Data início
                        </h1>
                        <input
                            type='date'
                            name='dataInicio'
                            value={typeof localData?.dataInicio === 'string' ? localData?.dataInicio : dateFormat1(localData?.dataInicio) || ''}
                            onChange={(e) => handleForm(e)}
                            className={`${styles.collum}`}
                            readOnly={readOnly}
                        />
                    </div>
                    <div className={styles.collum}>
                        <h1>
                            Hora início
                        </h1>
                        <input
                            type='text'
                            name='horaInicio'
                            value={localData?.horaInicio || ''}
                            onChange={(e) => handleForm(e)}
                            className={`${styles.collum}`}
                            readOnly={readOnly}
                        />
                    </div>
                    <div className={styles.collum}>
                        <h1>
                            Local da saída
                        </h1>
                        {!readOnly ? <textarea
                            name='localSaida'
                            value={localData?.localSaida || ''}
                            onChange={(e) => handleForm(e)}
                            className={`${styles.collum}`}
                            readOnly={readOnly}
                        /> : <p>{localData?.localSaida || ''}</p>}
                    </div>
                    <div className={styles.collum}>
                        <h1>
                            Local da chegada
                        </h1>
                        {!readOnly ? <textarea
                            name='localChegada'
                            value={localData?.localChegada || ''}
                            onChange={(e) => handleForm(e)}
                            className={`${styles.collum}`}
                            readOnly={readOnly}
                        /> : <p>{localData?.localChegada || ''}</p>}
                    </div>
                    <div className={`${styles.collum} ${styles.width120}`}>
                        <h1>
                            Data encerramento
                        </h1>
                        <input
                            type='date'
                            name='dataFim'
                            value={dateFormat1(localData?.dataFim) || ''}
                            onChange={(e) => handleForm(e)}
                            className={`${styles.collum}`}
                            readOnly={readOnly}
                        />
                    </div>
                    <div className={styles.collum}>
                        <h1>
                            Hora encerramento
                        </h1>
                        <input
                            type='text'
                            name='horaFim'
                            value={localData?.horaFim || ''}
                            onChange={(e) => handleForm(e)}
                            className={`${styles.collum}`}
                            readOnly={readOnly}
                        />
                    </div>                  
                </div>
                            
                {/*transporte/custo/partes envolvidas */}
                <div className={styles.line}>
                    <div className={styles.collum}>
                        <h1>
                            Meio de transporte
                        </h1>
                        <input
                            type='text'
                            name='meioTransporte'
                            value={localData?.meioTransporte || ''}
                            onChange={(e) => handleForm(e)}
                            className={`${styles.collum}`}
                            readOnly={readOnly}
                        />
                    </div>
                    <div className={styles.collum}>
                        <h1>
                            Custo individual
                        </h1>
                        <input
                            type='text'
                            name='custoIndividual'
                            value={localData?.custoIndividual || ''}
                            onChange={(e) => handleForm(e)}
                            className={`${styles.collum}`}
                            readOnly={readOnly}
                        />
                    </div>
                </div>

                {/* coordenação */}
                <div className={styles.line}>
                    <div className={styles.collum}>
                        <h1>
                            Coordenador da atividade
                        </h1>
                        <input
                            type='text'
                            name='coordenador'
                            list='listResponsaveis'
                            value={localData?.coordenador || ''}
                            onChange={(e) => handleForm(e)}
                            className={`${styles.collum}`}
                            readOnly={readOnly}
                        />
                        <datalist id='listResponsaveis'>
                            <option value={context.dataUser?.name || context.tester?.name}>
                                {context.dataUser?.name || context.tester?.name}
                            </option>
                        </datalist>
                    </div>
                    <div className={styles.collum}>
                        <h1>
                            Reg. Escoteiro
                        </h1>
                        <input
                            type='text'
                            name='regCoordenador'
                            value={localData?.regCoordenador || ''}
                            onChange={(e) => handleForm(e)}
                            className={`${styles.collum}`}
                            readOnly={readOnly}
                        />
                    </div>
                    <div className={styles.collum}>
                        <h1>
                            Tel. de contato
                        </h1>
                        <input
                            type='text'
                            name='telCoordenador'
                            value={localData?.telCoordenador || ''}
                            onChange={(e) => handleForm(e)}
                            className={`${styles.collum}`}
                            readOnly={readOnly}
                        />
                    </div>
                    <div className={styles.collum}>
                        <h1>
                            E-mail de contato
                        </h1>
                        <input
                            type='text'
                            name='emailCoordenador'
                            value={localData?.emailCoordenador || ''}
                            onChange={(e) => handleForm(e)}
                            className={`${styles.collum}`}
                            readOnly={readOnly}
                        />
                    </div>
                    <div className={styles.collum}>
                        <h1>
                            Nível de formação
                        </h1>
                        {!readOnly ?
                            <select
                                name='nivelFormacaoCoordenador'
                                value={localData?.nivelFormacaoCoordenador || ''}
                                onChange={(e) => handleForm(e)}
                                className={`${styles.collum}`}
                            >
                                {
                                    ['', 'Preliminar', 'Intermediário', 'Avançado'].map(item=> (<option value={item} key={v4()}>{item}</option>))
                                }
                            </select>
                        :
                                <input 
                                    defaultValue={localData?.nivelFormacaoCoordenador || ''}
                                    readOnly={readOnly}
                                    className={`${styles.collum}`}
                                />
                        }
                    </div>
                </div>

                {/* supervisão */}
                {localData?.nivelFormacaoCoordenador === "Preliminar" ? 
                <>
                    <div className={styles.line}>
                        <div className={styles.collum}>
                            <h1>
                                Supervisor da atividade
                            </h1>
                            <input
                                type='text'
                                name='nomeSupervisor'
                                value={localData?.nomeSupervisor || ''}
                                onChange={(e) => handleForm(e)}
                                className={`${styles.collum}`}
                                readOnly={readOnly}
                            />
                        </div>
                        <div className={styles.collum}>
                            <h1>
                                Reg. Escoteiro do Supervisor
                            </h1>
                            <input
                                type='text'
                                name='regSupervisor'
                                value={localData?.regSupervisor || ''}
                                onChange={(e) => handleForm(e)}
                                className={`${styles.collum}`}
                                readOnly={readOnly}
                            />
                        </div>
                        <div className={styles.collum}>
                            <h1>
                                Tel. de contato do Supervisor
                            </h1>
                            <input
                                type='text'
                                name='telSupervisor'
                                value={localData?.telSupervisor || ''}
                                onChange={(e) => handleForm(e)}
                                className={`${styles.collum}`}
                                readOnly={readOnly}
                            />
                        </div>
                        <div className={styles.collum}>
                            <h1>
                                Nível de formação do Supervisor
                            </h1>
                            {!readOnly ?
                                <select
                                    name='nivelFormacaoSupervisor'
                                    value={localData?.nivelFormacaoSupervisor || ''}
                                    onChange={(e) => handleForm(e)}
                                    className={`${styles.collum}`}
                                >
                                    {
                                        ['', 'Preliminar', 'Intermediário', 'Avançado'].map(item=> (<option value={item} key={v4()}>{item}</option>))
                                    }
                                </select>
                                :
                                <input 
                                    defaultValue={localData?.nivelFormacaoSupervisor || ''}
                                    readOnly={readOnly}
                                    className={`${styles.collum}`}
                                />
                            }
                        </div>                        
                    </div>
                </>:null}

                {/* como chegar/link mapa */}
                <div className={styles.line}>
                    <div className={styles.collum2}>
                        <h1>
                            Como chegar no local da atividade?
                        </h1>
                        {!readOnly ? <textarea
                            name='comoChegar'
                            value={localData?.comoChegar || ''}
                            onChange={(e) => handleForm(e)}
                            placeholder="como chegar"
                            readOnly={readOnly}
                        /> : <p>{localData?.comoChegar || ''}</p>}
                    </div>
                    <div className={styles.collum2}>
                        <h1>
                            Link do mapa(s)
                        </h1>
                        {!readOnly ? <textarea
                            name='linkMapa'
                            value={localData?.linkMapa || ''}
                            onChange={(e) => handleForm(e)}
                            placeholder="sugestão: procure por google Earth Web e crie uma pasta com todas as rotas"
                            readOnly={readOnly}
                        /> : <a 
                            href={localData?.linkMapa || ''} 
                            className='link'
                            style={{overflow: 'hidden', textOverflow: 'clip'}}
                        >
                            {localData?.linkMapa || ''}
                        </a>}
                    </div>                    
                </div>

                {/* rotas do local */}
                {!readOnly ?
                    <div className={styles.collum} style={{flexDirection: 'row', padding: '6px'}}>
                        <label htmlFor='rotas'>Criar rotas?</label>
                        <FaPlus 
                            className={styles.btnAddAtividade}
                            onClick={()=>{
                                context.setShowModal({
                                    element:
                                        <RouteMapComponent 
                                            initialPosition={
                                                localData?.localInicio?.coordenadas ?
                                                {
                                                    lat: context.dataSaae.dadosGerais.localInicio?.coordenadas?.lat,
                                                    lng: context.dataSaae.dadosGerais.localInicio?.coordenadas?.long
                                                } : undefined
                                            }
                                        />,
                                    styles:['backgroundWhite']
                                })
                        }}/>
                    </div>
                :null}
                {localData?.rotas && 
                <div className={styles.breakPage}>
                    <h4>Demais rotas e locais</h4>
                    {localData?.rotas?.map((rota, index)=>(
                        <div key={v4()} className={styles.subBoxRotas}> 
                            {!readOnly ? 
                                <div className={styles.line}>
                                    <span style={{width: 80, height: 'auto'}}>
                                        <b style={{fontWeight: 600}}>Título:</b> 
                                        {rota.title}
                                    </span>
                                    <span style={{width: 120, height: 'auto'}}>
                                        <b style={{fontWeight: 600}}>Descrição:</b> 
                                        {rota.description}
                                    </span>
                                    <span style={{height: 'auto'}}>
                                        <b style={{fontWeight: 600}}>Distância/KM:</b> 
                                        {rota.distance?.toFixed(2)}
                                    </span>
                                    <span 
                                        className='cursorPointer' 
                                        style={{textDecoration: 'underline', color: 'blue', height: 'auto'}}
                                        onClick={()=>{
                                            if(!readOnly)
                                            context.setShowModal({
                                                element:
                                                    <RouteMapComponent 
                                                        initialRota={rota}
                                                        initialPosition={
                                                            rota ?
                                                            {
                                                                lat: rota.points[0].lat,
                                                                lng: rota.points[0].lng
                                                            } : undefined
                                                        }
                                                    />,
                                                styles:['backgroundWhite']
                                            });
                                        }}
                                    >
                                        <b>Visualizar</b>
                                    </span>                                
                                    <FaTrash 
                                        className={styles.btnRemAtividade}
                                        onClick={()=>{
                                            context.setDataSaae((prev)=>{
                                                const newArray = prev.dadosGerais.rotas?.filter((_, i) => i !== index)
                                                
                                                const newData= {
                                                    ...prev.dadosGerais,
                                                    rotas: newArray
                                                }
                                                return{
                                                    ...prev,
                                                    dadosGerais: newData
                                                }
                                            })
                                        }}
                                    />
                                </div>
                            : <RouteMapComponent 
                                readonly={true}
                                initialRota={rota}
                                initialPosition={
                                    rota ?
                                    {
                                        lat: rota.points[0].lat,
                                        lng: rota.points[0].lng
                                    } : undefined
                                }
                            />}
                        </div>
                    ))}
                </div>}
                
                {/* coordenadas do local */}
                <div>
                    <h2>
                        Coordenadas do local Início
                    </h2>
                    <label htmlFor="">
                       {`${localData?.localInicio?.coordenadas?.lat || ''},  
                       ${localData?.localInicio?.coordenadas?.long || ''}`}
                    </label>
                </div>
                <div className={styles.line}>
                    {(localData?.localInicio?.logradouro && localData?.localInicio?.bairro) || 
                        (localData?.localInicio?.coordenadas?.lat && localData?.localInicio?.coordenadas?.long) ?
                        <MapsComponent 
                            label='localInicio'
                            setLatLong={latLongSet}
                            data={localData?.localInicio}
                            readonly={readOnly}
                            reset={resetMap}
                        />
                    :null}                    
                </div>
                {(localData?.localFim?.logradouro && localData?.localFim?.bairro) || localData?.localFim?.coordenadas ?
                <>
                <div>
                    <h2>
                        Coordenadas do local Fim
                    </h2>
                    <label htmlFor="">
                       {`${localData?.localFim?.coordenadas?.lat || ''},  
                       ${localData?.localFim?.coordenadas?.long || ''}`}
                    </label>
                </div>

                <div className={styles.line}>
                    <MapsComponent 
                        label='localFim'
                        setLatLong={latLongSet}
                        data={localData?.localFim}
                        readonly={readOnly}
                        reset={resetMapFim}
                    />                   
                </div>
                </>                 
                :null}

                {/* programação da atividade */}
                <div className={styles.line}>                    
                    <div className={`${styles.bgGreen}`} style={{width: '100%'}}>
                        <span><b>Programação da atividade</b></span>
                    </div>

                    {/* cabeçalho da programação */}
                    <div className={`${styles.line} ${print ? styles.print : ''} ${styles.flexRowSpace}`}>
                        <div className={`${styles.collum} ${styles.width120}`}>
                            <h1 >
                                Data
                            </h1>
                        </div>
                        <div className={`${styles.collum} ${styles.width100}`}>
                            <h1>
                                Hora
                            </h1>
                        </div>
                        <div className={styles.collum}>
                            <h1>
                                Duração (no formato hora)
                            </h1>
                        </div>
                        <div className={`${styles.collum} ${styles.width260}`}>
                            <h1>
                                Descrição
                            </h1>
                        </div>
                        <div className={styles.collum}>
                            <h1>
                                Material Necessário
                            </h1>
                        </div>
                        <div className={`${styles.collum} ${styles.width100}`}>
                            <h1>
                                Responsável
                            </h1>
                        </div> 
                        {!readOnly ? <div className={`${styles.collum} ${styles.width100}`}>
                            <h1>
                                Add/Rem
                            </h1>
                        </div>:null}
                    </div>

                    {/* dados adicionados à programação */}
                    {localData?.programacao?.map((prog, idx)=>(
                        <div 
                            key={idx+"progragamacao"} 
                            className={`${styles.line} ${print ? styles.print : ''} ${styles.flexRowSpace}`}
                        >
                            <div className={`${styles.collum} ${styles.width120}`}>
                                {!readOnly ? <input
                                    name='data'
                                    value={dateFormat2(prog?.data) || ''}
                                    onChange={(e)=>handleEditProgramacao(e, prog.id)}
                                /> : <p>{dateFormat2(prog?.data) || ''}</p>}
                            </div>
                            <div  className={`${styles.collum} ${styles.width100}`}>
                                {!readOnly ? <input
                                    name='hora'
                                    value={prog?.hora  || ''}
                                    onChange={(e)=>handleEditProgramacao(e, prog.id)}
                                /> : <p>{prog?.hora  || ''}</p>}
                            </div>
                            <div className={styles.collum}>
                                {!readOnly ? <input
                                    name='duracao' 
                                    value={prog?.duracao || ''}
                                    onChange={(e)=>handleEditProgramacao(e, prog.id)}
                                />: <p>{prog?.duracao || ''}</p>}
                            </div>
                            <div className={`${styles.collum} ${styles.width260}`}>
                                {!readOnly ? <textarea 
                                    name='descricao'
                                    value={prog?.descricao || ''}
                                    readOnly={readOnly}
                                    onChange={(e)=>handleEditProgramacao(e, prog.id)}
                                />: <p>{prog?.descricao || ''}</p>}
                            </div>
                            <div className={styles.collum}>
                                {!readOnly ? <input
                                    name='materialNecessario' 
                                    value={prog?.materialNecessario || ''}
                                    onChange={(e)=>handleEditProgramacao(e, prog.id)}
                                /> : <p>{prog?.materialNecessario || ''}</p>}
                            </div>
                            <div className={`${styles.collum} ${styles.width100}`}>
                                {!readOnly ? <input
                                    name='responsavel' 
                                    value={prog?.responsavel || ''}
                                    onChange={(e)=>handleEditProgramacao(e, prog.id)}
                                    className={styles.inputProgramacao}
                                /> : <p>{prog?.responsavel || ''}</p>}
                            </div>
                            {!readOnly ?
                                <div className={`${styles.collum} ${styles.width100}`}>
                                    <FaMinus  
                                        size={18} 
                                        className={`${styles.btnRemAtividade}`}
                                        onClick={()=>removeAtividade(idx+1)} 
                                    />
                                </div>
                            :null}
                        </div>
                    ))}

                    {/* inputs da programação */}
                    {!readOnly ? 
                        <div className={`${styles.line} ${print ? styles.print : ''} ${styles.flexRowSpace}`}>
                            <div className={`${styles.collum} ${styles.width120}`}>
                                <input
                                    type='date'
                                    name='data'
                                    value={dateFormat1(currentProgramacao?.data) || ''}
                                    onChange={(e) => handleFormProgramacao(e)}
                                    className={`${styles.collum} ${styles.width120}`}
                                    readOnly={readOnly}
                                />
                            </div>
                            <div className={`${styles.collum} ${styles.width100}`}>
                                <input
                                    type='text'
                                    name='hora'
                                    value={currentProgramacao?.hora || ''}
                                    onChange={(e) => handleFormProgramacao(e)}
                                    className={`${styles.collum} ${styles.width100} ${styles.textAlingCenter}`}
                                    readOnly={readOnly}
                                />
                            </div>
                            <div className={styles.collum}>
                                <input
                                    type='text'
                                    name='duracao'
                                    value={currentProgramacao?.duracao || ''}
                                    onChange={(e) => handleFormProgramacao(e)}
                                    className={`${styles.collum} ${styles.textAlingCenter}`}
                                    readOnly={readOnly}
                                />
                            </div>
                            <div className={`${styles.collum} ${styles.width260}`}>
                                <textarea
                                    name='descricao'
                                    value={currentProgramacao?.descricao || ''}
                                    onChange={(e) => handleFormProgramacao(e)}
                                    className={`${styles.collum} ${styles.width260}`}
                                    readOnly={readOnly}
                                />
                            </div>
                            <div className={styles.collum}>
                                <input
                                    type='text'
                                    name='materialNecessario'
                                    value={currentProgramacao?.materialNecessario || ''}
                                    onChange={(e) => handleFormProgramacao(e)}
                                    className={`${styles.collum}`}
                                    readOnly={readOnly}
                                />
                            </div>
                            <div className={`${styles.collum} ${styles.width100}`}>
                                <input
                                    type='text'
                                    name='responsavel'
                                    value={currentProgramacao?.responsavel || ''}
                                    onChange={(e) => handleFormProgramacao(e)}
                                    className={`${styles.collum}`}
                                    readOnly={readOnly}
                                />
                            </div>
                            <div className={`${styles.collum} ${styles.width100}`}>
                                <FaPlus
                                    size={18} 
                                    className={styles.btnAddAtividade}
                                    onClick={addAtividade}
                                    style={{height: 50}}
                                />
                            </div>
                        </div>
                    :null}
                </div>
            </div>        
        </div>
    )
}