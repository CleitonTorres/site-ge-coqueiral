'use client'
import { ProgramacaoRamos } from "@/@types/types";
import Mathias from "@/components/layout/mathias/mathias";
import { useEffect, useState } from "react";
import styles from '../page.module.css';
import { FaPrint } from "react-icons/fa";
import Programacao from "@/components/layout/programacao/programacao";

export default function Page(){
    const [data, setData] = useState<ProgramacaoRamos | null>(null);
        
    useEffect(() => {
        const loadData = () => {
        const storedData = localStorage.getItem("print-data-progAtividade");
        if (storedData) {
            setData(JSON.parse(storedData));
        }
        };
    
        // Carrega os dados na montagem
        loadData();
    
        // Adiciona um listener para mudanças no localStorage
        window.addEventListener("storage", loadData);
    
        // Remove o listener quando o componente desmontar
        return () => {
        window.removeEventListener("storage", loadData);
        };
    }, []);

    if (!data) return <Mathias show text="Estou carregando os dados da sua impressão"/>;

    return(
        <div className={styles.page} style={{padding: '1cm'}}>
            <div 
            className={styles.noPrint} 
            style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}
          >
            <h3 style={{marginLeft: 10, marginRight: 10}}>Impressão</h3>
            <FaPrint size={34} onClick={()=>window.print()} style={{cursor:'pointer'}}/>
          </div>

          <Programacao
            print={true}
            readOnly={true}
            programacao={data.programacao}   
            nomeRamo={data.ramo}         
          />
        </div>
    )
}