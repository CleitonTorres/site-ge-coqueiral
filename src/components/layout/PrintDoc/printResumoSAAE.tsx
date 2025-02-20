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
  title2: {
    fontSize: 10,
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
  line: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  line2: {
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
    marginBottom: 5,
  },
  resultado: {
    display: 'flex',
    width: 220,
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 10,
  },
  width30: {
    width: 40,
    fontSize: 10,
    textAlign: 'justify',
    border: '1px solid #000',
    padding: 5,
    margin: 1,
  },
  width60: {
    width: 50,
    fontSize: 10,
    textAlign: 'justify',
    border: '1px solid #000',
    padding: 5,
    margin: 1,
  },
  width90: {
    width: 70,
    fontSize: 10,
    textAlign: 'justify',
    border: '1px solid #000',
    padding: 5,
    margin: 1,
  },
  width140: {
    width: 120,
    fontSize: 10,
    textAlign: 'justify',
    border: '1px solid #000',
    padding: 5,
    margin: 1,
  },
  width260: {
    width: 140,
    fontSize: 10,
    textAlign: 'justify',
    border: '1px solid #000',
    padding: 5,
    margin: 1,
  },
  matriz: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 350,
    padding: 6,
  },
  rotuloConsequencia: {
    width: 50,
    height: 50,
    border: '1px solid blue',
    margin: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 10,
  },
  rotuloProbabilidade: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: 50,
    fontSize: 10,
    border: '1px solid blue',
    margin: 1,
  },
  valor: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    fontSize: 10,
    border: '1px solid blue',
    margin: 1,
  },
  bgGreen: {
    backgroundColor: 'green',
    marginTop: 20,
    paddingLeft: 10,
  },
  risco: {
    fontWeight: 'bold',
    boxShadow: '0px 0px 33px 0px rgb(5, 1, 42) inset',
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
              <Text style={styles.bold}>ODSs:</Text> {data?.dadosGerais?.odss?.map((item) => item).join(', ')}
            </Text>
            <Text style={styles.item}>
              <Text style={styles.bold}>Ramos:</Text> {data?.dadosGerais?.ramo?.map((item) => item).join(', ')}
            </Text>
            <Text style={styles.item}>
              <Text style={styles.bold}>Atividade de Patrulha não supervisionada:</Text> {data?.dadosGerais?.atividadeNaoSupervisionada ? 'Sim' : 'Não'}
            </Text>
            <Text style={styles.item}>
              <Text style={styles.bold}>Uso de transporte Intermunicipal?</Text> {data?.dadosGerais?.usoTransporteInterMunicipal ? 'Sim' : 'Não'}
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

          {/*coordenada, endereço e mapa início*/}
          <View style={styles.line}>
            {(data?.dadosGerais?.localInicio?.logradouro && data?.dadosGerais?.localInicio?.bairro) 
            || (data?.dadosGerais?.localInicio?.coordenadas?.lat && data?.dadosGerais?.localInicio?.coordenadas?.long) ?
              <View>
                  <Text style={styles.item}>
                    <Text style={styles.bold}>Coordenadas do local Início:</Text> {`${data?.dadosGerais?.localInicio?.coordenadas?.lat || ''}, ${data?.dadosGerais?.localInicio.coordenadas?.long || ''}`}
                  </Text>
                  <Link style={styles.item} src={gerarLinkMapa(data?.dadosGerais?.localInicio?.coordenadas?.lat, data?.dadosGerais?.localInicio?.coordenadas?.long )}>
                    {gerarLinkMapa(data?.dadosGerais?.localInicio?.coordenadas?.lat, data?.dadosGerais?.localInicio?.coordenadas?.long )}
                  </Link>
                <Image 
                  id='mapaLocalInicio'
                  src={googleMapImage} 
                  style={{ width: 500, height: 400, objectFit: "contain" }}
                />
              </View>
            :null}
          </View>

          {/*coordennadas, endereço e mapa fim*/}
          <View style={styles.line}>
            {(data?.dadosGerais?.localFim?.logradouro && data?.dadosGerais?.localFim?.bairro) 
            || (data?.dadosGerais?.localFim?.coordenadas?.lat && data?.dadosGerais?.localFim?.coordenadas?.long) ?
            <View>
              <Text style={styles.item}>
                <Text style={styles.bold}>Coordenadas do local fim da atividade:</Text> {`${data?.dadosGerais?.localFim?.coordenadas?.lat || ''}, ${data?.dadosGerais?.localInicio.coordenadas?.long || ''}`}
              </Text>
              <Link style={styles.item} src={gerarLinkMapa(data?.dadosGerais?.localFim?.coordenadas?.lat, data?.dadosGerais?.localFim?.coordenadas?.long )}>
                  {gerarLinkMapa(data?.dadosGerais?.localFim?.coordenadas?.lat, data?.dadosGerais?.localFim?.coordenadas?.long )}
              </Link>
              <Image 
                id='mapaLocalFim'
                src={googleMapFimImage} 
                style={{ width: 500, height: 400, objectFit: "contain" }}
              />
            </View>            
            :null}
          </View>
        </View>

        {/*programação da atividade*/}
        <View style={styles.section}>          
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

        {/* Informações mínimas aos participantes */}
        <View style={styles.section}>
          <Text style={styles.title}>
            2. Informações mínimas aos envolvidos.
          </Text>
          <Text style={styles.title2}>
            Refências: PNES item 8.1.1, 8.3.6, 8.4.1  ABNT NBR 15286
          </Text>        

          {data?.infosPreliminares?.map((item, idx)=>(
              <View key={item.item+idx} style={styles.line}>         
                  <Text style={styles.paragraph}>
                    {idx+1}: {item.text}
                  </Text>
              </View>                
          ))}
        </View>

         {/* Inventário de risco */}
         <View style={styles.section}>
            <Text style={styles.title}>
              3. Inventário de Riscos.
            </Text>
            <View style={styles.line2}>
              <Text style={styles.width90}>Atividade</Text>
              <Text style={styles.width90}>Perigo</Text>
              <Text style={styles.width90}>Dano</Text>
              <Text style={styles.width140}>Controle Operacional</Text>
              <Text style={styles.width140}>Ações Mitigadoras</Text>
              <Text style={styles.width30}>Prob.</Text>
              <Text style={styles.width30}>Cons.</Text>
              <Text style={styles.width30}>N.Risco</Text>
            </View>
            {data?.inventarioRiscos?.sort((a,b)=> a.probabilidade - b.probabilidade)
            ?.map((item, idx)=>(
              <View key={"inventario"+idx} style={styles.line}>         
                  <Text style={styles.width90}>
                    {item.atividade}
                  </Text>
                  <Text style={styles.width90}>
                    {item.perigo}
                  </Text>
                  <Text style={styles.width90}>
                    {item.danos}
                  </Text>
                  <Text style={styles.width140}>
                    {item.controleOperacional}
                  </Text>
                  <Text style={styles.width140}>
                    {item.acoesMitigadoras}
                  </Text>
                  <Text style={styles.width30}>
                    {item.probabilidade}
                  </Text>
                  <Text style={styles.width30}>
                    {item.consequencia}
                  </Text>
                  <Text style={styles.width30}>
                    {item.nivelRisco}
                  </Text>
              </View>                
            ))}
         </View>

         {/* Matriz de Risco*/}
         <View style={styles.section}>
            <Text style={styles.title}>
              4. Matriz de Risco.
            </Text>
            <Text style={styles.title2}>
              item 9.2 da Política Nacional de Gestão de Risco.
            </Text>
            <View style={styles.resultado}>
                <Text
                  style={{
                    display: 'flex',
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 6
                  }}
                >
                  Maior resultado
                </Text>
                <Text 
                    style={{
                      display: 'flex',
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: data?.grauRisco?.color, 
                      fontWeight: 700, 
                      width: 40, 
                      height: 40
                    }}
                >
                    {data?.grauRisco?.value || ''}
                </Text>
            </View>

            <View style={styles.matriz}>
                <Text style={styles.rotuloProbabilidade}>
                    Quase certo
                </Text>
                <Text 
                    style={{...styles.valor, ...{backgroundColor: 'yellow'},  ...data?.grauRisco?.value === 5 ? styles.risco : {}}} 
                    id='5'
                > 
                    5
                </Text>
                <Text 
                  style={{...styles.valor, ...(data?.grauRisco?.value === 10 ? styles.risco : {})}} 
                  id='10' 
                > 
                  10
                </Text>
                <Text 
                  style={{...styles.valor, backgroundColor: 'red', ...(data?.grauRisco?.value === 15 ? styles.risco : {})}}
                  id='15' 
                > 
                  15
                </Text>
                <Text 
                  style={{...styles.valor, backgroundColor: 'red', ...(data?.grauRisco?.value === 20 ? styles.risco : {})}} 
                  id='20'
                > 
                  20
                </Text>
                <Text 
                  style={{...styles.valor, backgroundColor: 'red', ...(data?.grauRisco?.value === 25 ? styles.risco : {})}} 
                  id='25'
                > 
                  25
                </Text>
                <Text 
                  style={styles.rotuloProbabilidade}>
                  Provável
                </Text>
                <Text 
                  style={{
                  ...styles.valor, 
                  ...(data?.grauRisco?.value === 4 ? styles.risco : {}), 
                  backgroundColor: 'yellow'
                  }} 
                  id='4'
                > 
                  4
                </Text>
                <Text 
                  style={{
                  ...styles.valor, 
                  ...(data?.grauRisco?.value === 8 ? styles.risco : {}), 
                  backgroundColor: 'orange'
                  }} 
                  id='8'
                > 
                  8
                </Text>
                <Text 
                  style={{
                  ...styles.valor, 
                  ...(data?.grauRisco?.value === 12 ? styles.risco : {}), 
                  backgroundColor: 'orange'
                  }} 
                  id='12'
                > 
                  12
                </Text>
                <Text 
                  style={{
                  ...styles.valor, 
                  ...(data?.grauRisco?.value === 16 ? styles.risco : {}), 
                  backgroundColor: 'red'
                  }} 
                  id='16'
                > 
                  16
                </Text>
                <Text 
                  style={{
                  ...styles.valor, 
                  ...(data?.grauRisco?.value === 20 ? styles.risco : {}), 
                  backgroundColor: 'red'
                  }} 
                  id='20'
                > 
                  20
                </Text>
                <Text style={styles.rotuloProbabilidade}>
                  Possível
                </Text>
                <Text 
                  style={{
                  ...styles.valor, 
                  ...(data?.grauRisco?.value === 3 ? styles.risco : {}), 
                  backgroundColor: 'green'
                  }} 
                  id='3'
                > 
                  3
                </Text>
                <Text 
                  style={{
                  ...styles.valor, 
                  ...(data?.grauRisco?.value === 6 ? styles.risco : {}), 
                  backgroundColor: 'yellow'
                  }} 
                  id='6'
                > 
                  6
                </Text>
                <Text 
                  style={{
                  ...styles.valor, 
                  ...(data?.grauRisco?.value === 9 ? styles.risco : {}), 
                  backgroundColor: 'orange'
                  }} 
                  id='9'
                > 
                  9
                </Text>
                <Text 
                  style={{
                  ...styles.valor, 
                  ...(data?.grauRisco?.value === 12 ? styles.risco : {}), 
                  backgroundColor: 'orange'
                  }} 
                  id='12'
                > 
                  12
                </Text>
                <Text 
                  style={{
                  ...styles.valor, 
                  ...(data?.grauRisco?.value === 15 ? styles.risco : {}), 
                  backgroundColor: 'red'
                  }} 
                  id='15'
                > 
                  15
                </Text>
                <Text style={styles.rotuloProbabilidade}>
                  Raro
                </Text>
                <Text 
                  style={{
                  ...styles.valor, 
                  ...(data?.grauRisco?.value === 2 ? styles.risco : {}), 
                  backgroundColor: 'green'
                  }} 
                  id='2'
                > 
                  2
                </Text>
                <Text 
                  style={{
                  ...styles.valor, 
                  ...(data?.grauRisco?.value === 4 ? styles.risco : {}), 
                  backgroundColor: 'yellow'
                  }} 
                  id='4'
                > 
                  4
                </Text>
                <Text 
                  style={{
                  ...styles.valor, 
                  ...(data?.grauRisco?.value === 6 ? styles.risco : {}), 
                  backgroundColor: 'yellow'
                  }} 
                  id='6'
                > 
                  6
                </Text>
                <Text 
                  style={{
                  ...styles.valor, 
                  ...(data?.grauRisco?.value === 8 ? styles.risco : {}), 
                  backgroundColor: 'orange'
                  }} 
                  id='8'
                > 
                  8
                </Text>
                <Text 
                  style={{
                  ...styles.valor, 
                  ...(data?.grauRisco?.value === 10 ? styles.risco : {}), 
                  backgroundColor: 'orange'
                  }} 
                  id='10'
                > 
                  10
                </Text>
                <Text style={styles.rotuloProbabilidade}>
                  Improvável
                </Text>
                <Text 
                  style={{
                  ...styles.valor, 
                  ...(data?.grauRisco?.value === 1 ? styles.risco : {}), 
                  backgroundColor: 'green'
                  }} 
                  id='1'
                > 
                  1
                </Text>
                <Text 
                  style={{
                  ...styles.valor, 
                  ...(data?.grauRisco?.value === 2 ? styles.risco : {}), 
                  backgroundColor: 'green'
                  }} 
                  id='2'
                > 
                  2
                </Text>
                <Text 
                  style={{
                  ...styles.valor, 
                  ...(data?.grauRisco?.value === 3 ? styles.risco : {}), 
                  backgroundColor: 'green'
                  }} 
                  id='3'
                > 
                  3
                </Text>
                <Text 
                  style={{
                  ...styles.valor, 
                  ...(data?.grauRisco?.value === 4 ? styles.risco : {}), 
                  backgroundColor: 'yellow'
                  }} 
                  id='4'
                > 
                  4
                </Text>
                <Text 
                  style={{
                  ...styles.valor, 
                  ...(data?.grauRisco?.value === 5 ? styles.risco : {}), 
                  backgroundColor: 'orange'
                  }} 
                  id='5'
                > 
                  5
                </Text>

                <Text style={{...{width: 50}, margin: '1px'}}></Text>

                <Text style={styles.rotuloConsequencia}>
                  Desprezível
                </Text>
                <Text style={styles.rotuloConsequencia}>
                    Menor
                </Text>
                <Text style={styles.rotuloConsequencia}>
                    Moderada
                </Text>
                <Text style={styles.rotuloConsequencia}>
                    Maior
                </Text>
                <Text style={styles.rotuloConsequencia}>
                    Catastrófica
                </Text>
            </View>
         </View>
      </Page>
    </Document>
)};

export default PdfDocumentResumoSAAE;