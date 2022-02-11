const mongoose = require('mongoose');

const PersonaSchema = mongoose.Schema({
    Id_usuario: {
      type: String,
      required: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellido_pat: {
        type: String,
        required: true
    },
    apellido_mat: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    }, 
    sexo: {
      type: String,
      required: true
    },
    fechaCreacion:{
        type: Date,
        default: Date.now()
    }
 
});


module.exports = mongoose.model('Persona', PersonaSchema);