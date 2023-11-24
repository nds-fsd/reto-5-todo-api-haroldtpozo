const {todos} = require ('../data/index');

// 
const getAll = (req,res) => {
    return res.status(200).json ({data:todos, total:todos.length});
};

// 

const getById = (req,res)=>{
    
    const todoId = req.params.id // es para localizar el id
    const selectToDo = todos.find((todo)=> {
    return todo.id.toString()=== todoId
    }); 

    if (!selectToDo) {
        return res.status(404).json({message:"No encontré el id"});
    }
    res.status(200).json({data:selectToDo});
};

// 

const postCreate = (req,res)=>{
    console.log ("Entro aqui");

    const body = req.body;
    console.log("Datos recibidos en postCreate:", body);

    if (!body) {
        return res.status(404).json ({message:"No hay datos"})
        
    } else {
        const currentId = todos.map((todo)=> todo.id);
        const newId= Math.max(...currentId)+1;
        const newUser= {
            id: newId,
            text: body.text,
            hora: body.hora,
            dia : parseInt(body.dia),
            mes: body.mes,
            done: body.done,
        };
        
        todos.push(newUser);
        return res.status(201).json(newUser);
   }
    
   
};
// 

const patchUpdate = async (req, res) => { 
    console.log(req.body)
    try{
        const { id } = req.params 
        const body = req.body;
        const {done} = body
        let toDoFoundIndex = await todos.findIndex((todo) => todo.id === parseInt(id));
        if (toDoFoundIndex !== -1) {
             const updatedTodo = {
                ...todos[toDoFoundIndex],
                id: parseInt(id) || todos[toDoFoundIndex].id,
                text: body.text || todos[toDoFoundIndex].text,
                dia: body.dia || todos[toDoFoundIndex].dia,
                mes: body.mes || todos[toDoFoundIndex].mes,
                hora: body.hora || todos[toDoFoundIndex].hora,
                done: done !== undefined ? done : todos[toDoFoundIndex].done,  
             };
            todos[toDoFoundIndex] = updatedTodo;
            console.log(updatedTodo);
            res.status(200).json(updatedTodo);
        } else {
            res.status(404).json({message: "No se encontro el todo "})
        }
        }catch(error){
        console.log(error)
    }
}






// 
const putUpdate = (req,res)=>{

    const todoId = req.params.id;
    const body = req.body;
    let toDo;

    const updateIndex = todos.map((todo)=>{
        if (todo.id === todoId) {
            toDo = {...todo, ...body}
            return toDo;
        } else {
            return todo;
        }
    });

    todos = updateIndex;
    
    return res.status(201).json ({data: toDo})
}


// 

const deleteById = (req,res)=>{

    const todoId = req.params.id;
    const elementDelete = todos.findIndex((todo)=>{
        return todo.id.toString()=== todoId;
    });

    if (!elementDelete || elementDelete === -1) {
        return res.status(404).json({message:"No encontré el id"});
    } else {
    todos.splice(elementDelete, 1)
    return res.status(200).json({todos,message:"Se ha borrado"});
    }
    
}

module.exports={
    getAll,
    getById,
    postCreate,
    putUpdate,
    deleteById,
    patchUpdate
};