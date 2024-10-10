const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static('public'));

app.get("/:nome/:lang", (req, res) => {
    var nome = req.params.nome;
    var lang = req.params.lang;
    var exibirMsg = false;

    var produtos = [
        {nome: "doritos", preco: 3.14},
        {nome: "coca-cola", preco: 5},
        {nome: "leite", preco: 1.45},
        {nome: "carne", preco: 15},
        {nome: "sprite", preco: 6}

    ];

    res.render("index", {
        nome: nome,
        lang: lang,
        msg: exibirMsg,
        produtos: produtos
    });
});

app.listen(8080, () => {
    console.log("App rodando!");
});