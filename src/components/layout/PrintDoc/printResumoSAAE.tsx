'use client'
import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer';
import { dateFormat2, fileToBase64, pdfToImageBase64, signedURL } from '@/scripts/globais';
import { v4 } from 'uuid';
import { SAAE } from '@/@types/types';
import axios from 'axios';


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
    border: '2px solid #000',
    padding: 5,
    margin: 2
  },
  item2: {
    display:'flex',
    flexDirection: 'column',
    fontSize: 10,
    textAlign: 'justify',
    border: '2px solid #000',
    padding: 5,
    margin: 2
  },
  resultado: {
    display: 'flex',
    width: 220,
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 10,
    marginRight: 2,
  },
  width30: {
    width: 30,
    fontSize: 10,
    textAlign: 'justify',
    border: '2px solid #000',
    padding: 5,
    margin: 1
  },
  width60: {
    width: 50,
    fontSize: 10,
    textAlign: 'justify',
    border: '2px solid #000',
    padding: 5,
    margin: 1
  },
  width90: {
    width: 70,
    fontSize: 10,
    textAlign: 'justify',
    border: '2px solid #000',
    padding: 5,
    margin: 1,
  },
  width140: {
    width: 120,
    fontSize: 10,
    textAlign: 'justify',
    border: '2px solid #000',
    padding: 5,
    margin: 1,
  },
  width260: {
    width: 140,
    fontSize: 10,
    textAlign: 'justify',
    border: '2px solid #000',
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
    border: '2px solid blue',
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
    border: '2px solid blue',
    margin: 1,
  },
  valor: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    fontSize: 10,
    border: '2px solid blue',
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

