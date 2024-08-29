const Usuarios = require("../models/Usuarios");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.registrarUsuarios = async (req, res) => {
  //leer los datos dle usuario y colocarlos en el modelo de la bd
  const usuario = new Usuarios(req.body);
  usuario.password = await bcrypt.hash(req.body.password, 12);
  try {
    //guardar en la bd
    await usuario.save();
    res.json({ mensaje: "Usuario registrado correctamente" });
  } catch (error) {
    console.log(error);
    res.json({ mensaje: "Hubo un error" });
  }
};

exports.autenticarUsuario = async (req, res, next) => {
  // buscar el usuario
  const usuario = await Usuarios.findOne({ email: req.body.email });

  if (!usuario) {
    //si el usuario no existe
    await res.status(401).json({ mensaje: "Usuario no encontrado" });
  } else {
    //Usuario si existe, verificar si el password ingresadoe es correcto o incorrecto
    if (!bcrypt.compareSync(req.body.password, usuario.password)) {
      // si el password es incorrecto
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    } else {
      //password correcto, generar el token de autenticación
      const token = jwt.sign(
        {
          email: usuario.email,
          nombre: usuario.nombre,
          _id: usuario.id,
        },
        "LLAVESECRETA",
        { expiresIn: "1h" }
      );
      //retornar el TOKEN
      res.json({ token });
    }
  }
};
