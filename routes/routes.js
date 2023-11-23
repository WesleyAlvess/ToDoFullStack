const routes = require("express").Router()

const TaskController = require("../Controller/TaskController")


routes.get('/', TaskController.getAllTasks)
routes.post('/create', TaskController.createTask)
routes.get('/getById/:id/:method', TaskController.getById)
routes.post('/updateTask/:id', TaskController.updateTask)
routes.get('/deleteTask/:id', TaskController.taskDeleteOneTask)
routes.get('/check/:id', TaskController.taskCheck)


module.exports = routes