const ImagePreview = ({file}:{file:File | string}) => {
  // const [base64, setBase64] = useState('');
  const [urlSigned, setUrlSiged] = useState('');

    //**Retorna uma string Base64*/
    const processFile = async () => {
      try {
        if(file instanceof Blob){
            if (file.type === 'application/pdf') {
              const base64String = await pdfToImageBase64(file);
              return base64String;
            } else {
              const base64String = await fileToBase64(file);
              return base64String;
            }
        }
      } catch (error) {
        console.error('Erro ao processar arquivo:', error);
        return undefined
      }
    };

  const getSignedUrl = async(url:string | File)=>{
    try{
      if (url instanceof Blob) {
        console.log("Entrou no blob", file);
        return await processFile();
      }else if( typeof url === 'string'){
        console.log("Entrou na url", url);
        const data = await signedURL(url);

        if(!data) return undefined;

        setUrlSiged(data);
        //verifica se é um PDF para gerar uma imagem de preview
        const isPDF = data?.toLowerCase().includes('.pdf');
        const isImage = /\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i.test(data);

        // Busca o PDF utilizando a URL assinada
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_SERVICES}`,{
          params:{
              service: 'proxyPDF',
              fileUrl: data
          },
          headers:{
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTORIZATION}`
          },
          responseType: 'arraybuffer' // Define o tipo de resposta como Blob
        });
      
        //console.log("blob data", response.data)
        if(!(response.data instanceof ArrayBuffer)) return undefined;

        if (isPDF) {
          const blob = new Blob([response.data], { type: 'application/pdf' });
          const file = new File([blob], "preview.pdf", { type: "application/pdf" });
      
          const previewBase64 = await pdfToImageBase64(file);
          return previewBase64;
        } else if (isImage) {
          const blob = new Blob([response.data], { type: 'image/png' }); // Ajuste o MIME type conforme necessário
          const file = new File([blob], "preview.png", { type: "image/png" });
          const previewBase64 = await fileToBase64(file);
          return previewBase64;
        } else {
          return data;
        }
      }
    }catch(error){
      console.error('Erro ao buscar URL assinada:', "URL", url, error);
      return undefined;
    }
  }

  return <View>
          <Image
              style={{ objectFit: 'contain', height: 200, width: 100}}
              // src={urlSigned ? urlSigned : typeof file == "string" ? file : undefined} // Usa o Base64 gerado como src
              source={async()=>getSignedUrl(file)} // Usa o Base64 gerado como src
          />
          {urlSigned ? <Link href={urlSigned}>
              <Text>Abrir url</Text>
          </Link>: <Text>Erro ao carregar URL</Text>}
      </View>
};

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

  React.useEffect(()=>{
    if(dataSaae)setData(dataSaae)
  },[dataSaae]);

  if(!data) return <Document>
    <Page size="A4" style={styles.page}>
      <Text>Dados não carregados</Text>
    </Page>
    </Document>
  
  return(
    <Document language='pt-br' pageMode='useThumbs' title='Resumo da SAAE' >
      <Page size="A4" style={styles.page} orientation='portrait' wrap dpi={200}>
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
                    <Text style={{...styles.width90, textAlign: 'left'}}>
                      {dateFormat2(prog?.data)}
                    </Text>
                    <Text style={{...styles.width60, textAlign: 'left'}}>
                      {prog?.hora}
                    </Text>
                    <Text style={{...styles.width60, textAlign: 'left'}}>
                      {prog?.duracao}
                    </Text>
                    <Text style={{...styles.width260, textAlign: 'left'}}>
                      {prog?.descricao}
                    </Text>
                    <Text style={{...styles.width140, textAlign: 'left'}}>
                      {prog?.materialNecessario}
                    </Text>
                    <Text style={{...styles.width90, textAlign: 'left'}}>
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
            <Text style={styles.width60}>Perigo</Text>
            <Text style={styles.width90}>Dano</Text>
            <Text style={styles.width140}>Controle Operacional</Text>
            <Text style={styles.width140}>Ações Mitigadoras</Text>
            <Text style={styles.width30}>Prob.</Text>
            <Text style={styles.width30}>Cons.</Text>
            <Text style={{...styles.width30, flexWrap: 'nowrap', textOverflow:'ellipsis', overflow: 'hidden',}}>
                N.Risco
            </Text>
          </View>
          {data?.inventarioRiscos?.sort((a,b)=> a.probabilidade - b.probabilidade)
          ?.map((item, idx)=>(
            <View key={"inventario"+idx} style={styles.line}>         
                <Text style={styles.width90}>
                  {item.atividade}
                </Text>
                <Text style={styles.width60}>
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

        <View style={styles.section}>
          <Text style={styles.title}>5. Plano de Ação:</Text>
          <Text style={styles.title2}>itens 7.5 e 9.1 da Política Nacional de Gestão de Risco</Text>
        </View>
        {/* Dados básicos */}
        <Text style={styles.title2}>Dados básicos</Text>
        <View style={styles.line}>
          <View style={styles.line}>
            <View style={styles.item}>
              <Text style={styles.bold}>Nome da atividade:</Text>
              <Text>{data?.dadosGerais?.nomeAtividade}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.bold}>Local da atividade:</Text>
              <Text>
                {data?.dadosGerais?.localInicio ?
                `${data?.dadosGerais?.localInicio?.logradouro},
                ${data?.dadosGerais?.localInicio?.bairro},
                ${data?.dadosGerais?.localInicio?.municipio},
                ${data?.dadosGerais?.localInicio?.uf},
                CEP.: ${data?.dadosGerais?.localInicio?.cep}`
                : null}
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.bold}>Fichas médicas revisadas?</Text>
              <Text>{data?.planoEmergencia?.fichaMedicaRevisada || ''}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.bold}>Kit primeiros socorros revisado?</Text>
              <Text>{data?.planoEmergencia?.kitPrimeirosSocorros || ''}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.bold}>Feito inspeção no local?</Text>
              <Text>{data?.planoEmergencia?.inspesaoLocal || ''}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.bold}>Data da inspeção?</Text>
              <Text>{dateFormat2(data?.planoEmergencia?.dataInspecao) || ''}</Text>
            </View>
          </View>
        </View>
        
        {/* Pronto Socorro mais próximo */}
        <View style={styles.section}>
          <Text style={styles.title2}>Pronto Socorro mais próximo</Text>
          <View style={styles.line}>
            <View style={styles.item}>
              <Text style={styles.bold}>Nome:</Text>
              <Text>{data?.planoEmergencia?.prontoSocorro?.nome || ''}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.bold}>Contatos:</Text>
              <Text>{data?.planoEmergencia?.prontoSocorro?.contato || ''}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.bold}>Distância do local da atividade:</Text>
              <Text>{data?.planoEmergencia?.prontoSocorro?.distancia || ''}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.bold}>Endereço:</Text>
              <Text>{data?.planoEmergencia?.prontoSocorro?.local || ''}</Text>
            </View>
          </View>
        </View>

        {/* Hospital mais próximo */}
        <View style={styles.section}>
          <Text style={styles.title2}>Hospital mais próximo</Text>
          <View style={styles.line}>
            <View style={styles.item}>
              <Text style={styles.bold}>Nome:</Text>
              <Text>{data?.planoEmergencia?.hospital?.nome || ""}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.bold}>Contatos:</Text>
              <Text>{data?.planoEmergencia?.hospital?.contato || ""}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.bold}>Distância do local da atividade:</Text>
              <Text>{data?.planoEmergencia?.hospital?.distancia || ""}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.bold}>Endereço:</Text>
              <Text>{data?.planoEmergencia?.hospital?.local || ""}</Text>
            </View>
          </View>
        </View>

        {/* Contatos de Emergência */}
        <View style={styles.section}>
          <Text style={styles.title2}>Contatos de Emergência</Text>
          {data?.planoEmergencia?.contatosEmergencia?.map((cont, idx) => (
            <View key={idx + 'contatosEmerg'} style={styles.line2}>
              <View style={styles.item}>
                <Text style={styles.bold}>Nome do contato:</Text>
                <Text>{cont.nome || ''}</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.bold}>Contato:</Text>
                <Text>{cont.contato || ''}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Espaços Seguros */}
        <View style={styles.section}>
          <Text style={styles.title2}>Espaços Seguros</Text>
          <View style={styles.line}>
            <View style={styles.item}>
              <Text style={styles.bold}>As informações preliminares foram claramente passadas para os envolvidos?</Text>
              <Text>{data?.planoEmergencia?.espacosSeguros?.infosPreliminares || ''}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.bold}>As informações médicas estão guardadas de forma confidencial e de fácil acesso ao coordenador ou enfermaria da atividade?</Text>
              <Text>{data?.planoEmergencia?.espacosSeguros?.infosMedicas || ''}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.bold}>Os responsáveis pela atividade estão cientes que nenhuma informação pessoal dos participantes deve ser transmitida a terceiros ou utilizada sem a devida autorização expressa de seus responsáveis, exceto em caso de emergência médica, policial ou por força de lei?</Text>
              <Text>{data?.planoEmergencia?.espacosSeguros?.protecaoDados || ''}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.bold}>O coordenador e os escotistas envolvidos possuem o curso de Proteção Infantojuvenil, Bullying e CyberBullying e Política Nacional de Espaço Seguro com validade de 1 ano?</Text>
              <Text>{data?.planoEmergencia?.espacosSeguros?.cursosEscotistas || ''}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.bold}>O canal de denúncias foi informado nas Informações Preliminares?</Text>
              <Text>{data?.planoEmergencia?.espacosSeguros?.canalDenuncias || ''}</Text>
            </View>
          </View>
        </View>

        {/* Acolhimento/Escuta */}
        {['orange', 'red'].includes(data?.grauRisco?.color) ?
          <View style={styles.section}>
              <Text style={styles.title2}>Pessoa(s) do Acolhimento/Escuta</Text>
              
              {data?.planoEmergencia?.espacosSeguros?.acolhimento?.map((acolh, idx) => (
              <View style={styles.line} key={idx + 'acolhimento'}>
                <View style={styles.item}>
                    <Text>Nome</Text>
                    <Text>{acolh.nome || ''}</Text>
                </View>
                <View style={styles.item}>
                    <Text>Contato</Text>
                    <Text>{acolh.contato || ''}</Text>
                </View>
                <View style={styles.item}>
                    <Text>Profissão</Text>
                    <Text>{acolh.profissao || ''}</Text>
                </View>
                <View style={styles.item}>
                    <Text>Registro Escoteiro</Text>
                    <Text>{acolh.regEscoteiro || ''}</Text>
                </View>
                <View style={styles.item}>
                    <Text>CPF</Text>
                    <Text>{acolh.cpf || ''}</Text>
                </View>
                <View style={styles.item}>
                    <Text>Nº Carteirinha Classe</Text>
                    <Text>{acolh.numCarteirinhaClass || ''}</Text>
                </View>
                <View style={styles.line}>
                  <View style={styles.item}>
                    <Text style={styles.title2}>Documentos</Text>
                    {acolh?.docs?.map((doc, idxDoc) => (
                    <View key={idxDoc + 'docsAcolhimento'} style={styles.item2}>
                        <Text>{doc.titulo}</Text>
                        <ImagePreview 
                          file={doc.doc}
                        />
                    </View>
                    ))}
                  </View>=
                </View>
            </View>
          ))}
          </View>
        :null}

        {/* Enfermaria */}
        <View style={styles.section}>
            <Text style={styles.title2}>Pessoa(s) da Enfermaria</Text>
            
            {data?.planoEmergencia?.espacosSeguros?.enfermaria?.map((enf, idx) => (
            <View style={styles.line} key={idx + 'enfermaria'}>
              <View style={styles.item}>
                  <Text style={styles.bold}>Nome</Text>
                  <Text>{enf.nome || ''}</Text>
              </View>
              <View style={styles.item}>
                  <Text style={styles.bold}>Contato</Text>
                  <Text>{enf.contato || ''}</Text>
              </View>
              <View style={styles.item}>
                  <Text style={styles.bold}>Profissão</Text>
                  <Text>{enf.profissao || ''}</Text>
              </View>
              <View style={styles.item}>
                  <Text style={styles.bold}>Registro Escoteiro</Text>
                  <Text>{enf.regEscoteiro || ''}</Text>
              </View>
              <View style={styles.item}>
                  <Text style={styles.bold}>CPF</Text>
                  <Text>{enf.cpf || ''}</Text>
              </View>
              <View style={styles.item}>
                  <Text style={styles.bold}>Nº Carteirinha Classe</Text>
                  <Text>{enf.numCarteirinhaClass || ''}</Text>
              </View>
              <View style={styles.line}>
                  <View style={styles.item}>
                    <Text style={styles.title2}>Documentos</Text>
                    {enf?.docs?.map((doc, idxDoc) => (
                    <View key={idxDoc + 'docsEnfermaria'} style={styles.item2}>
                        <Text>{doc.titulo}</Text>
                        <ImagePreview file={doc.doc as string}/>
                    </View>
                    ))}
                  </View>
              </View>
            </View>
            ))}
        </View>


        {/* Veículo de Emergência/Apoio */}
        {['orange', 'red'].includes(data?.grauRisco?.color) ?
          <>
          <View style={styles.section}>
              <Text style={styles.title2}>Veículo de Emergência/Apoio</Text>
              {data?.planoEmergencia?.veiculos?.map((veic, idx)=>(
              <View style={styles.line} key={idx+'veiculos'}>
                <View style={styles.item}>
                  <Text style={styles.bold}>Tipo de veículo</Text>
                  <Text>{veic.tipoVeiculo || ''}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.bold}>Nome do condutor</Text>
                  <Text>{veic.nomeMotorista|| ''}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.bold}>Contato</Text>
                  <Text>{veic.contato|| ''}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.bold}>Profissão</Text>
                  <Text>{veic.profissao|| ''}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.bold}>Reg. Escoteiro</Text>
                  <Text>{veic.regEscoteiro|| ''}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.bold}>Tipo/Nº da Habilitação do condutor</Text>
                  <Text>{veic.habilitacao|| ''}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.bold}>CPF do condutor</Text>
                  <Text>{veic.cpf|| ''}</Text>
                </View>   
                <View style={styles.item}>
                  <Text style={styles.bold}>Manutenção preventiva em dia?</Text>
                  <Text>{veic.manutencao || ''}</Text>
                </View>  

                <View style={styles.line}>
                  <View style={styles.item}>
                    <Text style={styles.title2}>Documentos do condutor</Text>
                    {veic?.docs?.map((doc, idxDoc) => (
                    <View key={idxDoc + 'docsVeiculo'} style={styles.item2}>
                        <Text>{doc.titulo}</Text>
                        <ImagePreview file={doc.doc as string}/>
                    </View>
                    ))}
                  </View>
              </View>
              </View>
              ))}
          </View>

          {/* Atividade conduzida por profissional */}
          <View style={styles.section}>
              <Text style={styles.title2}>Profissional</Text>
              <Text style={styles.title2}>quando a atividade for conduzida por profissionais</Text>
              {data?.planoEmergencia?.atividadePorProfissional?.map((prof, idx)=>(
              <View style={styles.line} key={idx+'ativProf'}>
                <View style={styles.item}>
                  <Text style={styles.bold}>Nome</Text>
                  <Text>{prof.nomeProf || ''}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.bold}>Profissão</Text>
                  <Text>{prof.profissao|| ''}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.bold}>Registro Escoteiro</Text>
                  <Text>{prof.regEscoteiro|| ''}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.bold}>CPF</Text>
                  <Text>{prof.cpf|| ''}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.bold}>Nº da Carteirinha de Classe</Text>
                  <Text>{prof.numCarteirinha|| ''}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.bold}>Contato</Text>
                  <Text>{prof.contato|| ''}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.bold}>Redes Sociais</Text>
                  {prof.redesSociais?.map((social, sIdx)=>(
                      <Link key={sIdx+'linkSocialMidia'} href={social}>
                        {social || ''}
                      </Link>                              
                  ))}
                </View>
                <View style={styles.line}>
                  <View style={styles.item}>
                    <Text style={styles.title2}>Documentos</Text>
                    {prof?.docs?.map((doc, idxDoc) => (
                    <View key={idxDoc + 'docsEnfermaria'} style={styles.item2}>
                        <Text>{doc.titulo}</Text>
                        <ImagePreview file={doc.doc as string}/>
                    </View>
                    ))}
                  </View>
              </View>
              </View>
              ))}
          </View>
          </>
        :null}

        {/* Profissional Resgate/Salvamento  */}
        {['red'].includes(data?.grauRisco?.color) ?
          <>
          <View style={styles.section}>
              <Text style={styles.title2}>Profissional Resgate/Salvamento</Text>
              {data?.planoEmergencia?.profSalvamento?.map((salv, idx)=>(
                <View style={styles.line} key={idx+'salvamento'}>
                  <View style={styles.item}>
                    <Text style={styles.bold}>Nome</Text>
                    <Text>{salv.nome || ''}</Text>
                  </View>
                <View style={styles.item}>
                  <Text style={styles.bold}>Profissão</Text>
                  <Text>{salv.profissao || ''}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.bold}>CPF</Text>
                  <Text>{salv.cpf || ''}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.bold}>Nº Carteirinha Classe</Text>
                  <Text>{salv.numCarteirinhaClass || ''}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.bold}>Registro Escoteiro</Text>
                  <Text>{salv.regEscoteiro || ''}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.bold}>Contato</Text>
                  <Text>{salv.contato || ''}</Text>
                </View>
                <View style={styles.line}>
                  <View style={styles.item}>
                    <Text style={styles.title2}>Documentos</Text>
                    {salv?.docs?.map((doc, idxDoc) => (
                    <View key={idxDoc + 'docsEnfermaria'} style={styles.item2}>
                        <Text>{doc.titulo}</Text>
                        <ImagePreview file={doc.doc as string}/>
                    </View>
                    ))}
                  </View>
              </View>
            </View>
            ))}
          </View>
          </>
        :null}

        {/* Fotos da inspeção  */}
        <View style={styles.section}>
            <Text style={styles.title2}>6. Fotos do local/inspeção</Text>
            {data?.fotosInspecao?.map((session)=>(
              <View key={session?.title+'fotosInspecao'} style={styles.line}>
                {session?.fotos.map((foto, idx)=>(
                    <View key={idx+'viewCurrentFoto'} style={styles.item}>
                      <View style={styles.item}>
                          <View>
                              <Text>Rótulo da imagem</Text>
                              <Text>{foto.title || ''}</Text>
                          </View>
                          <View>
                              <Text>Observações</Text>
                              <Text>{foto.description || ''}</Text>
                          </View>
                      </View>
                      <ImagePreview file={foto.doc}/>
                    </View> 
                ))}
              </View>
            ))}
        </View>

        {/* Documentos adicionais  */}
        <View style={styles.section}>
            <Text style={styles.title2}>7. Documentos adicionais</Text>
            {data?.documentos?.map((session)=>(
              <View key={session?.title+'Documentos'} style={styles.line}>
                {session?.docs.map((doc, idx)=>(
                    <View key={idx+'viewCurrentDoc'} style={styles.item}>
                      <View style={styles.item}>
                          <View>
                              <Text>Rótulo da Documento:</Text>
                              <Text>{doc.title || ''}</Text>
                          </View>
                          <View>
                              <Text>Observações:</Text>
                              <Text>{doc.description || ''}</Text>
                          </View>
                      </View>
                      <ImagePreview file={doc.doc}/>
                    </View> 
                ))}
              </View>
            ))}
        </View>
      </Page>
    </Document>
)};

export default PdfDocumentResumoSAAE;