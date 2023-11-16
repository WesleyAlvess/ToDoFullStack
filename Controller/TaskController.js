const mongoose = require("mongoose")

const Task = require("../models/Task")

const getAllTasks = async (req, res) => {
    try {
        const taskList = await Task.find()

        return res.render("index", { taskList, task: null, taskDelete: null });
    } catch (err) {
        res.status(500).send({ message: err.message })
    }

}

const createTask = async (req, res) => {
    try {
        const task = req.body

        if (!task) {
            return res.redirect("/")
        }

        await Task.create(task)
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
            return res.render("index", { task, taskDelete: null, taskList })
        } else {
            const taskDelete = await Task.findById(id)
            return res.render("index", { task: null, taskList, taskDelete })
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
        res.redirect("/");
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const taskDeleteOneTask = async (req, res) => {
    try {
        const id = req.params.id

        await Task.deleteOne({ _id: id})
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
}