const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("<h1>Minha lista de tarefas</h1>");
});

app.listen(8081, () => {
    console.log("O servidor foi iniciado!");
});