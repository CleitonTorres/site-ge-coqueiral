'use client'
import { DataNews, DataStorage, ProfileProps, SAAE } from "@/@types/types";
import { createCookie, destroyCookie, getCookie, verifyObjSAAE } from "@/scripts/globais";
import { createDb, deleteDataStorage, getAllDataStorage, putNewData } from "@/scripts/indexedDB";
import axios from "axios";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import Modal from "../layout/modal/modal";

type PropsContext ={
  dataNews: DataNews[],
  dataUser: ProfileProps,
  recoverProfile: ()=>Promise<void>,
  verifySession: ()=>boolean,
  setDataSaae: Dispatch<SetStateAction<SAAE>>,
  dataSaae: SAAE,
  setDataStorage: Dispatch<SetStateAction<DataStorage[]>>,
  dataStorage: DataStorage[],
  setSaaeEdit: Dispatch<SetStateAction<number | string | undefined>>,
  saaeEdit: number | string | undefined,
  handleSendSaae: (saae:SAAE)=>Promise<{
    bool: boolean | undefined,
    text: string
  }>,
  listSaaes: SAAE[],
  setListSaaes: Dispatch<SetStateAction<SAAE[]>>,
  setTester: Dispatch<SetStateAction<ProfileProps | undefined>>,
  tester: ProfileProps | undefined,
  setShowModal: Dispatch<SetStateAction<{element: JSX.Element, styles?: string[]} | null>>,
  elementoToPrint: JSX.Element | null, 
  setElementoToPrint: Dispatch<SetStateAction<JSX.Element | null>>
}



/**
 * SAAEs enviadas para a região. 
 * @param {DataNews[]} dataNews - lista de notícias salvas no DB.
 * @param {ProfileProps} dataUser - dados de perfil do usuário.
 * @param {()=>Promise<void>} recoverProfile - recupera e valida os dados do token do usuario.
 * @param {()=>boolean} verifySession - valida o token do usuário.
 * @param {Dispatch<SetStateAction<SAAE>>} setDataSaae - acessa e altera o estado da SAAE em preenchimento.
 * @param {SAAE} dataSaae - dados da SAAE em preenchimento.
 * @param {Dispatch<SetStateAction<DataStorage[]>>} setDataStorage - acessa o estado da lista de SAAEs salvas em rascunho no storage local do navegador.
 * @param {DataStorage[]} dataStorage - lista de SAAEs salvas em rascunhos no armazenamento local do navegador.
 * @param {Dispatch<SetStateAction<number | string | undefined>>} setSaaeEdit - acessa o estado do id da SAAE em edição.
 * @param {number} saaeEdit - o ID da SAAE em edição.
 * @param {(saae:SAAE)=>Promise<{bool: boolean | undefined, text: string}>} sendSaae - envia a SAAE em edição para a Região e o DB.
 * @param {SAAE[]} listSaaes - lista de SAAEs enviadas para a Região.
 * @param {Dispatch<SetStateAction<SAAE[]>>} setListSaaes - acessa o estado da lista de SAAEs enviadas para a Região.
 * @param {Dispatch<SetStateAction<{element: JSX.Element, styles?: string[]} | null>>} setShowModal - acessa o estado do modal de carregamento.
 * @param {JSX.Element | null} elementoToPrint - elemento a ser impresso.
 * @param {Dispatch<SetStateAction<JSX.Element | null>>} - setElementoToPrint - acessa o estado do elemento a ser impresso.
 * @returns
*/
export const Context = createContext( {} as PropsContext );

