import express from "express";
import multer from "multer";

import { listPosts, postNewPost, uploadImage } from "../controllers/postsController.js";

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

    // Rota GET para obter todos os posts
    app.get("/posts", listPosts);
    // Rota para criar novos posts
    app.post("/posts", postNewPost);
    app.post("/upload", upload.single("image"), uploadImage);
};

export default routes;