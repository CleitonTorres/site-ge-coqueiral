"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaInstagram } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import './globals.css';
import './layout.css'

export default function RootLayout({children}: {children: React.ReactNode}) {
    const [activeMenu, setActiveMenu] = useState('none');
    const [animation, setAnimation] = useState('');

    const togleMenu = (id:string)=>{
        setActiveMenu(id);
    }

    const mobileMenu = ()=>{
        if(animation === "slideDown"){
            setAnimation('slideUp')
        }else{
            setAnimation('slideDown')
        }
    }

    useEffect(()=>{
        document.addEventListener( 'click', ()=>{
            if(activeMenu !== "") setActiveMenu('none');
        });
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
                        <div className='boxLogoUEB'>
                            <Image 
                                width={270} 
                                height={90} 
                                alt='logo escoteiros do brasil' 
                                src={'/icons/logo.png'}
                                style={{width: '80%', objectFit: 'contain'}}
                            />
                            <Image 
                                width={48} 
                                height={48} 
                                alt='logo melhores ongs' 
                                src={'/icons/selo2023.png'}
                                style={{width: '10%', objectFit: 'contain'}}
                            />
                        </div>
                        <div className='porcent60 flexRowCenter' id="bottonsDoeEmpresa">
                            <div className='margin10 cursorPointer doeAgora flexRowCenter'>
                                <span>Doe agora</span>
                            </div>
                            <div className='cursorPointer empresaAmiga flexRowCenter'>
                                <span>Empresa Parceira</span>
                            </div>
                        </div>
                        <div className='boxIconMenu' onClick={mobileMenu}>
                            <FiMenu size={50}/>
                        </div>                
                    </div>
                </div>

                <nav 
                    id="menu" 
                    className='menu '
                    style={{animation: animation ? `${animation} 1s linear forwards` : undefined}}
                >
                    <div className='boxItem' onMouseEnter={()=> togleMenu('1')}>
                        <h1 className='title'>Quem Somos</h1>
                        <div 
                            className={`boxSubItens`}
                            style={{display: activeMenu === '1' ? 'block' : 'none'}}
                            id='1'
                        >
                            <div className='flexRowSpaceBetween'>
                                <Image 
                                    className='imageMenu'
                                    alt='icon'
                                    width={52}
                                    height={52}
                                    src={'https://www.escoteiros.org.br/wp-content/themes/escoteiros-theme/img/icons/movimento.svg'}
                                />
                                <h1 className='titleItem flexCollBotton paddin10'>
                                    Quem Somos
                                </h1>                        
                                <div className='flexRowTop subItemList'>
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
                                            <li>Governança</li>
                                            <li>Programa de Integridade</li>
                                            <li>Proteção Infantojuvenil</li>
                                            <li>No Mundo</li>
                                        </ul>
                                    </li>
                                    <li className='subItensContents'>
                                        <ul className='subTitle'>Institucional</ul>
                                        <ul className='subItens'>
                                            <li>Conselhos</li>
                                            <li>Diretoria</li>
                                            <li>Equipes</li>
                                        </ul>
                                    </li>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='boxItem' onMouseEnter={()=> togleMenu('2')}>
                        <h1 className='title'>O que fazemos</h1>
                        <div 
                            className={`boxSubItens`}
                            style={{display: activeMenu === '2' ? 'block' : 'none'}}
                            id='2'
                        >
                            <div className='flexRowSpaceBetween'>
                                <Image 
                                    className='imageMenu'
                                    alt='icon'
                                    width={52}
                                    height={52}
                                    src={'https://www.escoteiros.org.br/wp-content/themes/escoteiros-theme/img/icons/fazemos.svg'}
                                />
                                <h1 className='titleItem flexCollBotton paddin10'>O que fazemos</h1>                        
                                <div className='flexRowTop subItemList'>
                                    <li className='subItensContents'>
                                        <ul className='subTitle'>Educação</ul>
                                        <ul className='subItens'>
                                            <li>Projeto Educativo</li>
                                            <li>Método Escoteiro</li>
                                            <li>Escotismo e ODS</li>
                                            <li>Espaços Seguros</li>
                                        </ul>
                                    </li>
                                    <li className='subItensContents'>
                                        <ul className='subTitle'>Informações</ul>
                                        <ul className='subItens'>
                                            <li>Eventos</li>
                                            <li>Notícias</li>
                                        </ul>
                                    </li>
                                    <li className='subItensContents'>
                                        <ul className='subTitle'>Projetos</ul>
                                        <ul className='subItens'>
                                            <li>Escoteiro Dev</li>
                                            <li>MutEco</li>
                                            <li>MutCom</li>
                                            <li>Educação Escoteira</li>
                                        </ul>
                                    </li>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='boxItem' onMouseEnter={()=> togleMenu('3')}>
                        <h1 className='title'>Fale Conosco</h1>
                        <div 
                            className={`boxSubItens`}
                            style={{display: activeMenu === '3' ? 'block' : 'none'}}
                            id='3'
                        >
                            <div className='flexRowSpaceBetween'>
                                <Image 
                                    className='imageMenu'
                                    alt='icon'
                                    width={52}
                                    height={52}
                                    src={'https://www.escoteiros.org.br/wp-content/themes/escoteiros-theme/img/icons/informacoes.svg'}
                                />
                                <h1 className='titleItem flexCollBotton paddin10'>Fale Conosco</h1>                        
                                <div className='flexRowTop subItemList'>
                                    <li className='subItensContents'>
                                        <ul className='subTitle'>Imprensa</ul>
                                        <ul className='subItens'>
                                            <li>Realeases</li>
                                            <li>Galeria de fotos</li>
                                        </ul>
                                    </li>
                                    <li className='subItensContents'>
                                        <ul className='subTitle'>Doações</ul>
                                        <ul className='subItens'>
                                            <li>Pessoa física</li>
                                            <li>Pessoa jurídica</li>
                                        </ul>
                                    </li>
                                    <li className='subItensContents'>
                                        <ul className='subTitle'>Contato</ul>
                                        <ul className='subItens'>
                                            <li>Fale conosco</li>
                                            <li>Seja um voluntário</li>
                                        </ul>
                                    </li>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='boxItem' onMouseEnter={()=> togleMenu('4')}>
                        <h1 className='title'>Seja Escoteiro</h1>
                        <div 
                            className={`boxSubItens`}
                            style={{display: activeMenu === '4' ? 'block' : 'none'}}
                            id='4'
                        >
                            <div className='flexRowSpaceBetween'>
                                <Image 
                                    className='imageMenu'
                                    alt='icon'
                                    width={52}
                                    height={52}
                                    src={'https://www.escoteiros.org.br/wp-content/themes/escoteiros-theme/img/icons/fale-conosco.svg'}
                                />
                                <h1 className='titleItem flexCollBotton paddin10'>Seja Escoteiro</h1>                        
                                <div className='flexRowTop subItemList'>
                                    <li className='subItensContents'>
                                        <ul className='subTitle'>Sou jovem</ul>
                                        <ul className='subItens'>
                                            <li>Lobinho - 6,5 a 10,5 anos</li>
                                            <li>Escoteiro - 10 a 14 anos</li>
                                            <li>Sênior/Guia - 15 a 17 anos</li>
                                            <li>Pioneiro - 18 a 21 anos</li>
                                        </ul>
                                    </li>
                                    <li className='subItensContents'>
                                        <ul className='subTitle'>Sou adulto</ul>
                                        <ul className='subItens'>
                                            <li>Ser Voluntário</li>
                                            <li>Entre em contato</li>
                                            <li>Como abrir uma UEL</li>
                                        </ul>
                                    </li>
                                    <li className='subItensContents'>
                                        <ul className='subTitle'>Saiba mais</ul>
                                        <ul className='subItens'>
                                            <li>Como ser escoteiro</li>
                                            <li>NÓS - Clube de Vantagens</li>
                                        </ul>
                                    </li>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                
                <div className='linhaDoeAgora'>
                    <span>Contribua com os Escoteiros de Coqueiral</span> 
                    <a href="">DOE AGORA</a>
                </div> 
            </div>

            {/* Layout UI */}
            <main className='flexCollTop'>{children}</main>

            <div className='footer'>
                <div className='flexCollCenter boxIcon margin10'>
                    <FaInstagram size={26} color='var(--verde)' onClick={()=>{
                        window.open('https://www.instagram.com/19escoqueiral/', '_blank')
                    }}/>
                </div>
                <span>
                    © 2024 Escoteiros do Brasil - Todos os direitos reservados
                </span>
            </div>
        </body>
      </html>
    )
  }