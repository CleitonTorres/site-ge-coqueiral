import { DataNews, ResponseRecaptcha } from "@/@types/types";
import { closeDatabase, connectToDatabase } from "@/scripts/connectDB";
import axios from "axios";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function GET(req: NextRequest) {
    // Parseando os parâmetros da URL (query params)
    const url = new URL(req.url); // Cria uma URL para extrair os parâmetros
    const service = url.searchParams.get("service") as "me" | "users" | "news";

    if(service === 'news'){
        const db = await connectToDatabase(process.env.NEXT_PUBLIC_URL_MONGO, "/api/news"); 
        const collection = db.collection('news');
    
        const data = collection.find({});
        const news = await data.toArray()
    
        //fecha o DB.
        closeDatabase();

        return NextResponse.json({news}, {status: 200});         
    }else{
        return NextResponse.json({ error: "Requisição não reconhecida." }, { status: 405 });
    }
}

export async function POST(req: NextRequest) {
    const authorization = req.headers.get('Authorization');
    const matchAuth = authorization === `Bearer ${process.env.NEXT_PUBLIC_AUTORIZATION}`
    
    if (!matchAuth) {
        return NextResponse.json({ error: 'Acess Token inválido' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const service = body.service as string;
        const news = body.news as DataNews;
        const token = body.token as string;

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
        }if (service === 'news'){
            if(!news){
                return NextResponse.json({error: "Sem dados na requisição"}, {status: 500});
            }

            // Conectando ao banco de dados
            const db = await connectToDatabase(process.env.NEXT_PUBLIC_URL_MONGO, "/api/postUser");
            const collection = db.collection('news');

            const resp = await collection.insertOne({...news, _id: new ObjectId()});

            return NextResponse.json(resp, {status: 200});
        }else{
            return NextResponse.json({error: "Metodo não reconhecido"}, {status: 405});
        }
    }catch(e){
        console.log(e)
        return NextResponse.json({error: "erro na requisição"}, {status: 405});
    }
}