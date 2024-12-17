'use client'
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import styles from './documentos.module.css';
import { calcTotalFilesMB } from '@/scripts/globais';
import { FormDocs } from '@/@types/types';
import { Context } from '@/components/context/context';
import Image from 'next/image';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { getDocument } from 'pdfjs-dist';

const ImagePreview = ({ file, width, height }:{file:File, width:number, height:number}) => {
    const [base64, setBase64] = useState('');
    const [isPdf, setIsPdf] = useState(false);

    // Converte arquivos não PDF para Base64
    const fileToBase64 = (file: File) => {
        return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);

        reader.readAsDataURL(file);
        });
    };

    // Converte a primeira página de um PDF para Base64
    const pdfToImageBase64 = async (file: File): Promise<string> => {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await getDocument(arrayBuffer).promise;
        const page = await pdf.getPage(1); // Obtém a primeira página do PDF

        const viewport = page.getViewport({ scale: 1.5 }); // Define o tamanho da renderização
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (context) {
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport }).promise;

        return canvas.toDataURL(); // Converte o conteúdo do canvas para Base64
        }

        throw new Error('Erro ao renderizar a página do PDF.');
    };
    
    useEffect(() => {
        const processFile = async () => {
          try {
            if (file.type === 'application/pdf') {
              setIsPdf(true);
              const base64String = await pdfToImageBase64(file);
              setBase64(base64String);
            } else {
              setIsPdf(false);
              const base64String = await fileToBase64(file);
              setBase64(base64String);
            }
          } catch (error) {
            console.error('Erro ao processar arquivo:', error);
          }
        };
    
        if (file) {
          processFile();
        }
      }, [file]);

    if (!base64) return <p>Carregando...</p>; // Mostra um indicador de carregamento enquanto o Base64 não é gerado

    return (
        <Image
            alt={isPdf ? 'Prévia do PDF' : 'Imagem'}
            width={width}
            height={height}
            style={{ objectFit: 'contain', height: 'auto' }}
            src={base64} // Usa o Base64 gerado como src
        />
    );
};

type Props = {
    readOnly: boolean
}

export default function SectionDocumentos({readOnly}:Props){
    const context = useContext(Context);

    const [currentForm, setCurrentForm] = useState({} as FormDocs);
    const [data, setData] = useState<FormDocs[]>([]);
    
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

        let newData = data;

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

        updateContext(newData);

    }

    const addSectionFotos = ()=>{
        if(currentForm.docs?.length === 0 || !currentForm.title || !currentForm.description){
            alert("Campos obrigatórios estão vazios ou faltam fotos");
            return;
        };

        const newData = [
            ...data,
            currentForm
        ]
        setCurrentForm({} as FormDocs)
        updateContext(newData);
    }
    const removeSectionFotos = (index:number)=>{
        const newData = data.filter((section, idx)=> idx !== index)
        
        updateContext(newData);
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

    const updateContext = (newData:FormDocs[])=>{
        setData(newData);
        context.setDataSaae((prev)=>{
            return{
                ...prev,
                documentos: newData
            }
        })
    }

    return(
        <div className={styles.conteiner} style={{marginTop: readOnly ? '30px' : '0px'}}>
            <h2>7. Documentos adicionais:</h2>

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
                                    <label htmlFor="title">Rótulo da imagem</label>
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
                            <ImagePreview file={doc.doc as File} height={600} width={600}/>
                        </div>                        
                    ))}
            </div>
            </>
            :null}

            <div className={styles.subConteiner}>
                {data?.map((section, idx)=>(
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