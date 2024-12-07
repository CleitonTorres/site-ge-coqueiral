import { DataNews, ResponseRecaptcha } from "@/@types/types";
import { closeDatabase, connectToDatabase } from "@/scripts/connectDB";
import axios from "axios";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

export const config = {
    api: {
        bodyParser: false,
    },
};

const responseIADataAtividade = z.object({
    perigo: z.string(),
    danos: z.string(),
    controleOperacional: z.string(),
    acoesMitigadoras: z.string()
});

const responseIA = z.object({
    atividade: z.string(),
    dados: z.array(responseIADataAtividade)    
});

const getInstagramFeed = async (limit?:string) => {
  const url = limit ? `${process.env.NEXT_PUBLIC_INSTAGRAM_API_URL}/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&limit=${limit}&access_token=${process.env.NEXT_PUBLIC_TOKEN_INSTA}` :
   `${process.env.NEXT_PUBLIC_INSTAGRAM_API_URL}/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${process.env.NEXT_PUBLIC_TOKEN_INSTA}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Erro ao buscar o feed do Instagram');
  }

  return response.json();
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
        const limit = body.limit as string;
        const input = body.input as string;

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
        }else if (service === 'news'){
            if(!news){
                return NextResponse.json({error: "Sem dados na requisição"}, {status: 500});
            }

            // Conectando ao banco de dados
            const db = await connectToDatabase(process.env.NEXT_PUBLIC_URL_MONGO, "/api/postUser");
            const collection = db.collection('news');

            const resp = await collection.insertOne({...news, _id: new ObjectId()});

            return NextResponse.json(resp, {status: 200});
        }else if(service === 'feedInsta'){
            try{
                const feed = await getInstagramFeed(limit);
                return NextResponse.json(feed, {status: 200});
            }catch(error){
                console.log(error);
                return NextResponse.json({error: "Não foi possivel receber o feed"}, {status: 500});
            }
        }else if(service === 'iaSaae'){
            // Consultando a API do ChatGPT
            const openai = new OpenAI({
                apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
            });
            const completion = await openai.beta.chat.completions.parse({
                model: "gpt-4o-mini-2024-07-18",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    {
                        role: "user",
                        content: `Para a atividade "${input}", providencie as seguintes informações:\n1. Perigos (perigo),\n2. Danos (danos),\n3. Controle operacional (controleOperacional),\n4. Ações mitigadoras (acoesMitigadoras).`,
                    },
                ],
                response_format: zodResponseFormat(responseIA, "event"),
            })
            
            const event = completion.choices[0].message.parsed;
            return NextResponse.json(event, {status: 200});

        }else{
            return NextResponse.json({error: "Metodo não reconhecido"}, {status: 500});
        }
    }catch(e){
        console.log(e)
        return NextResponse.json({error: "erro na requisição"}, {status: 405});
    }
}