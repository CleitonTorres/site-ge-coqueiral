import { CEP, DataNews, Endereco, InfosPreliminaresSaae, ProfileProps, SAAE } from "@/@types/types";
import axios from "axios";
import CryptoJS from "crypto-js";
import { getDocument } from 'pdfjs-dist';
import { FaGlobe } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa6";

/**
 * Função para criptografar a senha
 * @param {string} password - Senha a ser criptografada 
 * @returns {string} - Senha criptografada
 */
export const encryptPassword = (password:string)=> {
    const key = `${process.env.NEXT_PUBLIC_TOKEN_APP}`; // Chave para a criptografia
    const encrypted = CryptoJS.AES.encrypt(password, key).toString();

    return encrypted;
}

/**
 * Função para descriptografar a senha
 * @param {string} encryptedPassword - Senha criptografada
 * @returns {string} senha descriptografada
 */
export const decryptPassword = (encryptedPassword:string)=> {
    const key = `${process.env.NEXT_PUBLIC_TOKEN_APP}`;

    try {
        const decrypted = CryptoJS.AES.decrypt(encryptedPassword, key).toString(CryptoJS.enc.Utf8);
        return decrypted;
    } catch (error) {
        console.error('Erro na descriptografia:', error);
        return '';
    }
}

/**
 * Função para criar o cookie de sessão do usuário
 * @param {ProfileProps} dataProfile - Dados do usuário
 * @returns {Promise<boolean>}
 */
export const createCookie = async (dataProfile:ProfileProps) => {
    try{
        //destroi algum cookie que tenha sido configurado antes.
        destroyCookie('coqueiralSite');

        const toString = JSON.stringify({
            ...dataProfile, 
            password: "",
            expires: Date.now() + 60 * 60 * 1000
        });
        const acessToken= encryptPassword(toString);

        sessionStorage.setItem("coqueiralSite", acessToken);
        return true;
    }catch(e){
        console.log(e);
        return false;
    }
}

/**
 * Função para verificar se o cookie de sessão do usuário existe, se existir ela retorna os dados do usuário
 * @returns {ProfileProps | boolean} - Retorna os dados do usuário ou false caso o cookie não exista
 */
export const getCookie = () => {
    const sessionData = sessionStorage.getItem("coqueiralSite");
    if(!sessionData){
        return false;
    }

    // Verificar a validade do cookie com base no maxAge
    const decrypt = decryptPassword(sessionData);

    const cookieData = JSON.parse(decrypt) as ProfileProps;
    const dataMatch = cookieData.expires ? Date.now() < cookieData.expires : false;

    if(!dataMatch){
        // Se o cookie expirou, remova-o e redirecione para a página de login
        destroyCookie('coqueiralSite');
        return false;
    }

    return cookieData;
}

/**
 * Função para destruir o cookie de sessão do usuário
 * @param {string} token - Token do cookie
 */
export const destroyCookie = (token:string) => {
    sessionStorage.removeItem(token)
}

/**
 * Função para calcular o tamanho de um arquivo em MB
 * @param {File} files - Arquivo a ser calculado
 * @returns {string}
 */
export const calcTotalFilesMB = (files:File)=>{
    // Função para converter bytes para megabytes
    const bytesToMegabytes = (bytes:number) => {
        return bytes / (1024 * 1024);
    };

    // Calcular o tamanho total em MB
    const totalSizeInMB = files.size;
    const formattedTotalSize = bytesToMegabytes(totalSizeInMB).toFixed(2);
    return formattedTotalSize;
}

/**
 * Função para verificar se uma string é uma URL válida
 * @param {string} string - Array de arquivos
 * @returns {boolean}
 */
