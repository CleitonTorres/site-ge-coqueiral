'use client'
import Section from '@/components/layout/sections/section';
import styles from './page.module.css';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { DataNews, ProfileProps } from '@/@types/types';
import { calcTotalFilesMB, createCookie, destroyCookie, encryptPassword, getCookie } from '@/scripts/globais';
import Modal from '@/components/layout/modal/modal';
import LoadIcon from '@/components/layout/loadIcon/loadIcon';
import axios from 'axios';
import { v4 } from 'uuid';
import NewsPage from '@/components/layout/newsPage/newsPage';

export default function Page(){
    const [dataUser, setDataUser] = useState({} as ProfileProps);
    const [dataNewUser, setDataNewUser] = useState({} as ProfileProps);
    const [showModal, setShowModal] = useState(false);
    const [actions, setAction] = useState<number | undefined>();
    const [dataNews, setDataNews] = useState({} as DataNews);

    //arquivos anexados.
    const [file, setFile] = useState({} as File);

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

    const handleData = (e:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>)=>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;

        setDataNewUser((prev)=>{
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
            if(name === "destaque"){
                return{
                    ...prev,
                    destaque: value === "Sim" ? true : false
                }
            }
            return{
                ...prev,
                [name]: value
            }
        })
    }

    const handleUpload = (e:ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        const files = e.target.files;        

        if(files){
            setFile((prev)=>{
                const fileSize = parseFloat(calcTotalFilesMB(prev));
                if(fileSize > 4){
                    alert("o tamanho máximo de um arquivo é de 4mb");
                    return prev;
                }                 
                return files[0]
            });
        }
    }
    
    const handleImageChange = () => {
        if (file instanceof Blob) {
          const reader = new FileReader();
          reader.onload = () => {
            setDataNews((prev)=>{
                return{
                    ...prev,
                    imageID: reader.result as string // Define a URL da imagem no estado
                }
            })
          };
          reader.readAsDataURL(file); // Lê o arquivo como uma URL base64
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
                    'Authorization': `Bearer ${dataUser.token}`
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
        if(!dataNews.title || !dataNews.paragraph){
            alert("Preencha os campos de autenticação!")
            return;
        }

        try{
            setShowModal(true);
            let idImage= '';
            const formData = new FormData();
            //enviar os arquivos para nuvem.
            if (file) {
                //anexas os arquivos para serem enviados por e-mail.
                formData.append(`file`, file, file.name);
                formData.append('service', "upload");
                
                const respUpload = await axios.post(`${process.env.NEXT_PUBLIC_URL_UPLOAD}/upload/`, formData,{
                    headers:{
                        'Authorization': `Bearer ${dataUser.token}`
                    }
                });

                if(respUpload && respUpload.data.idImagem){
                    //recebe o id do arquivo salvo no google drive.
                    idImage = respUpload.data.idImagem;
                }else{
                    alert("Ocorreu um erro ao tentar subir a imagem");
                    setShowModal(false);
                    return;
                }
            }

            await axios.post(`${process.env.NEXT_PUBLIC_URL_SERVICES}`,
                {
                    service: 'news',
                    news: {...dataNews, imageID: idImage}
                },{
                    headers:{
                        'Authorization': `Bearer ${dataUser.token}`
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

    useEffect(()=>{
        recoverProfile();
    },[]);

    useEffect(()=>{
        if (file instanceof Blob){
            handleImageChange();
        }
    },[file]);
    
    return(
        <Section customClass={['flexCollTop', 'fullWidth']}>
            <h1 className={styles.title}>Área Restrita</h1>
            <h4>Bem vindo(a), {dataUser?.name}</h4>
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
                {actions === 1 && ["Admin", "Dirigente"].includes(dataUser.nivelAcess) ? 
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
                                placeholder='Nome'
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
                                    'Chefe de ramo', 
                                    'Ch. Assistente', 
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
                            <label htmlFor="user">Nível de Acesso</label>                   
                            <select 
                                name='nivelAcess' 
                                onChange={(e)=>handleData(e)}
                                value={dataNewUser.nivelAcess || '' }
                            >
                                {['Admin', 'Escotista', 'Dirigente'].map(item=> (
                                    <option value={item} key={v4()}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="user">Usuário</label>                   
                            <input 
                                type="text" 
                                name='user' 
                                onChange={(e)=>handleData(e)}
                                value={dataNewUser.user || '' }
                                placeholder='Nome de usuário'
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="user">Senha</label>       
                            <input 
                                type="password" 
                                name='password'
                                placeholder='senha'
                                onChange={(e)=>handleData(e)}
                                value={dataNewUser.password || '' }
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
                                {['Não','Sim'].map(item=> (
                                    <option value={item} key={v4()}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="user">ID da imagem do banner (1000x600)</label>
                            <input 
                                type="file" 
                                name='upload' 
                                accept='image/*'
                                onChange={(e)=>handleUpload(e)}
                            />
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