const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

connection
    .authenticate()
    .then(()=> {
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgErro) => {
        console.error("Erro ao conectar ao banco de dados: " + msgErro);
    });

app.set("view engine", "ejs");
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    Pergunta.findAll({raw: true, order:[
        ['id', 'DESC']
    ]}).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    });
});

app.get("/perguntar", (req,res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {

    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    Pergunta.create({
        titulo:titulo,
        descricao: descricao
    }).then(() => {
        res.redirect('/');
    });
    // res.send("Formulário recebido! titulo: " + titulo + " descricao: " + descricao);
});

app.get("/pergunta/:id", (req, res) => {
    let id = req.params.id;

    Pergunta.findOne({raw: true,
        where:{
            id:id
        }
    }).then(pergunta => {
        if(pergunta != undefined){

            Resposta.findAll({
                raw: true,
                where: {perguntaId: pergunta.id},
                order: [['id', 'DESC']]
            }).then(respostas => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        }else{
            res.redirect("/");
        }
    });
});

app.post("/responder", (req, res) =>{
    let corpo = req.body.corpo;
    let perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId);
    });
});

app.listen(8080, () => {
    console.log("App rodando!");
});