export const isValidURL = (string: string): boolean => {
    // Regex para verificar URL
    const regex = /^(https?:\/\/|www\.)[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+.*$/;
    return regex.test(string);
};

/**
 * Função para verificar se uma string é um caminho relativo
 * @param {string} string - string a ser verificada
 * @returns {boolean}
 */
export const isRelativeURL = (string: string): boolean => {
    // Verifica se é um caminho relativo (começa com "/")
    return /^\/[a-zA-Z0-9-_.]+/.test(string);
};

/**
 * Função para verificar se uma string é um base64
 * @param {string} string - string a ser verificada
 * @returns {boolean}
 */
export const isBase64 = (string:string)=>{
    const verify = string.includes('base64');

    return verify;
}

/**
 * Função que retorna a data no formato "yyyy-mm-dd"
 * @param {Date | undefined} date - data a ser formatada
 * @returns {string}
 */
export function dateFormat1(date:Date | undefined){
    if(!date){
        return ''
    }
    else{
        // Garantir que o input seja um objeto Date
        date = typeof date === 'string' ? new Date(date) : date;

        // Extrair dia, mês e ano
        const dia = date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate();
        const mes = date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1; // Meses começam em 0
        const ano = date.getFullYear();    

        return `${ano}-${mes}-${dia}`;
    }
}

/**
 * Função que retorna a data no formato "dd/mm/yyyy"
 * @param {Date | undefined} date - data a ser formatada 
 * @returns {string}
 */
export function dateFormat2(date:Date | undefined){
    if(!date){
        return ''
    }
    else{
        // Garantir que o input seja um objeto Date
        date = typeof date === 'string' ? new Date(date) : date;

        // Extrair dia, mês e ano
        const dia = date.getDate() > 10 ? `0${date.getDate()}` : date.getDate();
        const mes = date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1; // Meses começam em 0
        const ano = date.getFullYear();    
        
        return `${dia}/${mes}/${ano}`;
    }
}

/**
 * Função que retorna a data no formato "dia do mês do ano"
 * @param {Date | undefined} input - data a ser formatada 
 * @returns {string}
 */
export function dateFormat3(input: Date | undefined): string {
    if (!input) {
        return '';
    }

    const monthNames = [
        'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
        'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];

    // Garantir que o input seja um objeto Date
    const date = typeof input === 'string' ? new Date(input) : input;

    // Extrair dia, mês e ano
    const dia = date.getDate();
    const mes = date.getMonth(); // Meses começam em 0
    const ano = date.getFullYear();

    return `${dia} de ${monthNames[mes]} de ${ano}`;
}

/**
 * Função que retorna a hora no formato hh:mm
 * @param {string} text - data a ser formatada 
 * @returns {string}
 */
export function formatToHourMin(text:string) {
    // Remove tudo que não é número
    const onlyNumbers = text.replace(/\D/g, "");

    // Garante que tenha no máximo 4 dígitos (HHMM)
    const trimmed = onlyNumbers.slice(0, 4);

    // Divide os números em hora e minutos
    const hours = trimmed.slice(0, 2);
    const minutes = trimmed.slice(2, 4);

    // Retorna o texto no formato HH:MM
    return hours + (minutes ? `:${minutes}` : "");
}

/**
 * Função que adiciona um tempo a um horário inicial
 * @param {string} initialTime 
 * @param {string} addedTime 
 * @returns hora inicial mais hora adicionada
 */
export function addTime(initialTime:string, addedTime:string) {
    // Verifica se o formato inicial está correto (HH:MM)
    const timePattern = /^(\d{1,2}):(\d{2})$/;
    const match = initialTime.match(timePattern);

    const matchAddTime = addedTime.match(timePattern);

    if (!match || !matchAddTime) {
        return {time: '', dayChange: 0}
    }

    // Extrai horas e minutos da string inicial
    const initialHours = parseInt(match[1], 10);
    const initialMinutes = parseInt(match[2], 10);

    const addHours = parseInt(matchAddTime[1], 10);
    const addMinutes = parseInt(matchAddTime[2], 10);

    // Converte tudo para minutos
    const totalMinutes = initialHours * 60 + initialMinutes + (addHours * 60 + addMinutes);

    // Converte minutos de volta para horas e minutos
    const totalHours = Math.floor(totalMinutes / 60);
    const resultHours = Math.floor(totalMinutes / 60) % 24; // Garantir que as horas fiquem dentro de 24
    const resultMinutes = totalMinutes % 60;

    // Calcula a mudança de dias
    const dayChange = Math.floor(totalHours / 24);

    // Formata o resultado com dois dígitos
    const formattedHours = String(resultHours).padStart(2, "0");
    const formattedMinutes = String(resultMinutes).padStart(2, "0");

    return {time: `${formattedHours}:${formattedMinutes}`, dayChange};
}

/**
 * Função que remove valores não numéricos de uma string e retorna uma string no formato de CEP
 * @param {string} v - texto a ser formatado 
 * @returns {string}
 */
export function maskcep(v:string){
    if(!v){return ''}
    
    v= v.replace(/\D/g,"")                
    v= v.replace(/^(\d{5})(\d)/,"$1-$2") 
    return v;
}

/**
 * Formata um número para o modelo de coordenadas geográficas.
 * @param {string} coord - coordenadas a ser formatada.
 * @returns {string}
 */
export function maskCoordenadas(coord:string) {
    const regex = /^-?\d+(\.\d+)?$/;
    
    const coordenada = coord.toString();
    if (regex.test(coordenada)) {
        // É uma coordenada válida
        return parseFloat(coordenada).toFixed(14); // Formata para 14 casas decimais
    } else {
        return "";
    }
}

/**
 * Função que busca dados de um endereco a partir de um CEP
 * @param {string} cep - texto a ser formatado 
 * @returns {Promise<CEP>}
 */
export async function getDadosCEP(cep:string):Promise<CEP> {
    const cepCleam = cleamText(cep);
    let data = {} as CEP;

    await axios.get(`https://viacep.com.br/ws/${cepCleam}/json/`)
    .then(resp => {
        data= resp.data;
    })
    .catch(err => {
        console.log(err);
        data= {} as CEP;
    })

    return data;
}

/**
 * Função que remove caracteres especiais de uma string
 * @param {string} value 
 * @returns {string} string sem caracteres especiais
 */
export function cleamText(value:string){
    if(!value){return ""}
    return value.replace(/[^a-zA-Z0-9]/g, "").toLowerCase().trim();
}

/**
 * Função que gera um slug a partir de um título
 * @param {string} titulo
 * @returns {string} slug
*/
export function gerarSlug(titulo:string) {
    return titulo
        .toLowerCase() // Converte para minúsculas
        .normalize("NFD") // Separa acentos de letras (ex: "ç" -> "c", "á" -> "a")
        .replace(/[\u0300-\u036f]/g, "") // Remove os acentos
        .replace(/[^a-z0-9\s-]/g, "") // Remove caracteres especiais (exceto espaços e "-")
        .replace(/\s+/g, "-") // Substitui espaços por "-"
        .replace(/-+/g, "-") // Remove múltiplos "-"
        .trim(); // Remove espaços extras no início e no final
}

/**
 * Função que verifica se uma string contém apenas números
 * @param {string} str 
 * @returns {boolean}
 */
export function temApenasNumeros(str:string) {
    // Testa se a string contém apenas números
    return /^\d+$/.test(str);
}

/**
 * Função que formata uma string para o formato de moeda
 * @param {string | number} value 
 * @returns {boolean} string formatada
 */
export function maskMoeda(value:string | number) {
    if(!value) {return "0"}
    let v = '';
    
    if(typeof value !== "string") {
        v = value.toFixed(2)
    }else{
        v = removeCifrao(value).replace(/\D/g,"");  
    }

    v =  v.replace(/(\d+)(\d{2})$/, "$1,$2");
    v =  v.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    
    return  "R$ " + v;
}

/**
 * Função que remove o cifrão de uma string
 * @param {string} str 
 * @returns {string} string sem o cifrão
 */
export function removeCifrao(str:string) { 
    if(!str) return "0";
    if(typeof str !== "string") return "0";
    
    // Remove tudo que não for número, ponto ou vírgula
    const numeros = str.replace(/[^0-9.,]/g, '');

    if(isNaN(parseFloat(numeros))) return "0";

    // Substitui a vírgula por ponto para formar um número válido
    const numerosFormatados = numeros.replace(/^R\$\s*/, '');
    return numerosFormatados;
}

/**
 * Função que formata uma string para o formato de telefone
 * @param {string} v 
 * @returns {string} string formatada
 */
export function masktel(v:string){
    if(!v){return ""}
    v= v.replace(/\D/g,"");
    v= v.replace(/^(\d{2})(\d)/g,"($1) $2");
    v= v.replace(/(\d)(\d{4})$/,"$1-$2");
    return v;
}

/**
 * Função que retorna um icone de acordo com a rede social
 * @param {string} link 
 * @returns {JSX.Element | undefined} icone da rede social
 */
export function setIconSocialMidia(link:string){
    if(!link) return;
    if(link.includes('facebook')){
        return <FaFacebook size={24}/>
    }else if(link.includes('instagram')){
        return <FaInstagram size={24}/>
    }else if(link.includes('tiktok')){
        return <FaTiktok size={24}/>
    }else{
        return <FaGlobe size={24}/> 
    }
}

/**
 * Função que retorna a cor de acordo com o nivel de risco
 * @param {number | undefined} nivelRisco 
 * @returns {string} cor
 */
export const setColor = (nivelRisco: number | undefined)=>{
    if(nivelRisco === undefined) return '';

    if(nivelRisco >= 0 && nivelRisco < 4){
        return 'green';
    }else if(nivelRisco > 3 && nivelRisco < 8){
        return 'yellow';
    }else if(nivelRisco > 7 && nivelRisco < 13){
        return 'orange';
    }else{
        return 'red';
    }
}

/**
 * Função que verifica se a string é uma URL válida ou um ID do google drive
 * @param {DataNews} dataNews 
 * @returns {string} url da imagem
 */
export const handleTypeUrl = (dataNews:DataNews)=>{
    if(typeof dataNews.imageID === 'string') {
        return isBase64(dataNews.imageID) || isValidURL(dataNews.imageID) || isRelativeURL(dataNews.imageID) ? dataNews.imageID : `https://drive.google.com/uc?export=download&id=${dataNews.imageID}`
    }else {
        return isBase64(dataNews.imageID[0]) || isValidURL(dataNews.imageID[0]) || isRelativeURL(dataNews.imageID[0]) ? dataNews.imageID[0] : `https://drive.google.com/uc?export=download&id=${dataNews.imageID[0]}`
    }
}

/**
 * Função que verifica se a string é uma URL válida ou um ID do google drive
 * @param {string} urlID 
 * @returns {string} url da imagem
 */
export const handleUrl = (urlID:string)=>{
    return isBase64(urlID) || isValidURL(urlID) || isRelativeURL(urlID) ? urlID : `https://drive.google.com/uc?export=download&id=${urlID}`

}

/**
 * Função que verifica se a string é uma URL do google storage e retorna o bucketName e o filePath
 * @param {string} urlID 
 * @returns {{bucketName: string; filePath: string;}} bucketName e o filePath
 */
export const parseGoogleStorageUrl = (url: string) => {
    const baseUrl = "https://storage.googleapis.com/";
    if (!url.startsWith(baseUrl)) {
      throw new Error("A URL fornecida não é uma URL válida do Google Cloud Storage.");
    }
  
    const relativePath = url.replace(baseUrl, ""); // Remove a parte base da URL
    const [bucketName, ...filePathParts] = relativePath.split("/"); // Divide o caminho pelo "/"
    const filePath = filePathParts.join("/"); // Junta o restante como o `filePath`
  
    return { bucketName, filePath };
};

/**
 * Função que assina uma URL do Google Cloud Storage
 * @param {string} fileUrl - URL pública do arquivo mp google storage a ser assinado
 * @returns {Promise<string | undefined>} URL assinada
 */
export const signedURL = async(fileUrl:string)=>{
    if(isBase64(fileUrl)){
        return fileUrl;
    }

    try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_SERVICES}`,{
            params: {
                service: 'getUrlKey',
                fileUrl: fileUrl,
                expiresInMs: 2
            },
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTORIZATION}`
            }
        });

        const data = response.data.url as string

        if(!data) throw new Error("Erro ao assinar URL");

        return data;
    }catch(error){
        if (axios.isAxiosError(error)) {
            // Se o erro for gerado pelo Axios
            console.error("Erro Axios:", error.response?.data || error.message);
            
            // Capturando os detalhes da resposta
            if (error.response) {
                console.error("Status:", error.response.status);
                console.error("Dados:", error.response.data);
            }
        } else {
            // Se for outro tipo de erro
            console.error("Erro inesperado:", error);
        }

        console.log("Ocorreu um erro ao tentar assinar URLs", fileUrl)
    }
}

