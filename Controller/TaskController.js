const mongoose = require("mongoose")

const Task = require("../models/Task")

let message = ""
let type = ""


const getAllTasks = async (req, res) => {
    try {
        setTimeout(() => {
            message = ""
        }, 1000)
        
        const taskList = await Task.find()
        
        return res.render("index", {
            taskList,
            task: null,
            taskDelete: null,
            message,
            type,
        })

    } catch (err) {
        res.status(500).send({ message: err.message })
    }

}

const createTask = async (req, res) => {
    try {
        const task = req.body

        if (!task.task) {
            message = "Insira um texto, antes de adicionar a tarefa!"
            type = "danger"
            return res.redirect("/")
        }

        await Task.create(task)
        message = "Tarefa criada com sucesso!"
        type = "success"
        return res.redirect("/")

    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const getById = async (req, res) => {
    try {
        const id = req.params.id
        const taskList = await Task.find()

        if (req.params.method == "update") {
            const task = await Task.findById(id)
            return res.render("index", { task, taskDelete: null, taskList, message, type })
        } else {
            const taskDelete = await Task.findById(id)
            return res.render("index", { task: null, taskList, taskDelete, message, type })
        }

    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const updateTask = async (req, res) => {
    try {
        const task = req.body;
        const id = req.params.id;

        const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
        if (!isValidObjectId) {
            return res.status(400).send({ message: "id inválido" });
        }

        await Task.updateOne({ _id: id }, task);
        message = "Tarefa atualizada com sucesso!"
        type = "success"
        res.redirect("/");
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const taskDeleteOneTask = async (req, res) => {
    try {
        const id = req.params.id

        await Task.deleteOne({ _id: id })
        message = "Tarefa apagada com sucesso!"
        type = "success"
        res.redirect("/")

    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const taskCheck = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id })

        if (task.check) {
            task.check = false
        } else {
            task.check = true
        }

        await Task.updateOne({ _id: req.params.id }, task)
        res.redirect("/")
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}


module.exports = {
    getAllTasks,
    createTask,
    getById,
    updateTask,
    taskDeleteOneTask,
    taskCheck,
}