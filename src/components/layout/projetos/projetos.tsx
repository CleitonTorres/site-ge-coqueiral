import Link from "next/link";
import Box from "../box/box";
import Image from "next/image";

export default function Projetos(){
    return(
        <section className="projetos">
            {/* Projetos */}
                <h1 
                    className='textLarge' 
                    style={{
                        width: '100%',
                        color: 'var(--azul-escuro)',
                        textAlign: 'center',
                    }
                }>
                    Nossos Projetos
                </h1>
                <Box customClass={['margin', 'flexRowWrap']}>
                <Link 
                    href={'/projetos/acampa-canoa'} 
                    target='_self' 
                    className='cardProjetos'
                >
                    <Image 
                    alt='imagem acampa canoa, esporte, educação, escotismo, nautico, aracruz, grupo escoteiro coqueiral, acampamento volante, praias, praia da balsa, piraque açu, jovens, aventureiros'
                    width={408}
                    height={178}
                    src={'/images/projetos/acampa-canoa/acampa-canoa01.jpg'}
                    />
                    <span>Acampa Canoa (Esporte/Educação)</span>
                </Link>
                <Link 
                    href={'/projetos/pipa-escoteira'} 
                    target='_self' 
                    className='cardProjetos'
                >
                    <Image 
                    alt='imagem do projeto Pipa Escoteira'
                    width={408}
                    height={178}
                    src={'/images/projetos/pipa-escoteira/pipa-escoteira01.jpeg'}
                    />
                    <span>Pipa Escoteira (Cultura)</span>
                </Link>
                <Link 
                    href={'/projetos/dia-de-semear-paz'} 
                    target='_self' 
                    className='cardProjetos'
                >
                    <Image 
                    alt="serviço social, defesa social, comunidade, escotismo, jovens, voluntariado, aracruz, grupo escoteiro coqueiral"
                    width={970}
                    height={350}
                    src={'/images/mensageiros-da-paz (4).jpg'}
                    /> 
                    <span>Dia de Semear Paz (Defesa/Social/Comunidade)</span>
                </Link>
                <Link 
                    href={'/projetos/escoteiros-pela-biodiversidade'} 
                    target='_self' 
                    className='cardProjetos'
                >
                    <Image 
                    alt="proteção ambiental, meio ambiente, sustentabilidade, escotismo, jovens, aracruz, grupo escoteiro coqueiral"
                    width={970}
                    height={350}
                    src={'/images/biodiversidade (1).jpg'}
                    />
                    <span>Escoteiros pela Biodiversidade (Meio Ambiente)</span>
                </Link>
                <Link 
                    href={'/projetos/escoteiro-dev'}  
                    target='_self' 
                    className='cardProjetos'
                >
                    <Image 
                    alt="tecnologia, cultura digital, educação tecnológica, escotismo, jovens, aracruz, grupo escoteiro coqueiral"
                    width={970}
                    height={350}
                    src={'/images/escoteiro-dev.jpg'}
                    /> 
                    <span>Escoteiro Dev (Cultura/Educação/Tecnologia)</span>
                </Link>
                </Box>
                <Link 
                    href='/projetos' 
                    target='_self' 
                    style={{
                        color: 'white', 
                        fontWeight: 600, 
                        backgroundColor: 'var(--azul-escuro)',
                        padding: '10px 20px',
                        textAlign: 'center',
                        marginTop: '20px',
                    }}
                >
                    VER TODOS
                </Link>
        </section>
    )
}