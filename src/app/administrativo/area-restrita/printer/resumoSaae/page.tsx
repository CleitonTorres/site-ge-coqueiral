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
    // Recupera os dados do localStorage
    const storedData = localStorage.getItem("print-data");
    if (storedData && !data) {
      setData(JSON.parse(storedData));
    }
  }, [data]);

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
