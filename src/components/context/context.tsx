'use client'
import { DataNews, DataStorage, ProfileProps, SAAE } from "@/@types/types";
import { createCookie, destroyCookie, getCookie } from "@/scripts/globais";
import { createDb, getAllDataStorage, putNewData } from "@/scripts/indexedDB";
import axios from "axios";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

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
  sendSaae: (saae:SAAE)=>void,
  listSaaes: SAAE[],
  setListSaaes: Dispatch<SetStateAction<SAAE[]>>
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
 * @param {(saae:SAAE)=>void} sendSaae - envia a SAAE em edição para a Região e o DB.
 * @param {SAAE[]} listSaaes - lista de SAAEs enviadas para a Região.
 * @param {Dispatch<SetStateAction<SAAE[]>>} setListSaaes - acessa o estado da lista de SAAEs enviadas para a Região.
 * @returns
*/
export const Context = createContext( {} as PropsContext );

export default function Provider({children}:{children:ReactNode}){
    const [dataNews, setDataNewsHome] = useState<DataNews[]>([]);
    const [dataUser, setDataUser] = useState({} as ProfileProps);

    //SAAEs em edição
    const [dataSaae, setDataSaae] = useState({} as SAAE);

    // SAAEs enviadas para a região.
    const [listSaaes, setListSaaes] = useState<SAAE[]>([]);

    //lista de SAAEs salvas em rascunhos no armazenamento local.
    const [dataStorage, setDataStorage] = useState<DataStorage[]>([]);
    //identificação da SAAE salva em rascunhos no armazenamento local.
    const [saaeEdit, setSaaeEdit] = useState<number | string | undefined>();

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

    const sendSaae= async(data:SAAE)=>{
      if(!data.dadosGerais || !data.planoEmergencia) return;

      const formData = new FormData();
      formData.append('bucketName', 'site-coqueiral-saae');
      formData.append('destinationFolder', 'saaes');

      // Adicionar arquivos
      data.fotosInspecao?.forEach((item, index) => {
          item.fotos.forEach((foto, fotoIndex) => {
              formData.append(`fotosInspecao-${index}-${fotoIndex}`, foto.doc);
          });
      });
  
      data.documentos?.forEach((item, index) => {
          item.docs.forEach((doc, docIndex) => {
              formData.append(`documentos-${index}-${docIndex}`, doc.doc);
          });
      });
  
      data.planoEmergencia?.espacosSeguros?.acolhimento?.forEach((item, index) => {
        item.docs.forEach((doc, docIndex) => {
            formData.append(`acolhimento-${index}-${docIndex}`, doc.doc);
        });
      });

      data.planoEmergencia?.espacosSeguros?.enfermaria?.forEach((item, index) => {
        item.docs.forEach((doc, docIndex) => {
            formData.append(`enfermaria-${index}-${docIndex}`, doc.doc);
        });
      });

      data.planoEmergencia?.veiculos?.forEach((item, index) => {
        item.docs.forEach((doc, docIndex) => {
            formData.append(`veiculos-${index}-${docIndex}`, doc.doc);
        });
      });

      data.planoEmergencia?.atividadePorProfissional?.forEach((item, index) => {
        item.docs.forEach((doc, docIndex) => {
            formData.append(`atividadePorProfissional-${index}-${docIndex}`, doc.doc);
        });
      });

      data.planoEmergencia?.profSalvamento?.forEach((item, index) => {
        item.docs.forEach((doc, docIndex) => {
            formData.append(`profSalvamento-${index}-${docIndex}`, doc.doc);
        });
      });

      // Adicionar os dados do SAAE como JSON
      formData.append('saaeData', JSON.stringify({...data, status: 'enviada'}));
  
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_URL_UPLOAD}/uploadSaae/`, formData, {
          headers:{
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTORIZATION}`
          }
        })
    
        const result = response.data as {message: string, insertId:string};
        console.log(result);

        setListSaaes((prev)=> [...prev, {...data, _id: result.insertId}]);
        // setDataSaae({} as SAAE);
        // deleteDataStorage('saae', saaeEdit!)
        setSaaeEdit(undefined)
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
        alert("Ocorreu um erro ao tentar enviar sua SAAE")
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
        setDataSaae((prev)=>{
          const newData = listSaaes.find(data=> data._id === saaeEdit);
          console.log("encontrou", newData);

          //se a SAAE estiver com algum desses status ela não será habilitada para edição.
          if(!newData || !['enviada', 'aprovada'].includes(`${newData?.status}`)){
            return prev;
          }else{
            return newData
          }
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
            dataNews, dataUser, dataSaae, dataStorage, saaeEdit, listSaaes, sendSaae,
            recoverProfile, verifySession, setDataSaae, setDataStorage, setSaaeEdit, setListSaaes}}>
            {children}
        </Context.Provider>
    )
}