export default function Provider({children}:{children:ReactNode}){
    const [dataNews, setDataNewsHome] = useState<DataNews[]>([]);
    const [dataUser, setDataUser] = useState({} as ProfileProps);
    const [tester, setTester] = useState<ProfileProps>();
    const [elementoToPrint, setElementoToPrint] = useState<JSX.Element | null>(null);

    //SAAEs em edição
    const [dataSaae, setDataSaae] = useState({} as SAAE);

    //SAAEs enviadas para a região.
    const [listSaaes, setListSaaes] = useState<SAAE[]>([]);

    //lista de SAAEs salvas em rascunhos no armazenamento local.
    const [dataStorage, setDataStorage] = useState<DataStorage[]>([]);
    //identificação da SAAE salva em rascunhos no armazenamento local.
    const [saaeEdit, setSaaeEdit] = useState<number | string | undefined>();

    const [showModal, setShowModal] = useState<{element: JSX.Element, styles?: string[]} | null>(null);

    /**
     * Recupera as notícias do DB para o site.
    */
    const getNews = async()=>{
      if(dataNews.length > 0) return;

      let data:DataNews[] = [];
      await axios.get(`${process.env.NEXT_PUBLIC_URL_SERVICES}`,{
        params:{
          service: 'news'
        },
        headers:{
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTORIZATION}`
        }
      })
      .then((resp)=>{
        data = resp.data.news;

        setDataNewsHome(data);        
      })
      .catch(err=> console.log(err))
    }    

    /**
     * Recupera e valida os dados do token do usuario.
    */
    const recoverProfile = async()=>{
      //caso esteja vindo da página de login.
      const token = getCookie();

      if(!token){
          window.location.href ='/administrativo';
          return;
      }

      // Verificar a validade do cookie com base no maxAge
      const dataMatch = token.expires ? Date.now() < token.expires : false;
      
      if(!dataMatch){
          console.log("token expirado!")
          window.location.href ='/administrativo';
      }else{
          destroyCookie('coqueiralSite')
          createCookie(token)
          setDataUser({...token, token: `${process.env.NEXT_PUBLIC_AUTORIZATION}`})
          return;
      }
    } 

    /**
     * Verifica se o token do usuário é válido.
     * @returns {boolean} - true se o token é válido, false se não for.
    */
    const verifySession = ()=>{
      //caso esteja vindo da página de login.
      const token = getCookie();

      if(!token){
        return false;
      }

      // Verificar a validade do cookie com base no maxAge
      const dataMatch = token.expires ? Date.now() < token.expires : false;

      if(!dataMatch){
          return false
      }

      return true;
    }

    /**
     * Atualiza o armazenamento local com a SAAE em edição.
    */
    const updateStorage = async () => {
      //entra nesse if quando a é uma nova SAAE ou uma SAAE salva em rascunho.
      //SAAEs que não tem um _id do mongo.
      if(typeof saaeEdit === 'number' && saaeEdit || saaeEdit !== 0){
        putNewData('saae',{dataSaae, user: dataUser, id: saaeEdit as number});
        setDataStorage((prev)=>{
          const newData = prev.map(item=>{
            if(item.id === saaeEdit){
              return{
                ...item,
                dataSaae,
                user: dataUser
              }
            }else{
              return item;
            }
          });
          return newData;
        });
      }else if(typeof saaeEdit === 'number' && saaeEdit === 0){//cria uma nova SAAE
        const key = await putNewData('saae',{dataSaae: {} as SAAE, user: dataUser});
        console.log("criado nova saae", key);
        setSaaeEdit(key as number);
        setDataStorage((prev)=>{
          return [
            ...prev,
            {dataSaae: {} as SAAE, user: dataUser, id: key as number}
          ]
        });
      }
    }

    /**
     * Lida com as opções de cadastar nova SAAE ou editar uma SAAE já enviada.
     * @param {SAAE} data - SAAE a ser enviada.
    */
    const handleSendSaae = async (data:SAAE)=>{
      try{
        if(data._id && typeof data._id === 'string'){
          return await sendEditSaae(data);
        }else{
          return await sendSaae(data)
        }
      }catch(e){
        if (axios.isAxiosError(e)) {
          // Se o erro for gerado pelo Axios
          console.error("Erro Axios:", e.response?.data || e.message);
          
          // Capturando os detalhes da resposta
          if (e.response) {
            console.error("Status:", e.response.status);
            console.error("Dados:", e.response.data);
          }
        } else {
          // Se for outro tipo de erro
          console.error("Erro inesperado:", e);
        }
        return{
          bool: true,
          text: 'Ocorreu um erro ao tentar enviar a correção da sua SAAE!'
        }
      }
    }

    /**
     * Envia a SAAE para a Avaliação e o DB.
     * @param {SAAE} data - SAAE a ser enviada.
    */
    const sendSaae= async(data:SAAE)=>{
      if(!data.dadosGerais || !data.planoEmergencia){ 
        return{
          bool: undefined,
          text: 'Faltam dados para enviar sua SAAE!'
        }
      };

      const formData = new FormData();
      formData.append('bucketName', 'site-coqueiral-saae');
      formData.append('destinationFolder', 'saaes');

      //verifica se existem novos arquivos para serem anexos à SAAE e salvos no Buncket.
      const verificar:{
        field:string
      }[] = [];

      // Adicionar arquivos
      data.fotosInspecao?.forEach((item, index) => {
          item.fotos.forEach((foto, fotoIndex) => {
            verificar.push({field: `fotosInspecao-${index}-${fotoIndex}`});
            formData.append(`fotosInspecao-${index}-${fotoIndex}`, foto.doc);
          });
      });
  
      data.documentos?.forEach((item, index) => {
          item.docs.forEach((doc, docIndex) => {
            verificar.push({field: `documentos-${index}-${docIndex}`});
            formData.append(`documentos-${index}-${docIndex}`, doc.doc);
          });
      });
  
      data.planoEmergencia?.espacosSeguros?.acolhimento?.forEach((item, index) => {
        item.docs.forEach((doc, docIndex) => {
          verificar.push({field: `acolhimento-${index}-${docIndex}`});
          formData.append(`acolhimento-${index}-${docIndex}`, doc.doc);
        });
      });

      data.planoEmergencia?.espacosSeguros?.enfermaria?.forEach((item, index) => {
        item.docs.forEach((doc, docIndex) => {
          verificar.push({field: `enfermaria-${index}-${docIndex}`});
          formData.append(`enfermaria-${index}-${docIndex}`, doc.doc);
        });
      });

      data.planoEmergencia?.veiculos?.forEach((item, index) => {
        item.docs.forEach((doc, docIndex) => {
          verificar.push({field: `veiculos-${index}-${docIndex}`});
          formData.append(`veiculos-${index}-${docIndex}`, doc.doc);
        });
      });

      data.planoEmergencia?.atividadePorProfissional?.forEach((item, index) => {
        item.docs.forEach((doc, docIndex) => {
          verificar.push({field: `atividadePorProfissional-${index}-${docIndex}`});
          formData.append(`atividadePorProfissional-${index}-${docIndex}`, doc.doc);
        });
      });

      data.planoEmergencia?.profSalvamento?.forEach((item, index) => {
        item.docs.forEach((doc, docIndex) => {
          verificar.push({field: `profSalvamento-${index}-${docIndex}`});
          formData.append(`profSalvamento-${index}-${docIndex}`, doc.doc);
        });
      });

      //se existir algum file significa que foi incluído arquivos.
      //então faz-se o upload deles
      if(verificar.length > 0){
        const response = await axios.post(`${process.env.NEXT_PUBLIC_URL_UPLOAD}/uploadFilesSAAE/`, formData, {
          headers:{
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTORIZATION}`
          }
        });

        //após o upload dos arquivos anexas na etapa de edição, fazemos a alteração do aquivo file 
        // pelo URL de onde o arquivo foi salvo no Buncket.
        if(response && response.data.filesUpdated){            
          const dataResp = response.data as {
            message: string, 
            filesUpdated:{
              sectionName: string,
              sectionIdx: number,
              docIdx: number,
              docUrl: string
          }[]}
          dataResp.filesUpdated?.forEach((item)=>{
            if(item.sectionName === 'fotosInspecao'){
              const newData = data.fotosInspecao?.map((s, idx)=> {
                if(item.sectionIdx === idx){
                    const newData= s.fotos.map((f, fIdx)=>{
                      if(item.docIdx === fIdx){
                        return {
                          ...f,
                          doc: item.docUrl
                        }
                      }else return f
                    });
                    return {
                      ...s,
                      fotos: newData
                    }
                }else return s;
              })
              data = {
                ...data,
                fotosInspecao: newData
              }
            }else if(item.sectionName === 'documentos'){
              const newData = data.documentos?.map((s, idx)=> {
                if(item.sectionIdx === idx){
                    const newData= s.docs.map((d, fIdx)=>{
                      if(item.docIdx === fIdx){
                        return {
                          ...d,
                          doc: item.docUrl
                        }
                      }else return d
                    });
                    return {
                      ...s,
                      docs: newData
                    }
                }else return s;
              });

              data = {
                ...data,
                documentos: newData
              }
            }else if(item.sectionName === 'acolhimento'){
              const newData = data.planoEmergencia.espacosSeguros.acolhimento?.map((s, idx)=> {
                if(item.sectionIdx === idx){
                    const newData= s.docs.map((d, fIdx)=>{
                      if(item.docIdx === fIdx){
                        return {
                          ...d,
                          doc: item.docUrl
                        }
                      }else return d
                    });
                    return {
                      ...s,
                      docs: newData
                    }
                }else return s;
              });
              
              data = {
                ...data,
                planoEmergencia: {
                  ...data.planoEmergencia,
                  espacosSeguros:{
                    ...data.planoEmergencia.espacosSeguros,
                    acolhimento: newData
                  }
                }
              }
            }else if(item.sectionName === 'enfermaria'){
              const newData = data.planoEmergencia.espacosSeguros.enfermaria?.map((s, idx)=> {
                if(item.sectionIdx === idx){
                    const newData= s.docs.map((d, fIdx)=>{
                      if(item.docIdx === fIdx){
                        return {
                          ...d,
                          doc: item.docUrl
                        }
                      }else return d
                    });
                    return {
                      ...s,
                      docs: newData
                    }
                }else return s;
              });
              
              data = {
                ...data,
                planoEmergencia: {
                  ...data.planoEmergencia,
                  espacosSeguros:{
                    ...data.planoEmergencia.espacosSeguros,
                    enfermaria: newData
                  }
                }
              }
            }else if(item.sectionName === 'veiculos'){
              const newData = data.planoEmergencia.veiculos?.map((s, idx)=> {
                if(item.sectionIdx === idx){
                    const newData= s.docs.map((d, fIdx)=>{
                      if(item.docIdx === fIdx){
                        return {
                          ...d,
                          doc: item.docUrl
                        }
                      }else return d
                    });
                    return {
                      ...s,
                      docs: newData
                    }
                }else return s;
              });
              
              data = {
                ...data,
                planoEmergencia: {
                  ...data.planoEmergencia,
                  veiculos: newData
                }
              }
            }else if(item.sectionName === 'atividadePorProfissional'){
              const newData = data.planoEmergencia.atividadePorProfissional?.map((s, idx)=> {
                if(item.sectionIdx === idx){
                    const newData= s.docs.map((d, fIdx)=>{
                      if(item.docIdx === fIdx){
                        return {
                          ...d,
                          doc: item.docUrl
                        }
                      }else return d
                    });
                    return {
                      ...s,
                      docs: newData
                    }
                }else return s;
              });
              
              data = {
                ...data,
                planoEmergencia: {
                  ...data.planoEmergencia,
                  atividadePorProfissional: newData
                }
              }
            }else if(item.sectionName === 'profSalvamento'){
              const newData = data.planoEmergencia.profSalvamento?.map((s, idx)=> {
                if(item.sectionIdx === idx){
                    const newData= s.docs.map((d, fIdx)=>{
                      if(item.docIdx === fIdx){
                        return {
                          ...d,
                          doc: item.docUrl
                        }
                      }else return d
                    });
                    return {
                      ...s,
                      docs: newData
                    }
                }else return s;
              });
              
              data = {
                ...data,
                planoEmergencia: {
                  ...data.planoEmergencia,
                  profSalvamento: newData
                }
              }
            }
          })
        }
        //---------------------------------
        console.log("entrou em enviar arquivos", verificar.length, response.data.filesUpdated);
      }else{
        console.log("sem novos arquivos para enviar");
      }

      // Adicionar os dados do SAAE como JSON para serem salvos no DB.
      const formDataPost = new FormData();
      formDataPost.append('saaeData', JSON.stringify({...data, status: 'enviada'}));
  
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_URL_UPLOAD}/uploadSaae/`, formDataPost, {
          headers:{
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTORIZATION}`
          }
        })
    
        const result = response.data as {message: string, insertId:string};
        console.log(result);

        setListSaaes((prev)=> [...prev, {...data, _id: result.insertId, status: 'enviada'}]);
        setDataSaae({} as SAAE);
        deleteDataStorage('saae', saaeEdit! as number)
        setSaaeEdit(undefined);

        return{
          bool: true,
          text: 'SAAE enviada com sucesso!'
        }
      }catch(error){
        if (axios.isAxiosError(error)) {
          // Se o erro for gerado pelo Axios
          console.error("Erro Axios:", error.response?.data || error.message);
          
          // Capturando os detalhes da resposta
          if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Dados:", error.response.data);
          }
        } else {
          // Se for outro tipo de erro
          console.error("Erro inesperado:", error);
        }
        return{
          bool: true,
          text: 'Ocorreu um erro ao tentar enviar sua SAAE!'
        }
      }
    }

    /**
     * Envia a SAAE editada para a Avaliação e o DB.
     * @param {SAAE} data - SAAE editada.
    */
    const sendEditSaae= async(data:SAAE)=>{
      try{
        if(!data.dadosGerais || !data.planoEmergencia){ 
          return{
            bool: undefined,
            text: 'Faltam dados para enviar sua SAAE!'
          }
        };

        const locationOriginalSAAE = listSaaes.find(s=> s._id === data._id);

        if(!locationOriginalSAAE) return{
          bool: undefined,
          text: 'Desculpe, mas não consegui encontrar a SAAE Original.'
        }

        // console.log('encontrou a original', locationOriginalSAAE);
        // console.log("SAAE editada", data)

        //antes de verificar as edições dos dados da SAAE, verifico se existe algum arquivo carregado do 
        // dispositivo do usupario "File", se existe é porque houve um carregamento de novo arquivo.
        //então deve ser enviado para o buncket
        const formData = new FormData();
        formData.append('bucketName', 'site-coqueiral-saae');
        formData.append('destinationFolder', 'saaes');
        
        //verifica se existem novos arquivos para serem anexos à SAAE e salvos no Buncket.
        const verificar:{
          field:string
        }[] = [];

        // Adicionar arquivos
        data.fotosInspecao?.forEach((item, index) => {
            item.fotos.forEach((foto, fotoIndex) => {
              if (foto.doc instanceof File)
                verificar.push({field: `fotosInspecao-${index}-${fotoIndex}`});
                formData.append(`fotosInspecao-${index}-${fotoIndex}`, foto.doc);
            });
        });
    
        data.documentos?.forEach((item, index) => {
            item.docs.forEach((doc, docIndex) => {
              if (doc.doc instanceof File)
                verificar.push({field: `documentos-${index}-${docIndex}`});
                formData.append(`documentos-${index}-${docIndex}`, doc.doc);
            });
        });
    
        data.planoEmergencia?.espacosSeguros?.acolhimento?.forEach((item, index) => {
          item.docs.forEach((doc, docIndex) => {
            if (doc.doc instanceof File)
              verificar.push({field: `acolhimento-${index}-${docIndex}`});
              formData.append(`acolhimento-${index}-${docIndex}`, doc.doc);
          });
        });

        data.planoEmergencia?.espacosSeguros?.enfermaria?.forEach((item, index) => {
          item.docs.forEach((doc, docIndex) => {
            if (doc.doc instanceof File)
            verificar.push({field: `enfermaria-${index}-${docIndex}`});
            formData.append(`enfermaria-${index}-${docIndex}`, doc.doc);
          });
        });

        data.planoEmergencia?.veiculos?.forEach((item, index) => {
          item.docs.forEach((doc, docIndex) => {
            if (doc.doc instanceof File)
            verificar.push({field: `veiculos-${index}-${docIndex}`});
            formData.append(`veiculos-${index}-${docIndex}`, doc.doc);
          });
        });

        data.planoEmergencia?.atividadePorProfissional?.forEach((item, index) => {
          item.docs.forEach((doc, docIndex) => {
            if (doc.doc instanceof File)
            verificar.push({field: `atividadePorProfissional-${index}-${docIndex}`});            
            formData.append(`atividadePorProfissional-${index}-${docIndex}`, doc.doc);
          });
        });

        data.planoEmergencia?.profSalvamento?.forEach((item, index) => {
          item.docs.forEach((doc, docIndex) => {
            if (doc.doc instanceof File)
            verificar.push({field: `profSalvamento-${index}-${docIndex}`});
            formData.append(`profSalvamento-${index}-${docIndex}`, doc.doc);
          });
        });

        //se existir algum file significa que foi incluído novos arquivos.
        //então faz-se o upload dos novos arquivos
        if(verificar.length > 0){
          const response = await axios.post(`${process.env.NEXT_PUBLIC_URL_UPLOAD}/uploadFilesSAAE/`, formData, {
            headers:{
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTORIZATION}`
            }
          });

          //após o upload dos arquivos anexas na etapa de edição, fazemos a alteração do aquivo file 
          // pelo URL de onde o arquivo foi salvo no Buncket.
          if(response && response.data.filesUpdated){            
            const dataResp = response.data as {
              message: string, 
              filesUpdated:{
                sectionName: string,
                sectionIdx: number,
                docIdx: number,
                docUrl: string
            }[]}
            dataResp.filesUpdated?.forEach((item)=>{
              if(item.sectionName === 'fotosInspecao'){
                const newData = data.fotosInspecao?.map((s, idx)=> {
                  if(item.sectionIdx === idx){
                      const newData= s.fotos.map((f, fIdx)=>{
                        if(item.docIdx === fIdx){
                          return {
                            ...f,
                            doc: item.docUrl
                          }
                        }else return f
                      });
                      return {
                        ...s,
                        fotos: newData
                      }
                  }else return s;
                })
                data = {
                  ...data,
                  fotosInspecao: newData
                }
              }else if(item.sectionName === 'documentos'){
                const newData = data.documentos?.map((s, idx)=> {
                  if(item.sectionIdx === idx){
                      const newData= s.docs.map((d, fIdx)=>{
                        if(item.docIdx === fIdx){
                          return {
                            ...d,
                            doc: item.docUrl
                          }
                        }else return d
                      });
                      return {
                        ...s,
                        docs: newData
                      }
                  }else return s;
                });

                data = {
                  ...data,
                  documentos: newData
                }
              }else if(item.sectionName === 'acolhimento'){
                const newData = data.planoEmergencia.espacosSeguros.acolhimento?.map((s, idx)=> {
                  if(item.sectionIdx === idx){
                      const newData= s.docs.map((d, fIdx)=>{
                        if(item.docIdx === fIdx){
                          return {
                            ...d,
                            doc: item.docUrl
                          }
                        }else return d
                      });
                      return {
                        ...s,
                        docs: newData
                      }
                  }else return s;
                });
                
                data = {
                  ...data,
                  planoEmergencia: {
                    ...data.planoEmergencia,
                    espacosSeguros:{
                      ...data.planoEmergencia.espacosSeguros,
                      acolhimento: newData
                    }
                  }
                }
              }else if(item.sectionName === 'enfermaria'){
                const newData = data.planoEmergencia.espacosSeguros.enfermaria?.map((s, idx)=> {
                  if(item.sectionIdx === idx){
                      const newData= s.docs.map((d, fIdx)=>{
                        if(item.docIdx === fIdx){
                          return {
                            ...d,
                            doc: item.docUrl
                          }
                        }else return d
                      });
                      return {
                        ...s,
                        docs: newData
                      }
                  }else return s;
                });
                
                data = {
                  ...data,
                  planoEmergencia: {
                    ...data.planoEmergencia,
                    espacosSeguros:{
                      ...data.planoEmergencia.espacosSeguros,
                      enfermaria: newData
                    }
                  }
                }
              }else if(item.sectionName === 'veiculos'){
                const newData = data.planoEmergencia.veiculos?.map((s, idx)=> {
                  if(item.sectionIdx === idx){
                      const newData= s.docs.map((d, fIdx)=>{
                        if(item.docIdx === fIdx){
                          return {
                            ...d,
                            doc: item.docUrl
                          }
                        }else return d
                      });
                      return {
                        ...s,
                        docs: newData
                      }
                  }else return s;
                });
                
                data = {
                  ...data,
                  planoEmergencia: {
                    ...data.planoEmergencia,
                    veiculos: newData
                  }
                }
              }else if(item.sectionName === 'atividadePorProfissional'){
                const newData = data.planoEmergencia.atividadePorProfissional?.map((s, idx)=> {
                  if(item.sectionIdx === idx){
                      const newData= s.docs.map((d, fIdx)=>{
                        if(item.docIdx === fIdx){
                          return {
                            ...d,
                            doc: item.docUrl
                          }
                        }else return d
                      });
                      return {
                        ...s,
                        docs: newData
                      }
                  }else return s;
                });
                
                data = {
                  ...data,
                  planoEmergencia: {
                    ...data.planoEmergencia,
                    atividadePorProfissional: newData
                  }
                }
              }else if(item.sectionName === 'profSalvamento'){
                const newData = data.planoEmergencia.profSalvamento?.map((s, idx)=> {
                  if(item.sectionIdx === idx){
                      const newData= s.docs.map((d, fIdx)=>{
                        if(item.docIdx === fIdx){
                          return {
                            ...d,
                            doc: item.docUrl
                          }
                        }else return d
                      });
                      return {
                        ...s,
                        docs: newData
                      }
                  }else return s;
                });
                
                data = {
                  ...data,
                  planoEmergencia: {
                    ...data.planoEmergencia,
                    profSalvamento: newData
                  }
                }
              }
            })
          }

        }else{
          console.log("sem novos arquivos para enviar");
        }
        //---------------------------------
        
        const update = verifyObjSAAE(locationOriginalSAAE, data);

        console.log('resultado da verificação do update', update)

        const formDataUpdate = new FormData();
        formDataUpdate.append('idSaae', data._id);
        formDataUpdate.append('saaeData', JSON.stringify(update));

        const response = await axios.post(`${process.env.NEXT_PUBLIC_URL_UPLOAD}/updateSaae/`, formDataUpdate, {
          headers:{
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTORIZATION}`
          }
        });

        if(response.status === 200){
          setListSaaes((prev)=> {
            const newData = prev.map(saae=> {
              if(saae._id === data._id){
                return {...data, status: 'enviada'}
              }else return saae
            });

            return newData
            
          });

          setDataSaae({} as SAAE);
          setSaaeEdit(undefined);
          
          //não precisa deletar porque a SAAE editada não fica armazenado nele        
          // deleteDataStorage('saae', saaeEdit! as number) 
          return{
            bool: true,
            text: 'SAAE enviada com sucesso!'
          }
        }else{
          return{
            bool: true,
            text: 'Ocorreu um errro ao tentar atualizar a SAAE'
          }
        }
        

        // return{
        //   bool: true,
        //   text: 'Teste de edição de SAAE feito com sucesso!'
        // }
        
      }catch(e){
        if (axios.isAxiosError(e)) {
          // Se o erro for gerado pelo Axios
          console.error("Erro Axios:", e.response?.data || e.message);
          
          // Capturando os detalhes da resposta
          if (e.response) {
            console.error("Status:", e.response.status);
            console.error("Dados:", e.response.data);
          }
        } else {
          // Se for outro tipo de erro
          console.error("Erro inesperado:", e);
        }
        return{
          bool: true,
          text: 'Ocorreu um erro ao tentar enviar a correção da sua SAAE!'
        }
      }
    }

    useEffect(()=>{
        if(dataNews.length === 0) getNews();

        async function getData() {
          await createDb('saae')
          .then(async()=>{
              const data = await getAllDataStorage('saae')
              setDataStorage(data);
          })
          
      }
      
      getData();
    },[]);

    useEffect(()=>{
      console.log("contexto dataStorage: ", dataStorage);
    },[dataStorage]);

    useEffect(()=>{
      console.log("contexto saaeEdit: ", saaeEdit);
      if(saaeEdit === undefined) return;
      
      if(typeof saaeEdit === 'number'&& saaeEdit !== 0){
        setDataSaae((prev)=>{
          const newData = dataStorage.find(data=> data.id === saaeEdit);
          if(newData){
            return newData.dataSaae
          }else{
            return prev
          }
        });
      }else if(typeof saaeEdit === 'number' && saaeEdit === 0){
        updateStorage();
      }else if(typeof saaeEdit === 'string'){
        setDataSaae(()=>{
          const newData = listSaaes.find(data=> data._id === saaeEdit);
          console.log("encontrou", newData);
          
          return newData ? newData : {} as SAAE;
        });
      }
    },[saaeEdit]);

    //atualiza o storage.
    useEffect(()=>{
      console.log("contexto dataSaae: ", dataSaae);

      if(Object.keys(dataSaae).length > 0 && typeof saaeEdit === 'number'){
        updateStorage()
      }
    },[dataSaae]);   

    return(
        <Context.Provider value={{
            dataNews, dataUser, dataSaae, dataStorage, saaeEdit, listSaaes, handleSendSaae, setTester, tester,
            recoverProfile, verifySession, setDataSaae, setDataStorage, setSaaeEdit, setListSaaes, setShowModal,
            elementoToPrint, setElementoToPrint
        }}>
          {children}
          {showModal ?
            <Modal customClass={showModal.styles ? [...showModal.styles, 'alingCenter'] : ['alingCenter']}>
                {showModal.element}
            </Modal>
          :null}
        </Context.Provider>
    )
}
