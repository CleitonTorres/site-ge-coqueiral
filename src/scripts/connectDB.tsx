import { MongoClient, Db } from "mongodb";

export let cachedClient: MongoClient | null = null;
export let cachedDB: Db | null = null;
export const dbName = 'site-coqueiral';

export async function connectToDatabase(uri = '', requesting='') {
  if(cachedClient){
    console.log("Usou clientMongo existente! Solicitado por "+requesting);
    return cachedClient.db(dbName);
  }

  console.log(`Criou uma nova conexão solicitada por ${requesting}`);

  const client = await MongoClient.connect(uri,{
    maxPoolSize: 450, // Tamanho máximo do pool de conexões
    maxIdleTimeMS: 60000, // Tempo máximo de vida das conexões (em milissegundos)
    waitQueueTimeoutMS: 5000 // Tempo máximo de espera para obter uma conexão (em milissegundos)
  });
  const db = client.db(dbName);

  cachedClient = client;
  cachedDB = db;

  return db;
}

export function closeDatabase(requesting='') {
  if (cachedClient) {    
    cachedClient.close()
    .then(()=>{
      console.log("Fechou a conexão! " + requesting);
    })
  }
  cachedDB = null;
  cachedClient = null;
}
