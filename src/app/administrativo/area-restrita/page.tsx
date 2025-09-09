'use client'
import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { DataNews, ProfileProps } from '@/@types/types';
import { calcTotalFilesMB, dateFormat2, encryptPassword, gerarSlug } from '@/scripts/globais';
import Modal from '@/components/layout/modal/modal';
import LoadIcon from '@/components/layout/loadIcon/loadIcon';
import axios from 'axios';
import { v4 } from 'uuid';
import NewsPage from '@/components/layout/newsPage/newsPage';
import { Context } from '@/components/context/context';
import { uels } from '@/components/data-training/data-training';

export default function Page(){
    const context = useContext(Context);
    const [dataNewUser, setDataNewUser] = useState({} as ProfileProps);
    const [showModal, setShowModal] = useState(false);
    const [actions, setAction] = useState<number | undefined>();
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
                const findUel = uels.find(i=> i.nameUel.includes(value));                               
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

        if(fileListArray.length > 9){
            alert("O limite de imagens é 9 imagens por notícia");
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
                return newData
            });
        }
    }
    
    const handleImageChange = () => {
        let data:string[] = [];
        if(files.length === 0){
            setDataNews((prev)=>{
                return{
                    ...prev,
                    imageID: []
                }
            })
        }
        for (let i= 0; i < files.length; i++) {
            const match = files[i].file instanceof Blob;
            if(!match) break;
            
            const reader = new FileReader();

            reader.onload = () => {
                data = [...data, reader.result as string]
                setDataNews((prev)=>{
                    return{
                        ...prev,
                        imageID: data
                    }
                })
            };
            reader.readAsDataURL(files[i].file); // Lê o arquivo como uma URL base64   
        }        
    }

    const handleActions = (id:number)=>{
        if(actions === id){
            setAction(undefined)
        }else{
            setAction(id)
        }
    }

    const submit = async(e:FormEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        if(!dataNewUser.user || !dataNewUser.password || !dataNewUser.name){
            alert("Preencha os campos de autenticação!")
            return;
        }
        setShowModal(true);

        await axios.post(`${process.env.NEXT_PUBLIC_URL_AUTH}`,
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

    const submitNews = async(e:FormEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        if(!dataNews.title || !dataNews.paragraph || !dataNews.imageID){
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

                const respUpload = await axios.post(`${process.env.NEXT_PUBLIC_URL_UPLOAD}/uploadImagens/`, formData,{
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
                }
                
                console.log('urls', idImage)
            }           

            await axios.post(`${process.env.NEXT_PUBLIC_URL_SERVICES}`,
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
                setDataNews({} as DataNews)
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
        handleImageChange();
    },[files]);
    
    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <h1 className={styles.title}>Área Restrita</h1>
            <h4>Bem vindo(a), {context.dataUser?.name}</h4>
            <div className={styles.conteiner}>
                <div className={styles.subConteiner}>                    
                    <ul>
                        <li className={`${styles.cardActions} boxShadow`} onClick={()=>handleActions(1)}>
                            <b className='cursorPointer'>Cadastrar usuário</b>
                        </li>
                        <li className={`${styles.cardActions} boxShadow`} onClick={()=>handleActions(2)}>
                            <b className='cursorPointer'>Documento de membros</b>
                        </li>
                        <li className={`${styles.cardActions} boxShadow`} onClick={()=>handleActions(3)}>
                            <b className='cursorPointer'>Cadastrar notícia</b>
                        </li>
                    </ul>
                    <br />
                    
                </div>
                {actions === 1 && ["Admin", "Dirigente"].includes(context.dataUser.nivelAcess) ? 
                <form className={`${styles.subConteiner}`} method='POST'>
                    <h4>Cadastrar novo usuário</h4>
                    <div className={styles.boxInputs}>
                        <div className={styles.boxInput}> 
                            <label htmlFor="user">Nome</label>                   
                            <input 
                                type="text" 
                                name='name' 
                                onChange={(e)=>handleData(e)}
                                value={dataNewUser.name || '' }
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="user">Registro Escoteiro</label>                   
                            <input 
                                type="text" 
                                name='registro' 
                                onChange={(e)=>handleData(e)}
                                value={dataNewUser.registro || '' }
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="user">Cargo</label>                   
                            <select 
                                name='cargo' 
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
                                    <option value={item} key={v4()}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="user">Ramo</label>                   
                            <select 
                                name='ramo' 
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
                                    <option value={item} key={v4()}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="user">Nível de formação</label>                   
                            <select 
                                name='nivelFormacao' 
                                onChange={(e)=>handleData(e)}
                                value={dataNewUser.nivelFormacao || '' }
                            >
                                {['', 'Preliminar', 'Intermediário', 'Avançado'].map(item=> (
                                    <option value={item} key={v4()}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="user">Nível de Acesso</label>                   
                            <select 
                                name='nivelAcess' 
                                onChange={(e)=>handleData(e)}
                                value={dataNewUser.nivelAcess || '' }
                            >
                                {['', 'Escotista', 'Dirigente', 'Regional-admin'].map(item=> (
                                    <option value={item} key={v4()}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="user">Contato</label>                   
                            <input 
                                type="tel" 
                                name='tel' 
                                onChange={(e)=>handleData(e)}
                                value={dataNewUser.tel || '' }
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="user">E-mail</label>                   
                            <input 
                                type="email" 
                                name='email' 
                                onChange={(e)=>handleData(e)}
                                value={dataNewUser.email || '' }
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="user">Usuário</label>                   
                            <input 
                                type="text" 
                                name='user' 
                                onChange={(e)=>handleData(e)}
                                value={dataNewUser.user || '' }
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="user">Senha</label>       
                            <input 
                                type="password" 
                                name='password'
                                onChange={(e)=>handleData(e)}
                                value={dataNewUser.password || '' }
                            /> 
                        </div>
                    </div>
                    <div className={styles.boxInput}>
                        <div className={styles.boxInput}> 
                            <label htmlFor="nameUel">UEL</label>
                            <select
                                name='nameUel' 
                                onChange={(e)=>handleData(e)}
                                value={dataNewUser.dadosUel?.nameUel || '' }
                            >
                                <option value=""></option>
                                {uels.sort((a,b)=>{
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
                            <label htmlFor="user">Presidente da UEL</label>                   
                            <input 
                                type="text" 
                                name='dadosUel.presidenteUel' 
                                onChange={(e)=>handleData(e)}
                                value={dataNewUser.dadosUel?.presidenteUel || '' }
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="user">Registro do(a) Presidente da UEL</label>                   
                            <input 
                                type="text" 
                                name='dadosUel.regEscoteiroPresidente' 
                                onChange={(e)=>handleData(e)}
                                value={dataNewUser.dadosUel?.regEscoteiroPresidente || '' }
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="user">Contato do(a) Presidente da UEL</label>                   
                            <input 
                                type="text" 
                                name='dadosUel.telPresidente' 
                                onChange={(e)=>handleData(e)}
                                value={dataNewUser.dadosUel?.telPresidente || '' }
                            />
                        </div>
                    </div>
                    <button onClick={(e)=>submit(e)}>
                        Ok
                    </button>
                </form>
                :null}

                {actions === 3 ? 
                <>
                <form className={`${styles.subConteiner}`} method='POST'>
                    <h4>Cadastrar notícia</h4> 
                    <div className={styles.boxInputs}>
                        <div className={`${styles.boxInput}`}> 
                            <label htmlFor="user">Título</label>                   
                            <input 
                                type="text" 
                                name='title' 
                                onChange={(e)=>handleDataNews(e)}
                                value={dataNews.title || '' }
                                placeholder='título da notícia'
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="user">Essa notícia deve aparecer em Destaques?</label>                   
                            <select 
                                name='destaque' 
                                onChange={(e)=>handleDataNews(e)}
                                value={dataNews.destaque ? 'Sim' : 'Não'  }
                            >
                                <option value={''} key={v4()}></option>
                                {['Não','Sim'].map(item=> (
                                    <option value={item} key={v4()}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="user">Se trata de um Evento?</label>                   
                            <select 
                                name='evento' 
                                onChange={(e)=>handleDataNews(e)}
                                value={dataNews.evento ? 'Sim' : 'Não'  }
                            >
                                <option value={''} key={v4()}></option>
                                {['Não','Sim'].map(item=> (
                                    <option value={item} key={v4()}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="user">
                                Resolução ideal da imagem do banner (1200x600)<br/>
                                máximo 6 imagens <br/>
                                <s>A primeira imagem carregada será usada de capa.</s>
                                <input 
                                    type="file" 
                                    name='upload' 
                                    accept='.jpeg, .png, .jpg'
                                    multiple
                                    onChange={(e)=>handleUpload(e)}
                                />
                            </label>
                            {files.map((f, i)=>(
                                <p key={f.fileName+i} className={styles.itensFotos}>
                                    {f.fileName}
                                    <span onClick={()=>removeFile(f.fileName)}>X</span>
                                </p>
                            ))

                            }
                        </div>
                        <div className={`${styles.boxInput}`}> 
                            <label htmlFor="user">Link do mapa</label>                   
                            <input 
                                type="text" 
                                name='linkMaps' 
                                onChange={(e)=>handleDataNews(e)}
                                value={dataNews.linkMaps || '' }
                                placeholder='link das coordenadas'
                            />
                        </div>
                        <div className={`${styles.boxInput}`}> 
                            <label htmlFor="user">Data</label>                   
                            <input 
                                type="date" 
                                name='date' 
                                onChange={(e)=>handleDataNews(e)}
                                datatype={dateFormat2(dataNews.date) || '' }
                                placeholder='link das coordenadas'
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="user">
                                Palavras chaves                  
                                <input 
                                    name='keyWords' 
                                    onChange={(e)=>handleKeysWorld(e)}
                                    onKeyDown={(e)=>{if(e.key === 'Enter') {
                                        e.preventDefault();
                                        if(e.currentTarget?.value.length <= 1) return;
                                        setDataNews((prev)=>{
                                            return{
                                                ...prev,
                                                keywords: [...prev.keywords || [], e.currentTarget?.value.split(',')[0]]
                                            }
                                        });
                                        setKeyWords('');
                                    }}}
                                    value={keyWords || '' }
                                    placeholder='use a vírgula ou enter'
                                />
                            </label> 
                            <div className={styles.keyWords}>
                                {dataNews.keywords?.map((item, index)=>(
                                    <div key={index+"keysworld"} style={{position: 'relative', paddingRight: '16px'}}>
                                        <span>{item}</span>
                                        <span 
                                            key={index+"keysworld"}
                                            onClick={()=>removeKeyWords(index)}
                                            style={{
                                                cursor: 'pointer', 
                                                color: 'var(--white)',
                                                position: 'absolute',
                                                right: '4px',
                                                top: '-6px',
                                            }}
                                        >
                                            x
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.boxTextArea}>
                            <label htmlFor="user">Parágrafo (* para negrito, /p para parágrafo)</label>                   
                            <textarea 
                                name='paragraph' 
                                onChange={(e)=>handleDataNews(e)}
                                value={dataNews.paragraph || '' }
                                placeholder='exemplo: *texto da notícia* (vai ficar em negrito) /p texto qualquer /p (vai quebrar linha como um parágrafo)'
                            />
                        </div>
                    </div>
                    <button onClick={(e)=>submitNews(e)}>
                        Ok
                    </button>
                </form>
                <div className={styles.subConteiner} style={{maxWidth: 'var(--widthLarge)'}}>
                    <h4>Preview da Notícia</h4>
                    <NewsPage 
                        idNews=''
                        origem='cadastro'
                        dataNews={dataNews}
                    />
                </div>
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