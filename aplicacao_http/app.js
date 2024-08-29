var http = require("http");

http.createServer(function(requisicao,resposta){
    resposta.end("Hello World!");
}).listen(8080);
console.log("Meu servidor está rodando");