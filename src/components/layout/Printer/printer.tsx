import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfDocument from '../PrintDoc/printDocInfoPreliminar';
import { SAAE } from '@/@types/types';

type Props = {
  data: SAAE
}

const Printer = ({data}:Props) => (
  <div>
    <PDFDownloadLink document={<PdfDocument dataSaae={data}/>} fileName="documento.pdf">
      {({ blob, url, loading, error }) =>{
        if(loading){
            return 'Carregando documento...'
        }else{
            console.log('blob', blob, 'Url', url, 'error', error)
            return <span style={{cursor:'pointer', textDecoration: 'underline'}}>Baixar PDF</span>
        }
      }}
    </PDFDownloadLink>
  </div>
);

export default Printer;