'use client'
import { DataNews } from "@/@types/types";
import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";

type PropsContext ={
    dataNews: DataNews[]
}

export const Context = createContext( {} as PropsContext );

export default function Provider({children}:{children:ReactNode}){
    const [dataNews, setDataNewsHome] = useState<DataNews[]>([]);

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

    useEffect(()=>{
        if(dataNews.length === 0) getNews();
    },[]);

    return(
        <Context.Provider value={{dataNews}}>
            {children}
        </Context.Provider>
    )
}
