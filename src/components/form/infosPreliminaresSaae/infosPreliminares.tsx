'use client'
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import styles from './infosPreliminares.module.css';
import { InfosPreliminaresSaae } from '@/@types/types';
import { FaPlus, FaMinus, FaInfo } from "react-icons/fa";
import { Context } from '@/components/context/context';

export default function InfosPreliminares (){
    const context = useContext(Context);
    const [data, setData] = useState<InfosPreliminaresSaae[]>([]);
    const [showDicas, setShowDicas] = useState(false);

    const handleChange = async (e: ChangeEvent<HTMLTextAreaElement>)=>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;

        const newData = data.map((info)=>{
            if(info.item === name){
                return{
                    ...info,
                    text: value
                }
            }else{
                return info
            }
        });
        setData(newData); 
        updateContext(newData);       
    }

    const addItem = ()=>{
        setData((prev)=>{
            return [
                ...prev, 
                {
                    item: `${prev.length+1}`,
                    text: ''
                }
            ]
        })
    }
    const removeItem = (idx:string)=>{
        const filter = data.filter(infos=> infos.item !== idx)
        const rename = filter.map((infos, idx)=> {
            return{
                ...infos,
                item: `${idx+1}`
            }
        })
        setData(rename)
        updateContext(rename)
    }

    const updateContext = (newData:InfosPreliminaresSaae[])=>{
        context.setDataSaae(saae=>{
            return{
                ...saae,
                infosPreliminares: newData
            }
        });
    };

    useEffect(()=>{
        //pega as infos salvas no contexto.
        // Atualiza o contexto e define o estado local após isso
        const infosPreliminares = context.dataSaae?.infosPreliminares || []; // Dados iniciais
        setData(infosPreliminares);
    },[])

    return(
        <div className={styles.conteiner}>
            <h5>Refências: PNES item 8.1.1, 8.3.6, 8.4.1  ABNT NBR 15286</h5>
            <div className={styles.boxHead}>
                <h1>1. Informações mínimas aos participantes do evento/atividade </h1> 
                <FaInfo onClick={()=> { setShowDicas(prev=> !prev)}} title='mostrar dicas de preenchimento'/>
            </div>
            
            <div className={styles.addItem}>
                <span>Adicionar item: </span>
                <FaPlus title='dicas de preenchimento'  onClick={addItem}/>
            </div>
            {data?.map((item, idx)=>(
                <div key={item.item} className={styles.boxTextarea}>
                    <h4>Item {item.item} <FaMinus 
                        onClick={()=>removeItem((idx+1).toString())} 
                        title='remover este item' 
                        className={styles.removeItem}/></h4>                    
                    <textarea                     
                        name={item.item} 
                        value={item.text}
                        onChange={(e)=>handleChange(e)}
                    />
                </div>                
            ))}

            {showDicas ? 
            <div className={styles.modalDicas}>
                <span onClick={()=>setShowDicas(false)} className={styles.closeBtn}>X</span>
                <p>
                    Dicas de preenchimento
                </p>
                <p>
                    Essas informações devem ser repassadas para todos os individuos envolvidos/interessados na atividade.
                </p>
                <ol>
                    <li>
                        Inclua inicialmente informações gerais como nome da atividade, local, data, quem está coordenando, se haverá convidados e o custo da atividade.
                    </li>
                    <li>
                        descrição das características da atividade a ser realizada, como tempo de duração, pontos e horários para alimentação e descanso, disponibilidade de água potável no percurso, entre outros.
                    </li>
                    <li>
                        de ênfase na descrição das características do local onde serão realizadas as atividades.
                    </li>
                    <li>
                        incluir orientações sobre o desenvolvimento e manutenção de um ambiente seguro e condutas a serem adotadas durante toda atividade escoteira.
                    </li>
                    <li>
                        procedimentos de mínimo impacto relativos à atividade que será realizada, as características ambientais dos locais de prática, os principais impactos ambientais e socioculturais negativos potenciais e as medidas de minimização, mitigação e compensação correspondentes.
                    </li>
                    <li>
                        como receber, reagir e documentar adequadamente qualquer denúncia de abuso que afete jovens ou adultos.
                    </li>
                    <li>
                        procedimentos de mínimo impacto relativos à atividade que será realizada, as características ambientais dos locais de prática, os principais impactos ambientais e socioculturais negativos potenciais e as medidas de minimização, mitigação e compensação correspondentes.
                    </li>
                    <li>
                        dê ênfase na descrição dos cuidados com a segurança e as medidas a serem tomadas no caso de emergências.
                    </li>
                    <li>
                        dê ênfase na identificação dos escotistas envolvidos, sua formação escoteira e função;
                    </li>
                    <li>
                        de ênfase às regras de uso específico da área, incluindo regulamentos e valores extras não incluso na taxa de inscrição quando houver;
                    </li>
                    <li>
                        cuidados necessários relativos à exposição ao sol, à chuva, ao frio e outras precauções, incluindo as orientações acerca do uso de protetor solar, capa de chuva, agasalho e repelente de insetos;
                    </li>
                    <li>
                        tipo do percurso a ser realizado e detalhes particulares do percurso. Ou tipo de ambiente e suas particularidades se tratando de acampamentos ou outras atividades na natureza.
                    </li>
                    <li>
                        pontos de apoio durante o percurso.
                    </li>
                    <li>
                        equipamentos, alimentos e bebidas necessários que o cliente deve levar para a atividade que não sejam fornecidos pelo responsável pela operação;
                    </li>
                    <li>
                        <b>Preenchimento padrão recomendado:</b> Os participantes nunca devem guardar ou prometer guardar segredos nos quais o bem-estar seu ou de outra pessoa está comprometido. Entretanto, toda a informação relacionada a abusos, é ser considerada confidencial. Denuncie https://www.escoteiros.org.br/canal-de-conduta/ ou ainda diretamente a diretoria do seu grupo escoteiro.
                    </li>
                    <li>
                        <b>Preenchimento padrão recomendado:</b> Nenhuma informação pessoal dos participantes devem será transmitida a terceiros ou utilizada sem a devida autorização expressa de seus responsáveis, exceto em caso de emergência médica, policial ou por força de lei.
                    </li>
                    <li>
                        link do formulário de feedback da atividade.
                    </li>
                    <li>
                        outras informações como tema da esquete ou preenchimentos adicionais necessários na fixa do paxtu  para a atividade.
                    </li>
                </ol>
            </div>
            :null}
        </div>
    )
}