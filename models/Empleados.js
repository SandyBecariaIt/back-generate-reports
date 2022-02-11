const mongoose = require('mongoose');

const EmpleadoSchema = mongoose.Schema({

  Id_empleado: {
    type: String,
    required: true
  },
  Id_usuario: {
    type: String,
    required: true
  },
  fecha_alta:{
    type: Date,
  default: Date.now()
  },
  cedula_profesional: {
    type: String,
    required: true
  },
  sueldo: {
    type: Number,
    required: true
  },
  Id_puesto: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  constrasena: {
    type: String,
    required: true
}
});


module.exports = mongoose.model('Empleado', EmpleadoSchema);
