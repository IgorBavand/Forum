const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database"); 
const perguntaModel = require("./database/Pergunta"); 


connection
.authenticate()
.then(()=>{
    console.log("conexao feita com o bd");
})
.catch((erro)=>{
    console.log(erro);
})

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.set("view engine", "ejs");

app.get("/", (req, res)=>{
    res.render("home");
});

app.get("/perguntar", (req, res)=>{
    res.render("perguntar");
});

app.post("/salvarPergunta", (req, res)=>{
    res.send(req.body.titulo);
});

app.listen(9191, ()=>{
    console.log("servidor iniciado...");
});