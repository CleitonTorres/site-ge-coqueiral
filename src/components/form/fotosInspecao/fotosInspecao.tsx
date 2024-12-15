'use client'
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import styles from './fotosInspecao.module.css';
import { calcTotalFilesMB } from '@/scripts/globais';
import { FormFotosInspecao, FotosInspecaoType } from '@/@types/types';
import { Context } from '@/components/context/context';
import Image from 'next/image';
import { FaPlus } from 'react-icons/fa6';


const ImagePreview = ({ file, width, height }:{file:File, width:number, height:number}) => {
    const [base64, setBase64] = useState('');

    const fileToBase64 = (file:File) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
    
            reader.onload = () => resolve(reader.result as string); // Retorna apenas a string Base64
            reader.onerror = (error) => reject(error);
    
            reader.readAsDataURL(file); // Lê o arquivo como uma string Base64
        });
    };

    useEffect(() => {
        if (file) {
            fileToBase64(file).then((base64String) => {
                setBase64(base64String); // Atualiza o estado com o Base64
            }).catch((error) => {
                console.error('Erro ao converter arquivo para Base64:', error);
            });
        }
    }, [file]);

    if (!base64) return <p>Carregando...</p>; // Mostra um indicador de carregamento enquanto o Base64 não é gerado

    return (
        <Image
            alt=""
            width={width}
            height={height}
            style={{ objectFit: 'contain', height: 'auto' }}
            src={base64} // Usa o Base64 gerado como src
        />
    );
};