/**
 * Converte a primeira página no PDF para imagem Base64
*/
export const pdfToImageBase64 = async (file: File): Promise<string> => {
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

/**
 * Converte arquivos não PDF para Base64
 * @param {File} file - Arquivo a ser convertido
 * @returns {string} - Arquivo convertido para Base64
*/
export const fileToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);

    reader.readAsDataURL(file);
    });
};


// export const verifyObjSAAE = (objetoOriginal: SAAE, objetoEditado: SAAE)=>{
//     const keysOriginal = Object.keys(objetoOriginal) as (keyof SAAE)[];
//     const keysEditado = Object.keys(objetoEditado) as (keyof SAAE)[];

//     const fieldObjetos:(keyof SAAE)[] = [];

//     //verifica se existe fields no objeto editado que não existe no original.
//     if(keysEditado.length > keysOriginal.length){
//         keysEditado.forEach(k=>{
//             const verify = JSON.stringify(objetoEditado[k]) !== JSON.stringify(objetoOriginal[k]);
//             if(verify) fieldObjetos.push(k);
//         })
//     //verifica se existe fields no objeto original que não existe no editado.
//     //ou se ambos os objetos são do mesmo tamanho.
//     }else {
//         keysOriginal.forEach(k=>{
//             const verify = JSON.stringify(objetoOriginal[k]) !== JSON.stringify(objetoEditado[k]);
//             if(verify) fieldObjetos.push(k);
//         })
//     }

