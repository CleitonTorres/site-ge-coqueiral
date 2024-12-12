'use client'
import { DataNews, ProfileProps, SAAE } from "@/@types/types";
import { createCookie, destroyCookie, getCookie } from "@/scripts/globais";
import axios from "axios";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

type PropsContext ={
  dataNews: DataNews[],
  dataUser: ProfileProps,
  recoverProfile: ()=>Promise<void>,
  verifySession: ()=>boolean,
  setDataSaae: Dispatch<SetStateAction<SAAE>>,
  dataSaae: SAAE
}

export const Context = createContext( {} as PropsContext );

export default function Provider({children}:{children:ReactNode}){
    const [dataNews, setDataNewsHome] = useState<DataNews[]>([]);
    const [dataUser, setDataUser] = useState({} as ProfileProps);
    const [dataSaae, setDataSaae] = useState({} as SAAE);

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

    useEffect(()=>{
        if(dataNews.length === 0) getNews();
    },[]);

    //seta o nível de risco da SAAE.
    useEffect(()=>{
      console.log("contexto: ", dataSaae);
    },[dataSaae]);

    return(
        <Context.Provider value={{dataNews, dataUser, dataSaae, recoverProfile, verifySession, setDataSaae}}>
            {children}
        </Context.Provider>
    )
}
