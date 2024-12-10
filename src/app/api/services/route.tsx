import { DataNews, ResponseRecaptcha } from "@/@types/types";
import { closeDatabase, connectToDatabase } from "@/scripts/connectDB";
import axios from "axios";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { MessageContent } from "openai/resources/beta/threads/messages.mjs";
// import { zodResponseFormat } from "openai/helpers/zod";
// import { z } from "zod";

export const config = {
    api: {
        bodyParser: false,
    },
};

// const responseIADataAtividade = z.object({
//     perigo: z.string(),
//     danos: z.string(),
//     controleOperacional: z.string(),
//     acoesMitigadoras: z.string()
// });

// const responseIA = z.object({
//     atividade: z.string(),
//     dados: z.array(responseIADataAtividade)    
// });

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
            console.log("key", process.env.NEXT_PUBLIC_GPT_API_KEY);
            const openai = new OpenAI({
                apiKey: `${process.env.NEXT_PUBLIC_GPT_API_KEY}`
            });

            // const assistant = await openai.beta.assistants.create({
            //     name: "Mathias",
            //     instructions: `Você é um assistente que vai auxiliar no preenchimento de uma tabela de controle operacional de riscos. O usuário vai te passar um tipo de atividade ao ar livre e você vai sugerir prováveis riscos, quais danos esses riscos pode causar, prováveis medidas de controle operacional (que evita que o risco aconteça) e sugerir ações mitigadoras (caso algum dos danos ocorra). Você deve formatar a resposta com as seguintes chaves:

            //     {
            //         atividade: "nome da atividade",
            //         dados: [
            //             {
            //                 perigo: "nome do risco identificado",
            //                 dano: "descrições dos riscos identificados",
            //                 controleOperacional: "medidas para evitar o risco",
            //                 acoesMitigadoras: "ações caso o risco aconteça"
            //             }
            //         ]
            //     }`,
            //     model: "gpt-4o-mini-2024-07-18",
            //     response_format: {
            //         type: "json_schema",
            //         json_schema:{
            //             "name": "risco_operacional",
            //             "schema": {
            //               "type": "object",
            //               "properties": {
            //                 "atividade": {
            //                   "type": "string",
            //                   "description": "Nome da atividade ao ar livre."
            //                 },
            //                 "dados": {
            //                   "type": "array",
            //                   "description": "Lista de riscos identificados associados à atividade.",
            //                   "items": {
            //                     "type": "object",
            //                     "properties": {
            //                       "perigo": {
            //                         "type": "string",
            //                         "description": "Nome do risco identificado."
            //                       },
            //                       "dano": {
            //                         "type": "string",
            //                         "description": "Descrição dos danos que podem ser causados pelo risco."
            //                       },
            //                       "controleOperacional": {
            //                         "type": "string",
            //                         "description": "Medidas específicas para evitar que o risco aconteça."
            //                       },
            //                       "acoesMitigadoras": {
            //                         "type": "string",
            //                         "description": "Ações a serem tomadas caso o risco venha a acontecer."
            //                       }
            //                     },
            //                     "required": [
            //                       "perigo",
            //                       "dano",
            //                       "controleOperacional",
            //                       "acoesMitigadoras"
            //                     ],
            //                     "additionalProperties": false
            //                   }
            //                 }
            //               },
            //               "required": [
            //                 "atividade",
            //                 "dados"
            //               ],
            //               "additionalProperties": false
            //             },
            //             "strict": true
            //           }
            //     },
            // });
            
            const assistantSenior = await openai.beta.assistants.retrieve('asst_tvaWDeASyjtUX2uEsIXaZPVL');

            //const project = openai.apiKey;
            //console.log('Acessando o projeto:', project);

            // Criação de thread
            const thread = await openai.beta.threads.create();
            
            const message = await openai.beta.threads.messages.create(thread.id, {
                role: "user",
                content: `Me dê os dados de controle de risco para a seguinte atividade: "${input}". A resposta deve ser formatada como JSON.`,
            });
            
            console.log("Mensagem enviada:", message.id);
            
            // Executa e aguarda a resposta
            const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
                assistant_id: assistantSenior.id,
                instructions: "Me forneça uma atividade para que eu possa gerar a resposta em formato JSON.",
            });
            
            if (run.status === "completed") {
                const messages = await openai.beta.threads.messages.list(run.thread_id);
                let data:MessageContent[] = []
                for (const mes of messages.data.reverse()) {
                    if(mes.role === "assistant"){
                        //console.log(`${mes.role}:`, JSON.stringify(mes.content));
                        const resp  = mes.content[0] as unknown as {type: string, text:{value: string}};
                        data = JSON.parse(resp.text.value)               
                    }
                }

                return NextResponse.json(data, {status: 200});
            } else {
                console.log("Status:", run.status);
                console.log("Run Details:", run.last_error);
                return NextResponse.json({error: "Ocorreu uma falha no processamento"}, {status: 500});
            }
        }else{
            return NextResponse.json({error: "Metodo não reconhecido"}, {status: 500});
        }
    }catch(e){
        console.log(e)
        return NextResponse.json({error: "erro na requisição"}, {status: 405});
    }
}