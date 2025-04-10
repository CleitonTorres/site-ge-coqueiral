'use client';
import { Feedbacks, QuestoesVariadas } from '@/@types/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './formFeedbacks.module.css';
import Botton from '../botton/botton';
import LoadIcon from '@/components/layout/loadIcon/loadIcon';

type FeedbackFormProps = {
  idSaae: string; // Lista de atividades disponíveis
  onSubmit: (data: Feedbacks) => Promise<boolean>; // Função de envio do formulário
};

export default function FeedbackForm({ idSaae, onSubmit }: FeedbackFormProps) {
    const [form, setForm] = useState({
        nomeAtividade:'',
        dataAtividade:'',
        local: '',
        participante: '',
        dataFeedback: '',
        avaliacao: 3,
        pontoAlto: '',
        emailParticipante: '',
        tipoParticipante: 'Jovem',
        melhoria: '',
        seguro: '',
        comentarios: '',
        questoesVariadas: []
    } as Feedbacks);

    const searchSaae = async()=>{
        try{
            const resp = await axios.get(`${process.env.NEXT_PUBLIC_URL_SERVICES}`,{
                params:{
                    service: 'getSaaeById',
                    idSaae: idSaae
                },
                headers:{
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTORIZATION}`
                }
            });
            if(resp.status === 200){
                console.log(resp.data);
                const data = resp.data as  {
                    nomeAtividade: string,
                    dataAtividade: string,
                    local: string,
                    questoesVariadas: QuestoesVariadas[]
                };
                setForm(prev => ({ 
                    ...prev, 
                    nomeAtividade: data?.nomeAtividade,
                    dataAtividade: data.dataAtividade,
                    local: data.local,
                    questoesVariadas: data.questoesVariadas || []
                }));
            }else{
                throw new Error('Erro ao buscar dados do SAAE');
            }
        }catch(err){
            console.error(err);
            alert('Erro ao buscar dados do SAAE');}
    }
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
        idx?: number, 
        valor?: number
    ) => {
        const { name, value } = e.target;
        if(name.includes('questoesVariadas')){
            setForm(prev=>{
                const newArray = prev.questoesVariadas.map((i, idxI)=>{
                    if(idxI === idx){
                        return{
                            ...i,
                            resposta: valor
                        }
                    }else{
                        return i
                    }
                })
                return{
                    ...prev,
                    questoesVariadas: newArray
                }
            })
        }else{
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!form.pontoAlto || !form.melhoria || !form.seguro || !form.avaliacao) return alert('Preencha todos os campos obrigatórios!');
        await onSubmit({...form, dataFeedback: new Date()});
        // if(resp) setForm({} as Feedbacks);
    };

    useEffect(()=>{
        searchSaae();
    },[]);

    if(form.nomeAtividade === '') return (
    <div style={{
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        height: '100vh',
        paddingTop: '50px',
    }}>
        <LoadIcon showHide /> <p>Carregando...</p>
    </div>);

    return (
        <form 
            onSubmit={handleSubmit} 
            className={styles.formFeedback}
        >
            <p>
                Dê seu feedback sobre a atividade {form.nomeAtividade} realizada em {form.dataAtividade} no local {form.local}.
            </p>

            <label className={styles.box}>
                Seu nome:
                <input 
                    type="text" 
                    name="participante" 
                    min={1} max={5} 
                    value={form.participante || ''} 
                    onChange={handleChange} 
                />
            </label>

            <label className={styles.box}>
                Seu e-mail:
                <input 
                    type="email" 
                    name="emailParticipante" 
                    value={form.emailParticipante || ''} 
                    onChange={handleChange} 
                />
            </label>

            <label className={styles.box}>
                Qual sua ocupação neste atividade?
                <select 
                    name="tipoParticipante" 
                    value={form.tipoParticipante || ''} 
                    onChange={handleChange} 
                    required
                >
                <option value="">Escolha</option>
                <option value="Jovem">Jovem</option>
                <option value="Escotista">Escotista</option>
                <option value="Pai">Pai</option>
                <option value="Mãe">Mãe</option>
                <option value="Responsável">Responsável</option>
                <option value="Staff">Staff</option>
                <option value="Outros">Outros</option>
                </select>
            </label>

            <label className={styles.box}>
                Avaliação geral (1 a 5), o que achou do evento?
                <input 
                    type="number" 
                    name="avaliacao" 
                    min={1} max={5} 
                    value={form.avaliacao || ''} 
                    onChange={handleChange} 
                />
            </label>

            {form.questoesVariadas?.map((idSaae, idx)=>(
                <div className={`${styles.box}`} key={idx+'asks'}>
                    {idSaae.pergunta}
                    <div className={styles.flexRow}>
                        {[1, 2, 3, 4, 5].map((v, idxV)=> (
                            <label 
                                className={`${styles.box}`}
                                key={'input'+idxV}
                            >
                                {v}
                                <input 
                                    className={styles.radio}
                                    type="radio" 
                                    name={`questoesVariadas-${idx}`} 
                                    value={v} 
                                    onChange={(e)=>handleChange(e, idx, v)} 
                                />
                            </label>
                        ))}
                    </div>
                </div>
            ))}

            <div className={styles.box}>
                <textarea                 
                    name="pontoAlto" 
                    placeholder="Qual foi o ponto alto da atividade?" 
                    value={form.pontoAlto || ''} 
                    onChange={handleChange} 
                />
            </div>

            <div className={styles.box}>
                <textarea 
                    name="melhoria" 
                    placeholder="O que pode ser melhorado?" 
                    value={form.melhoria || ''} 
                    onChange={handleChange} 
                />
            </div>

            <label className={styles.box}>
                Você se sentiu seguro?
                <select name="seguro" value={form.seguro || ''} onChange={handleChange} required>
                <option value="">Escolha</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
                </select>
            </label>

            <div className={styles.box}>
                <textarea 
                    className={styles.box}
                    name="comentarios" 
                    placeholder="Comentários adicionais" 
                    value={form.comentarios || ''} 
                    onChange={handleChange} 
                />
            </div>  

            <label className={styles.box}>
                Aceito que esse feedback seja utilizado de forma anônima para melhorar as futuras atividades.
                <input 
                    type='checkbox' 
                    name="privacidade" 
                    onChange={()=> setForm(prev => ({ ...prev, privacidade: form.privacidade === 'Sim' ? 'Não' : 'Sim' }))}
                    checked={form.privacidade === 'Sim' ? true : false}
                />
            </label>

            <Botton title='Enviar Feedback'/>
        </form>
    );
}