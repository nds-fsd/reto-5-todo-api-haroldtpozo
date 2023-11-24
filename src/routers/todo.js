const express = require ('express');
const controller = require ('../controllers/controll');


const todoRouter = express.Router();

todoRouter.get ('/todo',controller.getAll)

todoRouter.get('/todo/:id', controller.getById)

todoRouter.post ('/todo',controller.postCreate)

todoRouter.put('/todo/:id', controller.putUpdate)

todoRouter.patch('/todo/:id',controller.patchUpdate)

todoRouter.delete ('/todo/:id',controller.deleteById)


module.exports = todoRouter;