//     const fieldsArray:{
//         field: keyof SAAE, 
//         value: InfosPreliminaresSaae | InventarioSaaeType | FormFotosInspecao | FormDocs,
//         idx: number
//     }[] = [];
//     const fieldsObject:{
//         field: keyof SAAE,
//         rotulo?: keyof ProfileProps | keyof GrauRisco | keyof DadosGeraisSaae | keyof PlanoEmergenciaSaae,
//         value?: unknown
//     }[] = [];
//     const fieldsStrings: {
//         field: string,
//         value: string
//     }[]= [];

//     if(fieldObjetos.length > 0){
//         for (const key of fieldObjetos) {  
//             //se o objeto editado não for válido, a gente remove todo o 
//             //conteudo do objeto original.
//             if(!objetoEditado[key]){
//                 fieldsObject.push({
//                     field: key,
//                     rotulo: undefined,
//                     value: undefined
//                 })
//             }
//             //verifica se o field é um array 
//             //como por exemplo InfosPreliminaresSaae[], InventarioSaaeType[], FormFotosInspecao[] e FormDocs[]);
//             else if(Array.isArray(objetoEditado[key])){ 
//                 if(Array.isArray(objetoOriginal[key])){       
//                     //se o field editado for maior que o original
//                     if(objetoEditado[key].length > objetoOriginal[key].length){
//                         //verifica se o field é um array 
//                         //como por exemplo InfosPreliminares[], InventarioSaaeType[], FormFotosInspecao[] e FormDocs[]);
//                         objetoEditado[key]?.forEach((item, idx)=>{
//                             //verificação para garantir que o objeto original é um objeto válido para o tipo que estamos verificando.
//                             if(Array.isArray(objetoOriginal[key])){
//                                 const verify = JSON.stringify(objetoOriginal[key][idx]) === JSON.stringify(item) ? true : false ;
                                
