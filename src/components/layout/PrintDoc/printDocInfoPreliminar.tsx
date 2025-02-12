import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { SAAE } from '@/@types/types';

// Crie estilos
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    fontSize: 12,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
  },
});


type Props = {
  dataSaae?: SAAE

}
// Crie o componente PDF
const PdfDocument = ({dataSaae}:Props) =>{
  const date = new Date();

  return <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.text}>
          Informações Preliminares do evento/atividade {dataSaae?.dadosGerais?.nomeAtividade || ''}
        </Text>
        <Text style={styles.text}>
          A coordenação do evento {dataSaae?.dadosGerais?.nomeAtividade || ''} informa a todos os interessados as informações mínimas e preliminares relacionadas ao evento/atividade
        </Text>
        {dataSaae?.infosPreliminares?.map((info, index) => (
            <View key={index}>
                <Text style={styles.text}>{info.item}.</Text>
                <Text style={styles.text}>{info.text}</Text>
            </View>
        ))}
      </View>

      <View style={styles.section}>
          <Text style={styles.text}>À coordenação,</Text>
          <Text style={styles.text}>
            Local:
            {`${dataSaae?.dadosGerais.localInicio.municipio}/${dataSaae?.dadosGerais.localInicio.uf}`}
          </Text>
          <Text style={styles.text}>
            Data:
            {`${date}`}
          </Text>
      </View>
    </Page>
  </Document>
};

export default PdfDocument;