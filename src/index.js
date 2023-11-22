const express = require('express');
const cors = require ("cors");

const app = express();
const router = require('./routers/index');

app.use(
    cors({
        origin:"*",
        optionsSuccessStatus:200,
    })
)
//Le decimos a nuestra app, que vamos recibir peticiones donde el Body contiene texto en formato JSON.
app.use(express.json());

//Le decimos a nuestra app, que "utilize" el router de todos. Esto es equivalente a haber definido todos nuestros endpoints directamente sobre el objeto app como vimos en clase.
app.use('/',router);

//a partir de este punto y gracias a la linea escrita mas arriba, si llega alguna peticion que empieze por /todo, está se redirige hacia todoRouter.

app.listen(4000 , () =>{
    console.log ('Este es el puerto 4000');
})