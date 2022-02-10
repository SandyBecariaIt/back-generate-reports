//rutas para personas
const express = require('express');
const router = express.Router();
const personaController = require('../controllers/personasController');

//api/personas
router.post('/',personaController.crearPersona); 
router.get('/',personaController.obtenerPersonas);
router.put('/:id',personaController.actualizarPersona);
router.get('/:id',personaController.obtenerPersona);
router.get('/login',personaController.obtenerPersona);
router.delete('/:id',personaController.eliminarPersona);
module.exports= router;