export default function FotosInspecao(){
    const context = useContext(Context);

    const [currentForm, setCurrentForm] = useState({} as FormFotosInspecao);
    const [data, setData] = useState<FormFotosInspecao[]>([]);
    
    const handleChangeCurrentForm = (
        e:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
        index?: number
    )=>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;

        setCurrentForm((prev)=>{
            if(name.includes('fotos')){
                const nameField = name.split('.')[1];
                const newArray = prev.fotos.map((foto, idx)=>{
                    if(index === idx){
                        return{
                            ...foto,
                            [nameField]: value
                        }
                    }else{
                        return foto
                    }
                })

                return {...prev, fotos: newArray};
            }else{
                return {
                    ...prev,
                    [name]: value
                }
            }
        })
    }

    const handleChange = (e:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>)=>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;

    }

    const addSectionFotos = ()=>{
        if(currentForm.fotos?.length === 0 || !currentForm.title || !currentForm.description){
            alert("Campos obrigatórios estão vazios ou faltam fotos");
            return;
        };

        const newData = [
            ...data,
            currentForm
        ]
        setCurrentForm({} as FormFotosInspecao)
        updateContext(newData);
    }

    //lida com arquivos
    const handleUploadCurrentForm = (e:ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        const files = e.target.files;        
        const fileListArray = files ? Array.from(files) as File[] : [];
        const name = e.target.name;

        if(!fileListArray || fileListArray.length === 0) return;
        
        //verifica o tamanho de cada imagem.
        fileListArray.forEach(file => {
            const fileSize = parseFloat(calcTotalFilesMB(file));
            if(fileSize > 4){
                alert("o tamanho máximo de um arquivo é de 4mb");
                return;
            }
        });
        
        setCurrentForm((prev)=>{
            let newData = prev;
            for (const file of fileListArray) {
                const match = newData.fotos?.find(doc=> doc.name === file.name);
                if(match){
                    const newArray = newData.fotos.map(doc=>{
                        if(doc.name === file.name){
                            return{
                                ...doc,
                                doc: file
                            }
                        }else{
                            return doc
                        }
                    })
                    newData ={
                        ...newData,
                        fotos: newArray
                    }
                }else{
                    newData= {
                        ...newData, 
                        fotos: newData.fotos ? [
                            ...newData.fotos,
                            {
                                title: '',
                                description: '',
                                name: file.name,
                                doc: file
                            }
                        ] : [
                            {
                                title: '',
                                description: '',
                                name: file.name,
                                doc: file
                            }
                        ]
                    };
                }                    
            }
            return newData;
        })
    }
    const handleRemoveUploadCurrentFotos = (name:string)=>{
        setCurrentForm((prev)=>{
            const newData = prev.fotos.filter(doc=> doc.name !== name);
            return {...prev, fotos: newData}
        })
    }

    const handleUpload = (e:ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        const files = e.target.files;        
        const fileListArray = files ? Array.from(files) as File[] : [];
        const name = e.target.name;

        if(!fileListArray || fileListArray.length === 0) return;
        
        //verifica o tamanho de cada imagem.
        fileListArray.forEach(file => {
            const fileSize = parseFloat(calcTotalFilesMB(file));
            if(fileSize > 4){
                alert("o tamanho máximo de um arquivo é de 4mb");
                return;
            }
        });

        let newData: FotosInspecaoType[] = data ? [...data] : [];
        
        for (const file of fileListArray) {
            const match = newData?.find(doc=> doc.name === file.name);
            if(match){
                newData = newData.map(doc=>{
                    if(doc.name === file.name){
                        return{
                            ...doc,
                            doc: file
                        }
                    }else{
                        return doc
                    }
                })
            }else{
                newData.push({ 
                    doc: file, 
                    name: file.name,
                    description: '',
                    title: ''
                });
            }                    
        }
    }
    const handleRemoveUpload = (name:string)=>{
        const newData = data.filter(doc=> doc.name !== name);

        updateContext(newData);
    }
    //-----------------
    
    const updateContext = (newData:FormFotosInspecao[])=>{
        setData(newData);
        context.setDataSaae((prev)=>{
            return{
                ...prev,
                fotosInspecao: newData
            }
        })
    }

    return(
        <div className={styles.conteiner}>
            <h2>7. Fotos do local/inspeção:</h2>

            <div className={styles.section}>
                <div className={styles.subConteiner}>
                        <div className={styles.boxInput}>
                            <label htmlFor="">Título da sessão de fotos</label>
                            <input
                                type='text' 
                                name='title'
                                value={currentForm.title || ''}
                                onChange={(e)=>handleChangeCurrentForm(e)}
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="">Descrição</label>
                            <textarea
                                name='description'
                                value={currentForm.description || ''}
                                onChange={(e)=>handleChangeCurrentForm(e)}
                                placeholder='forneça informações sobre esse conjunto de imagens'
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="">Fotos</label>
                            <input
                                type='file' 
                                name='fotos'
                                multiple
                                accept='image/*'
                                onChange={(e)=>handleUploadCurrentForm(e)}
                            />
                        </div>
                        <FaPlus size={20} onClick={addSectionFotos} className={styles.addBtn}/>
                </div>
            </div>
            <div className={styles.subConteiner}>
                    {currentForm.fotos?.map((foto, idx)=>(
                        <div key={idx+'viewCurrentFoto'} className={styles.viewerFotos}>
                            <b onClick={()=>handleRemoveUploadCurrentFotos(foto.name)}>X</b>
                            <div className={`${styles.subConteiner} ${styles.flexSpace}`}>
                                <div className={`${styles.boxInput} ${styles.width200}`}>
                                    <label htmlFor="title">Rótulo da imagem</label>
                                    <input
                                        name='fotos.title' 
                                        value={foto.title || ''} 
                                        onChange={(e)=>handleChangeCurrentForm(e, idx)}/>
                                </div>
                                <div className={styles.boxInput}>
                                    <label htmlFor="title">Observações</label>
                                    <textarea 
                                        name='fotos.description' 
                                        value={foto.description || ''}
                                        onChange={(e)=>handleChangeCurrentForm(e, idx)}/>
                                </div>
                            </div>
                            <ImagePreview file={foto.doc as File} height={600} width={600}/>
                        </div>                        
                    ))}
            </div>

            <div className={styles.subConteiner}>
                {data?.map((section, idx)=>(
                    <div 
                        className={`${styles.subConteiner} ${styles.widthAuto}`}
                        style={{marginLeft: '2px'}}
                        key={idx+'dataFotos'}>
                        <div className={styles.boxInput}>
                            <p>Conjunto de fotos: {section.title}</p>
                            <p>Observações: {section.description}</p>
                            {section.fotos?.map((foto, fIdx)=>(
                                <div key={fIdx+'fotosData'} className={styles.boxDados}>
                                    <span><b>Título da imagem:</b> {foto.title}</span>
                                    <span><b>Nome do arquivo:</b> {foto.name}</span>
                                    <span><b>Descrição:</b> {foto.description}</span>
                                    <ImagePreview file={foto.doc as File} height={100} width={100}/>
                                </div>
                            ))

                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}