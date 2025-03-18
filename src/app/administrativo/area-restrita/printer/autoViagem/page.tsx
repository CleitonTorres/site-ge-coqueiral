'use client';
import { DadosGeraisSaae } from "@/@types/types";
import { useEffect, useState } from "react";
import styles from '../page.module.css';
import { FaPrint } from "react-icons/fa";
import RequerimentoTransInterMun from "@/components/form/reqTransporteInterMun/reqTransporteInterMun";

export default function Page(){
    const [data, setData] = useState<DadosGeraisSaae | null>(null);
    
    useEffect(() => {
    // Recupera os dados do localStorage
    const storedData = localStorage.getItem("print-data-autoviagem");
    if (storedData) {
        setData(JSON.parse(storedData));
    }
    }, []);

    if (!data) return <p>Carregando...</p>;

    return(
        <div className={styles.page}>
          <div 
            className={styles.noPrint} 
            style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}
          >
            <h3 style={{marginLeft: 10, marginRight: 10}}>Impressão</h3>
            <FaPrint size={34} onClick={()=>window.print()} style={{cursor:'pointer'}}/>
          </div>

          <RequerimentoTransInterMun localData={data}/>
        </div>
    )
}