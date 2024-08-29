const express = require('express'); //Importando o express

const app = express(); // Iniciando o express

app.get("/",function(req, res) {
    res.send("<h1>Bem vindo ao meu site</h1>");
});

app.get("/blog/:artigo?", function(req, res){

    let artigo = req.params.artigo;

    if(artigo){
        res.send(`<h2>${artigo}</h2`);
    }else{
        res.send("Bem vindo ao meu blog!");
    }

});

app.get("/canal/youtube", function(req, res){
    var canal = req.query['canal']; //query param parametros passados no fim da url após ?

    if(canal){
        res.send(canal);
    }else{
        res.send("Nenhum canal fornecido");
    }
});

app.get("/ola/:nome/:sobrenome", function(req,res){
    //REQ => DADOS ENVIADOS PELO USUÁRIO
    //RES => RESPOSTA ENVIADA PARA O USUÁRIO
    res.send(`<h1>Olá ${req.params.nome} ${req.params.sobrenome}</h1>`);
});

app.listen(4000, (erro) => {
    if(erro){
        console.log("Ocorreu um erro!");
    }else{
        console.log("Servidor Iniciado com sucesso!");
    }
})