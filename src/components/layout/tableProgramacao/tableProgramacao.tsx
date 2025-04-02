import { FaMinus, FaPlus } from "react-icons/fa";
import { BsArrowDownSquareFill, BsArrowUpSquareFill } from "react-icons/bs";
import styles from './tableProgramacao.module.css';
import { ProgramacaoAtividade } from "@/@types/types";
import { dateFormat1, dateFormat2, moveItem } from "@/scripts/globais";
import { useContext, useEffect, useState } from "react";
import { Context } from "@/components/context/context";
import Mathias from "../mathias/mathias";

type Props = {
    readOnly: boolean,
    print?: boolean,
    nomeRamo?: string,
    programacao: ProgramacaoAtividade[],
    currentProgramacao: ProgramacaoAtividade,
    handleFormProgramacao: (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void,
    handleEditProgramacao: (
        e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>, 
        itemId: number,
        nomeRamo: string
    ) => void,
    addAtividade:  (nomeRamo:string) => Promise<void>,
    removeAtividade: (idx: number, nomeRamo: string) => void
}
export default function TableProgramacao({readOnly, nomeRamo, programacao, currentProgramacao, addAtividade, removeAtividade,
    handleEditProgramacao, handleFormProgramacao}:Props){
    const context = useContext(Context);
    const [showDicaDescricao, setShowDicaDescricao] = useState(false);

    const handleMoveItem = (arr: ProgramacaoAtividade[], index: number, direction: "up" | "down")=>{ 
        if(index === 0 && direction === 'up') return;
        if(index === arr.length-1 && direction === 'down') return;

        context.setDataSaae((prev)=>{
            const newArr = [...moveItem([...arr], index, direction)]; //força a atualização do estado.
            console.log('novo array', newArr)
            return{
                ...prev,
                dadosGerais:{
                    ...prev.dadosGerais,
                    programacao: newArr
                }
            }
        })
    }

    useEffect(()=>{
        console.log("programacao selecionada", programacao)
    },[programacao]);

    return (
        <>
        {/* cabeçalho da programação */}
        {nomeRamo ? 
            <div className={styles.line}>
               <div className={`${styles.collum} ${styles.width4}`}>
               <h1>Programação Ramo - {nomeRamo}</h1>
                </div> 
            </div>
        :null}
        <div className={`${styles.line}`}>
            <div className={`${styles.collum} ${styles.width1}`}>
                <h1>
                    Data
                </h1>
            </div>
            <div className={`${styles.collum} ${styles.width1}`}>
                <h1>
                    Hora
                </h1>
            </div>
            <div className={`${styles.collum} ${styles.width1}`}>
                <h1>
                    Duração
                </h1>
            </div>
            <div className={`${styles.collum} ${styles.width3}`}>
                <h1>
                    Descrição
                </h1>
            </div>
            <div className={`${styles.collum} ${styles.width2}`}>
                <h1>
                    Material Necessário
                </h1>
            </div>
            <div className={`${styles.collum} ${styles.width1}`}>
                <h1>
                    Responsável
                </h1>
            </div> 
            {!readOnly ? <h1 className={styles.headerAddRem}>
                    Add/Rem
                </h1>
            :null}
        </div>

        {/* dados adicionados à programação */}
        {programacao?.map((prog, idx, arr)=>(
            <div 
                key={idx+"progragamacao"} 
                className={`${styles.line}`}
            >
                <div className={styles.boxBtnMoves}>
                    {idx !== 0 ? <BsArrowUpSquareFill onClick={()=>handleMoveItem(programacao, idx, 'up')}/> : null}
                    {idx !== arr.length-1  ? <BsArrowDownSquareFill onClick={()=>handleMoveItem(programacao, idx, 'down')}/> : null}
                </div>
                <div className={`${styles.collum} ${styles.width1}`}>
                    {!readOnly ? <input
                        type="date"
                        name='data'
                        value={dateFormat1(prog?.data) || ''}
                        onChange={(e)=>handleEditProgramacao(e, prog.id, nomeRamo)}
                    /> : <p>{dateFormat2(prog?.data) || ''}</p>}
                </div>
                <div  className={`${styles.collum} ${styles.width1}`}>
                    {!readOnly ? <input
                        name='hora'
                        value={prog?.hora  || ''}
                        onChange={(e)=>handleEditProgramacao(e, prog.id, nomeRamo)}
                    /> : <p>{prog?.hora  || ''}</p>}
                </div>
                <div className={`${styles.collum} ${styles.width1}`}>
                    {!readOnly ? <input
                        name='duracao' 
                        value={prog?.duracao || ''}
                        onChange={(e)=>handleEditProgramacao(e, prog.id, nomeRamo)}
                    />: <p>{prog?.duracao || ''}</p>}
                </div>
                <div className={`${styles.collum} ${styles.width3}`}>
                    {!readOnly ? <textarea 
                        name='descricao'
                        value={prog?.descricao || ''}
                        readOnly={readOnly}
                        onChange={(e)=>handleEditProgramacao(e, prog.id, nomeRamo)}
                    />: <p>{prog?.descricao || ''}</p>}
                </div>
                <div className={`${styles.collum} ${styles.width2}`}>
                    {!readOnly ? <textarea
                        name='materialNecessario'
                        value={prog?.materialNecessario || ''}
                        onChange={(e)=>handleEditProgramacao(e, prog.id, nomeRamo)}
                    /> : <p>{prog?.materialNecessario || ''}</p>}
                </div>
                <div className={`${styles.collum} ${styles.width1}`}>
                    {!readOnly ? <textarea
                        name='responsavel' 
                        value={prog?.responsavel || ''}
                        onChange={(e)=>handleEditProgramacao(e, prog.id, nomeRamo)}
                        className={styles.inputProgramacao}
                    /> : <p>{prog?.responsavel || ''}</p>}
                </div>
                {!readOnly ?
                    <FaMinus  
                        size={18} 
                        className={`${styles.removeProg}`}
                        onClick={()=>removeAtividade(idx+1, nomeRamo)} 
                    />
                :null}
            </div>
        ))}

        {/* inputs da programação */}
        {!readOnly ? 
            <div className={`${styles.line}`}>
                <div className={`${styles.collum} ${styles.width1}`}>
                    <input
                        type='date'
                        name='data'
                        value={dateFormat1(currentProgramacao?.data) || ''}
                        onChange={(e) => handleFormProgramacao(e)}
                        className={`${styles.collum} ${styles.width120}`}
                        readOnly={readOnly}
                    />
                </div>
                <div className={`${styles.collum} ${styles.width1}`}>
                    <input
                        type='text'
                        name='hora'
                        value={currentProgramacao?.hora || ''}
                        onChange={(e) => handleFormProgramacao(e)}
                        className={`${styles.collum} ${styles.width1} ${styles.textAlingCenter}`}
                        readOnly={readOnly}
                    />
                </div>
                <div className={`${styles.collum} ${styles.width1}`}>
                    <input
                        type='text'
                        name='duracao'
                        value={currentProgramacao?.duracao || ''}
                        onChange={(e) => handleFormProgramacao(e)}
                        className={`${styles.collum} ${styles.textAlingCenter}`}
                        readOnly={readOnly}
                    />
                </div>
                <div 
                    className={`${styles.collum} ${styles.width3}`}
                    onMouseEnter={()=>setShowDicaDescricao(true)}
                    onMouseLeave={()=>setShowDicaDescricao(false)}
                >
                    <textarea
                        name='descricao'
                        value={currentProgramacao?.descricao || ''}
                        onChange={(e) => handleFormProgramacao(e)}
                        className={`${styles.collum} ${styles.width260}`}
                        readOnly={readOnly}
                    />
                    <Mathias 
                        show={showDicaDescricao} 
                        text="Em descrições longas, inicie ela com uma palavra chave seguida de 'traço' para facilitar sua gestão de risco."
                        customClass={['center']}
                    />
                </div>
                <div className={`${styles.collum} ${styles.width2}`}>
                    <input
                        type='text'
                        name='materialNecessario'
                        value={currentProgramacao?.materialNecessario || ''}
                        onChange={(e) => handleFormProgramacao(e)}
                        className={`${styles.collum}`}
                        readOnly={readOnly}
                    />
                </div>
                <div className={`${styles.collum} ${styles.width1}`}>
                    <input
                        type='text'
                        name='responsavel'
                        value={currentProgramacao?.responsavel || ''}
                        onChange={(e) => handleFormProgramacao(e)}
                        className={`${styles.collum}`}
                        readOnly={readOnly}
                    />
                </div>
                <FaPlus
                    size={18} 
                    className={styles.addProg}
                    onClick={()=>addAtividade(nomeRamo)}
                />
            </div>
        :null}
        </>
    )
}