const Empleado = require("../models/Empleados");

exports.crearEmpleado = async (req, res) =>{

  try {
    let empleado;

    empleado = new Empleado(req.body);

    await empleado.save();
    res.send(empleado);

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
}

exports.obtenerEmpleados = async (req, res) =>{

  try {
    const empleado = await Empleado.find();
    res.json(empleado)

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
}

exports.actualizarEmpleado = async(req, res)=>{

  try {
    const{sueldo,Id_puesto, contraseña} = req.body;
    let empleado = await Empleado.findById(req.params.id);
    if (!empleado) {
      res.status(404).json({msg:'No existe la persona' })

    }
    empleado.sueldo = sueldo;
    empleado.Id_puesto = Id_puesto;
    empleado.contraseña = contraseña;

    empleado = await Empleado.findOneAndUpdate({ _id:req.params.id},empleado,{new: true} )
    res.json(empleado);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
}

exports.obtenerEmpleado = async(req, res)=>{

  try {


    let empleado = await Empleado.findById(req.params.id);
    if (!empleado) {
      res.status(404).json({msg:'No existe la persona' })

    }

    res.json(empleado);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
}
exports.eliminarEmpleado= async(req,res)=>{
  try {


    let empleado = await Empleado.findById(req.params.id);
    if (!empleado) {
      res.status(404).json({msg:'No existe la persona' })

    }
    await Empleado.findOneAndRemove({_id: req.params.id})
    res.json({msg:'Empleado Eliminado'});
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
}