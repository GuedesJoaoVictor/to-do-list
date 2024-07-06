const express = require("express");

const checkListDependentRoute = express.Router();

const Task = require("../models/Task");
const Checklist = require("../models/Checklists");

checkListDependentRoute.get("/:id/tasks/new", async (req, res) => {
    try {
        let task = Task();
        res.status(200).render("tasks/new", { checkListId: req.params.id, task: task });
    } catch (error) {
        res.status(422).render("pages/error", {errors: "Erro ao carregar o formulário."});
    }
});

checkListDependentRoute.post("/:id/tasks", async (req, res) => {
    let {name} = req.body.task;
    let task = new Task({name, checkList: req.params.id});

    try {
        await task.save();
        let checkList = await Checklist.findById(req.params.id);
        checkList.tasks.push(task);
        await checkList.save();
        res.redirect(`/checklists/${req.params.id}`)
    } catch (error) {
        let errors = error.errors;
        res.status(422).render("tasks/new", { task: {...task, errors}, checkListId: req.params.id });
    }
})

module.exports = { checkListDependent: checkListDependentRoute };