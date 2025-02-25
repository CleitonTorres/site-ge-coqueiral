"use client";
import { SAAE } from "@/@types/types";
import DadosGerais from "@/components/form/dadosGeraisSaae/dadosGerais";
import FotosInspecao from "@/components/form/fotosInspecao/fotosInspecao";
import InfosPreliminares from "@/components/form/infosPreliminaresSaae/infosPreliminares";
import InventarioSaae from "@/components/form/inventarioSaae/inputIA";
import MatrizRisco from "@/components/form/matrizSaae/matrizRisco";
import PlanoEmergencia from "@/components/form/planoEmergencia/planoEmergencia";
import SectionDocumentos from "@/components/form/sectionDocumentos/documentos";
import Script from "next/script";
import { useEffect, useState } from "react";
import styles from './page.module.css';
import { FaPrint } from "react-icons/fa";
//import RootLayout from "./layout";

export default function PrinterPage() {
  const [data, setData] = useState<SAAE | null>(null);
  const [googleLoaded, setGoogleLoaded] = useState(false);

  useEffect(() => {
    // Recupera os dados do localStorage
    const storedData = localStorage.getItem("print-data");
    if (storedData) {
      setData(JSON.parse(storedData));
      console.log('storedData', JSON.parse(storedData))
      // setTimeout(() => {
      //   window.print();
      // }, 500);
    }
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

          <DadosGerais 
            readOnly 
            data={data.dadosGerais} 
            obsSaae={data.obs} 
            statusSaae={data.status} 
            idSaae={data._id}
            print/>
          <InfosPreliminares readOnly data={data.infosPreliminares} />
          <InventarioSaae readOnly data={data.inventarioRiscos} print/>
          <MatrizRisco readOnly data={data.grauRisco} />
          <PlanoEmergencia 
            readOnly 
            data={data.planoEmergencia} 
            grauRisco={data.grauRisco}
            nomeAtividade={data.dadosGerais.nomeAtividade}
            localInicio={data.dadosGerais.localInicio}
          />
          <FotosInspecao readOnly data={data.fotosInspecao} />
          <SectionDocumentos readOnly data={data.documentos} />
        </div>
        : <p>Carregando...</p>
      }
    </>
    
  );
}
