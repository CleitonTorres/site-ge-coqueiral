import { DataNews, ResponseRecaptcha } from "@/@types/types";
import { closeDatabase, connectToDatabase } from "@/scripts/connectDB";
import axios from "axios";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";
import { parseGoogleStorageUrl } from "@/scripts/globais";

import { BodyEmail, newSAAEEmail } from "@/components/emailTemplates/newSaae";
import util from 'util';
import nodemailer from 'nodemailer';

// Configurar o transporte SMTP para o seu provedor de e-mail
const transporter = nodemailer.createTransport({
    host: `${process.env.NEXT_PUBLIC_EMAIL_HOST}`,
    port: 465, // Porta SMTP padrão (pode variar, consulte as configurações do seu provedor)
    secure: true, // true para SSL, false para STARTTLS
    auth: {
      user: 'gep@paralegalsolucoes.com.br',
      pass: process.env.NEXT_PUBLIC_PASS_EMAIL_GEP,
    },
});

interface ServiceAccountCredentials {
    type: string;
    project_id: string;
    private_key_id: string;
    private_key: string;
    client_email: string;
    client_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    client_x509_cert_url: string;
}

const credentials = {
    type: `${process.env.NEXT_PUBLIC_TYPE}`,
    project_id: `${process.env.NEXT_PUBLIC_PROJECT_ID}`,
    private_key_id: `${process.env.NEXT_PUBLIC_PRIVATE_KEY_ID}`,
    private_key: process.env.NEXT_PUBLIC_PRIVATE_KEY?.split(String.raw`\n`).join('\n'),
    client_email: `${process.env.NEXT_PUBLIC_CLIENT_EMAIL}`,
    client_id: `${process.env.NEXT_PUBLIC_CLIENT_ID}`,
    auth_uri: `${process.env.NEXT_PUBLIC_AUTH_URI}`,
    token_uri: `${process.env.NEXT_PUBLIC_TOKEN_URI}`,
    auth_provider_x509_cert_url: `${process.env.NEXT_PUBLIC_AUTH_PROVIDER}`,
    client_x509_cert_url: `${process.env.NEXT_PUBLIC_CLIENT_CERT}`,
    universe_domain: `${process.env.NEXT_PUBLIC_UNIVERSE_DOMAIN}`
} as ServiceAccountCredentials;

export const config = {
    api: {
        bodyParser: false,
    },
};

