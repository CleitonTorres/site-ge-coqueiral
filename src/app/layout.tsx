"use client"
import { useState } from 'react';
import Image from 'next/image';
import { FaInstagram } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import './globals.css';
import './layout.css'
import Script from 'next/script';
import Provider from '@/components/context/context';
import Breadcrumb from '@/components/layout/breadcrumb/breadCrumb';
import { usePathname } from "next/navigation";

import { GlobalWorkerOptions } from 'pdfjs-dist';

GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

export default function RootLayout({children}: {children: React.ReactNode}) {
    const [activeMenu, setActiveMenu] = useState('none');
    const [animation, setAnimation] = useState('');
    const pathname = usePathname();

    // Verifica se a URL contém "/printer"
    const isPrinterRoute = pathname.includes("/printer");

    const togleMenu = (id:string)=>{
        if(id === activeMenu) {
            setActiveMenu('none')
        }else{
            setActiveMenu(id);
        }
    }
    const menuActive = (id:string)=>{
        setActiveMenu(id);
    }
    const menuDisable = ()=>{
        setActiveMenu('none');
    }

    const mobileMenu = ()=>{
        if(animation === "slideDown"){
            setAnimation('slideUp')
        }else{
            window.scrollTo(0,0);
            setAnimation('slideDown')
        }
    }

    const navigate = (url:string, target:string)=>{
        window.open(url, target)
    }

    const minimizeMenu = ()=>{
        setActiveMenu('none');
    }
    
    return (
      <html lang="pt-BR">
        <head>
            <title>19º ES Grupo Escoteiro Coqueiral</title>
            <meta name="google-site-verification" content="RJr9dk5TXSf7loXF4hfxMGts_RSZp63yB6crb-bUSCI" />
            <meta name="google-site-verification" content="c7o2q50eN9ml30c4yZ6gkc4a0Qd0C0eQMvSGzbaESo8" />
        </head>
        <Script src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_KEY_SITE}`}/>
        <Script 
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_API_KEY_GOOGLE}&libraries=geometry`}
            async
        />

        <body 
            className='flexCollSpace' 
            style={{ position: 'relative', minHeight: '100vh' }}
        >
            <Provider>
                {!isPrinterRoute ? 
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
                            <ul className='dropMenuBox'>
                                <li className='dropItemMenuBox'>
                                    <span onClick={()=>togleMenu('drop01')}>
                                        Jovem
                                        <IoMdArrowDropdown size={20}/>
                                    </span>
                                    <ul 
                                        className='dropdown-menu' 
                                        id='drop01'
                                        style={{display: activeMenu === 'drop01' ? 'flex' : 'none'}}
                                    >
                                        <li> 
                                            <a href='https://www.escoteiros.org.br/especialidades/' target='_blank'>Especialidades</a>
                                        </li>
                                        <li>
                                            <a href='/progressao' target='_self'>Progressão</a>
                                        </li>
                                        <li>
                                            <a href='/tribo-da-terra' target='_self'>Tribo da Terra</a>
                                        </li>
                                    </ul>
                                </li>
                                <li className='dropItemMenuBox'>
                                    <span onClick={()=>togleMenu('drop02')}>
                                        Voluntário
                                        <IoMdArrowDropdown size={20}/>
                                    </span>
                                    <ul 
                                        className='dropdown-menu' 
                                        id='drop02'
                                        style={{display: activeMenu === 'drop02' ? 'flex' : 'none'}}
                                    >
                                        <li>
                                            <a href="/ciclo-vida">Ciclo de vida</a>
                                        </li>
                                        <li>
                                            <a href="/campo-escola">Campo Escola Virtual</a>
                                        </li>
                                        <li>
                                            <a href="/administrativo">Acesso administrativo</a>
                                        </li>
                                    </ul>
                                </li>
                                <li className='dropItemMenuBox' onClick={()=>navigate('http://escoteiroses.org.br/', '_blanck')}>
                                    <span>Área da Região</span>
                                </li>
                                <li className='dropItemMenuBox' onClick={()=>navigate('https://loja.escoteiros.org.br/', '_blanck')}>
                                    <span>
                                        Loja Nacional
                                    </span>
                                </li>
                                <li className='dropItemMenuBox' onClick={()=>navigate('https://paxtu.escoteiros.org.br/', '_blanck')}>
                                    <span>
                                        Paxtu
                                    </span>
                                </li>
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
                                    onClick={()=>navigate('/', '_self')}
                                />
                                <Image 
                                    width={48} 
                                    height={48} 
                                    alt='logo melhores ongs' 
                                    src={'/icons/selo2023.png'}
                                    style={{width: '10%', objectFit: 'contain'}}
                                    onClick={()=>navigate('https://www.premiomelhores.org/dados-2023/', '_blanck')}
                                />
                            </div>
                            <div className='porcent60 flexRowCenter' id="bottonsDoeEmpresa">
                                <div className='margin10 cursorPointer doeAgora flexRowCenter'>
                                    <a href='/doe' target='_self'>Doe agora</a>
                                </div>
                                <div className='cursorPointer empresaAmiga flexRowCenter'>
                                    <a href="/empresa-parceira" target='_self'>Empresa Parceira</a>
                                </div>
                            </div>
                            <div className='boxIconMenu' onClick={mobileMenu}>
                                <FiMenu size={50}/>
                            </div>                
                        </div>
                    </div>

                    {/* Menu */}
                    <nav 
                        id="menu" 
                        className='menu '
                        style={{animation: animation ? `${animation} 1s linear forwards` : undefined}}
                    >
                        <div className='boxItem' onMouseLeave={()=> menuDisable()}>
                            <h1 
                                className='title'
                                onMouseEnter={()=> menuActive('1')} 
                                onClick={()=> togleMenu('1')}>Quem Somos</h1>
                            <div 
                                onMouseLeave={()=> menuDisable()}
                                className={`boxSubItens`}
                                style={{display: activeMenu === '1' ? 'flex' : 'none'}}
                                id='1'
                            >
                                <span onClick={minimizeMenu} className='iconClose'>X</span>
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
                                            <li>
                                                <a href='/escoteiros-do-brasil/' target='_self'>Escoteiros do Brasil</a>
                                            </li>
                                            <li>
                                                <a href="https://www.escoteiros.org.br/internacional/" target='_blanck'>No Mundo</a>
                                            </li>
                                            <li>
                                                <a href="https://www.escoteiros.org.br/brasil/" target='_blank'>No Brasil</a>
                                            </li>
                                            <li>
                                                <a href="/coqueiral" target='_self'>Em Coqueiral</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className='subItensContents'>
                                        <ul className='subTitle'>Transparencia</ul>
                                        <ul className='subItens'>
                                            <li>
                                                <a href="/governanca">Governança</a>
                                            </li>
                                            <li>
                                                <a href="/protecao-infantojuvenil">Proteção Infantojuvenil</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className='subItensContents'>
                                        <ul className='subTitle'>Institucional</ul>
                                        <ul className='subItens'>
                                            <li>
                                                <a href="/conselhos">Conselhos</a>
                                            </li>
                                            <li>
                                                <a href="/diretoria">Diretoria</a>
                                            </li>
                                        </ul>
                                    </li>
                                </div>
                            </div>
                        </div>
                        <div className='boxItem' onMouseLeave={()=> menuDisable()}>
                            <h1 
                                className='title'
                                onMouseEnter={()=> menuActive('2')}
                                onClick={()=> togleMenu('2')}>O que fazemos</h1>
                            <div 
                                onMouseLeave={()=> menuDisable()}
                                className={`boxSubItens`}
                                style={{display: activeMenu === '2' ? 'flex' : 'none'}}
                                id='2'
                            >
                                <span onClick={minimizeMenu} className='iconClose'>X</span>
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
                                            <li>
                                                <a href="/projeto-educativo">Projeto Educativo</a>
                                            </li>
                                            <li>
                                                <a href="/metodo-escoteiro">Método Escoteiro</a>
                                            </li>
                                            <li>
                                                <a href="/escotismo-ods">Escotismo e ODS</a>
                                            </li>
                                            <li>
                                                <a href="/espacos-seguros">Espaços Seguros</a>
                                            </li>
                                            <li>
                                                <a href="/projetos">Nossos Projetos</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className='subItensContents'>
                                        <ul className='subTitle'>Informações</ul>
                                        <ul className='subItens'>
                                            <li>
                                                <a href="/eventos">Eventos</a>
                                            </li>
                                            <li>
                                                <a href="/noticias">Notícias</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className='subItensContents'>
                                        <ul className='subTitle'>Projetos</ul>
                                        <ul className='subItens'>
                                            <li><a href="/escoteiro-dev">Escoteiro Dev</a></li>
                                            <li><a href="/muteco">MutEco</a></li>
                                            <li><a href="/mutcom">MutCom</a></li>
                                            <li><a href="/edu-escoteira">Educação Escoteira</a></li>
                                        </ul>
                                    </li>
                                </div>
                            </div>
                        </div>
                        <div className='boxItem' onMouseLeave={()=> menuDisable()}>
                            <h1 
                                className='title' 
                                onMouseEnter={()=> menuActive('3')}
                                onClick={()=> togleMenu('3')}>Fale Conosco</h1>
                            <div 
                                onMouseLeave={()=> menuDisable()}
                                className={`boxSubItens`}
                                style={{display: activeMenu === '3' ? 'flex' : 'none'}}
                                id='3'
                            >
                                <span onClick={minimizeMenu} className='iconClose'>X</span>
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
                                            <li>
                                                <a href="/galeria-fotos">Galeria de fotos</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className='subItensContents'>
                                        <ul className='subTitle'>Doações</ul>
                                        <ul className='subItens'>
                                            <li><a href="/doe">Pessoa física</a></li>
                                            <li><a href="/empresa-parceira">Pessoa jurídica</a></li>
                                        </ul>
                                    </li>
                                    <li className='subItensContents'>
                                        <ul className='subTitle'>Contato</ul>
                                        <ul className='subItens'>
                                            <li><a href="https://www.instagram.com/19escoqueiral/" target='_blank'>Fale conosco</a></li>
                                            <li><a href="/seja-escoteiro">Seja um voluntário</a></li>
                                        </ul>
                                    </li>
                                </div>
                            </div>
                        </div>
                        <div className='boxItem' onMouseLeave={()=> menuDisable()}>
                            <h1 
                                className='title' 
                                onMouseEnter={()=> menuActive('4')}
                                onClick={()=> togleMenu('4')}>Seja Escoteiro</h1>
                            <div 
                                onMouseLeave={()=> menuDisable()}
                                className={`boxSubItens`}
                                style={{display: activeMenu === '4' ? 'flex' : 'none'}}
                                id='4'
                            >
                                <span onClick={minimizeMenu} className='iconClose'>X</span>
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
                                                <li>
                                                    <a href="/ramo-lobinho">Lobinho - 6,5 a 10,5 anos</a>
                                                </li>
                                                <li>
                                                    <a href="/ramo-escoteiro">Escoteiro - 10 a 14 anos</a>
                                                </li>
                                                <li>
                                                    <a href="/ramo-senior">Sênior/Guia - 15 a 17 anos</a>
                                                </li>
                                                <li>
                                                    <a href="/ramo-pioneiro">Pioneiro - 18 a 21 anos</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className='subItensContents'>
                                            <ul className='subTitle'>Sou adulto</ul>
                                            <ul className='subItens'>
                                                <li><a href="/seja-escoteiro">Ser Voluntário</a></li>
                                                <li>
                                                    <a href="https://www.instagram.com/19escoqueiral/" target='_blank'>Entre em contato</a>
                                                </li>
                                                <li><a href="/como-abrir-uma-uel">Como abrir uma UEL</a></li>
                                            </ul>
                                        </li>
                                        <li className='subItensContents'>
                                            <ul className='subTitle'>Saiba mais</ul>
                                            <ul className='subItens'>
                                                <li>
                                                <a href='/seja-escoteiro' target='_self'>Como ser escoteiro</a>
                                                </li>
                                                <li>
                                                    <a href="https://www.escoteiros.org.br/clube-de-vantagens/" target='_blank'>NÓS - Clube de Vantagens</a>
                                                </li>
                                            </ul>
                                        </li>
                                </div>
                            </div>
                        </div>
                    </nav>
                    
                    <Breadcrumb />
                    
                    <div className='linhaDoeAgora'>
                        <span>Contribua com os Escoteiros de Coqueiral</span> 
                        <a href="/doe">DOE AGORA</a>
                    </div> 
                </div>
                :null}

                {/* Layout UI */}
                <main className='flexCollTop'>{children}</main>
                
                {!isPrinterRoute ?
                <div className='footer'>
                    <nav>
                        <ul className='menuFooter'>
                            <li className='dropItemMenuBoxFooter'>
                                <span>
                                    <b>Jovem</b>
                                </span>
                                <ul className='footerMenu' >
                                    <li className='textColorWhite'>
                                        <a href='https://www.escoteiros.org.br/especialidades/' target='_blank'>Especialidades</a>
                                    </li>
                                    <li 
                                        className='textColorWhite'
                                    >
                                        <a href='/progressao' target='_self'>Progressão</a>
                                    </li>
                                    
                                    <li className='textColorWhite'>                                    
                                        <a href='/tribo-da-terra' target='_self'>Tribo da Terra</a>
                                    </li>                                
                                </ul>
                            </li>
                            <li className='dropItemMenuBoxFooter'>
                                <span>
                                    <b>Voluntário</b>
                                </span>
                                <ul className='footerMenu'>
                                    <li className='textColorWhite'>
                                        <a href="/ciclo-vida">Ciclo de vida</a>
                                    </li>
                                    <li className='textColorWhite'>
                                        <a href="/campo-escola">Campo Escola Virtual</a>
                                    </li>
                                    <li className='textColorWhite'>
                                        <a href="/administrativo">Acesso administrativo</a>
                                    </li>
                                </ul>
                            </li>
                            <li 
                                className='dropItemMenuBoxFooter cursorPointer' 
                                onClick={()=>navigate('http://escoteiroses.org.br/', '_blanck')}>
                                <span><b>Área da Região</b></span>
                            </li>
                            <li 
                                className='dropItemMenuBoxFooter cursorPointer' 
                                onClick={()=>navigate('https://loja.escoteiros.org.br/', '_blanck')}>
                                <span>
                                <b>Loja Nacional</b>
                                </span>
                            </li>
                            <li 
                                className='dropItemMenuBoxFooter cursorPointer' 
                                onClick={()=>navigate('https://paxtu.escoteiros.org.br/', '_blanck')}>
                                <span>
                                    <b>Paxtu</b>
                                </span>
                            </li>
                        </ul>
                    </nav>

                    <div className='flexCollCenter boxIcon margin10 cursorPointer'>
                        <FaInstagram size={26} color='var(--verde)' onClick={()=>{
                            window.open('https://www.instagram.com/19escoqueiral/', '_blank')
                        }}/>
                    </div>
                    <span>
                        © 2024 Escoteiros do Brasil - Todos os direitos reservados
                    </span>
                </div>
                :null}
            </Provider>
        </body>
      </html>
    )
}