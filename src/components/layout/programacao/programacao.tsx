import styles from './programacao.module.css';
import { ChangeEvent, useState } from 'react';
import { ProgramacaoAtividade, ProgramacaoRamos } from '@/@types/types';
import TableProgramacao from '../tableProgramacao/tableProgramacao';

type Props = {
    readOnly: boolean,
    print: boolean,
    programacao: ProgramacaoAtividade[],
    programacaoRamo?: ProgramacaoRamos[],
    currentProgramacao: ProgramacaoAtividade,
    handleFormProgramacao: (e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void,
    handleEditProgramacao: (
        e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>, 
        itemId: number,
        nomeRamo: string
    ) => void,
    addAtividade:  (nomeRamo: string) => Promise<void>,
    removeAtividade: (idx: number, nomeRamo:string) => void,
    addProgramacaoRamo: (nomeRamo: string) => void,
    removeProgramacaoRamo:(nomeRamo: string)=>void
}
export default function Programacao({
    readOnly, print, programacao, programacaoRamo,
    currentProgramacao, handleFormProgramacao, addProgramacaoRamo, removeProgramacaoRamo,
    handleEditProgramacao, addAtividade, removeAtividade}: Props) {
    const [selectedProg, setSelectedProg] = useState('');

    const handleRemoveProg = (nomeRamo:string)=>{
        removeProgramacaoRamo(nomeRamo);
        setSelectedProg('');
    }

  return (
    <div className={styles.conteiner}>                    
        <div className={`${styles.bgGreen} ${styles.headerProgramacao}`}>
            <span 
                className={`${styles.titleProgramacoes} ${selectedProg === '' ? styles.activeTitle : ''}`}
                onClick={() => setSelectedProg('')}
            >
                <b>Programação da atividade Geral</b>
            </span>
            {!print && programacaoRamo?.map((item, idx) => (
                <span 
                    key={idx+'progRamo'} 
                    className={`${styles.titleProgramacoes} ${selectedProg === item.ramo ? styles.activeTitle : ''}`}
                    onClick={() => setSelectedProg(item.ramo)}
                >
                    Programação - {item.ramo}
                    <b 
                        className={styles.excluirProg}
                        onClick={()=>handleRemoveProg(item.ramo)}
                    >
                        X
                    </b>
                </span>
            ))}
            {!print ? <select 
                className={styles.addProgramacaoRamo}
                onChange={(e)=>{
                    addProgramacaoRamo(e.target.value);
                    setSelectedProg(e.target.value);
                }}
                value={'Add programação de ramo'}
            >
                <option>Add programação de ramo</option>
                {['Lobinho', 'Escoteiro', 'Sênior', 'Pioneiro', 'Escotista', 'Dirigente']
                .map((item, idx) => (
                    <option key={idx+'addProgRamo'} value={item}>{item}</option>
                ))}
            </select> :null}
        </div>
        
        {!print ?
        <>
        {selectedProg !== '' && programacaoRamo.find(i=> i.ramo === selectedProg) ?
            <TableProgramacao                
                currentProgramacao={currentProgramacao}//se refere aos inputs da linha da programação a serem inseridos.
                programacao={programacaoRamo?.find(item => item.ramo === selectedProg)?.programacao || []}                
                addAtividade={()=>addAtividade(selectedProg)} 
                removeAtividade={removeAtividade} 
                handleEditProgramacao={handleEditProgramacao}
                handleFormProgramacao={handleFormProgramacao}
                nomeRamo={selectedProg}
                readOnly={readOnly}
            />
        :
            <TableProgramacao 
                 
                currentProgramacao={currentProgramacao}//se refere aos inputs da linha da programação a serem inseridos.
                programacao={programacao}                
                addAtividade={addAtividade} 
                removeAtividade={removeAtividade}
                handleEditProgramacao={handleEditProgramacao}
                handleFormProgramacao={handleFormProgramacao}
                nomeRamo=''
                readOnly={readOnly}
                print={print}
            />
        }
        </>
        : 
        <>
        <TableProgramacao 
            addAtividade={addAtividade} 
            removeAtividade={removeAtividade} 
            currentProgramacao={currentProgramacao}//se refere aos inputs da linha da programação a serem inseridos.
            programacao={programacao || []}            
            handleEditProgramacao={handleEditProgramacao}
            handleFormProgramacao={handleFormProgramacao}
            nomeRamo={''} //programação geral
            readOnly={readOnly}
            print={print}
        />
        {programacaoRamo?.map((p, idx)=>(
            <TableProgramacao 
                addAtividade={addAtividade} 
                removeAtividade={removeAtividade} 
                currentProgramacao={currentProgramacao}//se refere aos inputs da linha da programação a serem inseridos.
                programacao={p.programacao}
                readOnly={readOnly}
                handleEditProgramacao={handleEditProgramacao}
                handleFormProgramacao={handleFormProgramacao}
                nomeRamo={p.ramo} //programação por ramo
                print={print}
                key={p.ramo+idx}
            />
        ))
        }
        </>
        }
    </div>
  );
}