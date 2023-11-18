const express = require ('express');
const {todos} = require ('../data/index');

const todoRouter = express.Router();


todoRouter.get ('/todo',(req,res) => {
    res.json(todos);
})

todoRouter.get('/todo/:id',(req,res)=>{
    const element = todos.find((todo)=> {
    return todo.id.toString()=== req.params.id
    }); 

    if (!element) {
        return res.status (404).send();
    }
    res.json(element);
})

todoRouter.post ('/todo',(req,res)=>{
    let nextId = todos.length;
    const body = req.body;
    const newUser = {
    id: nextId,
    text: body.text,
    fecha:new Date (body.fecha),
    done: body.done,
};
    todos.push(newUser);
    nextId++;

    res.json(newUser);
})

todoRouter.put('/todo/:id',(req,res)=>{
    const elementIndex = todos.findIndex((todo)=>{
        return todo.id.toString()=== req.params.id
    });
    if (elementIndex=== -1) {
        return res.status(404).send();
    }

    todos.splice(elementIndex,1);
    const updatedTodo = { id: Number(req.params.id), ...req.body };
    todos.push(updatedTodo);

    return res.json(updatedTodo);
})

todoRouter.delete ('/todo/id',(req,res)=>{
    const elementDelete = todos.findIndex((todo)=>{
        return todo.id.toString()=== req.params.id
    });
    if (!elementDelete || elementDelete === -1) {
        return res.status(404).send();
    }
    todos.splice(elementDelete, 1)
    return res.json(todos);
})


module.exports = todoRouter;