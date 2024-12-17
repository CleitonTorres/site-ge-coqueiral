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
  setSaaeEdit: Dispatch<SetStateAction<number | undefined>>,
  saaeEdit: number | undefined
}

export const Context = createContext( {} as PropsContext );

export default function Provider({children}:{children:ReactNode}){
    const [dataNews, setDataNewsHome] = useState<DataNews[]>([]);
    const [dataUser, setDataUser] = useState({} as ProfileProps);
    const [dataSaae, setDataSaae] = useState({} as SAAE);

    const [dataStorage, setDataStorage] = useState<DataStorage[]>([]);
    const [saaeEdit, setSaaeEdit] = useState<number | undefined>();

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
      if(saaeEdit || saaeEdit !== 0){
        putNewData('saae',{dataSaae, user: dataUser, id: saaeEdit});
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
      }else if(saaeEdit === 0){//cria uma nova SAAE
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
      if(saaeEdit || saaeEdit !== 0){
        setDataSaae((prev)=>{
          const newData = dataStorage.find(data=> data.id === saaeEdit);
          if(newData){
            return newData.dataSaae
          }else{
            return prev
          }
        });
      }else if(saaeEdit === 0){
        updateStorage();
      }
    },[saaeEdit]);

    //atualiza o storage.
    useEffect(()=>{
      console.log("contexto dataSaae: ", dataSaae);
      if(Object.keys(dataSaae).length > 0){updateStorage()}
    },[dataSaae]);   

    return(
        <Context.Provider value={{
            dataNews, dataUser, dataSaae, dataStorage, saaeEdit,
            recoverProfile, verifySession, setDataSaae, setDataStorage, setSaaeEdit}}>
            {children}
        </Context.Provider>
    )
}
