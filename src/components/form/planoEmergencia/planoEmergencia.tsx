'use client'
import { ChangeEvent, KeyboardEvent, useContext, useState } from 'react';
import styles from './planoEmergencia.module.css';
import { AtividadeProfissional, ContatosEmergencia, Docs, Endereco, PlanoEmergenciaSaae, Profissional, Veiculos } from '@/@types/types';
import { calcTotalFilesMB, dateFormat1, masktel, setIconSocialMidia } from '@/scripts/globais';
import { Context } from '@/components/context/context';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { ImagePreview } from '../sectionDocumentos/documentos';

type Props = {
    readOnly: boolean,
    localData: PlanoEmergenciaSaae,
    grauRisco: {
        color: "green" | "yellow" | "orange" | "red" | "";
        value: number;
    }
    nomeAtividade: string,
    localInicio: Endereco,
    print?: boolean
}

/**
 * Componente que gerencia o formulário de Plano de Emergência.
 * @param {boolean} readOnly - Define se o formulário é somente leitura.
 * @param {PlanoEmergenciaSaae} localData - Dados do Plano de Emergência.
 * @param {Endereco} localInicio - Endereço de início da atividade.
 * @param {string} nomeAtividade - Nome da atividade.
 * @param {{color:string, value: number}} grauRisco - Grau de risco da atividade.
 * @returns {JSX.Element} - Formulário de Plano de Emergência. 
 */
