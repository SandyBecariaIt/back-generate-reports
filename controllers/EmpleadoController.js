const Empleado = require("../models/Empleados");
const CryptoJS = require("crypto-js");


exports.crearEmpleado = async (req, res) =>{
  try {
    let empleado = new Empleado(req.body);
    empleado.constrasena = encriptar(empleado.constrasena, passD(empleado.cedula_profesional, empleado.email))
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
    const { sueldo,Id_puesto, contraseña } = req.body;
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

exports.comprobarEmail= async(req, res)=>{
  try {
    let email = await Empleado.findOne({email: req.params.email});
    if (!email) {
      return res.status(404).json({msg:'No existe el correo'})
    }
    let decrypt = desencriptar(email.constrasena, passD(email.cedula_profesional, email.email));
    const comp = decrypt === req.params.constrasena;

    if(!comp){
      return res.json({ msg:'Contraseña incorrecta' });
    }
    
    return res.json({msg:'Contraseña correcta'});
  } catch(error){
    return res.status(500).send('Hubo un error');
  }
}

function encriptar(contraseña, palabraClave){
  return (CryptoJS.AES.encrypt(contraseña, palabraClave)).toString();
}

function desencriptar(contraseña, palabraClave){
  let desencriptar = CryptoJS.AES.decrypt(contraseña, palabraClave);
  return CryptoJS.enc.Utf8.stringify(desencriptar);
}

function passD(cedula, email){
  let parte1 = cedula.substring(0, 3);
  let parte2 = ( ( cedula.length + email.length ) * 175).toString();
  let parte3 = email.substring(4, 8);
  return parte1+parte2+parte3;
}