//                                 // se existe algum valor diferente entre o objeto editado e o original, ele é incluído no array.
//                                 if(!verify){ 
//                                     fieldsArray.push({field: key, value: item, idx})
//                                 }
//                             }
//                         });
//                     }
//                     //se o field original for maior que o editado      
//                     //ou se ambos são do mesmo tamanho
//                     else{
//                         //verifica se o field é um array 
//                         //como por exemplo InfosPreliminares[], InventarioSaaeType[], FormFotosInspecao[] e FormDocs[]);
//                         objetoOriginal[key]?.forEach((item, idx)=>{
//                             //verificação para garantir que o objeto original é um objeto válido para o tipo que estamos verificando.
//                             if(Array.isArray(objetoEditado[key])){
//                                 const verify = JSON.stringify(objetoEditado[key][idx]) === JSON.stringify(item) ? true : false ;
                                
//                                 // se existe algum valor diferente entre o objeto editado e o original, ele é incluído no array.
//                                 if(!verify){ 
//                                     fieldsArray.push({field: key, value: item, idx})
//                                 }
//                             }
//                         });
//                     }
//                 }else{
//                     //se o objeto original não for um array, logo ele não é válido
//                     //então deve ser populado com todas as alterações do objeto editado.
//                     objetoEditado[key]?.forEach((item, idx)=>{
//                         fieldsArray.push({field: key, value: item, idx})
//                     });
//                 }
//             }
//             //lida com os casos que o objeto editado é uma instancia dos tipos 
//             // ProfileProps | GrauRisco | DadosGeraisSaae | PlanoEmergenciaSaae
//             else if(typeof objetoEditado[key] === 'object'){
//                 const countFieldsEditado = objetoEditado[key] ? Object.keys(objetoEditado[key]) as (keyof ProfileProps | keyof GrauRisco | keyof DadosGeraisSaae | keyof PlanoEmergenciaSaae)[] : [];
//                 const countFieldsOriginal = objetoEditado[key] ? Object.keys(objetoEditado[key]) as (keyof ProfileProps | keyof GrauRisco | keyof DadosGeraisSaae | keyof PlanoEmergenciaSaae)[] : [];

