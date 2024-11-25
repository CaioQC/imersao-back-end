import {getAllPosts, createPost} from "../models/postsModel.js";

export async function listPosts (req, res) {
    // Chama a função para obter todos os posts
    const posts = await getAllPosts();
    // Envia os posts como resposta JSON com status 200 (OK)
    res.status(200).json(posts);
};

export async function postNewPost(req, res){
    const newPost = req.body;
    try{
        const postCreated = await createPost(newPost);
        res.status(200).json(postCreated);
    }

    catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro" : "Falha na requisição"});
    }
}

export async function uploadImage(req, res){
    const newPost = req.body;
    try{
        const postCreated = await createPost(newPost);
        res.status(200).json(postCreated);
    }

    catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro" : "Falha na requisição"});
    }
}
