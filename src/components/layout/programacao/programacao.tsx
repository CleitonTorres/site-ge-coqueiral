import styles from './programacao.module.css';
import { ChangeEvent, useEffect, useState } from 'react';
import { ProgramacaoAtividade, ProgramacaoRamos } from '@/@types/types';
import TableProgramacao from '../tableProgramacao/tableProgramacao';
import { printComponent } from '@/scripts/globais';
import { usePathname } from 'next/navigation';

type Props = {
    readOnly: boolean,
    print: boolean,
    programacao: ProgramacaoAtividade[],
    nomeRamo?: string, //usado no print para exibir o ramo da programação.
    programacaoRamo?: ProgramacaoRamos[],
    currentProgramacao?: ProgramacaoAtividade,
    addAtividade?:  (nomeRamo: string) => Promise<void>,
    removeAtividade?: (idx: number, nomeRamo:string) => void,
    handleFormProgramacao?: (e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void,
    handleEditProgramacao?: (
        e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>, 
        itemId: number,
        nomeRamo: string
    ) => void,
    
    addProgramacaoRamo?: (nomeRamo: string) => void,
    removeProgramacaoRamo?:(nomeRamo: string)=>void
}
export default function Programacao({
    readOnly, print, programacao, programacaoRamo, nomeRamo,
    currentProgramacao, handleFormProgramacao, addProgramacaoRamo, removeProgramacaoRamo,
    handleEditProgramacao, addAtividade, removeAtividade}: Props) {
    const pathname = usePathname();
    const [selectedProg, setSelectedProg] = useState('');
    const [urlPrintProgramacao, setUrlPrintProgramacao] = useState(false);

    const handleRemoveProg = (nomeRamo:string)=>{
        if(removeProgramacaoRamo) removeProgramacaoRamo(nomeRamo);
        setSelectedProg('');
    }

    useEffect(() => {
    if (pathname && pathname.includes('/programacao')) {
      setUrlPrintProgramacao(true);
    }
  }, [pathname])

  return (
    <div className={`${styles.conteiner}`}>                    
        
        {!print ? 
            <span 
                className='link'
                onClick={()=>{
                  if(programacaoRamo && selectedProg){
                    const prog = programacaoRamo.find(i=> i.ramo === selectedProg);
                    printComponent({programacao: prog.programacao, ramo: selectedProg}, 'print-data-progAtividade');
                  }else{
                    printComponent({programacao, ramo: ''}, 'print-data-progAtividade')
                  }
                }}
            >
                imprimir programação selecionada
            </span>
        : null}
        <div className={`${styles.bgGreen} ${styles.headerProgramacao}`}>
            {!print ?
                <span 
                    className={`${styles.titleProgramacoes} ${selectedProg === '' ? styles.activeTitle : ''}`}
                    onClick={() => setSelectedProg('')}
                >
                    <b>Programação da atividade Geral</b>
                </span>
            :
                <span 
                    className={`${styles.titleProgramacoes} ${styles.activeTitle}`}
                >
                    {nomeRamo ? <b>Programação da atividade {nomeRamo}</b> : <b>Programação da atividade Geral</b>}
                </span>
            }
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
                    if(addProgramacaoRamo) addProgramacaoRamo(e.target.value);
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
        //visualização das programações fora do ambiente de impressão.
        <>
            {selectedProg !== '' && programacaoRamo.find(i=> i.ramo === selectedProg) ?
                <TableProgramacao                
                    currentProgramacao={currentProgramacao}//se refere aos inputs da linha da programação a serem inseridos.
                    programacao={programacaoRamo?.find(item => item.ramo === selectedProg)?.programacao || []}                
                    addAtividade={addAtividade}
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
            {/* visualização das programações no ambiente de impressão do Resumo SAAE. */}           
            <span 
                className={`link ${styles.noPrint}`}
                onClick={()=>{
                    printComponent({programacao, ramo: ''}, 'print-data-progAtividade')
                }}
            >
                {/*oculta o botão de print na página de print da Programação */}
                {urlPrintProgramacao ? `` : "imprimir programação geral"}
            </span>
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
                <>
                    <span 
                        className={`link ${styles.noPrint}`}
                        onClick={()=>{
                            printComponent({programacao: p.programacao, ramo: p.ramo}, 'print-data-progAtividade');
                        }}
                    >
                        Imprimir programação - {p.ramo}
                    </span>
                
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
                </>
            ))
            }
        </>
        }
    </div>
  );
}