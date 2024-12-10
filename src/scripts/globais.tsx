import { CEP, ProfileProps } from "@/@types/types";
import axios from "axios";
import CryptoJS from "crypto-js";

// Função para criptografar a senha
export const encryptPassword = (password:string)=> {
    const key = `${process.env.NEXT_PUBLIC_TOKEN_APP}`; // Chave para a criptografia
    const encrypted = CryptoJS.AES.encrypt(password, key).toString();

    return encrypted;
}
// Função para descriptografar a senha
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

export const destroyCookie = (token:string) => {
    sessionStorage.removeItem(token)
}

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
export const isValidURL = (string: string): boolean => {
    // Regex para verificar URL
    const regex = /^(https?:\/\/|www\.)[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+.*$/;
    return regex.test(string);
};

export const isRelativeURL = (string: string): boolean => {
    // Verifica se é um caminho relativo (começa com "/")
    return /^\/[a-zA-Z0-9-_.]+/.test(string);
};

export const isBase64 = (string:string)=>{
    const verify = string.includes('base64');

    return verify;
}

//data de saída aaaa-mm-dd
export function dateFormat1(date:Date | undefined){
    if(!date){
        return ''
    }
    else{
        // Garantir que o input seja um objeto Date
        date = typeof date === 'string' ? new Date(date) : date;

        // Extrair dia, mês e ano
        const dia = date.getUTCDate();
        const mes = date.getMonth()+1; // Meses começam em 0
        const ano = date.getFullYear();    

        return `${ano}-${mes}-${dia}`;
    }
}

//data de saída dd/mm/aaaa
export function dateFormat2(date:Date | undefined){
    if(!date){
        return ''
    }
    else{
        // Garantir que o input seja um objeto Date
        date = typeof date === 'string' ? new Date(date) : date;

        // Extrair dia, mês e ano
        const dia = date.getDate();
        const mes = date.getMonth()+1; // Meses começam em 0
        const ano = date.getFullYear();    

        return `${dia}/${mes}/${ano}`;
    }
}

// Formatar data no formato "22 de fevereiro de 2024"
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

export function addTime(initialTime:string, addedTime:string) {
    // Verifica se o formato inicial está correto (HH:MM)
    const timePattern = /^(\d{1,2}):(\d{2})$/;
    const match = initialTime.match(timePattern);

    const matchAddTime = addedTime.match(timePattern);

    if (!match || !matchAddTime) {
        return ''
    }

    // Extrai horas e minutos da string inicial
    const initialHours = parseInt(match[1], 10);
    const initialMinutes = parseInt(match[2], 10);

    const addHours = parseInt(matchAddTime[1], 10);
    const addMinutes = parseInt(matchAddTime[2], 10);

    // Converte tudo para minutos
    const totalMinutes = initialHours * 60 + initialMinutes + (addHours * 60 + addMinutes);

    // Converte minutos de volta para horas e minutos
    const resultHours = Math.floor(totalMinutes / 60) % 24; // Garantir que as horas fiquem dentro de 24
    const resultMinutes = totalMinutes % 60;

    // Formata o resultado com dois dígitos
    const formattedHours = String(resultHours).padStart(2, "0");
    const formattedMinutes = String(resultMinutes).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
}

export function maskcep(v:string){
    if(!v){return ''}
    
    v= v.replace(/\D/g,"")                
    v= v.replace(/^(\d{5})(\d)/,"$1-$2") 
    return v;
}

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

export function cleamText(value:string){
    if(!value){return ""}
    return value.replace(/[^a-zA-Z0-9]/g, "").toLowerCase().trim();
}

export function temApenasNumeros(str:string) {
    // Testa se a string contém apenas números
    return /^\d+$/.test(str);
}

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

export function masktel(v:string){
    if(!v){return ""}
    v= v.replace(/\D/g,"");
    v= v.replace(/^(\d{2})(\d)/g,"($1) $2");
    v= v.replace(/(\d)(\d{4})$/,"$1-$2");
    return v;
}