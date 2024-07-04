const express = require("express");

const router = express.Router();

const Checklist = require("../models/Checklists");

router.get("/", async (req, res) => {
    try {
        let checkLists = await Checklist.find({});
        res.status(200).render("checklists/index", { checkLists: checkLists });
    } catch (error) {
        res.status(500).render("pages/error", {error: "Erro ao exibir as listas."});
    }
});

router.get("/new", async (req, res) => {
    try {
        let checkList = new Checklist();
        res.status(200).render("checklists/new", { checkList: checkList });
    } catch (error) {
        res.status(500).render("pages/error", {error: "Erro ao carregar formulário."});
    }
});

router.post("/", async (req, res) => {
    let { name } = req.body.checklist;
    let checkList = new Checklist({name});

    try {
        await checkList.save();
        res.redirect("/checklists");
    } catch (error) {
        res.status(422).render("checklists/new", { checkLists: {...checkList}, error })
    }
});

router.get("/:id", async (req, res) => {
    try {
        let checkList = await Checklist.findById(req.params.id);
        res.status(200).render("checklists/show", { checkList: checkList });
    } catch (error) {
        res.status(500).render("pages/error", {error: "Erro ao exibir as listas de tarefas."});
    }
});

router.put("/:id", async (req, res) => {
    let { name } = req.body
    try {
        let checkList = await Checklist.findByIdAndUpdate(req.params.id, {name}, {new:true});
        res.status(200).json(checkList);
    } catch (error) {
        res.status(422).json(error);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id
        let checkList = await Checklist.findByIdAndDelete(id);
        res.status(200).json(checkList);
    } catch (error) {
        res.status(422).json(error);
    }
});

module.exports = router;