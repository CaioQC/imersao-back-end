import connectToDatabase from "../config/dbConfig.js";

// Conecta ao banco de dados usando a string de conexão do ambiente
const connection = await connectToDatabase(process.env.STRING_CONEXAO);
// Função assíncrona para obter todos os posts do banco de dados
export async function getAllPosts() {
    // Obtém o banco de dados "imersao_dev"
    const db = connection.db("imersao_dev");
  
    // Obtém a coleção "imersao_dev" dentro do banco de dados
    const collection = db.collection("imersao_dev");
  
    // Busca todos os documentos da coleção e retorna como um array
    return collection.find().toArray();
}

export async function createPost(newPost){
    const db = connection.db("imersao_dev");
    const collection = db.collection("imersao_dev");
    return collection.insertOne(newPost);
}