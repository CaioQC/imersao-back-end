import fs from "fs";
import {getAllPosts, createPost, updatePost} from "../models/postsModel.js";
import generateDescriptionWithGemini from "../services/geminiService.js";

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
    const newPost = {
        descricao : "",
        url_imagem : req.file.originalname,
        alt : ""
    };

    try{
        const postCreated = await createPost(newPost);
        const updatedImage = `uploads/${postCreated.insertedId}.png`
        fs.renameSync(req.file.path, updatedImage);
        res.status(200).json(postCreated);
    }

    catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro" : "Falha na requisição"});
    }
}

export async function updateNewPost(req, res){
    const id = req.params.id;
    const urlImage = `http://localhost:3000/${id}.png`

    try{
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const description = await generateDescriptionWithGemini(imgBuffer);

        const post = {
            url_imagem : urlImage,
            descricao : description,
            alt : req.body.alt
        }

        const postCreated = await updatePost(id, post);
        res.status(200).json(postCreated);
    }

    catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro" : "Falha na requisição"});
    }
}