const getInstagramFeed = async (limit?:string) => {
  const url = limit ? 
    `${process.env.NEXT_PUBLIC_INSTAGRAM_API_URL}/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&limit=${limit}&access_token=${process.env.NEXT_PUBLIC_TOKEN_INSTA}` :
   `${process.env.NEXT_PUBLIC_INSTAGRAM_API_URL}/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${process.env.NEXT_PUBLIC_TOKEN_INSTA}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    console.log("response", response);
    throw new Error('Erro ao buscar o feed do Instagram');
  }

  return response.json();
};


export async function GET(req: NextRequest) {
    const authorization = req.headers.get('Authorization');
    const matchAuth = authorization === `Bearer ${process.env.NEXT_PUBLIC_AUTORIZATION}`
    
    if (!matchAuth) {
        return NextResponse.json({ error: 'Acess Token inválido' }, { status: 401 });
    }
    
    // Parseando os parâmetros da URL (query params)
    const url = new URL(req.url); // Cria uma URL para extrair os parâmetros
    const service = url.searchParams.get("service") as "me" | "users" | "news" | 'getSaae' | 'getUrlKey' 
    | 'printPDF' | 'proxyPDF' | 'sendEmail';
    const slug = url.searchParams.get('slug') as string;

    if(service === 'news'){
        if(slug){
            const db = await connectToDatabase(process.env.NEXT_PUBLIC_URL_MONGO, "/api/news"); 
            const collection = db.collection('news');
        
            const data = collection.findOne({slug:slug});
            const news = await data;
            
            //fecha o DB.
            closeDatabase();

            return NextResponse.json({news}, {status: 200});
        }

        const db = await connectToDatabase(process.env.NEXT_PUBLIC_URL_MONGO, "/api/news"); 
        const collection = db.collection('news');
    
        const data = collection.find({});
        const news = await data.toArray()
        

        //fecha o DB.
        closeDatabase();

        return NextResponse.json({news}, {status: 200});         
    }else if(service === 'getSaae'){
        const db = await connectToDatabase(process.env.NEXT_PUBLIC_URL_MONGO, "/api/getSaae"); 
        const collection = db.collection('saae');
    
        const data = collection.find({});
        const saaes = await data.toArray()
    
        //fecha o DB.
        closeDatabase();

        return NextResponse.json({saaes}, {status: 200});         
    }else if(service === 'getUrlKey'){
        const fileUrl = url.searchParams.get('fileUrl');
        const expiresInMs: number= parseInt(url.searchParams.get('expiresIn') || '1') * 60 * 60 * 1000

        try {

            if(!fileUrl) {
                throw new Error("URL não informada");
            }

            const storage = new Storage({
              credentials: credentials,
              projectId: "ge-coqueiral-1732713383827",
            });
        
            const {bucketName, filePath} = parseGoogleStorageUrl(fileUrl);
            const [url] = await storage
              .bucket(bucketName)
              .file(filePath)
              .getSignedUrl({
                action: 'read', // Ação permitida
                expires: Date.now() + expiresInMs, // Tempo de expiração
            });
        
            return NextResponse.json({url}, { status: 200 });
          } catch (err) {
            console.error('Erro ao gerar Signed URL:', err);
            throw err;
          }
    }else if (service === 'proxyPDF') {
        const fileUrl = url.searchParams.get('fileUrl');
    
        try {
            if (!fileUrl) {
                throw new Error("URL não informada");
            }
    
            const response = await fetch(fileUrl);
    
            if (!response.ok) {
                throw new Error('Erro ao buscar o PDF.');
            }
    
            const contentType = response.headers.get('content-type') || 'application/octet-stream';
            const buffer = await response.arrayBuffer();
    
            return new NextResponse(buffer, {
                status: 200,
                headers: {
                    'Content-Type': contentType,
                },
            });
        } catch (err) {
            console.error('Erro ao buscar o PDF via proxy:', err);
            return NextResponse.json({ error: 'Erro ao buscar o arquivo' }, { status: 500 });
        }
    }else if(service === 'sendEmail'){
        const bodyEmail = url.searchParams.get('bodyEmail') as string;
        const bodyParse = bodyEmail ? JSON.parse(bodyEmail) as  BodyEmail: undefined;
        
        if(!bodyParse || !bodyParse?.user || !bodyParse?.saae){
            return NextResponse.json({error: "Corpo do email não informado"}, {status: 500});
        }

        // Renderizar o componente React para HTML
        const corpoDoEmailHTML = newSAAEEmail({body: bodyParse});

        // Configurar a mensagem
        const mailOptions = {
            from: 'remetente',
            to: 'destinatario',
            cc: 'destinatario',
            subject: `Nova SAAE de ${bodyParse.user}, do  ${bodyParse.user.dadosBasicosUels.numUel} ${bodyParse.user.dadosBasicosUels.ufUel} ${bodyParse.user.dadosBasicosUels.nameUel}.`,
            html: corpoDoEmailHTML,
        };

        // Enviar o e-mail
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Erro ao tentar enviar e-mail", util.inspect(error));
                return NextResponse.json({error: "Erro ao enviar e-mail"}, {status: 500});
            } else {
                console.log(util.inspect(info));
                return NextResponse.json({message: 'E-mail enviado: ' + util.inspect(info.messageId)}, {status: 200});
            }
        });

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
        const status = body.status as string;
        const idSaae = body.idSaae as string;
        const obs = body.obs as string;

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
        }else if(service === 'saaeResposta'){
            if(!status || !idSaae)  return NextResponse.json({error: "Falta dados para a atualização"}, {status: 500});

            // Conectando ao banco de dados
            const db = await connectToDatabase(process.env.NEXT_PUBLIC_URL_MONGO, "/api/postUser");
            const collection = db.collection('saae');

            const resp = await collection.updateOne({_id: new ObjectId(idSaae)},
                {
                    $set: {
                        status,
                        obs
                    }
                }
            );

            return NextResponse.json(resp, {status: 200});
            
        }else{
            return NextResponse.json({error: "Metodo não reconhecido"}, {status: 500});
        }
    }catch(e){
        console.log(e)
        return NextResponse.json({error: "erro na requisição"}, {status: 405});
    }
}