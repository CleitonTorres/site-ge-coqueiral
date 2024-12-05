import { ChangeEvent, FocusEvent, useEffect, useState } from 'react';
import styles from './dadosGerais.module.css';
import { DadosGeraisSaae, Endereco, ProgramacaoAtividade } from '@/@types/types';
import { v4 } from 'uuid';
import { addTime, cleamText, dateFormat1, dateFormat2, formatToHourMin, getDadosCEP, maskcep, temApenasNumeros } from '@/scripts/globais';
import { FaMinus, FaPlus } from "react-icons/fa";
import { dataBaseSaae, Odss, tiposAtividade } from '@/components/data-training/data-training';
import MapsComponent from '@/components/layout/mapsViewer/mapsViewer';

export default function DadosGerais(){
    const [data, setData] = useState({} as DadosGeraisSaae)
    const [currentProgramacao, setCurrentProgramacao] = useState({} as ProgramacaoAtividade);
    const [atividade, setAtividade] = useState('');
    const [odss, setOdss] = useState('');

    const [atividadesList, setAtividadesList] = useState<string[]>([]);
    const [inicioFim, setInicioFim] = useState(false);
    const [latLong, setLatLong] = useState({} as {
        lat: number,
        long: number
    });

    const handleForm = (e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>)=>{
        e.preventDefault();
        const name = e.target.name;
        const value= e.target.value;

        setData((prev)=>{
            if(['horaInicio', 'horaFim'].includes(name)){
                return{
                    ...prev,
                    [name]: formatToHourMin(value)
                }
            }else if(name.includes("localInicio")){
                const nameSplit = name.split('.')[1];
                return{
                    ...prev,
                    localInicio: {
                        ...prev.localInicio,
                        [nameSplit]: maskcep(value)
                    }
                }
            }else if(name.includes("localFim")){
                const nameSplit = name.split('.')[1] as 'logradouro' | 'bairro' | 'municipio' | 'uf' | 'cep';
                const local:Endereco = prev.localFim ? {
                    ...prev.localFim,
                    [nameSplit]: nameSplit === "cep" ? maskcep(value) : value
                } as Endereco: {
                    [nameSplit]: nameSplit === "cep" ? maskcep(value) : value
                } as unknown as  Endereco;

                return{
                    ...prev,
                    localFim: local
                }
            }else if(["dataInicio", 'dataFim'].includes(name)){
                const date = new Date(value + 'T00:00');
                return{
                    ...prev,
                    [name]: date
                }
            }
            return{
                ...prev,
                [name]: value
            }
        })
    }

    const handleFormProgramacao= (e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>)=>{
        e.preventDefault();
        const name = e.target.name;
        const value= e.target.value;

        setCurrentProgramacao((prev)=>{
            if(name === "data"){
                const date = new Date(value + 'T00:00');
                return{
                    ...prev,
                    data: date
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

    const addAtividade = ()=>{
        if(!currentProgramacao.data || !currentProgramacao.duracao || !currentProgramacao.hora || !currentProgramacao.descricao){
            alert("Faltam campos obrigatórios na programação!")
            return;
        }
        if(!addTime(currentProgramacao.hora, currentProgramacao.duracao)){
            alert(`Formato inválido. Use o formato HH:MM. Hora informada: ${currentProgramacao.hora}, minutos informados: ${currentProgramacao.duracao}`);
            return
        }
        setData((prev)=>{
            const newProgragacao = prev.programacao ? [
                ...prev.programacao,
                {...currentProgramacao, id: prev.programacao.length+1}
            ] : [{...currentProgramacao, id: 1}]
            
            return{
                ...prev,
                programacao: newProgragacao
            }
        });

        setCurrentProgramacao((prev)=>{
            return{
                data: new Date(),
                hora: addTime(prev.hora, prev.duracao)
            } as ProgramacaoAtividade
        });
    }

    const removeAtividade = (idx:number)=>{
        setData((prev)=>{
            const filter = prev.programacao.filter(prog=> prog.id !== idx);
            const rename = filter.map((prog, idx)=> {
                return{
                    ...prog,
                    id: idx+1
                } as ProgramacaoAtividade
            });

            return {
                ...prev, 
                programacao: rename
            }
        })
    }

    const getAtividade = (e: FocusEvent<HTMLInputElement, Element>)=>{
        e.preventDefault();
        const value = e.target.value;

        if(value === ""){
            return;
        }
        setData((prev)=>{
            const atividade = dataBaseSaae.find(ativ=> ativ.produto?.includes(value))
            if(atividade){
                setInicioFim(atividade.localFim ? true : false);
                return{
                    ...prev,
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
                } as DadosGeraisSaae
            }else{
                return prev
            }
        });
    }

    //busca o endereço da empresa.
    const getCep = (e:ChangeEvent<HTMLInputElement>)=>{
        const value = cleamText(e.target.value);
        const initialName = e.target.name.split('.')[0] as 'localInicio' | 'localFim';

        if(value !== '' && value.length === 8 && temApenasNumeros(value)){
            getDadosCEP(value)
            .then((data)=> {
                const segmentos:Array<string> = data.logradouro.split(" ")
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
                if(data){
                    setData((prev)=>{
                        const logra = data.complemento ? tipo_logradouro+ " " + logradouro + ', '+ data.complemento : tipo_logradouro + logradouro;
                        return{
                            ...prev,  
                            [initialName]: {
                                ...prev[initialName],
                                logradouro: logra,
                                bairro: data.bairro,
                                municipio: data.localidade,
                                uf: data.uf
                            }
                        }
                    })
                }
            })
            .catch(err=> console.log(err))
        }
    }

    const handleKeyPress = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const value = e.target.value;
        const name = e.target.name as 'tipoAtividade' | 'odss';

        // Adicionar o valor ao array se não for vazio e não for duplicado
        const trimmedValue = value.trim();
        if (trimmedValue && !data[name]?.includes(trimmedValue)) {
            setData((prev)=> {
                const newArray = prev[name] ? [
                    ...prev[name],
                    trimmedValue
                ] : [trimmedValue];

                return {
                    ...prev,
                    [name]: newArray
                }
            });
        }
        setAtividade(''); // Limpa o input
        setOdss(''); // Limpa o input
    };

    const handleRemoveTag = (index: number, name:'tipoAtividade' | 'odss') => {
        setData((prev)=>{
            const newArray = prev[name].filter((_, i) => i !== index)
            return {
                ...prev,
                [name]: newArray
            }
        });
    };

    const latLongSet = (lat: number, lng: number)=>{
        setLatLong(()=>{
            return{
                lat: lat,
                long: lng
            }
        })
    }

    useEffect(()=>{
        console.log(data)
    },[data]);

    useEffect(()=>{
        setAtividadesList(()=>{
            const newData = dataBaseSaae?.map(ativ=> `${ativ.produto}`)
            return newData
        })
    },[]);

    return(
        <div className={styles.conteiner}>
            <h1>2. Dados gerais da atividade</h1>

            <div className={styles.table}>
                {/* nome/tipo/ods */}
                <div className={styles.line}>
                    <div className={styles.collum}>
                        <h1>
                            Nome da atividade
                        </h1>
                        <input
                            type='text'
                            name='nomeAtividade'
                            list='listAtividades'
                            value={data?.nomeAtividade || ''}
                            onChange={(e) => handleForm(e)}
                            onBlur={(e)=>getAtividade(e)}
                            placeholder="nome da atividade"
                            className={`${styles.collum}`}
                        />
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
                            onChange={(e) => {
                                setAtividade(e.target.value);
                                handleKeyPress(e);
                            }}
                            className={`${styles.collum}`}
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
                            {data.tipoAtividade?.sort((a,b)=> a.localeCompare(b))?.map((tag, index) => (
                                <div
                                    key={index+'tags'}
                                    className={styles.boxTags}
                                >
                                {tag}
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault(); 
                                            handleRemoveTag(index, 'tipoAtividade')
                                        }}
                                    >
                                        x
                                    </button>
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
                            onChange={(e) => {
                                setOdss(e.target.value);
                                handleKeyPress(e);
                            }}
                            className={`${styles.collum}`}
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
                            {data.odss?.sort((a,b)=> a.localeCompare(b))?.map((tag, index) => (
                                <div
                                    key={index+'tags'}
                                    className={styles.boxTags}
                                >
                                {tag}
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault(); 
                                            handleRemoveTag(index, 'odss')
                                        }}
                                    >
                                        x
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>                    
                </div>
                
                {/* local/endereço */}
                <div className={`${styles.line} ${styles.margin0}`}>                    
                    <div className={styles.boxCheck}>
                        <span title="Local onde será realizada?">
                            Local início é diferente do local fim?
                        </span>
                        <input 
                            type="checkbox" 
                            name="inicio-fim" 
                            checked={inicioFim}
                            onChange={()=>{
                                setInicioFim((prev)=>{
                                    if(prev){
                                        setData((prev)=>{
                                            return{
                                                ...prev,
                                                localFim: undefined
                                            }
                                        })
                                        return false
                                    }else{
                                        return true
                                    }
                                });
                            }}
                        />
                    </div>
                </div>
                <div className={styles.line}>
                    <div className={styles.collum}>
                        <h1>
                            CEP do local/local início
                        </h1>
                        <input
                            type='text'
                            name='localInicio.cep'
                            value={data?.localInicio?.cep || ''}
                            onChange={(e) => handleForm(e)}
                            onBlur={(e)=>getCep(e)}
                            placeholder="CEP do local da atividade"
                            className={`${styles.collum}`}
                        />  
                    </div>
                    <div className={styles.collum}>
                        <h1>
                            Logradouro
                        </h1>
                        <textarea
                            name='localInicio.logradouro'
                            value={data?.localInicio?.logradouro || ''}
                            onChange={(e) => handleForm(e)}
                            placeholder="logradouro"
                            className={`${styles.collum}`}
                        />
                    </div>
                    <div className={styles.collum}>
                        <h1>
                            Bairro
                        </h1>
                        <input
                            type='text'
                            name='localInicio.bairro'
                            value={data?.localInicio?.bairro || ''}
                            onChange={(e) => handleForm(e)}
                            placeholder="Exemplo: remada em caiaque"
                            className={`${styles.collum}`}
                        />
                    </div>
                    <div className={styles.collum}>
                        <h1>
                            Município
                        </h1>
                        <input
                            type='text'
                            name='localInicio.municipio'
                            value={data?.localInicio?.municipio || ''}
                            onChange={(e) => handleForm(e)}
                            placeholder="Exemplo: remada em caiaque"
                            className={`${styles.collum}`}
                        />
                    </div>
                    <div className={styles.collum}>
                        <h1>
                            UF
                        </h1>
                        <textarea
                            name='localInicio.uf'
                            value={data?.localInicio?.uf || ''}
                            onChange={(e) => handleForm(e)}
                            placeholder="Exemplo: remada em caiaque"
                            className={`${styles.collum}`}
                        />   
                    </div>
                </div>
                {inicioFim || data.localFim ?
                    <div className={styles.line}>
                        <div className={styles.collum}>
                            <h1>
                                CEP do local final
                            </h1>
                            <input
                                type='text'
                                name='localFim.cep'
                                value={data?.localFim?.cep || ''}
                                onChange={(e) => handleForm(e)}
                                onBlur={(e)=>getCep(e)}
                                placeholder="CEP do local da atividade"
                                className={`${styles.collum}`}
                            />  
                        </div>
                        <div className={styles.collum}>
                            <h1>
                                Logradouro
                            </h1>
                            <textarea
                                name='localFim.logradouro'
                                value={data?.localFim?.logradouro || ''}
                                onChange={(e) => handleForm(e)}
                                placeholder="logradouro"
                                className={`${styles.collum}`}
                            />
                        </div>
                        <div className={styles.collum}>
                            <h1>
                                Bairro
                            </h1>
                            <input
                                type='text'
                                name='localFim.bairro'
                                value={data?.localFim?.bairro || ''}
                                onChange={(e) => handleForm(e)}
                                placeholder="Exemplo: remada em caiaque"
                                className={`${styles.collum}`}
                            />
                        </div>
                        <div className={styles.collum}>
                            <h1>
                                Município
                            </h1>
                            <input
                                type='text'
                                name='localFim.municipio'
                                value={data?.localFim?.municipio || ''}
                                onChange={(e) => handleForm(e)}
                                placeholder="Exemplo: remada em caiaque"
                                className={`${styles.collum}`}
                            />
                        </div>
                        <div className={styles.collum}>
                            <h1>
                                UF
                            </h1>
                            <textarea
                                name='localFim.uf'
                                value={data?.localFim?.uf || ''}
                                onChange={(e) => handleForm(e)}
                                placeholder="Exemplo: remada em caiaque"
                                className={`${styles.collum}`}
                            />   
                        </div>
                    </div>
                :null}

                {/* metodologia/objetivo */}
                <div className={styles.line}>
                    <div className={styles.collum2}>
                        <h1>
                            Métodologia usada na atividade
                        </h1>
                        <textarea
                            name='metodologia'
                            value={data?.metodologia || ''}
                            onChange={(e) => handleForm(e)}
                            className={`${styles.collum2}`}
                        />
                    </div>
                    <div className={styles.collum2}>
                        <h1>
                            Objetivo da atividade
                        </h1>
                        <textarea
                            name='objetivo'
                            value={data?.objetivo || ''}
                            onChange={(e) => handleForm(e)}
                            className={`${styles.collum2}`}
                        />
                    </div>
                </div>
                
                {/*data/inicio/fim */}
                <div className={styles.line}>
                    <div className={`${styles.collum} ${styles.width100}`}>
                        <h1>
                            Data início
                        </h1>
                        <input
                            type='date'
                            name='dataInicio'
                            datatype={dateFormat2(data?.dataInicio) || ''}
                            onChange={(e) => handleForm(e)}
                            className={`${styles.collum}`}
                        />
                    </div>
                    <div className={styles.collum}>
                        <h1>
                            Hora início
                        </h1>
                        <input
                            type='text'
                            name='horaInicio'
                            value={data?.horaInicio || ''}
                            onChange={(e) => handleForm(e)}
                            className={`${styles.collum}`}
                        />
                    </div>
                    <div className={styles.collum}>
                        <h1>
                            Local da saída
                        </h1>
                        <textarea
                            name='localSaida'
                            value={data?.localSaida || ''}
                            onChange={(e) => handleForm(e)}
                            className={`${styles.collum}`}
                        />
                    </div>
                    <div className={styles.collum}>
                        <h1>
                            Local da chegada
                        </h1>
                        <textarea
                            name='localChegada'
                            value={data?.localChegada || ''}
                            onChange={(e) => handleForm(e)}
                            className={`${styles.collum}`}
                        />
                    </div>
                    <div className={`${styles.collum} ${styles.width100}`}>
                        <h1>
                            Data encerramento
                        </h1>
                        <input
                            type='date'
                            name='dataFim'
                            datatype={dateFormat2(data?.dataFim) || ''}
                            onChange={(e) => handleForm(e)}
                            className={`${styles.collum}`}
                        />
                    </div>
                    <div className={styles.collum}>
                        <h1>
                            Hora encerramento
                        </h1>
                        <input
                            type='text'
                            name='horaFim'
                            value={data?.horaFim || ''}
                            onChange={(e) => handleForm(e)}
                            className={`${styles.collum}`}
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
                            value={data?.meioTransporte || ''}
                            onChange={(e) => handleForm(e)}
                            className={`${styles.collum}`}
                        />
                    </div>
                    <div className={styles.collum}>
                        <h1>
                            Custo individual
                        </h1>
                        <input
                            type='text'
                            name='custoIndividual'
                            value={data?.custoIndividual || ''}
                            onChange={(e) => handleForm(e)}
                            className={`${styles.collum}`}
                        />
                    </div>
                    <div className={styles.collum}>
                        <h1>
                            As partes envolvidas receberam as informações prévias?
                        </h1>
                        <select
                            name='cienciaInfosPreliminares'
                            value={data?.cienciaInfosPreliminares || ''}
                            onChange={(e) => handleForm(e)}
                            className={`${styles.collum}`}
                        >
                            {['', 'Sim', 'Não'].map(item=>(<option key={v4()} value={item}>{item}</option>))}
                        </select>
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
                            value={data?.coordenador || ''}
                            onChange={(e) => handleForm(e)}
                            className={`${styles.collum}`}
                        />
                    </div>
                    <div className={styles.collum}>
                        <h1>
                            Reg. Escoteiro
                        </h1>
                        <input
                            type='text'
                            name='regCoordenador'
                            value={data?.regCoordenador || ''}
                            onChange={(e) => handleForm(e)}
                            className={`${styles.collum}`}
                        />
                    </div>
                    <div className={styles.collum}>
                        <h1>
                            Tel. de contato
                        </h1>
                        <input
                            type='text'
                            name='telCoordenador'
                            value={data?.telCoordenador || ''}
                            onChange={(e) => handleForm(e)}
                            className={`${styles.collum}`}
                        />
                    </div>
                    <div className={styles.collum}>
                        <h1>
                            E-mail de contato
                        </h1>
                        <input
                            type='text'
                            name='emailCoordenador'
                            value={data?.emailCoordenador || ''}
                            onChange={(e) => handleForm(e)}
                            className={`${styles.collum}`}
                        />
                    </div>
                    <div className={styles.collum}>
                        <h1>
                            Nível de formação
                        </h1>
                        <select
                            name='nivelFormacaoCoordenador'
                            value={data?.nivelFormacaoCoordenador || ''}
                            onChange={(e) => handleForm(e)}
                            className={`${styles.collum}`}
                        >
                            {
                                ['Preliminar', 'Intermediário', 'Avançado'].map(item=> (<option value={item} key={v4()}>{item}</option>))
                            }
                        </select>
                    </div>
                </div>

                {/* supervisão */}
                {data.nivelFormacaoCoordenador === "Preliminar" ? 
                <>
                    <div className={styles.line}>
                        <div className={styles.collum}>
                            <h1>
                                Supervisor da atividade
                            </h1>
                            <input
                                type='text'
                                name='nomeSupervisor'
                                value={data?.nomeSupervisor || ''}
                                onChange={(e) => handleForm(e)}
                                className={`${styles.collum}`}
                            />
                        </div>
                        <div className={styles.collum}>
                            <h1>
                                Reg. Escoteiro do Supervisor
                            </h1>
                            <input
                                type='text'
                                name='regSupervisor'
                                value={data?.regSupervisor || ''}
                                onChange={(e) => handleForm(e)}
                                className={`${styles.collum}`}
                            />
                        </div>
                        <div className={styles.collum}>
                            <h1>
                                Tel. de contato do Supervisor
                            </h1>
                            <input
                                type='text'
                                name='telSupervisor'
                                value={data?.telSupervisor || ''}
                                onChange={(e) => handleForm(e)}
                                className={`${styles.collum}`}
                            />
                        </div>
                        <div className={styles.collum}>
                            <h1>
                                Nível de formação do Supervisor
                            </h1>
                            <input
                                type='text'
                                name='nivelFormacaoSupervisor'
                                value={data?.nivelFormacaoSupervisor || ''}
                                onChange={(e) => handleForm(e)}
                                className={`${styles.collum}`}
                            />
                        </div>                        
                    </div>
                </>:null}

                {/* como chegar/link mapa */}
                <div className={styles.line}>
                    <div className={styles.collum2}>
                        <h1>
                            Como chegar no local da atividade?
                        </h1>
                        <textarea
                            name='comoChegar'
                            value={data?.comoChegar || ''}
                            onChange={(e) => handleForm(e)}
                            placeholder="como chegar"
                            className={`${styles.collum2}`}
                        />
                    </div>
                    <div className={styles.collum2}>
                        <h1>
                            Link do mapa(s)
                        </h1>
                        <textarea
                            name='linkMapa'
                            value={data?.linkMapa || ''}
                            onChange={(e) => handleForm(e)}
                            placeholder="sugestão: procure por google Earth Web e crie uma pasta com todas as rotas"
                            className={`${styles.collum2}`}
                        />
                    </div>                    
                </div>
                <div>
                    <h2>
                        Coordenadas do local (opcional)
                    </h2>
                    <input
                        type='number'
                        value={latLong.lat || ''}
                        onChange={(e) => setLatLong((prev)=>{return{...prev, lat: parseFloat(e.target.value)}})}
                        placeholder="latitude"
                        style={{width: 200}}
                    />
                    <input
                        type='number'
                        value={latLong.long || ''}
                        onChange={(e) => setLatLong((prev)=>{
                            return{...prev, long: parseFloat(e.target.value)}
                        })}
                        placeholder="longitude"
                        style={{width: 200}}
                    />
                </div>
                <div className={styles.line}>
                    {latLong.lat && latLong.long ?
                        <MapsComponent lat={latLong.lat} long={latLong.long} setLatLong={latLongSet}/>
                    :null}                    
                </div>

                {/* programação da atividade */}
                <div className={styles.line}>
                    <span>Programação da atividade</span>
                </div>

                <div className={styles.line}>
                    <div className={`${styles.collum} ${styles.width120}`}>
                        <h1 >
                            Data
                        </h1>
                        {data.programacao?.map((prog)=>(
                            <span className={styles.borderBottom} key={v4()}>
                                {dateFormat2(prog?.data)}
                            </span>
                        ))}
                        <input
                            type='date'
                            name='data'
                            datatype={dateFormat1(currentProgramacao?.data) || ''}
                            onChange={(e) => handleFormProgramacao(e)}
                            className={`${styles.collum} ${styles.width120}`}
                        />
                    </div>
                    <div className={`${styles.collum} ${styles.width100}`}>
                        <h1>
                            Hora
                        </h1>
                        {data.programacao?.map((prog)=>(
                            <span className={styles.borderBottom} key={v4()}>
                                {prog?.hora}
                            </span>
                        ))}
                        <input
                            type='text'
                            name='hora'
                            value={currentProgramacao?.hora || ''}
                            onChange={(e) => handleFormProgramacao(e)}
                            className={`${styles.collum} ${styles.width100} ${styles.textAlingCenter}`}
                        />
                    </div>
                    <div className={styles.collum}>
                        <h1>
                            Duração (em minutos)
                        </h1>
                        {data.programacao?.map((prog)=>(
                            <span className={styles.borderBottom} key={v4()}>
                                {prog?.duracao}
                            </span>
                        ))}
                        <input
                            type='text'
                            name='duracao'
                            value={currentProgramacao?.duracao || ''}
                            onChange={(e) => handleFormProgramacao(e)}
                            className={`${styles.collum} ${styles.textAlingCenter}`}
                        />
                    </div>
                    <div className={`${styles.collum} ${styles.width260}`}>
                        <h1>
                            Descrição
                        </h1>
                        {data.programacao?.map((prog)=>(
                            <span className={styles.borderBottom} key={v4()}>
                                {prog?.descricao}
                            </span>
                        ))}
                        <textarea
                            name='descricao'
                            value={currentProgramacao?.descricao || ''}
                            onChange={(e) => handleFormProgramacao(e)}
                            className={`${styles.collum} ${styles.width260}`}
                        />
                    </div>
                    <div className={styles.collum}>
                        <h1>
                            Material Necessário
                        </h1>
                        {data.programacao?.map((prog)=>(
                            <span className={styles.borderBottom} key={v4()}>
                                {prog?.materialNecessario}
                            </span>
                        ))}
                        <input
                            type='text'
                            name='materialNecessario'
                            value={currentProgramacao?.materialNecessario || ''}
                            onChange={(e) => handleFormProgramacao(e)}
                            className={`${styles.collum}`}
                        />
                    </div>
                    <div className={`${styles.collum} ${styles.width100}`}>
                        <h1>
                            Responsável
                        </h1>
                        {data.programacao?.map((prog)=>(
                            <span className={styles.borderBottom} key={v4()}>
                                {prog?.responsavel}
                            </span>
                        ))}
                        <input
                            type='text'
                            name='responsavel'
                            value={currentProgramacao?.responsavel || ''}
                            onChange={(e) => handleFormProgramacao(e)}
                            className={`${styles.collum}`}
                        />
                    </div>
                    <div className={`${styles.collum} ${styles.width100}`}>
                        <h1>
                            Add/Rem
                        </h1>
                        {data.programacao?.map((prog, idx)=>(
                            <FaMinus  
                                key={v4()}
                                size={18} 
                                className={styles.btnRemAtividade}
                                onClick={()=>removeAtividade(idx+1)} 
                                style={{height: 27}}                                   
                            />
                        ))}
                        <FaPlus
                            size={18} 
                            className={styles.btnAddAtividade}
                            onClick={addAtividade}
                            style={{height: 40}}  
                        />
                    </div>
                </div>
            </div>        
        </div>
    )
}