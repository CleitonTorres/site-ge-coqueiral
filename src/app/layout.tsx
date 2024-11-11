"use client"
import Image from 'next/image';
import './globals.css';
import './layout.css'
import { useEffect, useState } from 'react';

export default function RootLayout({children}: {children: React.ReactNode}) {
    const [activeMenu, setActiveMenu] = useState('');

    const togleMenu = ()=>{
        setActiveMenu('block');
    }

    useEffect(()=>{
        document.addEventListener( 'click', ()=>{
            setActiveMenu('none')
        })
    });

    return (
      <html lang="pt-BR">
        <body className='flexCollTop' style={{ position: 'relative', minHeight: '100vh' }}>
            <div className='navBox porcent100 flexCollTop'>
                <div className='conteinerAreaAssociado porcent100 flexRowCenter'>
                    <nav id="area-do-associado">
                        <span className='uperCase flexRowCenter latterSpacing porcent30'>
                            <Image 
                                className='margin5'
                                width={32} 
                                height={32}
                                src="/icons/login-arrow.svg" alt='icone de flexa indicando área de acesso restrito'
                            />
                            Área do Associado
                        </span>
                        <ul className='porcent70'>
                            <li>Jovem</li>
                            <li>Voluntário</li>
                            <li>Área da Região</li>
                            <li>Loja Nacional</li>
                            <li>Paxtu</li>
                        </ul>
                    </nav>
                </div>         

                <div id="bottons">
                    <div className='bottonsConteiner porcent100 margin10'>
                        <div className='porcent40 flexRowCenter cursorPointer'>
                            <Image 
                                width={270} 
                                height={90} 
                                alt='logo escoteiros do brasil' 
                                src={'/icons/logo.png'}
                            />
                            <Image 
                                width={48} 
                                height={48} 
                                alt='logo melhores ongs' 
                                src={'/icons/selo2023.png'}
                            />
                        </div>
                        <div className='porcent60 flexRowCenter flexRowSpaceBetween'>
                            <div className='margin10 cursorPointer doeAgora flexRowCenter'>
                                <span>Doe agora</span>
                            </div>
                            <div className='cursorPointer empresaAmiga flexRowCenter'>
                                <span>Empresa Parceira</span>
                            </div>
                        </div>                    
                    </div>
                </div>

                <nav id="menu">
                    <ul className='porcent100 flexRowSpaceBetween margin10'>
                        <li className='boxItem' onMouseEnter={()=> togleMenu()}>
                            <ul className='title'>Quem Somos</ul>
                            <ul 
                                className={`boxSubItens`}
                                style={{display: activeMenu}}
                            >
                                <li className='flexRowSpaceBetween'>
                                    <ul 
                                        className='titleItem flexCollBotton paddin10'
                                    >
                                        Quem Somos
                                    </ul>                        
                                    <ul 
                                        className='flexRowTop subItemList' 
                                    >
                                        <li className='subItensContents'>
                                            <ul className='subTitle'>Sobre nós</ul>
                                            <ul className='subItens'>
                                                <li>Escoteiros do Brasil</li>
                                                <li>Em Coqueiral</li>
                                                <li>No Brasil</li>
                                                <li>No Mundo</li>
                                            </ul>
                                        </li>
                                        <li className='subItensContents'>
                                            <ul className='subTitle'>Transparencia</ul>
                                            <ul className='subItens'>

                                            </ul>
                                        </li>
                                        <li className='subItensContents'>
                                            <ul className='subTitle'>Institucional</ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li className='boxItem'>
                            <ul className='title'>O que fazemos</ul>
                        </li>
                        <li className='boxItem'>
                            <ul className='title'>Fale Conosco</ul>
                        </li>
                        <li className='boxItem'>
                            <ul className='title'>Seja Escoteiro</ul>
                        </li>
                    </ul>
                </nav>
            </div>
            
          {/* Layout UI */}
          <main className='flexCollTop'>{children}</main>
        </body>
      </html>
    )
  }