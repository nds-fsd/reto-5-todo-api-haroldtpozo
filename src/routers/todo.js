const express = require ('express');
const {todos} = require ('../data/index');

const todoRouter = express.Router();

todoRouter.get ('/',(req,res) => {
    res.json(todos);
})

todoRouter.post ('/',(req,res)=>{
    const body = req.body;
    const newUser = {
    id: todos.length + 1,
    text: body.text,
    fecha: body.fecha,
    done: body.done,
   };
  todos.push(newUser);

   res.json(newUser);

})

module.exports = todoRouter;