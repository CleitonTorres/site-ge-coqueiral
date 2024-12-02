'use client'
import Section from "@/components/layout/sections/section";
import styles from './page.module.css';
import { ChangeEvent, useState } from "react";
import { DataBaseSaae } from "@/@types/types";
import Box from "@/components/layout/box/box";

type PropsPartes = {
    label: string,
    partesInteressadas: string[],
    handleRemoveTag: (idx:number)=>void,
    inputValue: string,
    handleInputChange: (e: ChangeEvent<HTMLTextAreaElement>)=>void,
    handleKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>)=>void
}
const PartesInteressas = ({label, inputValue, partesInteressadas, handleRemoveTag, handleInputChange, handleKeyPress}:PropsPartes)=>{
    return (
        <div className={styles.boxInput}>
            <span>{label}</span>
            
            <textarea
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                placeholder="Digite e pressione Enter ou vírgula"
            />
            <div style={{
                display: 'flex', 
                flexDirection: 'row',
                flexWrap: 'wrap',
            }}>
                {partesInteressadas.map((tag, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: "space-between",
                            alignItems: 'center',
                            padding: '4px 8px',
                            backgroundColor: '#e0e0e0',
                            borderRadius: '4px',
                            fontSize: '14px',
                            height: '30px',
                            width: 'auto',
                            maxWidth: '100px',
                            margin: '3px'
                        }}
                    >
                        {tag}
                        <button
                            onClick={(e) => {
                                e.preventDefault(); 
                                handleRemoveTag(index)
                            }}
                            style={{
                                marginLeft: '4px',
                                background: 'none',
                                border: 'none',
                                color: 'red',
                                cursor: 'pointer',
                                fontSize: '12px',
                            }}
                        >
                            x
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Page(){
    const [data, setData] = useState({} as DataBaseSaae);
    const [inicioFim, setInicioFim] = useState(false);
    
    const [inputValuePartesInteressadas, setInputValuePartesInteressadas] = useState('');
    const [inputValueODS, setInputValueODSs] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>)=>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setData((prev)=>{
            if(name === 'inicio'){
                return{
                    ...prev,
                    abrangencia: {
                        ...prev.abrangencia,
                        inicio: value
                    }
                }
            }else if(name === 'fim'){
                return{
                    ...prev,
                    abrangencia: {
                        ...prev.abrangencia,
                        fim: value
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
    const handleChangeEnderecoInit = (e: ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;

        setData((prev)=>{
            return{
                ...prev,
                localInicio:{
                    ...prev.localInicio,
                    [name]: value
                }
            }
        })
    }
    const handleChangeEnderecoFim = (e: ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault()
        const name = e.target.name;
        const value = e.target.value;

        setData((prev)=>{
            return{
                ...prev,
                localFim:{
                    ...prev.localFim,
                    [name]: value
                }
            }
        })
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();

            // Adicionar o valor ao array se não for vazio e não for duplicado
            const trimmedValue = inputValuePartesInteressadas.trim();
            if (trimmedValue && !data.partesInteressadas?.includes(trimmedValue)) {
                setData((prev)=> {
                    const newArray = prev.partesInteressadas ?[
                        ...prev.partesInteressadas,
                        trimmedValue
                    ] : [trimmedValue];

                    return {
                        ...prev,
                        partesInteressadas: newArray
                    }
                });
            }
            setInputValuePartesInteressadas(''); // Limpa o input
        }
    };
    const handleKeyPressODS = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();

            // Adicionar o valor ao array se não for vazio e não for duplicado
            const trimmedValue = inputValueODS.trim();
            if (trimmedValue && !data.ods?.includes(trimmedValue)) {
                setData((prev)=> {
                    const newArray = prev.ods ?[
                        ...prev.ods,
                        trimmedValue
                    ] : [trimmedValue];

                    return {
                        ...prev,
                        ods: newArray
                    }
                });
            }
            setInputValueODSs(''); // Limpa o input
        }
    };

    const handleRemoveTag = (index: number) => {
        setData((prev)=>{
            const newArray = prev.partesInteressadas.filter((_, i) => i !== index)
            return {
                ...prev,
                partesInteressadas: newArray
            }
        });
    };
    const handleRemoveTagODS = (index: number) => {
        setData((prev)=>{
            const newArray = prev.ods.filter((_, i) => i !== index)
            return {
                ...prev,
                ods: newArray
            }
        });
    };

    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <h1 className={styles.title}>Database SAAE</h1>
            <div className={styles.conteiner}>
                <div className={styles.subConteiner}>
                    <p className={styles.paragraph}>
                        <b>Escopo</b> é o que define, de forma clara, a que o sistema de gestão de segurança se refere e qual será sua abrangência. A Norma cita claramente que a organização deve determinar os “limites e aplicabilidade do sistema de gestão da segurança”. Isto quer dizer que, para implementar o sistema de gestão de segurança, a organização deve definir previamente onde o sistema de gestão de segurança irá atuar, promovendo um processo de gestão que garanta a segurança das atividades da organização.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        <b>Abrangência do Escopo</b>. Ou seja, em que momento a gestão da segurança deve começar e em que momento ela terminará. A ABNT NBR ISO 21101 requer que este requisito esteja disponível de forma documentada.
                        O formato deste documento será aquele que melhor atender à necessidade da organização. Texto, tópico e tabela são algumas das formas de se expressar a mesma informação.
                    </p>
                    <br />
                    <p className={styles.paragraph}>
                        <b>Atividade</b> de turismo de aventura se refere especificamente ao tipo de atividade ofertada, como, por exemplo, turismo fora de estrada ou turismo com atividades de rafting operadas no Jalapão.
                    </p>
                </div>
                <form action="">
                    <div className={styles.boxInput}>
                        <label htmlFor="produto" title="Quais os produtos são oferecidas(nome da atividade)?">
                            Produto
                        </label>
                        <input 
                            type="text" 
                            name="produto" 
                            value={data.produto || ''} 
                            onChange={(e)=>handleChange(e)}
                        />
                    </div>
                    <div className={styles.boxInput}>
                        <label htmlFor="atividade" title="A que atividade de turismo de aventura está associada?">
                            Atividade
                        </label>
                        <input 
                            type="text" 
                            name="atividade" 
                            value={data.atividade || ''} 
                            onChange={(e)=>handleChange(e)}
                        />
                    </div>

                    <PartesInteressas 
                        label='Partes Interessadas'
                        inputValue={inputValuePartesInteressadas || ''}
                        partesInteressadas={data?.partesInteressadas || []}
                        handleRemoveTag={handleRemoveTag}
                        handleKeyPress={handleKeyPress}
                        handleInputChange={(e)=>setInputValuePartesInteressadas(e.target.value)}
                    />

                    <PartesInteressas 
                        label='ODSs'
                        inputValue={inputValueODS || ''}
                        partesInteressadas={data?.ods || []}
                        handleRemoveTag={handleRemoveTagODS}
                        handleKeyPress={handleKeyPressODS}
                        handleInputChange={(e)=>setInputValueODSs(e.target.value)}
                    />

                    <div className={styles.boxInput}>
                        <label htmlFor="atividade" title="">
                            Abrangência início
                        </label>
                        <input 
                            type="text" 
                            name="inicio" 
                            value={data.abrangencia?.inicio || ''} 
                            onChange={(e)=>handleChange(e)}
                        />
                    </div>
                    <div className={styles.boxInput}>
                        <label htmlFor="atividade" title="">
                            Abrangência fim
                        </label>
                        <input 
                            type="text" 
                            name="fim" 
                            value={data.abrangencia?.fim || ''} 
                            onChange={(e)=>handleChange(e)}
                        />
                    </div>

                    {/* endereço */}
                    <div className={styles.boxEndereco}>
                        
                        <div className={styles.boxCheck}>
                            <label htmlFor="produto" title="Local onde será realizada?">
                                Local início é diferente do fim?
                            </label>
                            <input 
                                type="checkbox" 
                                name="inicio-fim" 
                                onChange={(e)=>setInicioFim(e.target.checked)}
                            />
                        </div>
                        <div className={styles.enderecoConteiner}>
                            <Box customClass={['width300', 'margin10']}>
                                <h2>Local Início</h2>
                                <div className={styles.boxInput}>
                                    <label htmlFor="produto" title="Local onde será realizada?">
                                        Logradouro
                                    </label>
                                    <input 
                                        type="text" 
                                        name="logradouro" 
                                        value={data.localInicio?.logradouro || ''} 
                                        onChange={(e)=>handleChangeEnderecoInit(e)}
                                    />
                                </div>
                                <div className={styles.boxInput}>
                                    <label htmlFor="produto" title="Local onde será realizada?">
                                        Bairro
                                    </label>
                                    <input 
                                        type="text" 
                                        name="bairro" 
                                        value={data.localInicio?.bairro || ''} 
                                        onChange={(e)=>handleChangeEnderecoInit(e)}
                                    />
                                </div>
                                <div className={styles.boxInput}>
                                    <label htmlFor="produto" title="Local onde será realizada?">
                                        Município
                                    </label>
                                    <input 
                                        type="text" 
                                        name="municipio" 
                                        value={data.localInicio?.municipio || ''} 
                                        onChange={(e)=>handleChangeEnderecoInit(e)}
                                    />
                                </div>
                                <div className={styles.boxInput}>
                                    <label htmlFor="produto" title="Local onde será realizada?">
                                        Município
                                    </label>
                                    <input 
                                        type="text" 
                                        name="uf" 
                                        value={data.localInicio?.uf || ''} 
                                        onChange={(e)=>handleChangeEnderecoInit(e)}
                                    />
                                </div>
                                <div className={styles.boxInput}>
                                    <label htmlFor="produto" title="Local onde será realizada?">
                                        CEP
                                    </label>
                                    <input 
                                        type="text" 
                                        name="cep" 
                                        value={data.localInicio?.cep || ''} 
                                        onChange={(e)=>handleChangeEnderecoInit(e)}
                                    />
                                </div>
                            </Box>
                            {inicioFim ?
                                <Box customClass={['width300', 'margin10']}>
                                <h2>Local Termino</h2>
                                <div className={styles.boxInput}>
                                    <label htmlFor="produto" title="Local onde será realizada?">
                                        Logradouro
                                    </label>
                                    <input 
                                        type="text" 
                                        name="logradouro" 
                                        value={data.localFim?.logradouro || ''} 
                                        onChange={(e)=>handleChangeEnderecoFim(e)}
                                    />
                                </div>
                                <div className={styles.boxInput}>
                                    <label htmlFor="produto" title="Local onde terminará a atividade?">
                                        Bairro
                                    </label>
                                    <input 
                                        type="text" 
                                        name="bairro" 
                                        value={data.localFim?.bairro || ''} 
                                        onChange={(e)=>handleChangeEnderecoFim(e)}
                                    />
                                </div>
                                <div className={styles.boxInput}>
                                    <label htmlFor="produto" title="Local onde terminará a atividade?">
                                        Município
                                    </label>
                                    <input 
                                        type="text" 
                                        name="municipio" 
                                        value={data.localFim?.municipio || ''} 
                                        onChange={(e)=>handleChangeEnderecoFim(e)}
                                    />
                                </div>
                                <div className={styles.boxInput}>
                                    <label htmlFor="produto" title="Local onde terminará a atividade?">
                                        UF
                                    </label>
                                    <input 
                                        type="text" 
                                        name="uf" 
                                        value={data.localFim?.uf || ''} 
                                        onChange={(e)=>handleChangeEnderecoFim(e)}
                                    />
                                </div>
                                <div className={styles.boxInput}>
                                    <label htmlFor="produto" title="Local onde terminará a atividade?">
                                        CEP
                                    </label>
                                    <input 
                                        type="text" 
                                        name="cep" 
                                        value={data.localFim?.cep || ''} 
                                        onChange={(e)=>handleChangeEnderecoFim(e)}
                                    />
                                </div>
                                </Box>
                            :null}
                        </div>
                    </div>
                </form>         
            </div>
        </Section>
    )
}