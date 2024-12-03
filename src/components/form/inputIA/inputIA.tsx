'use client'
import { ChangeEvent, FocusEvent, useState } from 'react';
import axios from 'axios';
import { IADataForm } from '@/@types/types';
import styles from './inputIA.module.css';
import { v4 } from 'uuid';

const ActivityForm = () => {
    const [atividadeCorrente, setAtividadeCorrente] = useState({} as IADataForm);

    const [inputForm, setInputForm] = useState<IADataForm[]>([]);
    const [loading, setLoading] = useState(false);

    const handleForm = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>)=>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;

        setAtividadeCorrente((prev)=>{
            return{
                ...prev,
                [name]: value
            }
        })
    }

  const handleSubmit = async (e: FocusEvent<HTMLTextAreaElement, Element>) => {
    e.preventDefault();
    return;

    if(!atividadeCorrente.atividade) return;

    setLoading(true);
    try {
        const result = await axios.post(`${process.env.NEXT_PUBLIC_URL_SERVICES}`, { 
                input: atividadeCorrente.atividade,
                service: 'iaSaae'
            },{
            headers:{
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTORIZATION}`
            }
        });

        console.log(result.data);
        
        if(typeof result.data ===  'object'){
            throw new Error("Ocorreu um erro ao tentar gerar os dados");
        }
        const data = result.data as IADataForm[];

        setInputForm((prev)=>{
            if(!prev) return [];

            return[
                ...prev,
                ...data
            ]
        });
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      alert("Ocorreu um erro ao gerar dados!")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.conteiner}>
        <h2>Informe a atividade para obter dados de controle operacional:</h2>
      
        <div className={styles.table}>
          <div className={styles.linhHead}>
            <h1 className={styles.collum}>
                Etapa do Evento/Atividade
            </h1>
            <h1 className={styles.collum}>
                Perigos
            </h1>
            <h1 className={styles.collum}>
                Danos
            </h1>
            <h1 className={styles.collum}>
                Controle Operacional
            </h1>
            <h1 className={styles.collum}>
                Ações mitigadoras
            </h1>
            <h1 className={styles.collum} title='Probabilidade do perigo ocorrer'>
                Probabilidade
            </h1>
            <h1 className={styles.collum} title='Consequência caso o perigo ocorra'>
                Consequência
            </h1>
          </div>
          <div className={styles.body}>
            <div className={styles.line}>
                <div className={styles.boxInput}>
                    {loading ? <span>gerando dados</span> : null}
                    <textarea
                        name='atividade'
                        value={atividadeCorrente?.atividade || ''}
                        onChange={(e) => handleForm(e)}
                        onBlur={(e)=>handleSubmit(e)}
                        placeholder="Exemplo: remada em caiaque"
                        className={`${styles.collum} ${styles.input}`}
                    />
                </div>                    
                <textarea
                    name='perigo'
                    value={atividadeCorrente?.perigo || ''}
                    onChange={(e) => handleForm(e)}
                    placeholder="Exemplo: remada em caiaque"
                    className={`${styles.collum} ${styles.input}`}
                />
                <textarea
                    name='danos'
                    value={atividadeCorrente?.danos || ''}
                    onChange={(e) => handleForm(e)}
                    placeholder="Exemplo: remada em caiaque"
                    className={`${styles.collum} ${styles.input}`}
                />
                <textarea
                    name='controleOperacional'
                    value={atividadeCorrente?.controleOperacional || ''}
                    onChange={(e) => handleForm(e)}
                    placeholder="Exemplo: remada em caiaque"
                    className={`${styles.collum} ${styles.input}`}
                />
                <textarea
                    name='acoesMitigadoras'
                    value={atividadeCorrente?.acoesMitigadoras || ''}
                    onChange={(e) => handleForm(e)}
                    placeholder="Exemplo: remada em caiaque"
                    className={`${styles.collum} ${styles.input}`}
                />
                <select
                    name='probabilidade'
                    value={atividadeCorrente?.probabilidade || ''}
                    onChange={(e) => handleForm(e)}
                    className={`${styles.collum} ${styles.input}`}
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <select
                    name='consequencia'
                    value={atividadeCorrente?.consequencia || ''}
                    onChange={(e) => handleForm(e)}
                    className={`${styles.collum} ${styles.input}`}
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            {inputForm?.map((item)=>(
                <div className={styles.line} key={v4()}>
                    <span className={styles.collum}>{item?.atividade}</span>                 
                    <span className={styles.collum}>{item?.perigo}</span>
                    <span className={styles.collum}>{item?.danos}</span>
                    <span className={styles.collum}>{item?.controleOperacional}</span>
                    <span className={styles.collum}>{item?.acoesMitigadoras}</span>
                    <span className={styles.collum}>{item?.probabilidade}</span>
                    <span className={styles.collum}>{item?.consequencia}</span>
                </div>
            ))}
          </div>
        </div>
    </div>
  );
};

export default ActivityForm;
