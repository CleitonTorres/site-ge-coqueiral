"use client";
import { SAAE } from "@/@types/types";
import Script from "next/script";
import { useEffect, useState } from "react";
import styles from '../page.module.css';
import { FaPrint } from "react-icons/fa";
import SaaeResumo from "@/components/form/saaeResumo/saaeResumo";

export default function PrinterPage() {
  const [data, setData] = useState<SAAE | null>(null);
  const [googleLoaded, setGoogleLoaded] = useState(false);

  useEffect(() => {
    const loadData = () => {
      const storedData = localStorage.getItem("print-data");
      console.log("carregou data-print");
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
      localStorage.removeItem("print-data");
      window.removeEventListener("storage", loadData);
    };
  }, []);  

  if (!data) return <p>Carregando...</p>;

  return (
    <>
      <Script src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_KEY_SITE}`}/>
      <Script 
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_API_KEY_GOOGLE}&libraries=geometry`}
          async
          onLoad={()=>setGoogleLoaded(true)}
      />
      {googleLoaded ?  
        <div className={styles.page}>
          <div 
            className={styles.noPrint} 
            style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}
          >
            <h3 style={{marginLeft: 10, marginRight: 10}}>Impressão</h3>
            <FaPrint size={34} onClick={()=>window.print()} style={{cursor:'pointer'}}/>
          </div>

          <SaaeResumo localData={data} print hiddeButton/>

        </div>
        : <p>Carregando...</p>
      }
    </>
    
  );
}
