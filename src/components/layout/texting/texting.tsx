'use client'
import React, { useState, useEffect } from "react";
import styles from './texting.module.css';

type Props = {
  text:string,
  speed: number,
  customClass?: string[]
}
const Texting = ({ text, speed = 100, customClass}:Props) => {
  const [displayedText, setDisplayedText] = useState("");
  const [animation, setAnimation] = useState<'slideOut' | 'slideIn'>('slideIn');
  const [animationTaping, setAnimationTaping] = useState<'startTaping' | 'stopTaping'>('startTaping');
  const [customStyles, setCustomStyles] = useState('');

  useEffect(()=>{
      if(Array.isArray(customClass)){
          let newString = '';
          for (const item of customClass) {
              newString += styles[item] + " ";         
          }
          setCustomStyles(newString)
      }else{
          setCustomStyles(customClass ? styles[customClass] : '') 
      }
  },[customClass]);

  const startTexting = ()=>{
    let index = 0;

    // Adiciona o atraso antes de iniciar o efeito de digitação
    setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedText(text.substring(0, index + 1));
        index++;

        if (index === text.length) {
          setAnimationTaping('stopTaping')
          clearInterval(interval); // Finaliza o efeito quando o texto é exibido completamente
        }
      }, speed);
    }, 500); // Delay inicial em milissegundos

    return () => clearInterval(speed); // Limpa o intervalo ao desmontar o componente
  }

  const setClass = ()=>{
    let anim:'slideOut' | 'slideIn' = 'slideIn';

    if(animation === "slideIn"){
      anim= 'slideOut';  
      setDisplayedText('');      
    }else{
      anim= 'slideIn';      
      startTexting();
    }

    setAnimation(anim)
  }

  useEffect(() => {
    startTexting();
  }, [text, speed]);  

  useEffect(()=>{
    setAnimation('slideIn');
  },[text])

  return <>
    <div className={`${styles.conteiner} ${customStyles} ${styles[animation]} ${styles[animationTaping]}`} onClick={setClass}>
        {displayedText}
    </div>
    </>;
};
export default Texting;
