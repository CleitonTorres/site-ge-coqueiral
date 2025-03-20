'use client'
import { ChangeEvent, useContext, useState } from 'react';
import styles from './fotosInspecao.module.css';
import { calcTotalFilesMB } from '@/scripts/globais';
import { FormFotosInspecao } from '@/@types/types';
import { Context } from '@/components/context/context';
// import Image from 'next/image';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { ImagePreview } from '../sectionDocumentos/documentos';
// import axios from 'axios';

// const ImagePreview = ({ file, width, height }:{file:File | string, width:number, height:number}) => {
//     const [base64, setBase64] = useState('');
//     const [urlSigned, setUrlSiged] = useState('');

//     const fileToBase64 = (file:File) => {
//         return new Promise<string>((resolve, reject) => {
//             const reader = new FileReader();
    
//             reader.onload = () => resolve(reader.result as string); // Retorna apenas a string Base64
//             reader.onerror = (error) => reject(error);
    
//             reader.readAsDataURL(file); // Lê o arquivo como uma string Base64
//         });
//     };

//     const getSignedUrl = async(url:string)=>{
//         const data = await signedURL(url);
//         if(!data) return;

//         setUrlSiged(data);

//         const isPDF = data?.includes('.pdf') ? true : false;

//         if(data && isPDF){
//             // Busca o PDF utilizando a URL assinada
//             const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_SERVICES}`,{
//                 params:{
//                     service: 'proxyPDF',
//                     fileUrl: data
//                 },
//                 headers:{
//                     'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTORIZATION}`
//                 },
//                 responseType: 'arraybuffer' // Define o tipo de resposta como Blob
//             });
            
//             //console.log("blob data", response.data)
//             if(!(response.data instanceof ArrayBuffer)) return;

//             // Converte o ArrayBuffer para Blob
//             const blob = new Blob([response.data], { type: 'application/pdf' });
//             // Converte o conteúdo do PDF para um objeto File
//             const file = new File([blob], "preview.pdf", { type: "application/pdf" });

//             // Gera a visualização da primeira página em Base64
//             const previewBase64 = await pdfToImageBase64(file);
//             setBase64(previewBase64);
//         }else if(data && !isPDF){
//             setBase64(data);
//         }
//     }

//     useEffect(() => {
//         if(!file) return;
        
//         if (file instanceof Blob) {
//             fileToBase64(file).then((base64String) => {
//                 setBase64(base64String); // Atualiza o estado com o Base64
//             }).catch((error) => {
//                 console.error('Erro ao converter arquivo para Base64:', error);
//             });
//         }else{
//             getSignedUrl(file);
//         }
//     }, [file]);

//     if (!base64) return <p>Carregando...</p>; // Mostra um indicador de carregamento enquanto o Base64 não é gerado

//     return (
//         <Image
//             alt=""
//             width={width}
//             height={height}
//             style={{ objectFit: 'contain', height: 'auto' }}
//             src={base64} // Usa o Base64 gerado como src
//         />
//     );
// };

type Props = {
    readOnly: boolean,
    localData: FormFotosInspecao[],
    print?: boolean
}
/**
 * Componente de fotos da inspeção
 * @param {boolean} readOnly - define se o componente é somente leitura
 * @param {FormFotosInspecao[]} localData - dados locais
 * @param {boolean} print - define se o componente é para impressão
 * @returns {JSX.Element} - Formulário de Fotos da Inspeção.
 */
export default function FotosInspecao({readOnly, localData, print}:Props){
    const context = useContext(Context);

    const [currentForm, setCurrentForm] = useState({} as FormFotosInspecao);
    
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
            let newData = prev.fotosInspecao || [];

            if(name.includes('fotos')){
                newData = newData.map((section, id)=>{
                    if(id === sectionId){
                        const newFotos = section.fotos.map((foto, fidx)=>{
                            if(fidx === fotoId){
                                return{
                                    ...foto,
                                    [nameField[1]]: value
                                }
                            }else {
                                return foto;
                            }
                        });
                        return {
                            ...section,
                            fotos: newFotos
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
                fotosInspecao: newData
            }
        })
    }

    const addSectionFotos = ()=>{
        if(currentForm.fotos?.length === 0 || !currentForm.title || !currentForm.description){
            alert("Campos obrigatórios estão vazios ou faltam fotos");
            return;
        };

        context.setDataSaae((prev)=>{
            const newData = [
                ...prev.fotosInspecao || [],
                currentForm
            ]

            return{
                ...prev,
                fotosInspecao: newData
            }
        })
        setCurrentForm({} as FormFotosInspecao);
    }
    const removeSectionFotos = (index:number)=>{
        context.setDataSaae((prev)=>{
            const newData = prev.fotosInspecao.filter((section, idx)=> idx !== index)

            return{
                ...prev,
                fotosInspecao: newData
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
    //----------------

    return(
        <div className={styles.conteiner} style={{marginTop: readOnly ? '30px' : '0px'}}>
            <h2 className={styles.bgGreen}>6. Fotos do local/inspeção:</h2>
            {!readOnly ?
                <>
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
                </>
            :null}

            <div className={styles.subConteiner}>
                {localData?.map((section, idx)=>(
                    <div 
                        className={styles.sectionFotos}
                        key={idx+'dataFotos'}
                    >
                        <p style={{fontWeight: 600}}>Título do conjunto de fotos:</p>
                        {!readOnly ?
                            <FaMinus className={styles.removeBtn} size={20} onClick={()=>removeSectionFotos(idx)}/>
                        :null}
                        {!print ? <input 
                            name='title'
                            value={section.title || ''}
                            placeholder='digite aqui...'
                            onChange={(e)=>handleChange(e, idx)}
                            readOnly={readOnly}
                        /> : <p>{section.title || ''}</p>}
                        <p style={{fontWeight: 600}}>Observações do conjunto de fotos:</p>
                        {!print ? <textarea 
                            name='description'
                            value={section.description || ''}
                            placeholder='digite aqui...'
                            onChange={(e)=>handleChange(e, idx)}
                            readOnly={readOnly}
                        /> : <p>{section.description || ''}</p>}
                        <div  className={styles.boxFotos}>                            
                            {section.fotos?.map((foto, fIdx)=>(
                                <div key={fIdx+'fotosData'} className={styles.boxDados}>
                                    {foto.title ? <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <b>Título da imagem:</b> 
                                        {!print ? <textarea 
                                            name='fotos.title'
                                            value={foto.title || ''}
                                            placeholder='digite aqui...'
                                            onChange={(e)=>handleChange(e, idx, fIdx)}
                                            readOnly={readOnly}
                                        /> : <p>{foto.title || ''}</p>}
                                    </div> : null}
                                    {foto.description ? <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <b>Descrição:</b> 
                                        {!print ? <input 
                                            name='fotos.description'
                                            value={foto.description || ''}
                                            placeholder='digite aqui...'
                                            onChange={(e)=>handleChange(e, idx, fIdx)}
                                            readOnly={readOnly}
                                        /> : <p>{foto.description}</p>}
                                    </div> : null}
                                    <ImagePreview 
                                        file={foto.doc as File} 
                                        height={print ? 400 : 200} 
                                        width={print ? 300 : 100}
                                    />  
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}