//                 if(countFieldsEditado.length > countFieldsOriginal.length){
//                     console.log("entrou no editado > original")
//                     countFieldsEditado?.forEach((field)=> {
//                         if(objetoOriginal[key]){
//                             const verify = JSON.stringify(objetoOriginal[key][field]) === JSON.stringify(objetoEditado[key]?.[field]) ? true : false ;
                                        
//                             // se existe algum valor diferente entre o objeto editado e o original, ele é incluído no array.
//                             if(!verify){ 
//                                 fieldsObject.push({
//                                     field: key,
//                                     rotulo: field,
//                                     value: objetoEditado[key]?.[field], 
//                                 })
//                             }
//                         }
//                         //se o objeto original não for válido, a gente adiciona todo o 
//                         //conteudo do objeto editado nele.
//                         else{
//                             fieldsObject.push({
//                                 field: key,
//                                 rotulo: field,
//                                 value: objetoEditado[key]?.[field]
//                             })
//                         }
//                     })
//                 }else{
//                     console.log("entrou no original >= editado");
//                     countFieldsOriginal?.forEach((field)=> {
//                         if(objetoOriginal[key]){
//                             const verify = JSON.stringify(objetoOriginal[key][field]) === JSON.stringify(objetoEditado[key]?.[field]) ? true : false ;
                                    
//                             // se existe algum valor diferente entre o objeto editado e o original, ele é incluído no array.
//                             if(!verify){ 
//                                 fieldsObject.push({
//                                     field: key,
//                                     rotulo: field,
//                                     value: objetoEditado[key]?.[field]
//                                 })
//                             }
//                         }
//                     })
//                 }
//             }
//             else if(typeof objetoEditado[key] === 'string'){
//                 const verify = objetoOriginal[key] === objetoEditado[key] ? true : false ;
                                    
