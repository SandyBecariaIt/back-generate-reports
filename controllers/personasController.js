const Persona = require("../models/Personas");
const Empleado = require("../models/Empleado");

exports.crearPersona = async (req, res) =>{
    
    try {
        let persona;

        //Creamos nuestro producto

        persona = new Persona(req.body);

        await persona.save();
        res.send(persona);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerPersonas = async (req, res) =>{
    try {
        const persona = await Persona.find();
        res.json(persona)
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarPersona = async(req, res)=>{
 
    try {
        const { nombre,apellido_pat, apellido_mat, edad,sexo } = req.body;
        let persona = await Persona.findById(req.params.id);
        if (!persona) {
            res.status(404).json({msg:'No existe la persona' })

        }
        persona.nombre = nombre;
        persona.apellido_pat = apellido_pat;
        persona.apellido_mat = apellido_mat;
        persona.edad = edad;
        persona.sexo = sexo;
   
        
  

        persona = await Persona.findOneAndUpdate({ _id:req.params.id},persona,{new: true} )
        res.json(persona);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}
exports.obtenerPersona = async(req, res)=>{
    try {
        let persona = await Persona.findById(req.params.id);
        if (!persona) {
            res.status(404).json({msg:'No existe la persona' })
        }
      
        res.json(persona);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
exports.eliminarPersona= async(req,res)=>{
    try {
        
       
        let persona = await Persona.findById(req.params.id);
        if (!persona) {
            res.status(404).json({msg:'No existe la persona' })

        }
      await Persona.findOneAndRemove({_id: req.params.id})
        res.json({msg:'Persona Eliminada'});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

