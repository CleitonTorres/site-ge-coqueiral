'use server'
import { DataNews } from "@/@types/types";
import { dateFormat3, handleTypeUrl } from "@/scripts/globais";
import Image from "next/image";
import Link from "next/link";
import styles from './styles.module.css';

export default async function NewsHomeSection() {
    const formatText = (text:string) => {
        if(!text) return<></>;

        // Regex para identificar os padrões de formatação
        const pattern = /\/p(.*?)\/p|\*(.*?)\*/g;

        const elements: JSX.Element[] = [];
        let lastIndex = 0;
    
        // Percorre as correspondências dos padrões
        text.replace(pattern, (match, p1, bold, index) => {
            // Verifica qual padrão foi encontrado
            if (p1 !== undefined) {
                // Formatação de parágrafo
                elements.push(
                    <p key={index}>
                        {p1} {/* Processa recursivamente */}
                    </p>
                );
            } else if (bold !== undefined) {
                // Formatação de negrito
                elements.push(
                    <strong key={index} style={{ fontWeight: 'bold' }}>
                        {bold}
                    </strong>
                );
            }

            lastIndex = index + match.length;
            return match; // Necessário para o replace continuar
        });
    
        // // Adiciona qualquer texto restante após o último match
        if (lastIndex < text.length) {
            elements.push(<p key={lastIndex}>{text.slice(lastIndex)}</p>);
        }
    
        return elements;
    };

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_ROOT_URL}${process.env.NEXT_PUBLIC_URL_SERVICES}?service=news`,
            {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTORIZATION}`,
            },
            cache: 'force-cache', // SEO friendly
            next: { revalidate: 60 }
            }
        );

        const data = await response.json();
        const news: DataNews[] = (data.news as DataNews[])
        ?.sort((a, b)=> {
            const dateA = a.date ? new Date(a.date).getTime() : 0;
            const dateB = b.date ? new Date(b.date).getTime() : 0;
            return dateB - dateA
        }).slice(0, 10);

        if(!news || news.length === 0){
            return <p>Não há notícias disponíveis no momento.</p>;
        }

        return (
            <section className={styles.section}>
                <h1 className='textLarge' style={{color: 'var(--azul-escuro)'}}>Notícias</h1>        
                <div className={styles.conteiner}>
                    {news
                    ?.map((news)=>{            
                        return(
                            <Link 
                                href={`/aconteceu/${news.slug}`}
                                key={news._id}
                                className={styles.content}
                            >
                                {news.imageID ?
                                    <Image
                                        alt={`${news.keywords?.join(', ')}`}
                                        width={400}
                                        height={150}
                                        style={{
                                            objectFit: 'contain',
                                            backgroundColor: 'transparent', 
                                            width: '100%'
                                        }}
                                        about={`${news.keywords?.join(', ')}`}
                                        src={handleTypeUrl(Array.isArray(news.imageID) ? news.imageID[0] : news.imageID)} 
                                    />
                                :null}
                                <h4>{dateFormat3(news.date)}</h4>
                                <h1>{news.title}</h1>
                                {formatText(news.paragraph)[0] || ''}                        
                            </Link> 
                        )
                    })}
                </div>
                <Link 
                    href='/aconteceu' 
                    target='_self' 
                    style={{
                        color: 'white', 
                        fontWeight: 600, 
                        backgroundColor: 'var(--azul-escuro)',
                        padding: '10px 20px',
                    }}
                >
                    VER TODAS
                </Link>
            </section>      
        );
    } catch (err) {
        console.error("Erro ao buscar notícias:", err);
        return <p>Não foi possível carregar as notícias.</p>;
    }
}