//                 // se existe algum valor diferente entre o objeto editado e o original, ele é incluído no array.
//                 if(!verify){ 
//                     fieldsStrings.push({
//                         field: key,
//                         value: objetoEditado[key] 
//                     })
//                 }
//             }
//         }
//     }

//     return {fieldsArray, fieldsObject, fieldsStrings}
// }

/**
 * Verifica as alterações entre dois objetos SAAE e retorna um update formatado
 * @param {SAAE} objetoOriginal - Objeto original antes da edição
 * @param {SAAE} objetoEditado - Objeto editado
 * @returns {Record<string, any>} - Objeto de update formatado para o MongoDB
 */
export const verifyObjSAAE = (objetoOriginal: SAAE, objetoEditado: SAAE): Record<string, unknown> => {
    const update: Record<string, unknown> = {};
    
    for (const key of Object.keys(objetoEditado) as (keyof SAAE)[]) {
        const originalValue = objetoOriginal[key];
        const editedValue = objetoEditado[key];
        
        if (JSON.stringify(originalValue) === JSON.stringify(editedValue)) {
            continue; // Se os valores são iguais, não precisa atualizar
        }
        
        if (editedValue === undefined) {
            update.$unset = update.$unset || {};
            update.$unset[key] = "";
        } else if (Array.isArray(editedValue)) {
            // Verificar adições, remoções e edições no array
            const originalArray = Array.isArray(originalValue) ? originalValue : [];
            const addedItems = editedValue.filter(item => !originalArray.some(orig => JSON.stringify(orig) === JSON.stringify(item)));
            const removedItems = originalArray.filter(item => !editedValue.some(edit => JSON.stringify(edit) === JSON.stringify(item)));
            
            if (addedItems.length > 0) {
                update.$push = update.$push || {};
                update.$push[key] = { $each: addedItems };
            }
            if (removedItems.length > 0) {
                update.$pull = update.$pull || {};
                update.$pull[key] = { $in: removedItems };
            }
        } else if (typeof editedValue === 'object' && editedValue !== null) {
            // Verificar alterações dentro de objetos aninhados
            for (const subKey of Object.keys(editedValue) as string[]) {
                if (JSON.stringify(originalValue?.[subKey]) !== JSON.stringify(editedValue[subKey])) {
                    update.$set = update.$set || {};
                    update.$set[`${key}.${subKey}`] = editedValue[subKey];
                }
            }
        } else {
            // Para valores primitivos (string, number, boolean)
            update.$set = update.$set || {};
            update.$set[key] = editedValue;
        }
    }
    update.$set['status'] = 'enviada';

    return update;
};

/**
 * Preprara e envia um componente parar impressão.
 * @param {SAAE | InfosPreliminaresSaae[]} data - Componente a ser enviado para impressão.
 * @param {'print-data-infosPreliminares' | 'print-dat'} field - rótulo que identifica qual componente está sendo impresso.
 */
export const printComponent = (
    data: SAAE | InfosPreliminaresSaae[], 
    field: 'print-data-infosPreliminares' | "print-data") => {
    //limpa antes de armazenar outros dados.
    localStorage.clear()

    // Salva os dados no localStorage
    localStorage.setItem(field, JSON.stringify(data));

    // Abre a página de impressão
    const url = ()=>{
        if(field === 'print-data-infosPreliminares')
            return "/administrativo/area-restrita/printer/infosPreliminares";
        else return "/administrativo/area-restrita/printer/resumoSaae";
    }
    window.open(url(), "_blank");
};


export const adressToString = (adress?:Endereco)=>{
    if(!adress) return '';

    return `${adress.logradouro || ''}, ${adress.bairro || ''}, ${adress.municipio || ''}, ${adress.municipio || ''}, ${adress.cep || ''}`
}


