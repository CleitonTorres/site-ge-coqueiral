import { ResponseRecaptcha } from "@/@types/types";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const authorization = req.headers.get('Authorization');
    const matchAuth = authorization === `Bearer ${process.env.NEXT_PUBLIC_AUTORIZATION}`
    
    if (!matchAuth) {
        return NextResponse.json({ error: 'Acess Token inválido' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const {token, service} = body as {token:string, service: string};        
        
        if(service === 'recatptcha'){
            const response = await axios.post('https://www.google.com/recaptcha/api/siteverify',
                `secret=${process.env.NEXT_PUBLIC_RECATCHA_SECRET_KEY}&response=${token}`
            );
            if(response && response.data){
                const data = response.data as ResponseRecaptcha;
                return NextResponse.json(data, {status: 200})
            }else{
                throw new Error("erro ao tentar autenticar Recaptcha");
            }
        }else{
            return NextResponse.json({error: "Metodo não reconhecido"}, {status: 500});
        }
    }catch(e){
        console.log(e)
        return NextResponse.json({error: "erro ao tentar autenticar Recaptcha"}, {status: 500});
    }
}