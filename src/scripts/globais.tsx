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
};

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
};
export const destroyCookie = (token:string) => {
    sessionStorage.removeItem(token)
}