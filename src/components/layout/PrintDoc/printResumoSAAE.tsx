'use client'
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer';
import { dateFormat2 } from '@/scripts/globais';
import { v4 } from 'uuid';
import { SAAE } from '@/@types/types';

// Crie estilos
const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 12,
    textAlign: 'left',
    fontWeight: 'bold',
    backgroundColor: '#9eb83b',
    width: '100%',
    padding: 5,
  },
  title2:{
    fontSize: 12,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
  },
  line:{
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'flex-start',
  },
  paragraph: {
    fontSize: 10,
    textAlign: 'justify',
  },
  item: {
    fontSize: 10,
    textAlign: 'justify',
    border: '1px solid #000',
    padding: 5,
    marginBottom: 5
  },
  bold:{
    fontWeight: 'bold',
    fontSize: 10,
  },
  width60:{	
    width: 50,
    fontSize: 10,
    textAlign: 'justify',
    border: '1px solid #000',
    padding: 5,
    margin: 1,
    height: '100%',
  },
  width90:{	
    width: 70,
    fontSize: 10,
    textAlign: 'justify',
    border: '1px solid #000',
    padding: 5,
    margin: 1,
    height: '100%',
  },
  width140:{	
    width: 120,
    fontSize: 10,
    textAlign: 'justify',
    border: '1px solid #000',
    padding: 5,
    margin: 1,
    height: '100%',
  },
  width260:{	
    width: 140,
    fontSize: 10,
    textAlign: 'justify',
    border: '1px solid #000',
    padding: 5,
    margin: 1,
    height: '100%',
  },
});

