const {todos} = require ('../data/index');

// 
const getAll = (req,res) => {
    res.json(todos);
};

// 

const getById = (req,res)=>{
    const element = todos.find((todo)=> {
    return todo.id.toString()=== req.params.id
    }); 

    if (!element) {
        return res.status (404).send();
    }
    res.json(element);
};



// 

const postCreate = (req,res)=>{
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
}


// 

const putUpdate = (req,res)=>{
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
}


// 

const deleteById = (req,res)=>{
    const elementDelete = todos.findIndex((todo)=>{
        return todo.id.toString()=== req.params.id
    });
    if (!elementDelete || elementDelete === -1) {
        return res.status(404).send();
    }
    todos.splice(elementDelete, 1)
    return res.json(todos);
}

module.exports={
    getAll,
    getById,
    postCreate,
    putUpdate,
    deleteById,
};