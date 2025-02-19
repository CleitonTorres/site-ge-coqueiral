import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { SAAE } from '@/@types/types';
import { dateFormat3 } from '@/scripts/globais';

// Crie estilos
const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    papdding: 40,
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
  },
  section: {
    padding: 10,
    flexGrow: 1,
    fontSize: 12,
    margin: 20,
  },
  paragraph: {
    fontSize: 12,
    textAlign: 'justify',
  },
  item: {
    fontSize: 12,
    textAlign: 'justify',
  }
});


type Props = {
  dataSaae?: SAAE

}
// Crie o componente PDF
const PdfDocumentInfosPreliminares = ({dataSaae}:Props) =>{
  const date = dateFormat3(new Date());

  if(!dataSaae) return <Document>
      <Page size="A4" style={styles.page}>
        <Text>Dados não carregados</Text>
      </Page>
      </Document>

  return <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>
          Informações Preliminares do evento/atividade {dataSaae?.dadosGerais?.nomeAtividade || ''}
        </Text>
        <Text style={styles.paragraph}>
          A coordenação do evento {dataSaae?.dadosGerais?.nomeAtividade || ''} informa a todos os interessados as informações mínimas e preliminares relacionadas ao evento/atividade
        </Text>
        {dataSaae?.infosPreliminares?.map((info, index) => (
            <View key={index}>
                <Text style={styles.item}>{info.item}. {info.text}</Text>
            </View>
        ))}
      </View>

      <View style={styles.section}>
          <Text style={styles.paragraph}>À coordenação,</Text>
          <Text style={styles.paragraph}>
            Local:
            {`${dataSaae?.dadosGerais?.localInicio.municipio}/${dataSaae?.dadosGerais?.localInicio.uf}`}
          </Text>
          <Text style={styles.paragraph}>
            Data:
            {`${date}`}
          </Text>
      </View>
    </Page>
  </Document>
};

export default PdfDocumentInfosPreliminares;