import { dateFormat1, dateFormat2 } from '@/scripts/globais';
import styles from './programacao.module.css';
import { ChangeEvent } from 'react';
import { ProgramacaoAtividade } from '@/@types/types';
import { FaMinus, FaPlus } from 'react-icons/fa';

type Props = {
    readOnly: boolean,
    print: boolean,
    programacao: ProgramacaoAtividade[],
    currentProgramacao: ProgramacaoAtividade,
    handleFormProgramacao: (e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void,
    handleEditProgramacao: (e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>, itemId: number) => void,
    addAtividade:  () => Promise<void>,
    removeAtividade: (idx: number) => void
}
export default function Programacao({
    readOnly, print, programacao, 
    currentProgramacao, handleFormProgramacao, 
    handleEditProgramacao, addAtividade, removeAtividade}: Props) {
  return (
    <div className={styles.conteiner}>                    
        <div className={`${styles.bgGreen}`} style={{width: '100%'}}>
            <span><b>Programação da atividade</b></span>
        </div>

        {/* cabeçalho da programação */}
        <div className={`${styles.line} ${print ? styles.print : ''}`}>
            <div className={`${styles.collum} ${styles.width1}`}>
                <h1 >
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
        {programacao?.map((prog, idx)=>(
            <div 
                key={idx+"progragamacao"} 
                className={`${styles.line} ${print ? styles.print : ''} ${styles.flexRowSpace}`}
            >
                <div className={`${styles.collum} ${styles.width1}`}>
                    {!readOnly ? <input
                        name='data'
                        value={dateFormat2(prog?.data) || ''}
                        onChange={(e)=>handleEditProgramacao(e, prog.id)}
                    /> : <p>{dateFormat2(prog?.data) || ''}</p>}
                </div>
                <div  className={`${styles.collum} ${styles.width1}`}>
                    {!readOnly ? <input
                        name='hora'
                        value={prog?.hora  || ''}
                        onChange={(e)=>handleEditProgramacao(e, prog.id)}
                    /> : <p>{prog?.hora  || ''}</p>}
                </div>
                <div className={`${styles.collum} ${styles.width1}`}>
                    {!readOnly ? <input
                        name='duracao' 
                        value={prog?.duracao || ''}
                        onChange={(e)=>handleEditProgramacao(e, prog.id)}
                    />: <p>{prog?.duracao || ''}</p>}
                </div>
                <div className={`${styles.collum} ${styles.width3}`}>
                    {!readOnly ? <textarea 
                        name='descricao'
                        value={prog?.descricao || ''}
                        readOnly={readOnly}
                        onChange={(e)=>handleEditProgramacao(e, prog.id)}
                    />: <p>{prog?.descricao || ''}</p>}
                </div>
                <div className={`${styles.collum} ${styles.width2}`}>
                    {!readOnly ? <textarea
                        name='materialNecessario'
                        value={prog?.materialNecessario || ''}
                        onChange={(e)=>handleEditProgramacao(e, prog.id)}
                    /> : <p>{prog?.materialNecessario || ''}</p>}
                </div>
                <div className={`${styles.collum} ${styles.width1}`}>
                    {!readOnly ? <textarea
                        name='responsavel' 
                        value={prog?.responsavel || ''}
                        onChange={(e)=>handleEditProgramacao(e, prog.id)}
                        className={styles.inputProgramacao}
                    /> : <p>{prog?.responsavel || ''}</p>}
                </div>
                {!readOnly ?
                    <FaMinus  
                        size={18} 
                        className={`${styles.removeProg}`}
                        onClick={()=>removeAtividade(idx+1)} 
                    />
                :null}
            </div>
        ))}

        {/* inputs da programação */}
        {!readOnly ? 
            <div className={`${styles.line} ${print ? styles.print : ''}`}>
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
                <div className={`${styles.collum} ${styles.width3}`}>
                    <textarea
                        name='descricao'
                        value={currentProgramacao?.descricao || ''}
                        onChange={(e) => handleFormProgramacao(e)}
                        className={`${styles.collum} ${styles.width260}`}
                        readOnly={readOnly}
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
                    onClick={addAtividade}
                />
            </div>
        :null}
    </div>
  );
}