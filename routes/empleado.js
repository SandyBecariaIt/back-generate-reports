//rutas para empleados
const express = require('express');
const router = express.Router();
const EmpleadoController = require('../controllers/EmpleadoController');

//api/personas
router.post('/',EmpleadoController.crearEmpleado);
router.get('/',EmpleadoController.obtenerEmpleados);
router.get('/:id',EmpleadoController.obtenerEmpleado);
router.put('/:id',EmpleadoController.actualizarEmpleado);
router.delete('/:id',EmpleadoController.eliminarEmpleado);
router.get('/login/:email/:constrasena',EmpleadoController.comprobarEmail);
module.exports= router;
//sasd