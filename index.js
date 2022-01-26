const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database"); 
const Pergunta = require("./database/Pergunta"); 
const res = require("express/lib/response");


connection
.authenticate()
.then(()=>{
    console.log("conexao feita com o bd");
})
.catch((erro)=>{
    console.log(erro);
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.set("view engine", "ejs");

app.get("/", (req, res)=>{
    Pergunta.findAll({raw: true, order:[
        ['updatedAt', 'DESC']
    ]}).then(perguntas => {
        res.render("home", {
            perguntas: perguntas
        });
    }); 
});

app.get("/pergunta/:id", (req, res)=>{
    var id = req.params.id;
    Pergunta.findOne({
        where:{
            id: id
        }
    }).then(pergunta => {
        if(pergunta != undefined){
            res.render("pergunta",{
                pergunta: pergunta
            }
            );
        }else{
            res.redirect("/");
        }
    })
});

app.get("/perguntar", (req, res)=>{
    res.render("perguntar");
});

app.post("/salvarPergunta", (req, res)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect("/");
    });
});

app.listen(9191, ()=>{
    console.log("servidor iniciado...");
});