import express from "express";

const posts = [
    { id: 1, descricao: "Uma foto teste", imagem: "https://placecats.com/millie/300/150" },
    { id: 2, descricao: "Paisagem do Reino Unido", imagem: "https://placecats.com/millie/300/150" },
    { id: 3, descricao: "Paisagem da Suiça", imagem: "https://placecats.com/millie/300/150" },
    { id: 4, descricao: "Paisagem do Japão", imagem: "https://placecats.com/millie/300/150" },
    { id: 5, descricao: "Paisagem da Grécia", imagem: "https://placecats.com/millie/300/150" },
    { id: 6, descricao: "Paisagem de Montenegro", imagem: "https://placecats.com/millie/300/150" },
];

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log("Servidor escutando...");
});

function searchPostById(id){
    return posts.findIndex((post) => {
        return post.id === Number(id);
    });
};

app.get("/posts/:id", (req, res) => {
    const index = searchPostById(req.params.id);
    res.status(200).json(posts[index]);
});