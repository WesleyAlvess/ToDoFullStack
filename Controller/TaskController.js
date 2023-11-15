const Task = require("../models/Task")

const getAllTasks = async (req, res) => {
    try {
        const taskList = await Task.find()

        return res.render("index", {taskList});
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

module.exports = {
    getAllTasks,
    createTask,
}