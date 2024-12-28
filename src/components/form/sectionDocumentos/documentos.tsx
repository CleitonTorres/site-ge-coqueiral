'use client'
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import styles from './documentos.module.css';
import { calcTotalFilesMB, pdfToImageBase64, signedURL } from '@/scripts/globais';
import { FormDocs } from '@/@types/types';
import { Context } from '@/components/context/context';
import Image from 'next/image';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import axios from 'axios';

export const ImagePreview = ({ file, width, height }:{file:File | string, width:number, height:number}) => {
    const context = useContext(Context);
    const [base64, setBase64] = useState('');
    const [isPdf, setIsPdf] = useState(false);
    const [urlSigned, setUrlSiged] = useState('');

    // Converte arquivos não PDF para Base64
    const fileToBase64 = (file: File) => {
        return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);

        reader.readAsDataURL(file);
        });
    };
    
    const getSignedUrl = async(url:string)=>{
        const data = await signedURL(url);
        if(!data) return;
        
        setUrlSiged(data);
        const isPDF = data?.includes('.pdf') ? true : false;

        if(data && isPDF){
            // Busca o PDF utilizando a URL assinada
            const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_SERVICES}`,{
                params:{
                    service: 'proxyPDF',
                    fileUrl: data
                },
                headers:{
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTORIZATION}`
                },
                responseType: 'arraybuffer' // Define o tipo de resposta como Blob
            });
            
            //console.log("blob data", response.data)
            if(!(response.data instanceof ArrayBuffer)) return;

            // Converte o ArrayBuffer para Blob
            const blob = new Blob([response.data], { type: 'application/pdf' });
            // Converte o conteúdo do PDF para um objeto File
            const file = new File([blob], "preview.pdf", { type: "application/pdf" });

            // Gera a visualização da primeira página em Base64
            const previewBase64 = await pdfToImageBase64(file);
            setBase64(previewBase64);
        }else if(data && !isPDF){
            setBase64(data);
        }
    }

    useEffect(() => {
        const processFile = async () => {
          try {
            if(file instanceof Blob){
                if (file.type === 'application/pdf') {
                setIsPdf(true);
                const base64String = await pdfToImageBase64(file);
                setBase64(base64String);
                } else {
                setIsPdf(false);
                const base64String = await fileToBase64(file);
                setBase64(base64String);
                }
            }
          } catch (error) {
            console.error('Erro ao processar arquivo:', error);
          }
        };
    
        if (file instanceof Blob) {
          processFile();
        }else if( typeof file === 'string'){
            getSignedUrl(file);
        }
      }, [file]); 

    if (!base64) return <p>Carregando...</p>; // Mostra um indicador de carregamento enquanto o Base64 não é gerado

    return (
        <>            
            <Image
                alt={isPdf ? 'Prévia do PDF' : 'Imagem'}
                width={width}
                height={height}
                className='cursorPointers'
                style={{ objectFit: 'contain', height: 'auto', cursor: 'pointer'}}
                src={base64} // Usa o Base64 gerado como src
                onClick={()=>{
                    if(file instanceof Blob){
                        context.setShowModal({
                            element: <Image
                                alt={isPdf ? 'Prévia do PDF' : 'Imagem'}
                                width={600}
                                height={600}
                                className='cursorPointers'
                                style={{ objectFit: 'contain', height: 'auto'}}
                                src={base64} // Usa o Base64 gerado como src
                            />,
                            styles:['backgroundWhite']
                        })
                    }else{
                        window?.open(urlSigned, '_blank')
                    }
                }}
            />
        </>
    );
};

type Props = {
    readOnly: boolean
}

