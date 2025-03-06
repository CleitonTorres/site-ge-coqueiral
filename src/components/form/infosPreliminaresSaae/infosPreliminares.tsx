'use client'
import { ChangeEvent, useContext, useState } from 'react';
import styles from './infosPreliminares.module.css';
import { FaPlus, FaMinus, FaInfo } from "react-icons/fa";
import { BsBagPlus } from "react-icons/bs";
import { Context } from '@/components/context/context';
import { dateFormat2, printComponent } from '@/scripts/globais';
import { InfosPreliminaresSaae } from '@/@types/types';
import { usePathname } from "next/navigation";

type Props = {
    readOnly: boolean,
    localData: InfosPreliminaresSaae[],
    print?: boolean
}

/**
  * Componente que gerencia as informações preliminares de uma SAAE.
  * @param {boolean} readOnly - Define se o componente é somente leitura.
  * @param {InfosPreliminaresSaae[]} localData - Define se o componente é somente leitura.
  * @param {boolean} print - Define se o componente é para visualização de impressão.
  * @returns {JSX.Element} Retorna o JSX com as informações preliminares.
 */
export default function InfosPreliminares ({readOnly, localData, print}:Props){
    const context = useContext(Context);
    const pathname = usePathname();

    // Verifica se a URL contém "/printer"
    const isPrinterRoute = pathname.includes("/printer");

    const [showDicas, setShowDicas] = useState(false);

    const handleChange = async (e: ChangeEvent<HTMLTextAreaElement>)=>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        
        context.setDataSaae((prev)=>{
            const newData = prev.infosPreliminares.map((info)=>{
                if(info.item === name){
                    return{
                        ...info,
                        text: value
                    }
                }else{
                    return info
                }
            });

            return {
                ...prev,
                infosPreliminares: newData
            }
        });
    }
    const addItem = ()=>{
        context.setDataSaae((prev)=>{
            return{ 
                ...prev,
                infosPreliminares:[
                    ...prev.infosPreliminares, 
                    {
                        item: `${prev.infosPreliminares.length+1}`,
                        text: ''
                    }
                ]
            }
        })
    }
    const addDefaultItens = ()=>{
        //pega as infos salvas no contexto.
        // Atualiza o contexto e define o estado local após isso
        context.setDataSaae((prev)=>{
            let newData = prev.infosPreliminares || [];
            const dadosGerais = prev.dadosGerais;
            newData = [
                ...newData,
                {
                    item: `${newData.length+1}`,
                    text: `A coordenação do evento/atividade ${dadosGerais?.nomeAtividade || '...'} torna público as informações preliminares e de segurança adotadas pela coordenação ou que devem ser adotadas pelos participantes.
    O evento/atividade vai acontecer das ${dadosGerais.horaInicio || ''} do dia ${dateFormat2(dadosGerais?.dataInicio) || ''}, ${dadosGerais?.dataFim ? `às ${dadosGerais.horaFim || ''} do dia ${dateFormat2(dadosGerais.dataFim)}` : ''} no local ${dadosGerais?.localInicio?.logradouro || ''}, ${dadosGerais?.localInicio?.bairro || ''}, ${dadosGerais?.localInicio?.municipio || ''}, ${dadosGerais?.localInicio?.municipio || ''}, ${dadosGerais?.localInicio?.cep || ''}, coordenadas ${dadosGerais?.localInicio?.coordenadas?.lat || ''}, ${dadosGerais?.localInicio.coordenadas?.long || ''}.`
                },
                {
                    item: `${newData.length+2}`,
                    text: `O evento/atividade será direcionada ao(s) ramo(s) ${dadosGerais?.ramo?.map((r, i, a)=> {
                        if(i+1 === a.length) return ` e ${r}, `;
                        else return `${r}, `
                    }) || '...'} e terá o custo de ${dadosGerais?.custoIndividual || '...'}.`
                },
                {
                    item: `${newData.length+3}`,
                    text: `Os participantes nunca devem guardar ou prometer guardar segredos nos quais o bem-estar seu ou de outra pessoa está comprometido. Entretanto, toda a informação relacionada a abusos, é ser considerada confidencial. Denuncie https://www.escoteiros.org.br/canal-de-conduta/ ou ainda diretamente a diretoria do seu grupo escoteiro.`
                },
                {
                    item: `${newData.length+4}`,
                    text: `Nenhuma informação pessoal dos participantes devem será transmitida a terceiros ou utilizada sem a devida autorização expressa de seus responsáveis, exceto em caso de emergência médica, policial ou por força de lei.`
                }
            ];

            return{
                ...prev,
                infosPreliminares: newData
            }
        })
    }
    const removeItem = (idx:string)=>{
        context.setDataSaae((prev)=>{
            const filter = prev.infosPreliminares.filter(infos=> infos.item !== idx)
            const rename = filter.map((infos, idx)=> {
                return{
                    ...infos,
                    item: `${idx+1}`
                }
            });
            return{
                ...prev,
                infosPreliminares: rename
            }
        })
    }

    return(
        <div 
            className={`${styles.conteiner} ${print ? styles.print : undefined}`} 
            style={{marginTop: readOnly ? '30px' : '0px'}}
        >
            <div className={`${styles.boxHead} ${styles.bgGreen}`}>
                <h5>Refências: PNES item 8.1.1, 8.3.6, 8.4.1  ABNT NBR 15286</h5>
                <h1>2. Informações mínimas aos participantes do evento/atividade </h1> 
                {!print ? 
                    <FaInfo onClick={()=> { setShowDicas(prev=> !prev)}} title='mostrar dicas de preenchimento'/>
                :null}
            </div>

            {!isPrinterRoute ? <span 
                style={{cursor:'pointer', textDecoration: 'underline'}}
                onClick={()=>{
                    printComponent(localData, 'print-data-infosPreliminares');
                }}
            >
                Imprimir Infos. Preliminares
            </span> : null}

            {!readOnly ? 
                <div className={styles.addItem}>
                    <span>Adicionar informações básicas: </span>
                    <BsBagPlus title='infos básicas'  onClick={addDefaultItens}/>
                </div>
            :null}
            {!readOnly ?
                <div className={styles.addItem}>
                    <span>Adicionar item: </span>
                    <FaPlus title='dicas de preenchimento'  onClick={addItem}/>
                </div>
            :null}
            {localData?.map((item, idx)=>(
                <div key={item.item} className={styles.boxTextarea}>
                    <h4>
                        {!print ? 'Item' : <b>-</b>} {item.item} 
                        {!readOnly ? 
                        <FaMinus 
                            onClick={()=>removeItem((idx+1).toString())} 
                            title='remover este item' 
                            className={styles.removeItem}
                        />
                        :null} 
                    </h4>         
                    <textarea                     
                        name={item.item} 
                        value={item.text}
                        onChange={(e)=>handleChange(e)}
                        readOnly={readOnly}
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
                        - Inclua inicialmente informações gerais como nome da atividade, local, data, quem está coordenando, se haverá convidados e o custo da atividade.
                    </li>
                    <li>
                        - descrição das características da atividade a ser realizada, como tempo de duração, pontos e horários para alimentação e descanso, disponibilidade de água potável no percurso, entre outros.
                    </li>
                    <li>
                        - de ênfase na descrição das características do local onde serão realizadas as atividades.
                    </li>
                    <li>
                        - incluir orientações sobre o desenvolvimento e manutenção de um ambiente seguro e condutas a serem adotadas durante toda atividade escoteira.
                    </li>
                    <li>
                        - procedimentos de mínimo impacto relativos à atividade que será realizada, as características ambientais dos locais de prática, os principais impactos ambientais e socioculturais negativos potenciais e as medidas de minimização, mitigação e compensação correspondentes.
                    </li>
                    <li>
                        - como receber, reagir e documentar adequadamente qualquer denúncia de abuso que afete jovens ou adultos.
                    </li>
                    <li>
                        - procedimentos de mínimo impacto relativos à atividade que será realizada, as características ambientais dos locais de prática, os principais impactos ambientais e socioculturais negativos potenciais e as medidas de minimização, mitigação e compensação correspondentes.
                    </li>
                    <li>
                        - dê ênfase na descrição dos cuidados com a segurança e as medidas a serem tomadas no caso de emergências.
                    </li>
                    <li>
                        - dê ênfase na identificação dos escotistas envolvidos, sua formação escoteira e função;
                    </li>
                    <li>
                        - de ênfase às regras de uso específico da área, incluindo regulamentos e valores extras não incluso na taxa de inscrição quando houver;
                    </li>
                    <li>
                        - cuidados necessários relativos à exposição ao sol, à chuva, ao frio e outras precauções, incluindo as orientações acerca do uso de protetor solar, capa de chuva, agasalho e repelente de insetos;
                    </li>
                    <li>
                        - tipo do percurso a ser realizado e detalhes particulares do percurso. Ou tipo de ambiente e suas particularidades se tratando de acampamentos ou outras atividades na natureza.
                    </li>
                    <li>
                        - pontos de apoio durante o percurso.
                    </li>
                    <li>
                        - equipamentos, alimentos e bebidas necessários que o cliente deve levar para a atividade que não sejam fornecidos pelo responsável pela operação;
                    </li>
                    <li>
                        - <b>Preenchimento padrão recomendado:</b> Os participantes nunca devem guardar ou prometer guardar segredos nos quais o bem-estar seu ou de outra pessoa está comprometido. Entretanto, toda a informação relacionada a abusos, é ser considerada confidencial. Denuncie https://www.escoteiros.org.br/canal-de-conduta/ ou ainda diretamente a diretoria do seu grupo escoteiro.
                    </li>
                    <li>
                        - <b>Preenchimento padrão recomendado:</b> Nenhuma informação pessoal dos participantes devem será transmitida a terceiros ou utilizada sem a devida autorização expressa de seus responsáveis, exceto em caso de emergência médica, policial ou por força de lei.
                    </li>
                    <li>
                        - link do formulário de feedback da atividade.
                    </li>
                    <li>
                        - outras informações como tema da esquete ou preenchimentos adicionais necessários na fixa do paxtu  para a atividade.
                    </li>
                </ol>
            </div>
            :null}
        </div>
    )
}