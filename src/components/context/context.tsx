'use client'
import { ProfileProps } from "@/@types/types";
import { createCookie, destroyCookie, getCookie } from "@/scripts/globais";
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import Modal from "../layout/modal/modal";

type PropsContext ={
  dataUser: ProfileProps,
  recoverProfile: ()=>Promise<void>,
  verifySession: ()=>boolean,
  setShowModal: Dispatch<SetStateAction<{element: JSX.Element, styles?: string[], onClose?: ()=>void} | null>>,
  elementoToPrint: JSX.Element | null, 
  setElementoToPrint: Dispatch<SetStateAction<JSX.Element | null>>
}

/**
 * SAAEs enviadas para a região. 
 * @param {DataNews[]} dataNews - lista de notícias salvas no DB.
 * @param {ProfileProps} dataUser - dados de perfil do usuário.
 * @param {()=>Promise<void>} recoverProfile - recupera e valida os dados do token do usuario.
 * @param {()=>boolean} verifySession - valida o token do usuário.
 * @param {Dispatch<SetStateAction<{element: JSX.Element, styles?: string[]} | null>>} setShowModal - acessa o estado do modal de carregamento.
 * @param {JSX.Element | null} elementoToPrint - elemento a ser impresso.
 * @param {Dispatch<SetStateAction<JSX.Element | null>>} - setElementoToPrint - acessa o estado do elemento a ser impresso.
 * @returns
*/
export const Context = createContext( {} as PropsContext );

export default function Provider({children}:{children:ReactNode}){
    const [dataUser, setDataUser] = useState({} as ProfileProps);
    const [elementoToPrint, setElementoToPrint] = useState<JSX.Element | null>(null);

    const [showModal, setShowModal] = useState<{
        onClose?: ()=>void,
        element: JSX.Element, 
        styles?: string[]} | null>(null);

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
 

    return(
        <Context.Provider value={{
            dataUser, recoverProfile, verifySession, setShowModal,
            elementoToPrint, setElementoToPrint
        }}>
          {children}
          {showModal ?
            <Modal 
              customClass={showModal.styles ? [...showModal.styles, 'alingCenter'] : ['alingCenter']}
              actionClose={showModal.onClose}
            >
                {showModal.element}
            </Modal>
          :null}
        </Context.Provider>
    )
}
