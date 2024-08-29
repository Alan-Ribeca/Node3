const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  //autorizacion por el header
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("No autenticado");
    error.statusCode = 401;
    throw error;
  }

  //obtener el token
  const token = authHeader.split(" ")[1];
  //cuando se envia el token se envia asi "Authorization: Bearer 5956515456", tiene un espacio y despues viene el token, por eso usamos .splis(" ")[1] (para que solamente nos traiga el token que esta en la posicion 1, ya que en la posicion 0 esta "Bearer")

  //obtener y verificar el token
  let revisarToken;
  try {
    revisarToken = jwt.verify(token, "LLAVESECRETA"); //el segundo parametro es la llave que le pucimos al token cuando se genera por primera vez (en usuariosController) tiene que ser la misma llave sino daria error
  } catch (error) {
    console.log(error);
    throw error;
  }

  //si es un token valido, pero hay algun error
  if (!revisarToken) {
    const error = new Error("Token invalido");
    error.statusCode = 401;
    throw error;
  }

  //si pasa la verificacion, pasa al siguiente next y el usuario puede ver la informacion
  next();
};
