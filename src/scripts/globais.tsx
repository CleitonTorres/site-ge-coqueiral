import { ProfileProps } from "@/@types/types";
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