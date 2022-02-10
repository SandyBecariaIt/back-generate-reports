const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
//CREAMSO EL SERVIDOR
const app = express();

//CONECTAMOS A LA BD
conectarDB();
app.use(cors())

app.use(express.json());

app.use('/api/personas', require('./routes/personas'));

//DEFINIMOS RUTA PRINCIPAL
/*app.get('/', (req,res)=>{
    res.send('Hola Mundo'); 
})*/

app.listen(4000, ()=> {
    console.log('El servidor esta corriendo perfectamente ')
})
