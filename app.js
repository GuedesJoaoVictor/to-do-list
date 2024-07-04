const express = require("express");
const checklistRouter = require("./src/routes/checklist");
require("./config/database");

const app = express();

app.use(express.json());

app.use("/checklists", checklistRouter);

app.listen(8081, () => {
    console.log("O servidor foi iniciado!");
});