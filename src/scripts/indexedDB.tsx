import { DataStorage} from '@/@types/types';
import { IDBPDatabase, openDB } from 'idb';

// Abrir ou criar o banco de dados
let db: IDBPDatabase<unknown> | undefined = undefined;

export const createDb = async (nameStorage: string | 'saae')=>{
  if(!db){
    db = await openDB('myDatabase', 1, {
      upgrade(db) {
        // Cria a tabela apenas se ainda não existir
        if (!db.objectStoreNames.contains(nameStorage)) {
          db.createObjectStore(nameStorage, { keyPath: 'id', autoIncrement: true });
        }
      },
    });
    console.log(`database ${nameStorage} criada com sucesso`)
  }
  if(!db){
    alert("erro ao criar banco de dados")
  }
  
  return db
}

//adicionar dados a uma tabela já existente, passar o id da tabela.
export const putNewData = async(nameStorage: string, data: DataStorage)=>{
  
  const database = await createDb(nameStorage);
  
  // Adicionar dados
  const resp = await database.put(nameStorage, data); //nameStorage: 'saae'

  // Fechar conexão
  // database.close();

  return resp;
}

// Obter dados
export const getDataStorage = async (nameStorage: string, id: number)=>{
  const database = await createDb(nameStorage);
  const data = await database.get(nameStorage, id);
  
  if(!data) return undefined;

  // Fechar conexão
  // database.close();

  return data as DataStorage; 
}

// Obter todos os dados de uma tabela
export const getAllDataStorage = async (nameStorage: string) => {
  const database = await createDb(nameStorage);

  // Obter todos os dados da tabela especificada
  const allData = await database.getAll(nameStorage);

  // Fechar conexão
  // database.close();

  return allData as DataStorage[]; // Retorna todos os registros
};

// Deletar dados
export const deleteDataStorage = async(nameStorage: string, id: number)=>{
  const database = await createDb(nameStorage);

  await database.delete(nameStorage, id);

  // Fechar conexão
  // database.close();

  return true
}
