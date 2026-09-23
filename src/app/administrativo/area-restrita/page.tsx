'use client'
import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { DataNews, ProfileProps } from '@/@types/types';
import { calcTotalFilesMB, dateFormat2, encryptPassword, gerarSlug } from '@/scripts/globais';
import Modal from '@/components/layout/modal/modal';
import LoadIcon from '@/components/layout/loadIcon/loadIcon';
import axios from 'axios';

import NewsPage from '@/components/layout/newsPage/newsPage';
import Provider, { Context } from '@/components/context/context';
import { uels } from '@/components/data-training/data-training';

function Page(){
    const context = useContext(Context);
    const [dataNewUser, setDataNewUser] = useState({} as ProfileProps);
    const [showModal, setShowModal] = useState(false);
    const [actions, setAction] = useState<number | undefined>(3);
    const [dataNews, setDataNews] = useState({} as DataNews);
    const [keyWords, setKeyWords] = useState<string>('');

    //arquivos anexados.
    const [files, setFiles] = useState<{file:File, fileName:string}[]>([]);

    const handleData = (e:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>)=>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;

        setDataNewUser((prev)=>{
            if(name === 'nameUel'){
                const findUel = (uels || []).find(i=> i.nameUel === value);
                if (!findUel) return {...prev, dadosUel: {...prev.dadosUel, nameUel: ''}};                               
                return{
                    ...prev,
                    dadosUel: {
                        ...prev.dadosUel,
                        cidadeUels: findUel.cidadeUel,
                        nameUel: findUel.nameUel,
                        numUel: findUel.numUel,
                        ufUel: findUel.ufUel,
                    }
                }
            }
            else if(name.includes('dadosUel')){                
                return{
                    ...prev,
                    dadosUel: {
                        ...prev.dadosUel,
                        [name.split('.')[1]]: value
                    }
                }
            }
            return{
                ...prev,
                [name]: value
            }
        })
    }

    const handleDataNews = (e:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>)=>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;

        setDataNews((prev)=>{
            if(['destaque', 'evento'].includes(name)){
                return{
                    ...prev,
                    [name]: value === "Sim" ? true : false
                }
            }else if(name === 'date'){
                return{
                    ...prev,
                    date: new Date(value + 'T00:00')
                }
            }
            return{
                ...prev,
                [name]: value
            }
        })
    }
    const handleKeysWorld = (e:ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        const value = e.target.value;
        const match = value.includes(',');
        setKeyWords(value);

        if(match){
            if(value.length <= 1) return;
            setDataNews((prev)=>{
                return{
                    ...prev,
                    keywords: [...prev.keywords || [], value.split(',')[0]]
                }
            });

            setKeyWords('');
        }
    }
    const removeKeyWords = (index:number)=>{
        setDataNews((prev)=>{            
            const newKeys = prev.keywords?.filter((item, i)=> i !== index);
            return{
                ...prev,
                keywords: newKeys
            }
        })
    }

    const handleUpload = (e:ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        const filesData = e.target.files;        
        const fileListArray = filesData ? Array.from(filesData) as File[] : [];

        if(files.length + fileListArray.length > 10){
            alert("O limite de imagens é 10 imagens por notícia");
            return;
        }

        if(fileListArray){
            setFiles((prev)=>{
                for (const file of fileListArray) {
                    const fileSize = parseFloat(calcTotalFilesMB(file));
                    if(fileSize > 9){
                        alert("o tamanho máximo de um arquivo é de 9mb");
                        return prev;
                    }
                }                   
                const newData = fileListArray.map((f)=>{
                    return {
                        fileName: f.name,
                        file: f
                    }
                })
                return [...(prev || []), ...newData]
            });
        }
    }
    
    const submit = async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!dataNewUser.user || !dataNewUser.password || !dataNewUser.name){
            alert("Preencha os campos de autenticação!")
            return;
        }
        setShowModal(true);

        await axios.post(`${process.env.URL_AUTH}`,
            {            
                dataNewUser: encryptPassword(JSON.stringify(dataNewUser)),
            },{
                headers:{
                    'Authorization': `Bearer ${context.dataUser.token}`
                }
            }
        )
        .then((response)=>{
            console.log(response.data);
            setDataNewUser({} as ProfileProps)
            alert("Gravado com sucesso!");
            setShowModal(false);
        })
        .catch((e)=>{
            console.log(e.message)
            alert("Erro ao tentar gravar novo usuário!")
            setShowModal(false)
        });
    }

    const submitNews = async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!dataNews.title || !dataNews.paragraph || !files.length){
            alert("Preencha os campos obrigatórios!")
            return;
        }

        try{
            setShowModal(true);
            
            let idImage:string[]= [];

            //enviar os arquivos para nuvem.
            if (files && files.length > 0)  {
                
                const formData = new FormData();
                
                for (let index = 0; index < files.length; index++) {
                    formData.append(`file-${index}`, files[index].file, files[index].fileName);
                }

                //anexas os arquivos para serem enviados por e-mail.
                formData.append('destinationFolder', "uploads-imagens-news");
                formData.append('bucketName', "site-coqueiral-storage");

                const respUpload = await axios.post(`${process.env.URL_UPLOAD}/uploadImagens/`, formData,{
                    headers:{
                        'Authorization': `Bearer ${context.dataUser.token}`
                    }
                });

                if(respUpload && respUpload.data.urlsImagens){
                    //recebe o id do arquivo salvo no google drive.
                    idImage= respUpload.data.urlsImagens as string[];
                }else{
                    console.log('erro ao subir imagem', respUpload);
                    alert("Ocorreu um erro ao tentar subir a imagem");
                    setShowModal(false);
                    return;
                }
                
                console.log('urls', idImage)
            }           

            await axios.post(`${process.env.URL_SERVICES}`,
                {
                    service: 'news',
                    news: {
                        ...dataNews, 
                        imageID: idImage, 
                        slug: gerarSlug(dataNews.title),
                        date: new Date(dataNews.date)
                    }
                },{
                    headers:{
                        'Authorization': `Bearer ${context.dataUser.token}`
                    }
                }
            )
            .then(()=>{
                setDataNews({} as DataNews);
                setFiles([]);
                setKeyWords('')
                alert("Gravado com sucesso!");
                setShowModal(false);
            })
            .catch((e)=>{
                console.log(e.message)
                alert("Erro ao tentar gravar novo usuário!")
                setShowModal(false)
            });
        }catch(e){
            console.log(e)
            setShowModal(false);
        }
    }

    const removeFile = (fileName:string)=>{
        const newData = files.filter(file=> file.fileName !== fileName);

        setFiles(()=>{
            return newData;
        });
    }
    useEffect(()=>{
        context.recoverProfile();
    },[]);

    useEffect(()=>{
        let cancelled = false;
        Promise.all(files.map(({file}) => new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(file);
        }))).then(imageID => {
            if (!cancelled) setDataNews(prev => ({...prev, imageID}));
        }).catch(() => {
            if (!cancelled) alert('Não foi possível preparar a prévia das imagens. Selecione os arquivos novamente.');
        });
        return () => { cancelled = true; };
    },[files]);
    
    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <div className={styles.conteiner}>
                <header className={styles.header}>
                    <span className={styles.eyebrow}>ADMINISTRATIVO</span>
                    <h1 className={styles.title}>Área restrita</h1>
                    <p>Bem-vindo(a){context.dataUser?.name ? `, ${context.dataUser.name}` : ''}.</p>
                    <p>Organize os acessos e compartilhe as novidades do grupo.</p>
                </header>
                <nav className={styles.actions} aria-label="Ferramentas administrativas">
                    <button type="button" className={styles.cardActions} aria-pressed={actions === 1}
                        aria-controls="cadastro-usuario" onClick={()=>setAction(1)}
                        disabled={!["Admin", "Dirigente"].includes(context.dataUser?.nivelAcess)}>
                        <span className={styles.actionNumber} aria-hidden="true">01</span>
                        <strong>Cadastrar usuário</strong>
                        <span>Gerencie o acesso de novos integrantes.</span>
                        <small>{["Admin", "Dirigente"].includes(context.dataUser?.nivelAcess) ? 'Gerenciar acessos →' : 'Disponível para administradores e dirigentes'}</small>
                    </button>
                    <button type="button" className={styles.cardActions} disabled>
                        <span className={styles.actionNumber} aria-hidden="true">02</span>
                        <strong>Documentos de membros</strong>
                        <span>Consulte os documentos dos integrantes.</span>
                        <small>Em breve</small>
                    </button>
                    <button type="button" className={styles.cardActions} aria-pressed={actions === 3}
                        aria-controls="cadastro-noticia" onClick={()=>setAction(3)}>
                        <span className={styles.actionNumber} aria-hidden="true">03</span>
                        <strong>Cadastrar notícia</strong>
                        <span>Compartilhe histórias, atividades e eventos.</span>
                        <small>Preparar publicação →</small>
                    </button>
                </nav>
                {actions === 1 && ["Admin", "Dirigente"].includes(context.dataUser.nivelAcess) ? 
                <form id="cadastro-usuario" className={styles.subConteiner} onSubmit={submit} aria-busy={showModal}>
                    <p className={styles.eyebrow}>ACESSOS DO GRUPO</p>
                    <h2>Cadastrar novo usuário</h2><p className={styles.intro}>Preencha os dados do integrante e defina seu acesso. Nome, usuário e senha são obrigatórios.</p>
                    <div className={styles.boxInputs}>
                        <div className={styles.boxInput}> 
                            <label htmlFor="name">Nome</label>                   
                            <input id="name" type="text" 
                                name='name' required autoComplete='name' 
                                onChange={(e)=>handleData(e)}
                                value={dataNewUser.name || '' }
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="registro">Registro Escoteiro</label>                   
                            <input id="registro" type="text" 
                                name='registro' 
                                onChange={(e)=>handleData(e)}
                                value={dataNewUser.registro || '' }
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="cargo">Cargo</label>                   
                            <select id="cargo" name='cargo' 
                                onChange={(e)=>handleData(e)}
                                value={dataNewUser.cargo || '' }
                            >
                                {[
                                    '',
                                    'Chefe de ramo', 
                                    'Ch. Assistente de ramo',
                                    'Ch. Assistente administrativo', 
                                    'Diretor(a) Administrativo', 
                                    'Diretor(a) Financeiro',
                                    'Diretor(a) de Métodos Educativos',
                                    'Diretor(a) Presidente'].map(item=> (
                                    <option value={item} key={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="ramo">Ramo</label>                   
                            <select id="ramo" name='ramo' 
                                onChange={(e)=>handleData(e)}
                                value={dataNewUser.ramo || '' }
                            >
                                {[
                                    '',
                                    'Lobinho', 
                                    'Escoteiro', 
                                    'Sênior', 
                                    'Pioneiro',
                                    'Diretoria'].map(item=> (
                                    <option value={item} key={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="nivelFormacao">Nível de formação</label>                   
                            <select id="nivelFormacao" name='nivelFormacao' 
                                onChange={(e)=>handleData(e)}
                                value={dataNewUser.nivelFormacao || '' }
                            >
                                {['', 'Preliminar', 'Intermediário', 'Avançado'].map(item=> (
                                    <option value={item} key={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="nivelAcess">Nível de Acesso</label>                   
                            <select id="nivelAcess" name='nivelAcess' 
                                onChange={(e)=>handleData(e)}
                                value={dataNewUser.nivelAcess || '' }
                            >
                                {['', 'Escotista', 'Dirigente', 'Regional-admin'].map(item=> (
                                    <option value={item} key={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="tel">Contato</label>                   
                            <input id="tel" type="tel" 
                                name='tel' 
                                onChange={(e)=>handleData(e)}
                                value={dataNewUser.tel || '' }
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="email">E-mail</label>                   
                            <input id="email" type="email" 
                                name='email' 
                                onChange={(e)=>handleData(e)}
                                value={dataNewUser.email || '' }
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="user">Usuário</label>                   
                            <input id="user" type="text" 
                                name='user' required autoComplete='off' 
                                onChange={(e)=>handleData(e)}
                                value={dataNewUser.user || '' }
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="password">Senha</label>       
                            <input id="password" type="password" 
                                name='password' required autoComplete='new-password'
                                onChange={(e)=>handleData(e)}
                                value={dataNewUser.password || '' }
                            /> 
                        </div>
                    </div>
                    <div className={styles.boxInput}>
                        <div className={styles.boxInput}> 
                            <label htmlFor="nameUel">UEL</label>
                            <select id="nameUel"
                                name='nameUel' 
                                onChange={(e)=>handleData(e)}
                                value={dataNewUser.dadosUel?.nameUel || '' }
                            >
                                <option value=""></option>
                                {[...uels].sort((a,b)=>{
                                    const item1 = a.numUel;
                                    const item2 = b.numUel;
                                    if(item1 > item2){
                                        return 1
                                    }else if(item1 < item2){
                                        return -1
                                    }else return 0;
                                }).map(uel=> (
                                    <option value={uel.nameUel} key={uel.nameUel}>{`${uel.numUel || ''} ${uel.ufUel || ''} - ${uel.nameUel || ''}`}</option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="dadosUel.presidenteUel">Presidente da UEL</label>                   
                            <input id="dadosUel.presidenteUel" type="text" 
                                name='dadosUel.presidenteUel' 
                                onChange={(e)=>handleData(e)}
                                value={dataNewUser.dadosUel?.presidenteUel || '' }
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="dadosUel.regEscoteiroPresidente">Registro do(a) Presidente da UEL</label>                   
                            <input id="dadosUel.regEscoteiroPresidente" type="text" 
                                name='dadosUel.regEscoteiroPresidente' 
                                onChange={(e)=>handleData(e)}
                                value={dataNewUser.dadosUel?.regEscoteiroPresidente || '' }
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="dadosUel.telPresidente">Contato do(a) Presidente da UEL</label>                   
                            <input id="dadosUel.telPresidente" type="text" 
                                name='dadosUel.telPresidente' 
                                onChange={(e)=>handleData(e)}
                                value={dataNewUser.dadosUel?.telPresidente || '' }
                            />
                        </div>
                    </div>
                    <button type="submit" className={styles.submit} disabled={showModal}>
                        Cadastrar usuário
                    </button>
                </form>
                :null}

                {actions === 3 ? 
                <>
                <form id="cadastro-noticia" className={styles.subConteiner} onSubmit={submitNews} aria-busy={showModal}>
                    <p className={styles.eyebrow}>NOVIDADES DO COQUEIRAL</p>
                    <h2>Cadastrar notícia</h2><p className={styles.intro}>Conte o que acontece no grupo. Título, imagens e texto são obrigatórios.</p> 
                    <div className={styles.boxInputs}>
                        <div className={`${styles.boxInput}`}> 
                            <label htmlFor="title">Título</label>                   
                            <input id="title" type="text" 
                                name='title' required 
                                onChange={(e)=>handleDataNews(e)}
                                value={dataNews.title || '' }
                                placeholder='título da notícia'
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="destaque">Essa notícia deve aparecer em Destaques?</label>                   
                            <select id="destaque" name='destaque' 
                                onChange={(e)=>handleDataNews(e)}
                                value={dataNews.destaque ? 'Sim' : 'Não'  }
                            >
                                <option value={''}>Selecione</option>
                                {['Não','Sim'].map(item=> (
                                    <option value={item} key={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="evento">Se trata de um Evento?</label>                   
                            <select id="evento" name='evento' 
                                onChange={(e)=>handleDataNews(e)}
                                value={dataNews.evento ? 'Sim' : 'Não'  }
                            >
                                <option value={''}>Selecione</option>
                                {['Não','Sim'].map(item=> (
                                    <option value={item} key={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="upload">
                                Resolução ideal da imagem do banner (1200x600)<br/>
                                máximo 10 imagens <br/>
                                <span>A primeira imagem será a capa. JPG ou PNG, até 9 MB por imagem.</span>
                                <input id="upload" type="file" 
                                    name='upload' 
                                    accept='.jpeg, .png, .jpg'
                                    multiple
                                    onChange={(e)=>handleUpload(e)}
                                />
                            </label>
                            {files?.map((f, i)=>(
                                <p key={f.fileName+i} className={styles.itensFotos}>
                                    {f.fileName}
                                    <button type="button" aria-label={`Remover imagem ${f.fileName}`} onClick={()=>removeFile(f.fileName)}>×</button>
                                </p>
                            ))

                            }
                        </div>
                        <div className={`${styles.boxInput}`}> 
                            <label htmlFor="linkMaps">Link do mapa</label>                   
                            <input id="linkMaps" type="text" 
                                name='linkMaps' 
                                onChange={(e)=>handleDataNews(e)}
                                value={dataNews.linkMaps || '' }
                                placeholder='link das coordenadas'
                            />
                        </div>
                        <div className={`${styles.boxInput}`}> 
                            <label htmlFor="date">Data</label>                   
                            <input id="date" type="date" 
                                name='date' 
                                onChange={(e)=>handleDataNews(e)}
                                value={dataNews.date && !isNaN(new Date(dataNews.date).getTime()) ? dateFormat2(dataNews.date).split('/').reverse().join('-') : ''}
                                                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="keyWords">
                                Palavras chaves                  
                                <input id="keyWords" name='keyWords' 
                                    onChange={(e)=>handleKeysWorld(e)}
                                    onKeyDown={(e)=>{if(e.key === 'Enter') {
                                        e.preventDefault();
                                        const keyword = e.currentTarget.value.trim();
                                        if(keyword.length <= 1) return;
                                        setDataNews((prev)=>{
                                            return{
                                                ...prev,
                                                keywords: [...prev.keywords || [], keyword]
                                            }
                                        });
                                        setKeyWords('');
                                        e.preventDefault(); //previne o envio do form após teclar enter.
                                    }}}
                                    value={keyWords || '' }
                                    placeholder='use a vírgula ou enter'
                                />
                            </label> 
                            <div className={styles.keyWords}>
                                {dataNews.keywords?.map((item, index)=>(
                                    <div key={index+"keysworld"} style={{position: 'relative', paddingRight: '16px'}}>
                                        <span>{item}</span>
                                        <button type="button" aria-label={`Remover palavra-chave ${item}`} onClick={()=>removeKeyWords(index)}>×</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.boxTextArea}>
                            <label htmlFor="paragraph">Texto da notícia</label><p id="texto-ajuda" className={styles.hint}>Escreva o conteúdo em parágrafos, usando Enter para separar as ideias.</p>                   
                            <textarea id="paragraph" name='paragraph' required aria-describedby='texto-ajuda' 
                                onChange={(e)=>handleDataNews(e)}
                                value={dataNews.paragraph || '' }
                                placeholder='Compartilhe os detalhes da atividade…'
                            />
                        </div>
                    </div>
                    <button type="submit" className={styles.submit} disabled={showModal}>
                        Publicar notícia
                    </button>
                </form>
                <details className={styles.preview}>
                    <summary>Prévia da notícia <span>Confira o conteúdo antes de publicar</span></summary>
                    <div className={styles.previewContent}>
                    <NewsPage
                        origem='cadastro'
                        dataNews={dataNews}
                    />
                    </div>
                </details>
                </>
                :null}
            </div>

            {showModal ?
                <Modal customClass={['alingCenter']}>
                    <LoadIcon showHide={true} customClass="size100"/>
                </Modal>:null
            }
        </Section>
    )
}

export default function PageLogin(){
    return <Provider>
        <Page />
    </Provider>;
}
