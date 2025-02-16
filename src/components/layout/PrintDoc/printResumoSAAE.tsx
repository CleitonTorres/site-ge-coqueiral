import React, { useContext } from 'react';
import DadosGerais from '@/components/form/dadosGeraisSaae/dadosGerais';
import InfosPreliminares from '@/components/form/infosPreliminaresSaae/infosPreliminares';
import InventarioSaae from '@/components/form/inventarioSaae/inputIA';
import MatrizRisco from '@/components/form/matrizSaae/matrizRisco';
import PlanoEmergencia from '@/components/form/planoEmergencia/planoEmergencia';
import SectionDocumentos from '@/components/form/sectionDocumentos/documentos';
import FotosInspecao from '@/components/form/fotosInspecao/fotosInspecao';
import styles from './printer.module.css';
import { Context } from '@/components/context/context';

// Crie o componente PDF
const PdfDocumentResumoSAAE = () =>{  
  const context = useContext(Context);
  return(
    <div className={styles.conteiner}>
      <h2>
        8. Resumo da sua SAAE
        <h6>ID: {context.dataSaae._id}</h6>
      </h2>
      <span 
        onClick={()=>window.print()}
        style={{cursor:'pointer', textDecoration: 'underline'}}
      >
          imprimir SAAE
      </span>
      <DadosGerais readOnly/>
      <InfosPreliminares readOnly/>
      <InventarioSaae readOnly/>
      <MatrizRisco readOnly/>
      <PlanoEmergencia readOnly/>
      <FotosInspecao readOnly/>
      <SectionDocumentos readOnly/>
    </div>
)};

export default PdfDocumentResumoSAAE;