const express = require("express");

const app = express();

app.use(express.json());

const log = (req, res, next) => {
    console.log(req.body);
    console.log(`Data de agora: ${Date.now()}`);
    next();
}

app.use(log); 

app.get("/", (req, res) => {
    res.send("<h1>Minha lista de tarefas :)</h1>");
});

app.get("/json", (req, res) => {
    res.json({title: "Tarefa X", done: true});
});

app.listen(8081, () => {
    console.log("O servidor foi iniciado!");
});