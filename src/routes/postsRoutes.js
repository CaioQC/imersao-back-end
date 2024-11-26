import express from "express";
import multer from "multer";
import cors from "cors";

import { listPosts, postNewPost, uploadImage, updateNewPost } from "../controllers/postsController.js";

const corsOption = {
    origin : "http://localhost:8000",
    optionsSuccessStatus : 200 
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ dest: "./uploads" , storage});

const routes = (app) => {
    // Habilita o parser JSON para o servidor Express
    app.use(express.json());

    app.use(cors(corsOption));
    // Rota GET para obter todos os posts
    app.get("/posts", listPosts);
    // Rota para criar novos posts
    app.post("/posts", postNewPost);
    //Rota para upload de imagens
    app.post("/upload", upload.single("image"), uploadImage);

    app.put("/upload/:id", updateNewPost);
};

export default routes;