type Props = {
  dataSaae: SAAE
}
// Crie o componente PDF
const PdfDocumentResumoSAAE = ({dataSaae}:Props) =>{  
  const [data, setData] = React.useState<SAAE>();
  const timestamp = new Date().getTime();
  const googleMapImage = `https://maps.googleapis.com/maps/api/staticmap?center=${dataSaae.dadosGerais?.localInicio?.coordenadas?.lat},${dataSaae.dadosGerais?.localInicio?.coordenadas?.long}&zoom=14&markers=color:blue%7Clabel:P%7C${dataSaae.dadosGerais?.localInicio?.coordenadas?.lat},${dataSaae.dadosGerais?.localInicio?.coordenadas?.long}&size=600x400&key=${process.env.NEXT_PUBLIC_API_KEY_GOOGLE}&t=${timestamp}`;
  const googleMapFimImage = `https://maps.googleapis.com/maps/api/staticmap?center=${dataSaae.dadosGerais?.localFim?.coordenadas?.lat},${dataSaae.dadosGerais?.localFim?.coordenadas?.long}&markers=color:blue%7Clabel:P%7C${dataSaae.dadosGerais?.localFim?.coordenadas?.lat},${dataSaae.dadosGerais?.localFim?.coordenadas?.long}&zoom=14&size=600x400&key=${process.env.NEXT_PUBLIC_API_KEY_GOOGLE}&t=${timestamp}`;

  const gerarLinkMapa = (lat?: number, long?: number) => {
    if(!lat || !long) return '';

    return `https://www.google.com/maps?q=${lat},${long}`
  };

  // const fetchImageAsBase64 = async (url:string):Promise<string | ArrayBuffer | null> => {
  //   const response = await fetch(url);
  //   const blob = await response.blob();
  //   return new Promise((resolve) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => resolve(reader.result);
  //     reader.readAsDataURL(blob);
  //   });
  // };

  // useEffect(() => {
  //   const loadImages = async () => {
  //     const timestamp = new Date().getTime();
  //     const googleMapImage = `https://maps.googleapis.com/maps/api/staticmap?center=${dataSaae.dadosGerais?.localInicio?.coordenadas?.lat},${dataSaae.dadosGerais?.localInicio?.coordenadas?.long}&zoom=14&markers=color:blue%7Clabel:P%7C${dataSaae.dadosGerais?.localInicio?.coordenadas?.lat},${dataSaae.dadosGerais?.localInicio?.coordenadas?.long}&size=600x400&key=${process.env.NEXT_PUBLIC_API_KEY_GOOGLE}&t=${timestamp}`;
  //     const googleMapFimImage = `https://maps.googleapis.com/maps/api/staticmap?center=${dataSaae.dadosGerais?.localFim?.coordenadas?.lat},${dataSaae.dadosGerais?.localFim?.coordenadas?.long}&markers=color:blue%7Clabel:P%7C${dataSaae.dadosGerais?.localFim?.coordenadas?.lat},${dataSaae.dadosGerais?.localFim?.coordenadas?.long}&zoom=14&size=600x400&key=${process.env.NEXT_PUBLIC_API_KEY_GOOGLE}&t=${timestamp}`;
    
  //     const img1 = await fetchImageAsBase64(googleMapImage);
  //     const img2 = await fetchImageAsBase64(googleMapFimImage);
  //     setMapImages({ inicio: img1 as string, fim: img2 as string});
  //   };
  //   loadImages();
  // }, []);

  React.useEffect(()=>{
    if(dataSaae)setData(dataSaae)
  },[dataSaae]);

  if(!data) return <Document>
    <Page size="A4" style={styles.page}>
      <Text>Dados não carregados</Text>
    </Page>
    </Document>
  
  return(
    <Document pageLayout='singlePage' language='pt-br' pageMode='useThumbs' title='Resumo da SAAE' >
      <Page size="A4" style={styles.page} orientation='portrait' wrap dpi={300}>
        <Text style={styles.title}>
          8. Resumo da sua SAAE - 
          ID: {data?._id}
        </Text>
        <Text style={styles.title2}>
          Resposta da sua SAAE: {data?.status}
        </Text>
        <View style={styles.section}>
          <Text style={styles.title}>
            1. Dados gerais da atividade
          </Text>
          
          <View style={styles.line}>
            <Text style={styles.item}>
              <Text style={styles.bold}>Nome da sua SAAE:</Text> {data?.dadosGerais?.nomeAtividade}
            </Text>
            <Text style={styles.item}>
              <Text style={styles.bold}>Tipo de atividade:</Text> {data?.dadosGerais?.tipoAtividade?.map((item) => item).join(', ')}
            </Text>
            <Text style={styles.item}>
              <Text style={styles.bold}>Tipo de atividade:</Text> {data?.dadosGerais?.odss?.map((item) => item).join(', ')}
            </Text>
            <Text style={styles.item}>
              <Text style={styles.bold}>Tipo de atividade:</Text> {data?.dadosGerais?.ramo?.map((item) => item).join(', ')}
            </Text>
            <Text style={styles.item}>
              <Text style={styles.bold}>Atividade de Patrulha não supervisionada:</Text> {data?.dadosGerais?.atividadeNaoSupervisionada ? 'Sim' : 'Não'}
            </Text>
            <Text style={styles.item}>
              <Text style={styles.bold}>Atividade de Patrulha não supervisionada:</Text> {data?.dadosGerais?.usoTransporteInterMunicipal ? 'Sim' : 'Não'}
            </Text>
          </View>

          {/* hora e data da saída e chegada */}
          <View style={styles.line}>
            <Text style={styles.item}>
              <Text style={styles.bold}>Data início:</Text> {dateFormat2(data?.dadosGerais?.dataInicio || '')}
            </Text>
            <Text style={styles.item}>
              <Text style={styles.bold}>Hora início:</Text> {data?.dadosGerais?.horaInicio || ''}
            </Text>
            <Text style={styles.item}>
              <Text style={styles.bold}>Local da saída:</Text> {data?.dadosGerais?.localSaida || ''}
            </Text>
            <Text style={styles.item}>
              <Text style={styles.bold}>Local da chegada:</Text> {data?.dadosGerais?.localSaida || ''}
            </Text>
            <Text style={styles.item}>
              <Text style={styles.bold}>Data encerramento:</Text> {dateFormat2(data?.dadosGerais?.dataFim) || ''}
            </Text>
            <Text style={styles.item}>
              <Text style={styles.bold}>Data encerramento:</Text> {data?.dadosGerais?.horaFim || ''}
            </Text>
          </View>

          {/* local início */}
          <View style={styles.line}>
            <View style={styles.line}>
              <Text style={styles.title2}>
                  Descrição do local de início: {data?.dadosGerais?.localInicio?.address || ''}
              </Text>
            </View>
            <Text style={styles.item}>
              <Text style={styles.bold}>CEP do local/local início:</Text> {data?.dadosGerais?.localInicio?.cep || 'Não informado'}
            </Text>
            <Text style={styles.item}>
              <Text style={styles.bold}>Logradouro:</Text> {data?.dadosGerais?.localInicio?.logradouro || ''}
            </Text>
            <Text style={styles.item}>
              <Text style={styles.bold}>Bairro:</Text> {data?.dadosGerais?.localInicio?.bairro || ''}
            </Text>
            <Text style={styles.item}>
              <Text style={styles.bold}>Município:</Text> {data?.dadosGerais?.localInicio?.municipio || ''}
            </Text>
            <Text style={styles.item}>
              <Text style={styles.bold}>UF:</Text> {data?.dadosGerais?.localInicio?.uf || ''}
            </Text>            
          </View>


          {/* local fim */}
          <View style={styles.line}>
            <View style={styles.line}>
              <Text style={styles.title2}>Descrição do local de encerramento: {data?.dadosGerais?.localFim?.address || ''}</Text>
            </View>
            <Text style={styles.item}>
              <Text style={styles.bold}>CEP do local/local Fim:</Text> {data?.dadosGerais?.localFim?.cep || 'Não informado'}
            </Text>
            <Text style={styles.item}>
              <Text style={styles.bold}>Logradouro:</Text> {data?.dadosGerais?.localFim?.logradouro || ''}
            </Text>
            <Text style={styles.item}>
              <Text style={styles.bold}>Bairro:</Text> {data?.dadosGerais?.localFim?.bairro || ''}
            </Text>
            <Text style={styles.item}>
              <Text style={styles.bold}>Município:</Text> {data?.dadosGerais?.localFim?.municipio || ''}
            </Text>
            <Text style={styles.item}>
              <Text style={styles.bold}>UF:</Text> {data?.dadosGerais?.localFim?.uf || ''}
            </Text>            
          </View>

          {/* metodologia e objetivo */}
          <View style={styles.line}>
            <View style={styles.line}>
              <Text style={styles.title2}>
                  Metodologia e objetivo.
              </Text>
            </View>
            <Text style={styles.item}>
              <Text style={styles.bold}>Métodologia usada na atividade:</Text> {data?.dadosGerais?.metodologia || ''}
            </Text>
            <Text style={styles.item}>
              <Text style={styles.bold}>Objetivo da atividade:</Text> {data?.dadosGerais?.objetivo || ''}
            </Text>
          </View>

          {/* meio de transporte e custo individual */}
          <View style={styles.line}>
            <View style={styles.line}>
              <Text style={styles.title2}>
                  Meio de transporte.
              </Text>
            </View>
            <Text style={styles.item}>
              <Text style={styles.bold}>Meio de transporte:</Text> {data?.dadosGerais?.meioTransporte || ''}
            </Text>
            <Text style={styles.item}>
              <Text style={styles.bold}>Custo individual:</Text> {data?.dadosGerais?.custoIndividual || ''}
            </Text>
          </View>
          
          {/* responsável pela atividade */}
          <View style={styles.line}>
            <View style={styles.line}>
              <Text style={styles.title2}>
                  Responsável pela atividade.
              </Text>
            </View>
            <Text style={styles.item}>
              <Text style={styles.bold}>Coordenador da atividade:</Text> {data?.dadosGerais?.coordenador || ''}
            </Text>
            <Text style={styles.item}>
              <Text style={styles.bold}>Reg. Escoteiro:</Text> {data?.dadosGerais?.regCoordenador || ''}
            </Text>
            <Text style={styles.item}>
              <Text style={styles.bold}>Tel. de contato:</Text> {data?.dadosGerais?.telCoordenador || ''}
            </Text>
            <Text style={styles.item}>
              <Text style={styles.bold}>E-mail de contato:</Text> {data?.dadosGerais?.emailCoordenador || ''}
            </Text>
            <Text style={styles.item}>
              <Text style={styles.bold}>Nível de formação:</Text> {data?.dadosGerais?.nivelFormacaoCoordenador || ''}
            </Text>
          </View>

          {/* supervisor da atividade */}
          <View style={styles.line}>
            <View style={styles.line}>
              <Text style={styles.title2}>Supervisor da atividade</Text>
            </View>
            <Text style={styles.item}>
              <Text style={styles.bold}>Supervisor da atividade:</Text> {data?.dadosGerais?.nomeSupervisor || ''}
            </Text>
            <Text style={styles.item}>
              <Text style={styles.bold}>Reg. Escoteiro:</Text> {data?.dadosGerais?.regSupervisor || ''}
            </Text>
            <Text style={styles.item}>
              <Text style={styles.bold}>Tel. de contato:</Text> {data?.dadosGerais?.telSupervisor || ''}
            </Text>
            <Text style={styles.item}>
              <Text style={styles.bold}>E-mail de contato:</Text> {data?.dadosGerais?.emailSupervisor || ''}
            </Text>
            <Text style={styles.item}>
              <Text style={styles.bold}>Nível de formação:</Text> {data?.dadosGerais?.nivelFormacaoSupervisor || ''}
            </Text>
          </View>

          {/* como chegar e link do mapa*/}
          <View style={styles.line}>
            <Text style={styles.item}>
              <Text style={styles.bold}>Como chegar no local da atividade?</Text> {data?.dadosGerais?.comoChegar || ''}
            </Text>
            <Text style={styles.item}>
              <Text style={styles.bold}>Link do mapa:</Text> <Link src={data?.dadosGerais?.linkMapa || ''}>{data?.dadosGerais?.linkMapa || ''}</Link> 
            </Text>
          </View>

          {/* coordenadas início*/}
          <View style={styles.line}>
            <Text style={styles.item}>
              <Text style={styles.bold}>Coordenadas do local Início:</Text> {`${data?.dadosGerais?.localInicio?.coordenadas?.lat || ''}, ${data?.dadosGerais?.localInicio.coordenadas?.long || ''}`}
            </Text>
          </View>

          {/*endereço e mapa início*/}
          <View style={styles.line}>
            {(data?.dadosGerais?.localInicio?.logradouro && data?.dadosGerais?.localInicio?.bairro) 
            || (data?.dadosGerais?.localInicio?.coordenadas?.lat && data?.dadosGerais?.localInicio?.coordenadas?.long) ?
              <View>
                  <Link style={styles.item} src={gerarLinkMapa(data?.dadosGerais?.localInicio?.coordenadas?.lat, data?.dadosGerais?.localInicio?.coordenadas?.long )}>
                    {gerarLinkMapa(data?.dadosGerais?.localInicio?.coordenadas?.lat, data?.dadosGerais?.localInicio?.coordenadas?.long )}
                  </Link>
                <Image 
                  id='mapaLocalInicio'
                  src={googleMapImage} 
                  style={{ width: 600, height: 400 }}
                />
              </View>
            :null}
          </View>

          {/* coordenadas fim*/}
          <View style={styles.line}>
            <Text style={styles.item}>
              <Text style={styles.bold}>Coordenadas do local fim da atividade:</Text> {`${data?.dadosGerais?.localFim?.coordenadas?.lat || ''}, ${data?.dadosGerais?.localInicio.coordenadas?.long || ''}`}
            </Text>
          </View>

          {/*endereço e mapa fim*/}
          <View style={styles.line}>
            {(data?.dadosGerais?.localFim?.logradouro && data?.dadosGerais?.localFim?.bairro) 
            || (data?.dadosGerais?.localFim?.coordenadas?.lat && data?.dadosGerais?.localFim?.coordenadas?.long) ?
            <View>
              <Link style={styles.item} src={gerarLinkMapa(data?.dadosGerais?.localFim?.coordenadas?.lat, data?.dadosGerais?.localFim?.coordenadas?.long )}>
                  {gerarLinkMapa(data?.dadosGerais?.localFim?.coordenadas?.lat, data?.dadosGerais?.localFim?.coordenadas?.long )}
              </Link>
              <Image 
                id='mapaLocalFim'
                src={googleMapFimImage} 
                style={{ width: 600, height: 400 }}
              />
            </View>            
            :null}
          </View>
        </View>
        <View style={styles.section}>
          {/*programação da atividade*/}
          <View style={styles.line}>
            <Text style={styles.title2}>Programação da atividade</Text>

            {/* cabeçalho da programação */}
            <View style={styles.line}>
              <Text style={styles.width90}>
                <Text style={styles.bold}>Data</Text>
              </Text>
              <Text style={styles.width60}>
                <Text style={styles.bold}>Hora</Text>
              </Text>
              <Text style={styles.width60}>
                <Text style={styles.bold}>Duração</Text>
              </Text>
              <Text style={styles.width260}>
                <Text style={styles.bold}>Descrição</Text>
              </Text>
              <Text style={styles.width140}>
                <Text style={styles.bold}>Material Necessário</Text>
              </Text>
              <Text style={styles.width90}>
                <Text style={styles.bold}>Responsável</Text>
              </Text>
            </View>

            {/* dados adicionados à programação */}
            {data?.dadosGerais?.programacao?.map((prog)=>(
                <View key={v4()} style={styles.line}>
                    <Text style={styles.width90}>
                      {dateFormat2(prog?.data)}
                    </Text>
                    <Text style={styles.width60}>
                      {prog?.hora}
                    </Text>
                    <Text style={styles.width60}>
                      {prog?.duracao}
                    </Text>
                    <Text style={styles.width260}>
                      {prog?.descricao}
                    </Text>
                    <Text style={styles.width140}>
                      {prog?.materialNecessario}
                    </Text>
                    <Text style={styles.width90}>
                      {prog?.responsavel}
                    </Text>
                </View>
            ))}

          </View>
        </View>
      </Page>
    </Document>
)};

export default PdfDocumentResumoSAAE;