export default function PlanoEmergencia ({readOnly, localData, grauRisco, localInicio, nomeAtividade, print}:Props){
    const context = useContext(Context);
    
    const [currentContatoEmerg, setCurrentContatoEmerg] = useState({} as ContatosEmergencia);
    const [currentProfAcolhimento, setCurrentProfAcolhimento] = useState({} as Profissional);
    const [currentProfEnfermaria, setCurrentProfEnfermaria] = useState({} as Profissional);
    const [currentProfSalvamento, setCurrentProfSalvamento] = useState({} as Profissional);
    const [currentProfissional, setCurrentProfissional] = useState({} as AtividadeProfissional);
    const [currentVeiculo, setCurrentVeiculo] = useState({} as Veiculos);

    const [currentRedesSociaisProf, setcurrentRedesSociaisProf]= useState('');
    const [currentRedesSociaisProfArray, setcurrentRedesSociaisProfArray]= useState<string[]>([]);
    
    //constantes de configuraçõeos  para versões de impressão ou de edição
    const width = print ? 400 : 100;
    const height = print ? 600 : 200;
    const maxWidth = print ? 'none' : 150;

    const handleChangeData = (
        e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>, 
        idx?: number,
        socialMidiaIdx?:number
    )=>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;

        context.setDataSaae((prev)=>{
            let newData = prev.planoEmergencia || {} as PlanoEmergenciaSaae;

            if(name.includes('dataInspecao')){
                let newValue:string | Date = value;
                
                if (value.length === 10) {  // Garantir que tenha o formato completo "YYYY-MM-DD"
                    const ano = value.split('-')[0]//pega o ano;
                    if(parseInt(ano) < 2000) newValue = value;
                    else newValue = new Date(value + "T00:00:00"); 
                } else {
                    newValue = value; // Permite digitação parcial sem quebrar o estado
                }

                newData = {
                    ...newData,
                    dataInspecao: newValue
                }

            }else if(name.includes('prontoSocorro')){
                const nameSplit = name.split('.')[1] as 'nome' | 'local' | 'distancia' | 'contato';
                newData= {
                    ...newData,
                    prontoSocorro:{
                        ...newData.prontoSocorro,
                        [nameSplit]: nameSplit === "contato" ? masktel(value) : value
                    }
                }
            }else if(name.includes('hospital')){
                const nameField = name.split('.')[1] as 'nome' | 'local' | 'distancia' | 'contato';
                newData= {
                    ...newData,
                    hospital:{
                        ...newData.hospital,
                        [nameField]: nameField === "contato" ? masktel(value) : value
                    }
                }
            }else if(name.includes('contatosEmergencia')){
                const nameField = name.split('.')[1] as 'nome' | 'contato';
                const newContacts = newData.contatosEmergencia?.map((cont, index)=> {
                    if(idx === index){
                        return{
                            ...cont,
                            [nameField]: nameField === "contato" ? masktel(value) : value
                        }
                    }else{
                        return cont
                    }
                });

                newData= {
                    ...newData,
                    contatosEmergencia: newContacts
                }
            }else if(name.includes('espacosSeguros')){
                //espacosSeguros.enfermaria.field
                const nameSplit = name.split('.')[1] as 'infosPreliminares' | 'infosMedicas' | 'protecaoDados' | 
                    'cursosEscotistas' | 'canalDenuncias' | 'acolhimento' | 'enfermaria'; 
                if(['acolhimento', 'enfermaria'].includes(nameSplit)){
                    const label = name.split('.')[1] as 'acolhimento' | 'enfermaria'; 
                    const nameField = name.split('.')[2] as 'nome' | 'contato' | 'profissao' | 'numCarteirinhaClass' | 'cpf' | 'regEscoteiro' | 'docs'; 
                    
                    if(nameField === 'docs'){
                        const target = e.target as unknown as HTMLInputElement;
                        const files = target.files;        
                        const fileListArray = files ? Array.from(files) as File[] : [];
                        
                        fileListArray.forEach(file => {
                            const fileSize = parseFloat(calcTotalFilesMB(file));
                            if(fileSize > 4){
                                alert("o tamanho máximo de um arquivo é de 4mb");
                                return prev;
                            }
                        });
                        
                        if(idx === undefined) return prev;
                        const newArray = newData.espacosSeguros[label]?.map((prof, index)=> {
                            if(idx === index){
                                let newFiles: Docs[] = prof.docs? [...prof.docs] : [];
                                for (const file of fileListArray) {
                                    const match = newFiles?.find(doc=> doc.titulo === file.name);
                                    if(match){
                                        newFiles = newFiles.map(doc=>{
                                            if(doc.titulo === file.name){
                                                return{
                                                    ...doc,
                                                    doc: file
                                                }
                                            }else{
                                                return doc
                                            }
                                        })
                                    }else{
                                        newFiles.push({ doc: file, titulo: file.name });
                                    }                    
                                }

                                return{
                                    ...prof,
                                    [nameField]: newFiles
                                }
                            }else{
                                console.log("não encontrou",idx, label, nameField);
                                return prof
                            }
                        });

                        newData= {
                            ...newData,
                            espacosSeguros: {
                                ...newData.espacosSeguros,
                                [label]: newArray
                            }
                        }
                    }else{
                        const newArray = newData.espacosSeguros[label]?.map((prof, index)=> {
                            if(idx === index){
                                return{
                                    ...prof,
                                    [nameField]: nameField === "contato" ? masktel(value) : value
                                }
                            }else{
                                return prof
                            }
                        });

                        newData = {
                            ...newData,
                            espacosSeguros:{
                                ...newData.espacosSeguros,
                                [label]: newArray
                            }
                        }
                    }
                }else{
                    newData = {
                        ...newData,
                        espacosSeguros:{
                            ...newData.espacosSeguros,
                            [nameSplit]: value
                        }
                    }
                }
            }else if(name.includes('veiculos')){
                //veiculos.manutencao
                const nameField = name.split('.')[1] as 'nomeMotorista' | 'tipoVeiculo' | 'contato' | 'profissao' 
                | 'habilitacao' | 'cpf' | 'regEscoteiro' | 'manutencao' | 'docs'; 
                
                if(nameField === "docs"){
                    const target = e.target as unknown as HTMLInputElement;
                    const files = target.files;        
                    const fileListArray = files ? Array.from(files) as File[] : [];
                    
                    fileListArray.forEach(file => {
                        const fileSize = parseFloat(calcTotalFilesMB(file));
                        if(fileSize > 4){
                            alert("o tamanho máximo de um arquivo é de 4mb");
                            return prev;
                        }
                    });
                    
                    if(idx === undefined) return prev;
                    const newArray = newData.veiculos?.map((veic, index)=> {
                        if(idx === index){
                            let newFiles: Docs[] = veic.docs? [...veic.docs] : [];
                            for (const file of fileListArray) {
                                const match = newFiles?.find(doc=> doc.titulo === file.name);
                                if(match){
                                    newFiles = newFiles.map(doc=>{
                                        if(doc.titulo === file.name){
                                            return{
                                                ...doc,
                                                doc: file
                                            }
                                        }else{
                                            return doc
                                        }
                                    })
                                }else{
                                    newFiles.push({ doc: file, titulo: file.name });
                                }                    
                            }

                            return{
                                ...veic,
                                [nameField]: newFiles
                            }
                        }else{
                            return veic
                        }
                    });

                    newData= {
                        ...newData,
                        veiculos: newArray
                    }
                }else{
                    const newArray = newData.veiculos?.map((veic, index)=> {
                        if(idx === index){
                            return{
                                ...veic,
                                [nameField]: nameField === "contato" ? masktel(value) : value
                            }
                        }else{
                            return veic
                        }
                    });

                    newData = {
                        ...newData,
                        veiculos: newArray
                    }
                } 
            }else if(name.includes('atividadePorProfissional')){
                const nameField = name.split('.')[1] as 'nomeProf' | 'contato' | 'profissao' | 'numCarteirinha'
                | 'regEscoteiro' | 'cpf' | 'redesSociais' | 'docs'; 
                //atividadePorProfissional.redesSociais
                if(nameField === "redesSociais"){
                    const newArray = newData.atividadePorProfissional?.map((prof, index)=> {
                        if(idx === index){
                            const newSocialMidia = prof.redesSociais.map((social, sIdx)=>{
                                if(sIdx === socialMidiaIdx){
                                    return value
                                }else{
                                    return social
                                }
                            });

                            return{
                                ...prof,
                                redesSociais: newSocialMidia
                            }
                        }else{
                            return prof
                        }
                    });
                    newData = {
                        ...newData,
                        atividadePorProfissional: newArray
                    }
                }else if(nameField === 'docs'){
                    const target = e.target as unknown as HTMLInputElement;
                    const files = target.files;        
                    const fileListArray = files ? Array.from(files) as File[] : [];
                    
                    fileListArray.forEach(file => {
                        const fileSize = parseFloat(calcTotalFilesMB(file));
                        if(fileSize > 4){
                            alert("o tamanho máximo de um arquivo é de 4mb");
                            return prev;
                        }
                    });
                    
                    if(idx === undefined) return prev;
                    const newArray = newData.atividadePorProfissional?.map((prof, index)=> {
                        if(idx === index){
                            let newFiles: Docs[] = prof.docs? [...prof.docs] : [];
                            for (const file of fileListArray) {
                                const match = newFiles?.find(doc=> doc.titulo === file.name);
                                if(match){
                                    newFiles = newFiles.map(doc=>{
                                        if(doc.titulo === file.name){
                                            return{
                                                ...doc,
                                                doc: file
                                            }
                                        }else{
                                            return doc
                                        }
                                    })
                                }else{
                                    newFiles.push({ doc: file, titulo: file.name });
                                }                    
                            }

                            return{
                                ...prof,
                                [nameField]: newFiles
                            }
                        }else{
                            return prof
                        }
                    });

                    newData= {
                        ...newData,
                        atividadePorProfissional: newArray
                    }
                }else{
                    const newArray = newData.atividadePorProfissional?.map((prof, index)=> {
                        if(idx === index){
                            return{
                                ...prof,
                                [nameField]: nameField === "contato" ? masktel(value) : value
                            }
                        }else{
                            return prof
                        }
                    });
                    newData= {
                        ...newData,
                        atividadePorProfissional: newArray
                    }
                }
            }else if(name.includes('profSalvamento')){
                //profSalvamento.nome
                const nameField = name.split('.')[1] as 'nome' | 'contato' | 'profissao' | 
                    'numCarteirinhaClass' | 'cpf' | 'regEscoteiro' | 'docs'; 
                if(nameField === 'docs'){
                    const target = e.target as unknown as HTMLInputElement;
                    const files = target.files;        
                    const fileListArray = files ? Array.from(files) as File[] : [];
                    
                    fileListArray.forEach(file => {
                        const fileSize = parseFloat(calcTotalFilesMB(file));
                        if(fileSize > 4){
                            alert("o tamanho máximo de um arquivo é de 4mb");
                            return prev;
                        }
                    });
                    
                    if(idx === undefined) return prev;
                    const newArray = newData.profSalvamento?.map((prof, index)=> {
                        if(idx === index){
                            let newFiles: Docs[] = prof.docs? [...prof.docs] : [];
                            for (const file of fileListArray) {
                                const match = newFiles?.find(doc=> doc.titulo === file.name);
                                if(match){
                                    newFiles = newFiles.map(doc=>{
                                        if(doc.titulo === file.name){
                                            return{
                                                ...doc,
                                                doc: file
                                            }
                                        }else{
                                            return doc
                                        }
                                    })
                                }else{
                                    newFiles.push({ doc: file, titulo: file.name });
                                }                    
                            }

                            return{
                                ...prof,
                                [nameField]: newFiles
                            }
                        }else{
                            return prof
                        }
                    });

                    newData= {
                        ...newData,
                        profSalvamento: newArray
                    }
                }else{
                    const newArray = newData.profSalvamento?.map((prof, index)=> {
                        if(idx === index){
                            return{
                                ...prof,
                                [nameField]: nameField === "contato" ? masktel(value) : value
                            }
                        }else{
                            return prof
                        }
                    });

                    newData = {
                        ...newData,
                        profSalvamento: newArray
                    }
                }
            }else{
                newData= {
                    ...newData,
                    [name]: name === "contato" ? masktel(value) : value
                }
            }

            return {
                ...prev,
                planoEmergencia: newData
            }
        });
    
    }

    const handleChangeAcolhimento = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;

        setCurrentProfAcolhimento((prev)=>{
            return{
                ...prev,
                [name]: name === "contato" ? masktel(value) : value
            }
        })
    }

    const handleChangeEnfermaria = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;

        setCurrentProfEnfermaria((prev)=>{
            return{
                ...prev,
                [name]: name === "contato" ? masktel(value) : value
            }
        })
    }

    const handleChangeSalvamento = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;

        setCurrentProfSalvamento((prev)=>{
            return{
                ...prev,
                [name]: name === "contato" ? masktel(value) : value
            }
        })
    }
    const handleChangeProfissional = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;

        setCurrentProfissional((prev)=>{
            return{
                ...prev,
                [name]: name === "contato" ? masktel(value) : value
            }
        })
    }
    const handleChangeVeiculo = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setCurrentVeiculo((prev)=>{
            return{
                ...prev,
                [name]: name === "contato" ? masktel(value) : value
            }
        })
    }

    //lida com arquivos
    const handleUpload = (e:ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        const files = e.target.files;        
        const fileListArray = files ? Array.from(files) as File[] : [];
        const name = e.target.name;

        if(!fileListArray || fileListArray.length === 0) return;
        if(name === 'acolhimento'){
            setCurrentProfAcolhimento((prev)=>{
                fileListArray.forEach(file => {
                    const fileSize = parseFloat(calcTotalFilesMB(file));
                    if(fileSize > 4){
                        alert("o tamanho máximo de um arquivo é de 4mb");
                        return;
                    }
                });

                let newFiles: Docs[] = prev.docs ? [...prev.docs] : [];
                for (const file of fileListArray) {
                    const match = prev.docs?.find(doc=> doc.titulo === file.name);
                    if(match){
                        newFiles = newFiles.map(doc=>{
                            if(doc.titulo === file.name){
                                return{
                                    ...doc,
                                    doc: file
                                }
                            }else{
                                return doc
                            }
                        })
                    }else{
                        newFiles.push({ doc: file, titulo: file.name });
                    }                    
                }

                return {
                    ...prev,
                    docs: newFiles
                }
            })
        }else if(name === 'enfermaria'){
            setCurrentProfEnfermaria((prev)=>{
                fileListArray.forEach(file => {
                    const fileSize = parseFloat(calcTotalFilesMB(file));
                    if(fileSize > 4){
                        alert("o tamanho máximo de um arquivo é de 4mb");
                        return;
                    }
                });

                let newFiles: Docs[] = prev.docs ? [...prev.docs] : [];
                for (const file of fileListArray) {
                    const match = prev.docs?.find(doc=> doc.titulo === file.name);
                    if(match){
                        newFiles = newFiles.map(doc=>{
                            if(doc.titulo === file.name){
                                return{
                                    ...doc,
                                    doc: file
                                }
                            }else{
                                return doc
                            }
                        })
                    }else{
                        newFiles.push({ doc: file, titulo: file.name });
                    }                    
                }

                return {
                    ...prev,
                    docs: newFiles
                }
            });
        }else if(name === 'veiculos'){
            setCurrentVeiculo((prev)=>{
                fileListArray.forEach(file => {
                    const fileSize = parseFloat(calcTotalFilesMB(file));
                    if(fileSize > 4){
                        alert("o tamanho máximo de um arquivo é de 4mb");
                        return;
                    }
                });

                let newFiles: Docs[] = prev.docs ? [...prev.docs] : [];
                for (const file of fileListArray) {
                    const match = prev.docs?.find(doc=> doc.titulo === file.name);
                    if(match){
                        newFiles = newFiles.map(doc=>{
                            if(doc.titulo === file.name){
                                return{
                                    ...doc,
                                    doc: file
                                }
                            }else{
                                return doc
                            }
                        })
                    }else{
                        newFiles.push({ doc: file, titulo: file.name });
                    }                    
                }

                return {
                    ...prev,
                    docs: newFiles
                }
            });
        }else if(name === 'profissional'){
            setCurrentProfissional((prev)=>{
                fileListArray.forEach(file => {
                    const fileSize = parseFloat(calcTotalFilesMB(file));
                    if(fileSize > 4){
                        alert("o tamanho máximo de um arquivo é de 4mb");
                        return;
                    }
                });

                let newFiles: Docs[] = prev.docs ? [...prev.docs] : [];
                for (const file of fileListArray) {
                    const match = prev.docs?.find(doc=> doc.titulo === file.name);
                    if(match){
                        newFiles = newFiles.map(doc=>{
                            if(doc.titulo === file.name){
                                return{
                                    ...doc,
                                    doc: file
                                }
                            }else{
                                return doc
                            }
                        })
                    }else{
                        newFiles.push({ doc: file, titulo: file.name });
                    }                    
                }

                return {
                    ...prev,
                    docs: newFiles
                }
            });
        }else if(name === 'salvamento'){
            setCurrentProfSalvamento((prev)=>{
                fileListArray.forEach(file => {
                    const fileSize = parseFloat(calcTotalFilesMB(file));
                    if(fileSize > 4){
                        alert("o tamanho máximo de um arquivo é de 4mb");
                        return;
                    }
                });

                let newFiles: Docs[] = prev.docs ? [...prev.docs] : [];
                for (const file of fileListArray) {
                    const match = prev.docs?.find(doc=> doc.titulo === file.name);
                    if(match){
                        newFiles = newFiles.map(doc=>{
                            if(doc.titulo === file.name){
                                return{
                                    ...doc,
                                    doc: file
                                }
                            }else{
                                return doc
                            }
                        })
                    }else{
                        newFiles.push({ doc: file, titulo: file.name });
                    }                    
                }

                return {
                    ...prev,
                    docs: newFiles
                }
            });
        }
    }
    const handleRemoveUpload = (title:string, field: string, idxProfissional?:number)=>{
        if(field === 'acolhimento'){
            setCurrentProfAcolhimento((prev)=>{
                const newData = prev.docs.filter(doc=> doc.titulo !== title);

                return {...prev, docs: newData};
            });
        }else if(field === 'acolhimentoRemove'){
            context.setDataSaae((prev)=>{
                let newData = prev.planoEmergencia || {} as PlanoEmergenciaSaae;
                const newProf = newData.espacosSeguros.acolhimento.map((acol, index)=>{
                    if(index === idxProfissional){
                        return{
                            ...acol,
                            docs: acol.docs.filter(doc=> doc.titulo !== title)
                        }
                    }else{
                        return acol
                    }
                });

                newData= {
                    ...newData, 
                    espacosSeguros: {
                        ...newData.espacosSeguros,
                        acolhimento: newProf
                    }
                };

                return{
                    ...prev,
                    planoEmergencia: newData
                }
            })
        }else if(field === 'enfermariaRemove'){
            context.setDataSaae((prev)=>{
                let newData = prev.planoEmergencia || {} as PlanoEmergenciaSaae;
                const newProf = newData.espacosSeguros.enfermaria.map((enf, index)=>{
                    if(index === idxProfissional){
                        return{
                            ...enf,
                            docs: enf.docs.filter(doc=> doc.titulo !== title)
                        }
                    }else{
                        return enf
                    }
                });

                newData= {
                    ...newData, 
                    espacosSeguros: {
                        ...newData.espacosSeguros,
                        enfermaria: newProf
                    }
                };
                return {
                    ...prev,
                    planoEmergencia: newData
                };
            })
        }else if(field === 'enfermaria'){
            setCurrentProfEnfermaria((prev)=>{
                const newData = prev.docs.filter(doc=> doc.titulo !== title);

                return {...prev, docs: newData};
            });
        }else if(field === 'veiculos'){
            setCurrentVeiculo((prev)=>{
                const newData = prev.docs.filter(doc=> doc.titulo !== title);

                return {...prev, docs: newData};
            });
        }else if(field === 'veiculosRemove'){
            context.setDataSaae((prev)=>{
                let newData = prev.planoEmergencia || {} as PlanoEmergenciaSaae;
                const newVeiculos = newData.veiculos.map((veic, index)=>{
                    if(index === idxProfissional){
                        return{
                            ...veic,
                            docs: veic.docs.filter(doc=> doc.titulo !== title)
                        }
                    }else{
                        return veic
                    }
                });

                newData= {
                    ...newData, 
                    veiculos: newVeiculos
                };

                return{
                    ...prev,
                    planoEmergencia: newData
                }
            })
        }else if(field === 'profissional'){
            setCurrentProfissional((prev)=>{
                const newData = prev.docs.filter(doc=> doc.titulo !== title);

                return {...prev, docs: newData};
            });
        }else if(field === 'profissionalRemove'){
            context.setDataSaae((prev)=>{
                let newData = prev.planoEmergencia || {} as PlanoEmergenciaSaae;
                const newProf = newData.atividadePorProfissional.map((prof, index)=>{
                    if(index === idxProfissional){
                        return{
                            ...prof,
                            docs: prof.docs.filter(doc=> doc.titulo !== title)
                        }
                    }else{
                        return prof
                    }
                });

                newData= {
                    ...newData, 
                    atividadePorProfissional: newProf
                };

                return {
                    ...prev,
                    planoEmergencia: newData
                }
            })
        }else if(field === 'salvamento'){
            setCurrentProfSalvamento((prev)=>{
                const newData = prev.docs.filter(doc=> doc.titulo !== title);

                return {...prev, docs: newData};
            });
        }else if(field === 'salvamentoRemove'){
            context.setDataSaae((prev)=>{
                let newData = {} as PlanoEmergenciaSaae;
                const newProf = newData.profSalvamento.map((prof, index)=>{
                    if(index === idxProfissional){
                        return{
                            ...prof,
                            docs: prof.docs.filter(doc=> doc.titulo !== title)
                        }
                    }else{
                        return prof
                    }
                });

                newData= {
                    ...newData, 
                    profSalvamento: newProf
                };

                return{
                    ...prev,
                    planoEmergencia: newData
                }
            })
        }
    }
    //------------------

    const addContatoEmergencia = ()=>{
        if(!currentContatoEmerg.contato || !currentContatoEmerg.contato){
            alert("Faltam campos obrigatórios");
            return;
        }
        context.setDataSaae((prev)=>{
            const newData = {
                ...prev.planoEmergencia,
                contatosEmergencia: prev.planoEmergencia.contatosEmergencia ? 
                    [...prev.planoEmergencia.contatosEmergencia, currentContatoEmerg] : [currentContatoEmerg]
            };

            return{
                ...prev,
                planoEmergencia: newData
            }
        })

        setCurrentContatoEmerg({} as ContatosEmergencia);
    }

    const addProfAcolhimento = ()=>{
        if(!currentProfAcolhimento.nome || !currentProfAcolhimento.contato || !currentProfAcolhimento.cpf
            || !currentProfAcolhimento.profissao
        ){
            alert("Faltam campos obrigatórios");
            return;
        }
        
        context.setDataSaae((prev)=>{
            const newData = {
                ...prev.planoEmergencia,
                espacosSeguros: {
                    ...prev.planoEmergencia.espacosSeguros,
                    acolhimento: prev.planoEmergencia.espacosSeguros?.acolhimento ? 
                        [...prev.planoEmergencia.espacosSeguros.acolhimento, currentProfAcolhimento] : [currentProfAcolhimento]
                }
            };

            return {
                ...prev,
                planoEmergencia: newData
            }

        })

        setCurrentProfAcolhimento({} as Profissional);
    }

    const addProfEnfermaria = ()=>{
        if(!currentProfEnfermaria.nome || !currentProfEnfermaria.contato || !currentProfEnfermaria.cpf
            || !currentProfEnfermaria.profissao
        ){
            alert("Faltam campos obrigatórios");
            return;
        }

        context.setDataSaae((prev)=>{
            const newData = {
                ...prev.planoEmergencia,
                espacosSeguros: {
                    ...prev.planoEmergencia.espacosSeguros,
                    enfermaria: prev.planoEmergencia.espacosSeguros?.enfermaria ? 
                        [...prev.planoEmergencia.espacosSeguros.enfermaria, currentProfEnfermaria] : [currentProfEnfermaria]
                }
            };

            return{
                ...prev,
                planoEmergencia: newData
            }
        })

        setCurrentProfEnfermaria({} as Profissional);
    }

    const addProfSalvamento = ()=>{
        if(!currentProfSalvamento.nome || !currentProfSalvamento.contato || !currentProfSalvamento.cpf
            || !currentProfSalvamento.profissao
        ){
            alert("Faltam campos obrigatórios");
            return;
        }

        context.setDataSaae((prev)=>{
            const newData = {
                ...prev.planoEmergencia,
                profSalvamento: prev.planoEmergencia.profSalvamento ? 
                    [...prev.planoEmergencia.profSalvamento, currentProfSalvamento] : [currentProfSalvamento]
            };

            return{
                ...prev,
                planoEmergencia: newData
            }
        })

        setCurrentProfSalvamento({} as Profissional);
    }
    const addProfissional = ()=>{
        if(!currentProfissional.nomeProf || !currentProfissional.contato || !currentProfissional.cpf
            || !currentProfissional.profissao
        ){
            alert("Faltam campos obrigatórios");
            return;
        }

        context.setDataSaae((prev)=>{
            const newData = {
                ...prev.planoEmergencia,
                atividadePorProfissional: prev.planoEmergencia.atividadePorProfissional ? 
                    [...prev.planoEmergencia.atividadePorProfissional, {...currentProfissional, redesSociais: currentRedesSociaisProfArray}] 
                        : [{...currentProfissional, redesSociais: currentRedesSociaisProfArray}]
            };

            return{
                ...prev,
                planoEmergencia: newData
            }
        })

        setCurrentProfissional({} as AtividadeProfissional);
        setcurrentRedesSociaisProfArray([]);
    }
    const addVeiculo = ()=>{
        if(!currentVeiculo.contato || !currentVeiculo.cpf || !currentVeiculo.habilitacao
            || !currentVeiculo.manutencao || !currentVeiculo.nomeMotorista ||  !currentVeiculo.profissao ||
            !currentVeiculo.tipoVeiculo
        ){
            alert("Faltam campos obrigatórios");
            return;
        }

        context.setDataSaae((prev)=>{
            const newData = {
                ...prev.planoEmergencia,
                veiculos: prev.planoEmergencia.veiculos ? [...prev.planoEmergencia.veiculos, currentVeiculo] : [currentVeiculo]
            };

            return{
                ...prev,
                planoEmergencia: newData
            }
        })

        setCurrentVeiculo({} as Veiculos);
    }

    const removePessoa = (section: (keyof PlanoEmergenciaSaae), sectionIdx:number, subField?: 'acolhimento' | 'enfermaria')=>{
        context.setDataSaae((prev)=>{
            if(Array.isArray(prev.planoEmergencia[section])){
                const newData = prev.planoEmergencia[section].filter((s, idx)=> idx !== sectionIdx);
            
                return{
                    ...prev,
                    planoEmergencia: {
                        ...prev.planoEmergencia,
                        [section]: newData
                    }
                }
            }
            //se for um objeto do tipo espacosSeguros
            else{
                if(section === 'espacosSeguros' && Array.isArray(prev.planoEmergencia[section][subField])){
                    const newData = prev.planoEmergencia.espacosSeguros[subField].filter((s, idx)=> idx !== sectionIdx);
            
                    return{
                        ...prev,
                        planoEmergencia: {
                            ...prev.planoEmergencia,
                            espacosSeguros: {
                                ...prev.planoEmergencia.espacosSeguros,
                                [subField]: newData
                            }
                        }
                    }
                }else{
                    return prev
                }
            }
        })
    }

    const handleAddTag = (e: KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === "Enter"){
            const trimmedValue = currentRedesSociaisProf.trim();
            if (trimmedValue) {
                setcurrentRedesSociaisProfArray((prev)=>{
                    const newData = [...prev, currentRedesSociaisProf];
    
                    return newData;
                });
                setcurrentRedesSociaisProf('');
            }
        }
    }

    const handleRemoveTag = (index:number)=>{
        setcurrentRedesSociaisProfArray((prev)=>{
            const newData = prev.filter((social, idx)=> idx !== index);

            return newData;
        })
    }

    if(!localData) return <span>formulário não carregado</span>

    return(
        <div className={styles.conteiner} style={{marginTop: readOnly ? '30px' : '0px'}}> 
            <div className={`${styles.boxHead} ${styles.bgGreen}`}>
                <h6>itens 7.5 e 9.1 da Política Nacional de Gestão de Risco</h6>
                <h2>5. Plano de Ação:</h2>
            </div>
            
            {/* Dados básicos */}
            <div className={styles.section}>
                <h3>Dados básicos</h3>
                <div className={`${styles.subConteiner} ${styles.header}`} style={{boxShadow: `0px 0px 6px 0px ${context.dataSaae?.grauRisco?.color} inset`}}>
                    <span>Grau de Risco</span>
                    <h2>{grauRisco?.value || ''}</h2>
                </div>
                <div className={styles.subConteiner}>
                    <div className={styles.boxInput}>
                        <label htmlFor="">Nome da atividade</label>
                        <span>{nomeAtividade || ''}</span>
                    </div>
                    <div className={styles.boxInput} style={{width: 'auto'}}>
                        <label htmlFor="">Local da atividade</label>
                        <span>
                            {localInicio ?
                                `${localInicio?.logradouro},
                                ${localInicio?.bairro},
                                ${localInicio?.municipio},
                                ${localInicio?.uf},
                                CEP.: ${localInicio?.cep}`
                            :null}
                        </span>
                    </div>
                </div>
                <div className={styles.subConteiner}>
                    <div className={styles.boxInput}>
                        <label htmlFor="">Fichas médicas revisadas?</label>
                        {!readOnly ?
                            <select 
                                name="fichaMedicaRevisada" 
                                value={localData?.fichaMedicaRevisada || ''}
                                onChange={(e)=>handleChangeData(e)}
                            >
                                <option value=""></option>
                                <option value="Sim">Sim</option>
                                <option value="Não">Não</option>
                            </select>
                            :
                            <input 
                                defaultValue={localData?.fichaMedicaRevisada || ''}
                                readOnly={readOnly}
                            />
                        }
                    </div>
                    <div className={styles.boxInput}>
                        <label htmlFor="">Kit primeiros socorros revisado?</label>
                        {!readOnly ?
                            <select 
                                name="kitPrimeirosSocorros" 
                                value={localData?.kitPrimeirosSocorros || ''}
                                onChange={(e)=>handleChangeData(e)}
                            >
                                <option value=""></option>
                                <option value="Sim">Sim</option>
                                <option value="Não">Não</option>
                            </select>
                            :
                            <input 
                                defaultValue={localData?.kitPrimeirosSocorros || ''}
                                readOnly={readOnly}
                            />
                        }
                    </div>
                    <div className={styles.boxInput}>
                        <label htmlFor="">Feito inspeção no local?</label>
                        {!readOnly ?
                            <select 
                                name="inspesaoLocal" 
                                value={localData?.inspesaoLocal || ''}
                                onChange={(e)=>handleChangeData(e)}
                            >
                                <option value=""></option>
                                <option value="Sim">Sim</option>
                                <option value="Não">Não</option>
                            </select>
                            :
                            <input 
                                defaultValue={localData?.inspesaoLocal || ''}
                                readOnly={readOnly}
                            />
                        }
                    </div>
                    <div className={styles.boxInput}>
                        <label htmlFor="">Data da inspeção?</label>
                        <input 
                            type="date"
                            name='dataInspecao'
                            value={dateFormat1(localData?.dataInspecao) || ''}
                            onChange={(e)=>handleChangeData(e)}
                            readOnly={readOnly}
                        />
                    </div>
                </div>                
            </div>
            
            {/* Pronto Socorro mais próximo */}
            <div className={styles.section}>
                <h3>Pronto Socorro mais próximo</h3>
                <div className={styles.subConteiner}>
                    <div className={styles.boxInput}>
                        <label htmlFor="">Nome</label>
                        {!readOnly ? <input
                            type='text' 
                            name='prontoSocorro.nome'
                            value={localData?.prontoSocorro?.nome || ''}
                            onChange={(e)=>handleChangeData(e)}
                            readOnly={readOnly}
                        /> : <p>{localData?.prontoSocorro?.nome || ''}</p>}
                    </div>
                    <div className={styles.boxInput}>
                        <label htmlFor="">Contatos</label>
                        <input
                            type='text' 
                            name='prontoSocorro.contato'
                            value={localData?.prontoSocorro?.contato || ''}
                            onChange={(e)=>handleChangeData(e)}
                            readOnly={readOnly}
                        />
                    </div>
                    <div className={styles.boxInput}>
                        <label htmlFor="">Distância do local da atividade</label>
                        <input
                            type='text' 
                            name='prontoSocorro.distancia'
                            value={localData?.prontoSocorro?.distancia || ''}
                            onChange={(e)=>handleChangeData(e)}
                            readOnly={readOnly}
                        />
                    </div>
                    <div className={styles.boxInput}>
                        <label htmlFor="">Endereço</label>
                        {!readOnly ? <input
                            type='text' 
                            name='prontoSocorro.local'
                            value={localData?.prontoSocorro?.local || ''}
                            onChange={(e)=>handleChangeData(e)}
                            readOnly={readOnly}
                        /> : <p>{localData?.prontoSocorro?.local || ''}</p>}
                    </div>
                </div>
            </div>

            {/* Hospital mais próximo */}
            <div className={styles.section}>
                <h3>Hospital mais próximo</h3>
                <div className={styles.subConteiner}>
                    <div className={styles.boxInput}>
                        <label htmlFor="">Nome</label>
                        {!readOnly ? <input
                            type='text' 
                            name='hospital.nome'
                            value={localData?.hospital?.nome || ""}
                            onChange={(e)=>handleChangeData(e)}
                            readOnly={readOnly}
                        /> : <p>{localData?.hospital?.nome || ""}</p>}
                    </div>
                    <div className={styles.boxInput}>
                        <label htmlFor="">Contatos</label>
                        <input
                            type='text' 
                            name='hospital.contato'
                            value={localData?.hospital?.contato || ""}
                            onChange={(e)=>handleChangeData(e)}
                            readOnly={readOnly}
                        />
                    </div>
                    <div className={styles.boxInput}>
                        <label htmlFor="">Distância do local da atividade</label>
                        <input
                            type='text' 
                            name='hospital.distancia'
                            value={localData?.hospital?.distancia || ""}
                            onChange={(e)=>handleChangeData(e)}
                            readOnly={readOnly}
                        />
                    </div>
                    <div className={styles.boxInput}>
                        <label htmlFor="">Endereço</label>
                        {!readOnly ? <input
                            type='text' 
                            name='hospital.local'
                            value={localData?.hospital?.local || ""}
                            onChange={(e)=>handleChangeData(e)}
                            readOnly={readOnly}
                        /> : <p>{localData?.hospital?.local || ""}</p>}
                    </div>
                </div>
            </div> 

            {/* Contatos de Emergência */}
            <div className={`${styles.section} ${styles.bgGreen}`}>
                <h3>Contatos de Emergência</h3>
               {!readOnly ?
                    <div className={styles.subConteiner}>
                        <div className={styles.boxInput}>
                            <label htmlFor="">Nome do contato</label>
                            <input
                                type='text' 
                                name='nome'
                                value={currentContatoEmerg.nome || ''}
                                onChange={(e)=>{
                                    setCurrentContatoEmerg((prev)=>{
                                        return{
                                            ...prev,
                                            nome: e.target.value
                                        }
                                    })
                                }}
                                readOnly={readOnly}
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="">Contato</label>
                            <input
                                type='text' 
                                name='contato'
                                value={currentContatoEmerg.contato || ''}
                                onChange={(e)=>{
                                    setCurrentContatoEmerg((prev)=>{
                                        return{
                                            ...prev,
                                            contato: masktel(e.target.value)
                                        }
                                    })
                                }}
                                readOnly={readOnly}
                            />
                        </div>
                        <FaPlus size={20} onClick={addContatoEmergencia} className={styles.addBtn}/>
                    </div>
                    :null}
            </div>
            {localData?.contatosEmergencia?.map((cont, idx)=>(
                <div className={`${styles.subConteiner} ${styles.borderGreen}`} key={idx+'contatosEmerg'}>
                    <div className={styles.boxInput}>
                        <label htmlFor="">Nome do contato</label>
                        <input
                            type='text' 
                            name='contatosEmergencia.nome'
                            value={cont.nome || ''}
                            onChange={(e)=>handleChangeData(e, idx)}
                            readOnly={readOnly}
                        />
                    </div>
                    <div className={styles.boxInput}>
                        <label htmlFor="">Contato</label>
                        <input
                            type='text' 
                            name='contatosEmergencia.contato'
                            value={cont.contato || ''}
                            onChange={(e)=>handleChangeData(e, idx)}
                            readOnly={readOnly}
                        />
                    </div>
                    <FaMinus  
                        size={18} 
                        className={`${styles.btnRemSection}`}
                        onClick={()=>removePessoa('contatosEmergencia', idx)} 
                    />
                </div>
            ))}

            {/* Espaços Seguros */}
            <div className={styles.section}>
                <h3>Espaços Seguros</h3>
                <div className={`${styles.subConteiner}`}>
                    <div className={`${styles.boxInput} ${styles.minHeight}`}>
                        <label htmlFor="">Tenho ciência de que as informações preliminares devem ser claramente repassadas aos envolvidos.</label>
                        {!readOnly ?
                            <select 
                                name="espacosSeguros.infosPreliminares" 
                                value={localData?.espacosSeguros?.infosPreliminares || ''}
                                onChange={(e)=>handleChangeData(e)}
                            >
                                <option value=""></option>
                                <option value="Sim">Sim</option>
                                <option value="Não">Não</option>
                            </select>
                            :
                            <input 
                                defaultValue={localData?.espacosSeguros?.infosPreliminares}
                                readOnly={readOnly}
                            />
                        }
                    </div>
                    <div className={`${styles.boxInput} ${styles.minHeight}`}>
                        <label htmlFor="">As informações médicas estão guardadas de forma confidencial e de fácil acesso ao coordenador  ou enfermaria da atividade?</label>
                        {!readOnly ?
                            <select 
                                name="espacosSeguros.infosMedicas" 
                                value={localData?.espacosSeguros?.infosMedicas || ''}
                                onChange={(e)=>handleChangeData(e)}
                            >
                                <option value=""></option>
                                <option value="Sim">Sim</option>
                                <option value="Não">Não</option>
                            </select>
                            :
                            <input 
                                defaultValue={localData?.espacosSeguros?.infosMedicas}
                                readOnly={readOnly}
                            />
                        }
                    </div>
                    <div className={`${styles.boxInput} ${styles.minHeight}`}>
                        <label htmlFor="">Os responsáveis pela atividade estão ciêntes que nenhuma informação pessoal dos participantes devem ser transmitida a terceiros ou utilizada sem a devida autorização expressa de seus responsáveis, exeto em caso de emergencia médica, policial ou por força de lei?</label>
                        {!readOnly ? 
                            <select 
                                name="espacosSeguros.protecaoDados" 
                                value={localData?.espacosSeguros?.protecaoDados || ''}
                                onChange={(e)=>handleChangeData(e)}
                            >
                                <option value=""></option>
                                <option value="Sim">Sim</option>
                                <option value="Não">Não</option>
                            </select>
                            :
                            <input 
                                defaultValue={localData?.espacosSeguros?.protecaoDados}
                                readOnly={readOnly}
                            />
                        }
                    </div>
                    <div className={`${styles.boxInput} ${styles.minHeight}`}>
                        <label htmlFor="">O coordenador e os escotistas envolvidos possuem o curso de Proteção Infatojuvenil, Bullying e CyberBullying e Política Nacional de Espaço Seguro com validade de 1 ano?</label>
                        {!readOnly ?
                            <select 
                                name="espacosSeguros.cursosEscotistas" 
                                value={localData?.espacosSeguros?.cursosEscotistas || ''}
                                onChange={(e)=>handleChangeData(e)}
                            >
                                <option value=""></option>
                                <option value="Sim">Sim</option>
                                <option value="Não">Não</option>
                            </select>
                            :
                            <input 
                                defaultValue={localData?.espacosSeguros?.cursosEscotistas}
                                readOnly={readOnly}
                            />
                        }
                    </div>
                    <div className={`${styles.boxInput} ${styles.minHeight}`}>
                        <label htmlFor="">O canal de denúncias foi informado nas Informações Preliminares</label>
                        {!readOnly ? 
                            <select 
                                name="espacosSeguros.canalDenuncias" 
                                value={localData?.espacosSeguros?.canalDenuncias || ''}
                                onChange={(e)=>handleChangeData(e)}
                            >
                                <option value=""></option>
                                <option value="Sim">Sim</option>
                                <option value="Não">Não</option>
                            </select>
                            :
                            <input 
                                defaultValue={localData?.espacosSeguros?.canalDenuncias}
                                readOnly={readOnly}
                            />
                        }
                    </div>
                </div>
            </div>

            {/* Acolhimento/Escuta */}
            {['orange', 'red'].includes(grauRisco?.color) ?
            <>
                <div className={`${styles.section} ${styles.bgGreen}`}>
                    <h3>Pessoa(s) do Acolhimento/Escuta</h3>
                    {!readOnly ?
                        <div className={styles.subConteiner}>
                            <div className={styles.boxInput}>
                                <label htmlFor="">Nome</label>
                                <input
                                    type='text' 
                                    name='nome'
                                    value={currentProfAcolhimento.nome || ''}
                                    onChange={(e)=>handleChangeAcolhimento(e)}
                                    readOnly={readOnly}
                                />
                            </div>
                            <div className={styles.boxInput}>
                                <label htmlFor="">Contato</label>
                                <input
                                    type='text' 
                                    name='contato'
                                    value={currentProfAcolhimento.contato || ''}
                                    onChange={(e)=>handleChangeAcolhimento(e)}
                                    readOnly={readOnly}
                                />
                            </div>
                            <div className={styles.boxInput}>
                                <label htmlFor="">Profissão</label>
                                <input
                                    type='text' 
                                    name='profissao'
                                    value={currentProfAcolhimento.profissao || ''}
                                    onChange={(e)=>handleChangeAcolhimento(e)}
                                    readOnly={readOnly}
                                />
                            </div>
                            <div className={styles.boxInput}>
                                <label htmlFor="">Registro Escoteiro</label>
                                <input
                                    type='text' 
                                    name='regEscoteiro'
                                    value={currentProfAcolhimento.regEscoteiro || ''}
                                    onChange={(e)=>handleChangeAcolhimento(e)}
                                    readOnly={readOnly}
                                />
                            </div>
                            <div className={styles.boxInput}>
                                <label htmlFor="">CPF</label>
                                <input
                                    type='text' 
                                    name='cpf'
                                    value={currentProfAcolhimento.cpf || ''}
                                    onChange={(e)=>handleChangeAcolhimento(e)}
                                    readOnly={readOnly}
                                />
                            </div>
                            <div className={styles.boxInput}>
                                <label htmlFor="">Nº Carteirinha de Classe</label>
                                <input
                                    type='text' 
                                    name='numCarteirinhaClass'
                                    value={currentProfAcolhimento.numCarteirinhaClass || ''}
                                    onChange={(e)=>handleChangeAcolhimento(e)}
                                    readOnly={readOnly}
                                />
                            </div>
                            <FaPlus size={20} onClick={addProfAcolhimento} className={styles.addBtn}/>
                        </div>
                    :null}

                    {/* docs viewer */}                
                    {!readOnly ? 
                        <div className={styles.subConteiner}>
                            <div className={styles.boxInput}>
                                <label htmlFor="">Documentos</label>
                                <input
                                    type='file' 
                                    name='acolhimento'
                                    multiple
                                    accept='image/*, .pdf'
                                    onChange={(e)=>handleUpload(e)}
                                />
                            </div>
                            {currentProfAcolhimento?.docs?.map((doc, idx)=>(
                                <span key={idx+'docsAcolhimento'} className={styles.removeDoc}>
                                    {doc.titulo}
                                    <ImagePreview 
                                        file={doc.doc as File} 
                                        height={200} 
                                        width={100}
                                    /> 
                                    <b onClick={()=>handleRemoveUpload(doc.titulo, 'acolhimento')}>X</b>
                                </span>
                            ))}
                        </div>
                    :null}
                </div>
                {localData?.espacosSeguros?.acolhimento?.map((acolh, idx)=>(
                    <div className={`${styles.subConteiner} ${styles.borderGreen}`} key={idx+'acolhimento'}>
                        <div className={styles.boxInput}>
                            <label htmlFor="">Nome</label>
                            <input
                                type='text' 
                                name='espacosSeguros.acolhimento.nome'
                                value={acolh.nome || ''}
                                onChange={(e)=>handleChangeData(e, idx)}
                                readOnly={readOnly}
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="">Contato</label>
                            <input
                                type='text' 
                                name='espacosSeguros.acolhimento.contato'
                                value={acolh.contato || ''}
                                onChange={(e)=>handleChangeData(e, idx)}
                                readOnly={readOnly}
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="">Profissão</label>
                            <input
                                type='text' 
                                name='espacosSeguros.acolhimento.profissao'
                                value={acolh.profissao || ''}
                                onChange={(e)=>handleChangeData(e, idx)}
                                readOnly={readOnly}
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="">Registro Escoteiro</label>
                            <input
                                type='text' 
                                name='espacosSeguros.acolhimento.regEscoteiro'
                                value={acolh.regEscoteiro || ''}
                                onChange={(e)=>handleChangeData(e, idx)}
                                readOnly={readOnly}
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="">CPF</label>
                            <input
                                type='text' 
                                name='espacosSeguros.acolhimento.cpf'
                                value={acolh.cpf || ''}
                                onChange={(e)=>handleChangeData(e, idx)}
                                readOnly={readOnly}
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="">Nº Carteirinha Classe</label>
                            <input
                                type='text' 
                                name='espacosSeguros.acolhimento.numCarteirinhaClass'
                                value={acolh.numCarteirinhaClass || ''}
                                onChange={(e)=>handleChangeData(e, idx)}
                                readOnly={readOnly}
                            />
                        </div>
                        {/* docs viewer */}                
                        <div className={styles.subConteiner}>
                            {!readOnly ?
                                <div className={styles.boxInput}>
                                    <label htmlFor="">Documentos</label>
                                    <input
                                        type='file' 
                                        name='espacosSeguros.acolhimento.docs'
                                        multiple
                                        accept='image/*, .pdf'
                                        onChange={(e)=>handleChangeData(e, idx)}
                                    />
                                </div>
                            :null}

                            {acolh?.docs?.map((doc, idxDoc)=>(
                                <div 
                                    key={idxDoc+'docsAcolhimento'} 
                                    className={styles.removeDoc}
                                    style={{maxWidth: maxWidth}}
                                >
                                    {doc.titulo}
                                    <ImagePreview 
                                        file={doc.doc as File} 
                                        height={height} 
                                        width={width}
                                    /> 
                                    {!readOnly ? 
                                        <b onClick={()=>handleRemoveUpload(doc.titulo, 'acolhimentoRemove', idx)}>X</b>
                                    :null}
                                </div>
                            ))}
                        </div>
                        <FaMinus  
                            size={18} 
                            className={`${styles.btnRemSection}`}
                            onClick={()=>removePessoa('espacosSeguros', idx, 'acolhimento')} 
                        />
                    </div>
                ))}
                
                {/* Enfermaria */}
                <div className={`${styles.section} ${styles.bgGreen}`}>
                    <h3>Pessoa(s) da Enfermaria</h3>
                    {!readOnly ? 
                        <div className={styles.subConteiner}>
                            <div className={styles.boxInput}>
                                <label htmlFor="">Nome</label>
                                <input
                                    type='text' 
                                    name='nome'
                                    value={currentProfEnfermaria.nome || ''}
                                    onChange={(e)=>handleChangeEnfermaria(e)}
                                />
                            </div>
                            <div className={styles.boxInput}>
                                <label htmlFor="">Contato</label>
                                <input
                                    type='text' 
                                    name='contato'
                                    value={currentProfEnfermaria.contato || ''}
                                    onChange={(e)=>handleChangeEnfermaria(e)}
                                />
                            </div>
                            <div className={styles.boxInput}>
                                <label htmlFor="">Profissão</label>
                                <input
                                    type='text' 
                                    name='profissao'
                                    value={currentProfEnfermaria.profissao || ''}
                                    onChange={(e)=>handleChangeEnfermaria(e)}
                                />
                            </div>
                            <div className={styles.boxInput}>
                                <label htmlFor="">Registro Escoteiro</label>
                                <input
                                    type='text' 
                                    name='regEscoteiro'
                                    value={currentProfEnfermaria.regEscoteiro || ''}
                                    onChange={(e)=>handleChangeEnfermaria(e)}
                                />
                            </div>
                            <div className={styles.boxInput}>
                                <label htmlFor="">CPF</label>
                                <input
                                    type='text' 
                                    name='cpf'
                                    value={currentProfEnfermaria.cpf || ''}
                                    onChange={(e)=>handleChangeEnfermaria(e)}
                                />
                            </div>
                            <div className={styles.boxInput}>
                                <label htmlFor="">Nº Carteirinha Classe</label>
                                <input
                                    type='text' 
                                    name='numCarteirinhaClass'
                                    value={currentProfEnfermaria.numCarteirinhaClass || ''}
                                    onChange={(e)=>handleChangeEnfermaria(e)}
                                />
                            </div>
                            <FaPlus size={20} onClick={addProfEnfermaria} className={styles.addBtn}/>
                        </div>
                    :null}

                    {/* docs viewer */}                
                    {!readOnly ?
                        <div className={styles.subConteiner}>
                            <div className={styles.boxInput}>
                                <label htmlFor="">Documentos</label>
                                <input
                                    type='file' 
                                    name='enfermaria'
                                    multiple
                                    accept='image/*, .pdf'
                                    onChange={(e)=>handleUpload(e)}
                                />
                            </div>
                            {currentProfEnfermaria?.docs?.map((doc, idx)=>(
                                <div key={idx+'docsEnfermaria'} className={styles.removeDoc}>
                                    {doc.titulo}
                                    <ImagePreview 
                                        file={doc.doc as File} 
                                        height={200} 
                                        width={100}
                                    /> 
                                    <b onClick={()=>handleRemoveUpload(doc.titulo, 'enfermaria')}>X</b>
                                </div>
                            ))}
                        </div>
                    :null}
                </div>
                {localData?.espacosSeguros?.enfermaria?.map((enf, idx)=>(
                    <div className={`${styles.subConteiner} ${styles.borderGreen}`} key={idx+'enfermaria'}>
                        <div className={styles.boxInput}>
                            <label htmlFor="">Nome</label>
                            <input
                                type='text' 
                                name='espacosSeguros.enfermaria.nome'
                                value={enf.nome || ''}
                                onChange={(e)=>handleChangeData(e, idx)}
                                readOnly={readOnly}
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="">Contato</label>
                            <input
                                type='text' 
                                name='espacosSeguros.enfermaria.contato'
                                value={enf.contato || ''}
                                onChange={(e)=>handleChangeData(e, idx)}
                                readOnly={readOnly}
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="">Profissão</label>
                            <input
                                type='text' 
                                name='espacosSeguros.enfermaria.profissao'
                                value={enf.profissao|| ''}
                                onChange={(e)=>handleChangeData(e, idx)}
                                readOnly={readOnly}
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="">Registro Escoteiro</label>
                            <input
                                type='text' 
                                name='espacosSeguros.enfermaria.regEscoteiro'
                                value={enf.regEscoteiro || ''}
                                onChange={(e)=>handleChangeData(e, idx)}
                                readOnly={readOnly}
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="">CPF</label>
                            <input
                                type='text' 
                                name='espacosSeguros.enfermaria.cpf'
                                value={enf.cpf || ''}
                                onChange={(e)=>handleChangeData(e, idx)}
                                readOnly={readOnly}
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="">Nº Carteirinha Classe</label>
                            <input
                                type='text' 
                                name='espacosSeguros.enfermaria.numCarteirinhaClass'
                                value={enf.numCarteirinhaClass || ''}
                                onChange={(e)=>handleChangeData(e, idx)}
                                readOnly={readOnly}
                            />
                        </div>

                        {/* docs viewer */}                
                        <div className={styles.subConteiner}>
                            {!readOnly ? 
                                <div className={styles.boxInput}>
                                    <label htmlFor="">Documentos</label>
                                    <input
                                        type='file' 
                                        name='espacosSeguros.enfermaria.docs'
                                        multiple
                                        accept='image/*, .pdf'
                                        onChange={(e)=>handleChangeData(e, idx)}
                                    />
                                </div>
                            :null}
                            {enf?.docs?.map((doc, idxDoc)=>(
                                <div 
                                    key={idxDoc+'docsEnfermaria'} 
                                    className={styles.removeDoc}
                                    style={{maxWidth: maxWidth}}
                                >
                                    {doc.titulo}
                                    <ImagePreview 
                                        file={doc.doc as File} 
                                        height={height} 
                                        width={width}
                                    /> 
                                    {!readOnly ?
                                        <b onClick={()=>handleRemoveUpload(doc.titulo, 'enfermariaRemove', idx)}>X</b>
                                    :null}
                                </div>
                            ))}
                        </div>
                        <FaMinus  
                            size={18} 
                            className={`${styles.btnRemSection}`}
                            onClick={()=>removePessoa('espacosSeguros', idx, 'enfermaria')} 
                        />  
                    </div>
                ))}
            </>
            :null}

            {/* Veículo de Emergência/Apoio */}
            {['orange', 'red'].includes(grauRisco?.color) ?
            <>
                {!readOnly ?
                    <div className={`${styles.section} ${styles.bgGreen}`}>
                        <h3>Veículo de Emergência/Apoio</h3>
                        <div className={styles.subConteiner}>
                            <div className={`${styles.boxInput} ${styles.minHeight90}`}>
                                <label htmlFor="">Tipo de veículo</label>
                                <input
                                    type='text' 
                                    name='tipoVeiculo'
                                    placeholder='carro 5 pessoas, van, combi, ônibus...'
                                    value={currentVeiculo.tipoVeiculo || ""}
                                    onChange={(e)=>handleChangeVeiculo(e)}
                                />
                            </div>
                            <div className={`${styles.boxInput} ${styles.minHeight90}`}>
                                <label htmlFor="">Nome do condutor</label>
                                <input
                                    type='text' 
                                    name='nomeMotorista'
                                    value={currentVeiculo.nomeMotorista || ""}
                                    onChange={(e)=>handleChangeVeiculo(e)}
                                />
                            </div>
                            <div className={`${styles.boxInput} ${styles.minHeight90}`}>
                                <label htmlFor="">Contato</label>
                                <input
                                    type='text' 
                                    name='contato'
                                    value={currentVeiculo.contato || ""}
                                    onChange={(e)=>handleChangeVeiculo(e)}
                                />
                            </div>
                            <div className={`${styles.boxInput} ${styles.minHeight90}`}>
                                <label htmlFor="">Profissão</label>
                                <input
                                    type='text' 
                                    name='profissao'
                                    value={currentVeiculo.profissao || ""}
                                    onChange={(e)=>handleChangeVeiculo(e)}
                                />
                            </div>
                            <div className={`${styles.boxInput} ${styles.minHeight90}`}>
                                <label htmlFor="">Reg. Escoteiro</label>
                                <input
                                    type='text' 
                                    name='regEscoteiro'
                                    value={currentVeiculo.regEscoteiro || ""}
                                    onChange={(e)=>handleChangeVeiculo(e)}
                                />
                            </div>
                            <div className={`${styles.boxInput} ${styles.minHeight90}`}>
                                <label htmlFor="">Tipo/UF/Nº da Habilitação do condutor</label>
                                <input
                                    type='text' 
                                    name='habilitacao'
                                    placeholder='CNH/ES/2121212121'
                                    value={currentVeiculo.habilitacao || ""}
                                    onChange={(e)=>handleChangeVeiculo(e)}
                                />
                            </div>
                            <div className={`${styles.boxInput} ${styles.minHeight90}`}>
                                <label htmlFor="">CPF do condutor</label>
                                <input
                                    type='text' 
                                    name='cpf'
                                    value={currentVeiculo.cpf || ""}
                                    onChange={(e)=>handleChangeVeiculo(e)}
                                />
                            </div>   
                            <div className={`${styles.boxInput} ${styles.minHeight90}`}>
                                <label htmlFor="">Manutenção preventiva em dia?</label>
                                <select
                                    name='manutencao'
                                    value={currentVeiculo.manutencao || ""}
                                    onChange={(e)=>handleChangeVeiculo(e)}
                                >
                                    <option value=""></option>
                                    <option value="Sim">Sim</option>
                                    <option value="Não">Não</option>
                                </select>
                            </div> 
                            <FaPlus size={20} onClick={addVeiculo} className={styles.addBtn}/>
                        </div> 
                        {/* docs viewer */}                
                        <div className={styles.subConteiner}>
                            <div className={styles.boxInput}>
                                <label htmlFor="">Documentos</label>
                                <input
                                    type='file' 
                                    name='veiculos'
                                    multiple
                                    accept='image/*, .pdf'
                                    onChange={(e)=>handleUpload(e)}
                                />
                            </div>
                            {currentVeiculo?.docs?.map((doc, idx)=>(
                                <div key={idx+'docsAcolhimento'} className={styles.removeDoc}>
                                    {doc.titulo}
                                    <ImagePreview 
                                        file={doc.doc as File} 
                                        height={200} 
                                        width={100}
                                    /> 
                                    <b onClick={()=>handleRemoveUpload(doc.titulo, 'veiculos')}>X</b>
                                </div>
                            ))}
                        </div>
                        <h5>
                            Obs.: Anexar documento de identidade do habilitação do condutor.
                        </h5>    
                    </div>
                :null}
                {localData?.veiculos?.map((veic, idx)=>(
                    <div className={`${styles.subConteiner} ${styles.borderGreen}`} key={idx+'veiculos'}>
                        <div className={`${styles.boxInput} ${styles.minHeight90}`}>
                            <label htmlFor="">Tipo de veículo</label>
                            <input
                                type='text' 
                                name='veiculos.tipoVeiculo'
                                placeholder='carro 5 pessoas, nan, combi, ônibus...'
                                value={veic.tipoVeiculo || ''}
                                onChange={(e)=>handleChangeData(e, idx)}
                                readOnly={readOnly}
                            />
                        </div>
                        <div className={`${styles.boxInput} ${styles.minHeight90}`}>
                            <label htmlFor="">Nome do condutor</label>
                            <input
                                type='text' 
                                name='veiculos.nomeMotorista'
                                value={veic.nomeMotorista|| ''}
                                onChange={(e)=>handleChangeData(e, idx)}
                                readOnly={readOnly}
                            />
                        </div>
                        <div className={`${styles.boxInput} ${styles.minHeight90}`}>
                            <label htmlFor="">Contato</label>
                            <input
                                type='text' 
                                name='veiculos.contato'
                                value={veic.contato|| ''}
                                onChange={(e)=>handleChangeData(e, idx)}
                                readOnly={readOnly}
                            />
                        </div>
                        <div className={`${styles.boxInput} ${styles.minHeight90}`}>
                            <label htmlFor="">Profissão</label>
                            <input
                                type='text' 
                                name='veiculos.profissao'
                                value={veic.profissao|| ''}
                                onChange={(e)=>handleChangeData(e, idx)}
                                readOnly={readOnly}
                            />
                        </div>
                        <div className={`${styles.boxInput} ${styles.minHeight90}`}>
                            <label htmlFor="">Reg. Escoteiro</label>
                            <input
                                type='text' 
                                name='veiculos.regEscoteiro'
                                value={veic.regEscoteiro|| ''}
                                onChange={(e)=>handleChangeData(e, idx)}
                                readOnly={readOnly}
                            />
                        </div>
                        <div className={`${styles.boxInput} ${styles.minHeight90}`}>
                            <label htmlFor="">Tipo/Nº da Habilitação do condutor</label>
                            <input
                                type='text' 
                                name='veiculos.habilitacao'
                                value={veic.habilitacao|| ''}
                                onChange={(e)=>handleChangeData(e, idx)}
                                readOnly={readOnly}
                            />
                        </div>
                        <div className={`${styles.boxInput} ${styles.minHeight90}`}>
                            <label htmlFor="">CPF do condutor</label>
                            <input
                                type='text' 
                                name='veiculos.cpf'
                                value={veic.cpf|| ''}
                                onChange={(e)=>handleChangeData(e, idx)}
                                readOnly={readOnly}
                            />
                        </div>   
                        <div className={`${styles.boxInput} ${styles.minHeight90}`}>
                            <label htmlFor="">Manutenção preventiva em dia?</label>
                            {!readOnly ? 
                                <select
                                    name='veiculos.manutencao'
                                    value={veic.manutencao|| ''}
                                    onChange={(e)=>handleChangeData(e, idx)}
                                >
                                    <option value=""></option>
                                    <option value="Sim">Sim</option>
                                    <option value="Não">Não</option>
                                </select>
                            :
                            <input 
                                defaultValue={veic.manutencao || ''}
                                readOnly={readOnly}
                            />}
                        </div>  

                        {/* docs viewer */}                
                        <div className={styles.subConteiner}>
                            {!readOnly ? 
                                <div className={styles.boxInput}>
                                    <label htmlFor="">Documentos</label>
                                    <input
                                        type='file' 
                                        name='veiculos.docs'
                                        multiple
                                        accept='image/*, .pdf'
                                        onChange={(e)=>handleChangeData(e, idx)}
                                    />
                                </div>
                            :null}
                            {veic?.docs?.map((doc, idxV)=>(
                                <div 
                                    key={idx+idxV+'docsVeiculos'} 
                                    className={styles.removeDoc}
                                    style={{maxWidth: maxWidth}}
                                >
                                    {doc.titulo}
                                    <ImagePreview 
                                        file={doc.doc as File} 
                                        height={height} 
                                        width={width}
                                    /> 
                                    {!readOnly? 
                                        <b onClick={()=>handleRemoveUpload(doc.titulo, 'veiculosRemove', idx)}>X</b>
                                    :null}
                                </div>
                            ))}
                        </div>
                        <FaMinus  
                            size={18} 
                            className={`${styles.btnRemSection}`}
                            onClick={()=>removePessoa('veiculos', idx)} 
                        />       
                    </div>
                ))}

                {/* Atividade conduzida por profissional */}
                <div className={`${styles.section} ${styles.bgGreen}`}>
                    <h3>Profissional</h3>
                    <h6>quando a atividade for conduzida por profissionais</h6>
                    {!readOnly ? 
                        <div className={styles.subConteiner}>
                            <div className={`${styles.boxInput} ${styles.minHeight90}`}>
                                <label htmlFor="">Nome</label>
                                <input
                                    type='text' 
                                    name='nomeProf'
                                    value={currentProfissional.nomeProf || ''}
                                    onChange={(e)=>handleChangeProfissional(e)}
                                />
                            </div>
                            <div className={`${styles.boxInput} ${styles.minHeight90}`}>
                                <label htmlFor="">Profissão</label>
                                <input
                                    type='text' 
                                    name='profissao'
                                    value={currentProfissional.profissao || ''}
                                    onChange={(e)=>handleChangeProfissional(e)}
                                />
                            </div>
                            <div className={`${styles.boxInput} ${styles.minHeight90}`}>
                                <label htmlFor="">Registro Escoteiro</label>
                                <input
                                    type='text' 
                                    name='regEscoteiro'
                                    value={currentProfissional.regEscoteiro || ''}
                                    onChange={(e)=>handleChangeProfissional(e)}
                                />
                            </div>
                            <div className={`${styles.boxInput} ${styles.minHeight90}`}>
                                <label htmlFor="">CPF</label>
                                <input
                                    type='text' 
                                    name='cpf'
                                    value={currentProfissional.cpf || ''}
                                    onChange={(e)=>handleChangeProfissional(e)}
                                />
                            </div>
                            <div className={`${styles.boxInput} ${styles.minHeight90}`}>
                                <label htmlFor="">Nº da Carteirinha de Classe</label>
                                <input
                                    type='text' 
                                    name='numCarteirinha'
                                    value={currentProfissional.numCarteirinha || ''}
                                    onChange={(e)=>handleChangeProfissional(e)}
                                />
                            </div>
                            <div className={`${styles.boxInput} ${styles.minHeight90}`}>
                                <label htmlFor="">Contato</label>
                                <input
                                    type='text' 
                                    name='contato'
                                    value={currentProfissional.contato || ''}
                                    onChange={(e)=>handleChangeProfissional(e)}
                                />
                            </div>
                            <div className={`${styles.boxInput} ${styles.minHeight90}`}>
                                <label htmlFor="">Redes Sociais</label>
                                <input
                                    type='text' 
                                    value={currentRedesSociaisProf}
                                    onChange={(e)=>setcurrentRedesSociaisProf(e.target.value)}
                                    placeholder='precione enter para inserir'
                                    onKeyDown={(e)=>handleAddTag(e)}
                                />
                                {currentRedesSociaisProfArray?.length > 0 ? 
                                <div style={{
                                    display: 'flex', 
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                }}>
                                    {currentRedesSociaisProfArray?.map((tag, index) => (
                                        <a
                                            key={index+'tags'}
                                            className={styles.boxTags}
                                            href={tag.includes('http://') ? tag : `http://${tag}`}
                                            target='_blank'
                                        >
                                        {setIconSocialMidia(tag)}
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault(); 
                                                    handleRemoveTag(index)
                                                }}
                                            >
                                                x
                                            </button>
                                        </a>
                                    ))}
                                </div>
                                :null}
                            </div>
                            <FaPlus size={20} onClick={addProfissional} className={styles.addBtn}/>
                        </div>
                    :null}

                    {/* docs viewer */}                
                    {!readOnly ?
                        <div className={styles.subConteiner}>
                            <div className={styles.boxInput}>
                                <label htmlFor="">Documentos</label>
                                <input
                                    type='file' 
                                    name='profissional'
                                    multiple
                                    accept='image/*, .pdf'
                                    onChange={(e)=>handleUpload(e)}
                                />
                            </div>
                            {currentProfissional?.docs?.map((doc, idx)=>(
                                <div key={idx+'docsProfissional'} className={styles.removeDoc}>
                                    {doc.titulo}
                                    <ImagePreview 
                                        file={doc.doc as File} 
                                        height={200} 
                                        width={100}
                                    /> 
                                    <b onClick={()=>handleRemoveUpload(doc.titulo, 'profissional')}>X</b>
                                </div>
                            ))}
                        </div>
                    :null}
                    <h5>
                        Obs.: Anexar documento de identidade do profissional e documento que comprove a habilitação profissional (certificado de curso, carteirinha de classe ou similar).
                    </h5>
                </div>
                {localData?.atividadePorProfissional?.map((prof, idx)=>(
                    <div className={`${styles.subConteiner} ${styles.borderGreen}`} key={idx+'ativProf'}>
                        <div className={styles.boxInput}>
                            <label htmlFor="">Nome</label>
                            <input
                                type='text' 
                                name='atividadePorProfissional.nome'
                                value={prof.nomeProf || ''}
                                onChange={(e)=>handleChangeData(e, idx)}
                                readOnly={readOnly}
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="">Profissão</label>
                            <input
                                type='text' 
                                name='atividadePorProfissional.profissao'
                                value={prof.profissao|| ''}
                                onChange={(e)=>handleChangeData(e, idx)}
                                readOnly={readOnly}
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="">Registro Escoteiro</label>
                            <input
                                type='text' 
                                name='atividadePorProfissional.regEscoteiro'
                                value={prof.regEscoteiro|| ''}
                                onChange={(e)=>handleChangeData(e, idx)}
                                readOnly={readOnly}
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="">CPF</label>
                            <input
                                type='text' 
                                name='atividadePorProfissional.cpf'
                                value={prof.cpf|| ''}
                                onChange={(e)=>handleChangeData(e, idx)}
                                readOnly={readOnly}
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="">Nº da Carteirinha de Classe</label>
                            <input
                                type='text' 
                                name='atividadePorProfissional.numCarteirinhaClass'
                                value={prof.numCarteirinha|| ''}
                                onChange={(e)=>handleChangeData(e, idx)}
                                readOnly={readOnly}
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="">Contato</label>
                            <input
                                type='text' 
                                name='atividadePorProfissional.contato'
                                value={prof.contato|| ''}
                                onChange={(e)=>handleChangeData(e, idx)}
                                readOnly={readOnly}
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="">Redes Sociais</label>
                            {prof.redesSociais?.map((social, sIdx)=>(
                                <input
                                    key={sIdx+'linkSocialMidia'}
                                    type='text' 
                                    name='atividadePorProfissional.redesSociais'
                                    value={social || ''}
                                    onChange={(e)=>handleChangeData(e, idx, sIdx)}
                                    readOnly={readOnly}
                                />                                        
                            ))}
                            {prof.redesSociais?.length > 0 ? 
                                <div style={{
                                    display: 'flex', 
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                }}>
                                    {prof.redesSociais?.map((tag, index) => (
                                        <a
                                            key={index+'socialMidia'}
                                            className={styles.boxTags}
                                            href={tag.includes('http://') ? tag : `http://${tag}`}
                                            target='_blank'
                                        >
                                        {setIconSocialMidia(tag)}
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault(); 
                                                    handleRemoveTag(index)
                                                }}
                                            >
                                                x
                                            </button>
                                        </a>
                                    ))}
                                </div>
                                :null}
                        </div>

                        {/* docs viewer */}                
                        <div className={styles.subConteiner}>
                            {!readOnly ? 
                                <div className={styles.boxInput}>
                                    <label htmlFor="">Documentos</label>
                                    {!readOnly ?
                                        <input
                                            type='file' 
                                            name='atividadePorProfissional.docs'
                                            multiple
                                            accept='image/*, .pdf'
                                            onChange={(e)=>handleChangeData(e, idx)}
                                        />
                                    :null}
                                </div>
                            :null}
                            {prof?.docs?.map((doc, idxDoc)=>(
                                <div 
                                    key={idx+idxDoc+'docsProfissional'} 
                                    className={styles.removeDoc}
                                    style={{maxWidth: maxWidth}}
                                >
                                    {doc.titulo}
                                    <ImagePreview 
                                        file={doc.doc as File} 
                                        height={height} 
                                        width={width}
                                    /> 
                                    {!readOnly ?
                                        <b onClick={()=>handleRemoveUpload(doc.titulo, 'profissionalRemove', idx)}>X</b>
                                    :null}
                                </div>
                            ))}
                        </div>
                        <FaMinus  
                            size={18} 
                            className={`${styles.btnRemSection}`}
                            onClick={()=>removePessoa('atividadePorProfissional', idx)} 
                        />
                    </div>
                ))}
                </>
            :null}
            {/* Profissional Resgate/Salvamento  */}
            {['red'].includes(grauRisco?.color) ?
            <>
                <div className={`${styles.section} ${styles.bgGreen}`}>
                    <h3>Profissional Resgate/Salvamento</h3>
                    {!readOnly ?
                        <div className={styles.subConteiner}>
                            <div className={styles.boxInput}>
                                <label htmlFor="">Nome</label>
                                <input
                                    type='text' 
                                    name='nome'
                                    value={currentProfSalvamento.nome || ''}
                                    onChange={(e)=>handleChangeSalvamento(e)}
                                />
                            </div>
                            <div className={styles.boxInput}>
                                <label htmlFor="">Profissão</label>
                                <input
                                    type='text' 
                                    name='profissao'
                                    value={currentProfSalvamento.profissao || ''}
                                    onChange={(e)=>handleChangeSalvamento(e)}
                                />
                            </div>
                            <div className={styles.boxInput}>
                                <label htmlFor="">CPF</label>
                                <input
                                    type='text' 
                                    name='cpf'
                                    value={currentProfSalvamento.cpf || ''}
                                    onChange={(e)=>handleChangeSalvamento(e)}
                                />
                            </div>
                            <div className={styles.boxInput}>
                                <label htmlFor="">Nº Carteirinha Classe</label>
                                <input
                                    type='text' 
                                    name='numCarteirinhaClass'
                                    value={currentProfSalvamento.numCarteirinhaClass || ''}
                                    onChange={(e)=>handleChangeSalvamento(e)}
                                />
                            </div>
                            <div className={styles.boxInput}>
                                <label htmlFor="">Registro Escoteiro</label>
                                <input
                                    type='text' 
                                    name='regEscoteiro'
                                    value={currentProfSalvamento.regEscoteiro || ''}
                                    onChange={(e)=>handleChangeSalvamento(e)}
                                />
                            </div>
                            <div className={styles.boxInput}>
                                <label htmlFor="">Contato</label>
                                <input
                                    type='text' 
                                    name='contato'
                                    value={currentProfSalvamento.contato || ''}
                                    onChange={(e)=>handleChangeSalvamento(e)}
                                />
                            </div>
                            <FaPlus size={20} onClick={addProfSalvamento} className={styles.addBtn}/>
                        </div>
                    :null}
                    {/* docs viewer */}                
                    {!readOnly ? 
                        <div className={styles.subConteiner}>
                            <div className={styles.boxInput}>
                                <label htmlFor="">Documentos</label>
                                {!readOnly ?
                                    <input
                                        type='file' 
                                        name='salvamento'
                                        multiple
                                        accept='image/*, .pdf'
                                        onChange={(e)=>handleUpload(e)}
                                    />
                                :null}
                            </div>
                            {currentProfSalvamento?.docs?.map((doc, idx)=>(
                                <div key={idx+'docsProfsalvamento'} className={styles.removeDoc}>
                                    {doc.titulo}
                                    <ImagePreview 
                                        file={doc.doc as File} 
                                        height={200} 
                                        width={100}
                                    /> 
                                    <b onClick={()=>handleRemoveUpload(doc.titulo, 'salvamento')}>X</b>
                                </div>
                            ))}
                        </div>
                        :null}
                    <h5>
                        Obs.: Anexar documento de identidade do profissional e documento que comprove a habilitação profissional (certificado de curso, carteirinha de classe ou similar).
                    </h5>
                </div>
                {localData?.profSalvamento?.map((salv, idx)=>(
                    <div className={`${styles.subConteiner} ${styles.borderGreen}`} key={idx+'salvamento'}>
                        <div className={styles.boxInput}>
                            <label htmlFor="">Nome</label>
                            <input
                                type='text' 
                                name='profSalvamento.nome'
                                value={salv.nome || ''}
                                onChange={(e)=>handleChangeData(e, idx)}
                                readOnly={readOnly}
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="">Profissão</label>
                            <input
                                type='text' 
                                name='profSalvamento.profissao'
                                value={salv.profissao || ''}
                                onChange={(e)=>handleChangeData(e, idx)}
                                readOnly={readOnly}
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="">CPF</label>
                            <input
                                type='text' 
                                name='profSalvamento.cpf'
                                value={salv.cpf || ''}
                                onChange={(e)=>handleChangeData(e, idx)}
                                readOnly={readOnly}
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="">Nº Carteirinha Classe</label>
                            <input
                                type='text' 
                                name='profSalvamento.numCarteirinhaClass'
                                value={salv.numCarteirinhaClass || ''}
                                onChange={(e)=>handleChangeData(e, idx)}
                                readOnly={readOnly}
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="">Registro Escoteiro</label>
                            <input
                                type='text' 
                                name='profSalvamento.regEscoteiro'
                                value={salv.regEscoteiro || ''}
                                onChange={(e)=>handleChangeData(e, idx)}
                                readOnly={readOnly}
                            />
                        </div>
                        <div className={styles.boxInput}>
                            <label htmlFor="">Contato</label>
                            <input
                                type='text' 
                                name='profSalvamento.contato'
                                value={salv.contato || ''}
                                onChange={(e)=>handleChangeData(e, idx)}
                                readOnly={readOnly}
                            />
                        </div>

                        {/* docs viewer */}                
                        <div className={styles.subConteiner}>
                            <div 
                                className={styles.boxInput}
                            >
                                <label htmlFor="">Documentos</label>
                               {!readOnly ? 
                                <input
                                        type='file' 
                                        name='profSalvamento.docs'
                                        multiple
                                        accept='image/*, .pdf'
                                        onChange={(e)=>handleChangeData(e, idx)}
                                        readOnly={readOnly}
                                    />
                                :null}
                            </div>
                            {salv?.docs?.map((doc, idxDoc)=>(
                                <div 
                                    key={idx+idxDoc+'docsProfissional'} 
                                    className={styles.removeDoc}
                                    style={{maxWidth: maxWidth}}
                                >
                                    {doc.titulo}
                                    <ImagePreview 
                                        file={doc.doc as File} 
                                        height={height} 
                                        width={width}
                                    /> 
                                    {!readOnly ? 
                                        <b onClick={()=>handleRemoveUpload(doc.titulo, 'salvamentoRemove', idx)}>X</b>
                                    :null}
                                </div>
                            ))}
                        </div>

                        <FaMinus  
                            size={18} 
                            className={`${styles.btnRemSection}`}
                            onClick={()=>removePessoa('profSalvamento', idx)} 
                        />
                    </div>
                ))}
            </>
            :null}
        </div>
    )
}