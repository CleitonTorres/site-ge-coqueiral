import { ProfileProps } from "@/@types/types";
import { closeDatabase, connectToDatabase } from "@/scripts/connectDB";
import { decryptPassword, encryptPassword } from "@/scripts/globais";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export type PropsSingIn = {
    user:string,
    password:string,
}

async function auth(user:string, password:string) {
    const db = await connectToDatabase(process.env.NEXT_PUBLIC_URL_MONGO, "/api/Auth"); 
    const collection = db.collection('users');

    const doc = await collection.findOne({user: user});

    if(!doc){
        return {message: "Usuário não localizado!", error: true}
    }

    const match = doc ? decryptPassword(doc.password) === password : false;

    //fecha o DB.
    closeDatabase();
    
    if(!match){
        return {message: "Dados não conferem!", error: true}
    }else{
        return {message: "Login efetuado com sucesso!", doc: doc}
    }
}
 
export async function GET(req: NextRequest) {
    // Parseando os parâmetros da URL (query params)
    const url = new URL(req.url); // Cria uma URL para extrair os parâmetros
    const person = url.searchParams.get("person") as "me" | "auth" | "users";
    const data = url.searchParams.get("data");

    if(person === "auth"){
        const dataUser = JSON.parse(decryptPassword(data as string)) as PropsSingIn;

        if(!dataUser.user || !dataUser.password){
            NextResponse.json({error: "Faltam dados para a autenticação."}, { status: 400 });
        }
        console.log(dataUser)
        try {            
            const response = await auth(dataUser.user, dataUser.password);

            if (response.error) {
                return NextResponse.json({ error: response.message }, { status: 401 });
            }

            if (response.doc) {
                return NextResponse.json(response.doc, { status: 200 });
            }

            return NextResponse.json({ error: "Autenticação falhou sem detalhes." }, { status: 500 });
        } catch (error) {
            console.log(error)
            return NextResponse.json({ error: "Erro ao processar os dados." }, { status: 500 });
        }
    }else{
        return NextResponse.json({ error: "Requisição não reconhecida." }, { status: 404 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const token = req.headers.get('Authorization');
        const body = await req.json();
        const dataForm = JSON.parse(decryptPassword(body.dataNewUser)) as ProfileProps;

        if (!dataForm || token !== `Bearer ${process.env.NEXT_PUBLIC_AUTORIZATION}`) {
            return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
        }

        // Conectando ao banco de dados
        const db = await connectToDatabase(process.env.NEXT_PUBLIC_URL_MONGO, "/api/postUser");
        const collection = db.collection('users');

        // Verificando se o usuário já existe
        const verify = await collection.findOne({ user: dataForm.user });

        if (verify) {
            return NextResponse.json({ error: "Já existe um usuário com esse nome" }, { status: 400 });
        }

        // Criando o novo usuário
        const user = {
            ...dataForm,
            _id: new ObjectId().toString()
        };
        await collection.insertOne({ 
            ...user, 
            password: encryptPassword(user.password),
            _id: new ObjectId(user._id) 
        });

        const newUser = encryptPassword(JSON.stringify(user));

        // Respondendo com sucesso
        return NextResponse.json({ gravado: true, user: newUser }, { status: 200 });
    } catch (e) {
        return NextResponse.json(
            { error: `Erro ao tentar gravar usuário. ${e}` },
            { status: 500 }
        );
    } finally {
        // Fechando a conexão com o banco
        closeDatabase("/api/postUser");
    }
}