export default function SectionDocumentos({readOnly}:Props){
    const context = useContext(Context);

    const [currentForm, setCurrentForm] = useState({} as FormDocs);
    
    const handleChangeCurrentForm = (
        e:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
        index?: number
    )=>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;

        setCurrentForm((prev)=>{
            if(name.includes('docs')){
                const nameField = name.split('.')[1];
                const newArray = prev.docs.map((doc, idx)=>{
                    if(index === idx){
                        return{
                            ...doc,
                            [nameField]: value
                        }
                    }else{
                        return doc
                    }
                })

                return {...prev, docs: newArray};
            }else{
                return {
                    ...prev,
                    [name]: value
                }
            }
        })
    }

    const handleChange = (
        e:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
        sectionId?:number,
        fotoId?: number
    )=>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        const nameField = name.split('.');

        context.setDataSaae((prev)=>{
            let newData = prev.documentos || [];

            if(name.includes('doc')){
                newData = newData.map((section, id)=>{
                    if(id === sectionId){
                        const newDocs = section.docs.map((doc, fidx)=>{
                            if(fidx === fotoId){
                                return{
                                    ...doc,
                                    [nameField[1]]: value
                                }
                            }else {
                                return doc;
                            }
                        });
                        return {
                            ...section,
                            docs: newDocs
                        }
                    }else {
                        return section;
                    }
                });
            }else{
                newData = newData.map((section, id)=>{
                    if(id === sectionId){
                        return {
                            ...section,
                            [name]: value
                        }
                    }else {
                        return section;
                    }
                });
            }

            return{
                ...prev,
                documentos: newData
            }
        })
    }

    const addSectionFotos = ()=>{
        if(currentForm.docs?.length === 0 || !currentForm.title || !currentForm.description){
            alert("Campos obrigatórios estão vazios ou faltam fotos");
            return;
        };

        context.setDataSaae((prev)=>{
            const newData = [
                ...prev.documentos || [],
                currentForm
            ]

            return {
                ...prev,
                documentos: newData
            }
        })        
        setCurrentForm({} as FormDocs)
    }
    const removeSectionFotos = (index:number)=>{
        context.setDataSaae((prev)=>{
            const newData = prev.documentos.filter((section, idx)=> idx !== index)

            return{
                ...prev,
                documentos: newData
            }
        })
    }

    //lida com arquivos
    const handleUploadCurrentForm = (e:ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        const files = e.target.files;        
        const fileListArray = files ? Array.from(files) as File[] : [];

        if(!fileListArray || fileListArray.length === 0) return;
        
        //verifica o tamanho de cada imagem.
        fileListArray.forEach(file => {
            const fileSize = parseFloat(calcTotalFilesMB(file));
            if(fileSize > 10){
                alert("o tamanho máximo de um arquivo é de 10mb");
                return;
            }
        });
        
        setCurrentForm((prev)=>{
            let newData = prev;
            for (const file of fileListArray) {
                const match = newData.docs?.find(doc=> doc.name === file.name);
                if(match){
                    const newArray = newData.docs.map(doc=>{
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
                        docs: newArray
                    }
                }else{
                    newData= {
                        ...newData, 
                        docs: newData.docs ? [
                            ...newData.docs,
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
            const newData = prev.docs.filter(doc=> doc.name !== name);
            return {...prev, fotos: newData}
        })
    }
    //----------------

    return(
        <div className={styles.conteiner} style={{marginTop: readOnly ? '30px' : '0px'}}>
            <h1 className={styles.bgGreen}>7. Documentos adicionais:</h1>

            {!readOnly ?
            <>
            <div className={styles.section}>
                <div className={styles.subConteiner}>
                        <div className={styles.boxInput}>
                            <label htmlFor="">Título da sessão de documentos</label>
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
                                placeholder='forneça informações sobre esse conjunto de documentos'
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="">Documentos</label>
                            <input
                                type='file' 
                                name='docs'
                                multiple
                                accept='.pdf'
                                onChange={(e)=>handleUploadCurrentForm(e)}
                            />
                        </div>
                        <FaPlus size={20} onClick={addSectionFotos} className={styles.addBtn}/>
                </div>
            </div>
            <div className={styles.subConteiner}>
                    {currentForm.docs?.map((doc, idx)=>(
                        <div key={idx+'viewCurrentFoto'} className={styles.viewerFotos}>
                            <b onClick={()=>handleRemoveUploadCurrentFotos(doc.name)}>X</b>
                            <div className={`${styles.subConteiner} ${styles.flexSpace}`}>
                                <div className={`${styles.boxInput} ${styles.width200}`}>
                                    <label htmlFor="title">Título do documento</label>
                                    <input
                                        name='docs.title' 
                                        value={doc.title || ''} 
                                        onChange={(e)=>handleChangeCurrentForm(e, idx)}/>
                                </div>
                                <div className={styles.boxInput}>
                                    <label htmlFor="title">Observações</label>
                                    <textarea 
                                        name='docs.description' 
                                        value={doc.description || ''}
                                        onChange={(e)=>handleChangeCurrentForm(e, idx)}/>
                                </div>
                            </div>
                            <ImagePreview file={doc.doc as File} height={600} width={596}/>
                        </div>                        
                    ))}
            </div>
            </>
            :null}

            <div className={styles.subConteiner}>
                {context.dataSaae?.documentos?.map((section, idx)=>(
                    <div 
                        className={`${styles.subConteiner} ${styles.widthAuto}`}
                        style={{marginLeft: '2px'}}
                        key={idx+'dataDocumentos'}>
                        <div className={styles.boxInput}>
                            <p>Título do conjunto de documentos:</p>
                            {!readOnly ?
                                <FaMinus className={styles.removeBtn} size={20} onClick={()=>removeSectionFotos(idx)}/>
                            :null}
                            <input 
                                name='title'
                                value={section.title || ''}
                                placeholder='digite aqui...'
                                onChange={(e)=>handleChange(e, idx)}
                                className={styles.borderGreen}
                                readOnly={readOnly}
                            />
                            <p>Observações do conjunto de documentos:</p>
                            <input 
                                name='description'
                                value={section.description || ''}
                                placeholder='digite aqui...'
                                onChange={(e)=>handleChange(e, idx)}
                                className={styles.borderGreen}
                                readOnly={readOnly}
                            />
                            {section.docs?.map((doc, fIdx)=>(
                                <div key={fIdx+'fotosData'} className={styles.boxDados}>
                                    <div>
                                        <b>Título da documento:</b> 
                                        <input 
                                            name='docs.title'
                                            value={doc.title || ''}
                                            placeholder='digite aqui...'
                                            onChange={(e)=>handleChange(e, idx, fIdx)}
                                            className={styles.borderGreen}
                                            readOnly={readOnly}
                                        />
                                    </div>
                                    <div>
                                        <b>Descrição:</b> 
                                        <input 
                                            name='docs.description'
                                            value={doc.description || ''}
                                            placeholder='digite aqui...'
                                            onChange={(e)=>handleChange(e, idx, fIdx)}
                                            className={styles.borderGreen}
                                            readOnly={readOnly}
                                        />
                                    </div>
                                    <ImagePreview file={doc.doc as File} height={100} width={100}/>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}