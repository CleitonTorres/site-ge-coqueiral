"use client"
import { useState } from 'react';
import Image from 'next/image';
import { FaInstagram } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import './globals.css';
import './layout.css'

export default function RootLayout({children}: {children: React.ReactNode}) {
    const [activeMenu, setActiveMenu] = useState('none');
    const [animation, setAnimation] = useState('');

    const togleMenu = (id:string)=>{
        if(id === activeMenu) {
            setActiveMenu('none')
        }else{
            setActiveMenu(id);
        }
    }

    const mobileMenu = ()=>{
        if(animation === "slideDown"){
            setAnimation('slideUp')
        }else{
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
        <body 
            className='flexCollTop' 
            style={{ position: 'relative', minHeight: '100vh' }}
        >
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
                                    <li className='link'>
                                        <a href='https://www.escoteiros.org.br/especialidades/' target='_blank'>Especialidades</a>
                                    </li>
                                    <li className='link'>
                                        <a href='/progressao' target='_self'>Progressão</a>
                                    </li>
                                    <li className='link'>
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
                                    <li className='link'>
                                        <a href="/ciclo-vida">Ciclo de vida</a>
                                    </li>
                                    <li className='link'>
                                        <a href="/campo-escola">Campo Escola Virtual</a>
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
                                <span>Doe agora</span>
                            </div>
                            <div className='cursorPointer empresaAmiga flexRowCenter'>
                                <span onClick={()=>window.open("/empresa-parceira", '_self')}>Empresa Parceira</span>
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
                    <div className='boxItem' >
                        <h1 className='title' onClick={()=> togleMenu('1')}>Quem Somos</h1>
                        <div 
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
                    <div className='boxItem'>
                        <h1 className='title' onClick={()=> togleMenu('2')}>O que fazemos</h1>
                        <div 
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
                    <div className='boxItem'>
                        <h1 className='title' onClick={()=> togleMenu('3')}>Fale Conosco</h1>
                        <div 
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
                    <div className='boxItem'>
                        <h1 className='title' onClick={()=> togleMenu('4')}>Seja Escoteiro</h1>
                        <div 
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
                </nav>
                
                <div className='linhaDoeAgora'>
                    <span>Contribua com os Escoteiros de Coqueiral</span> 
                    <a href="">DOE AGORA</a>
                </div> 
            </div>

            {/* Layout UI */}
            <main className='flexCollTop'>{children}</main>

            <div className='footer'>
                <nav>
                    <ul className='menuFooter'>
                        <li className='dropItemMenuBoxFooter'>
                            <span>
                                <b>Jovem</b>
                            </span>
                            <ul className='footerMenu' >
                                <li className='link textColorWhite'>
                                    <a href='https://www.escoteiros.org.br/especialidades/' target='_blank'>Especialidades</a>
                                </li>
                                <li 
                                    className='link textColorWhite'
                                >
                                    <a href='/progressao' target='_self'>Progressão</a>
                                </li>
                                
                                <li className='link textColorWhite'>                                    
                                    <a href='/tribo-da-terra' target='_self'>Tribo da Terra</a>
                                </li>                                
                            </ul>
                        </li>
                        <li className='dropItemMenuBoxFooter'>
                            <span>
                                <b>Voluntário</b>
                            </span>
                            <ul className='footerMenu'>
                                <li className='link textColorWhite'>
                                    <a href="/ciclo-vida">Ciclo de vida</a>
                                </li>
                                <li className='link textColorWhite'>
                                    <a href="/campo-escola">Campo Escola Virtual</a>
                                </li>
                            </ul>
                        </li>
                        <li 
                            className='dropItemMenuBoxFooter link cursorPointer' 
                            onClick={()=>navigate('http://escoteiroses.org.br/', '_blanck')}>
                            <span><b>Área da Região</b></span>
                        </li>
                        <li 
                            className='dropItemMenuBoxFooter link cursorPointer' 
                            onClick={()=>navigate('https://loja.escoteiros.org.br/', '_blanck')}>
                            <span>
                               <b>Loja Nacional</b>
                            </span>
                        </li>
                        <li 
                            className='dropItemMenuBoxFooter link cursorPointer' 
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
        </body>
      </html>
    )
  }