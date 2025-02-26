const Clientes = require("../models/Clientes");

// agrega un nuevo cliente
exports.nuevoCliente = async (req, res, next) => {
  const cliente = new Clientes(req.body);

  try {
    //almacenar el registro
    await cliente.save();
    res.json({ mensaje: "Se agrego un nuevo cliente" });
  } catch (error) {
    res.send(error);
    next();
  }
};

// muestra los clientes
exports.mostrarClientes = async (req, res, next) => {
  try {
    //mostrar los clientes
    const clientes = await Clientes.find({});
    res.json(clientes);
  } catch (error) {
    console.log(error);
    next();
  }
};

//mostrar un solo cliente por su id
exports.mostrarCliente = async (req, res, next) => {
  const cliente = await Clientes.findById(req.params.idCliente);

  if (!cliente) {
    res.json({ mensaje: "Ese cliente no exite" });
    next();
  }

  //mostrar el cliente
  res.json(cliente);
};

//actualizar un cliente
exports.actualizarCliente = async (req, res, next) => {
  try {
    const cliente = await Clientes.findOneAndUpdate(
      {
        _id: req.params.idCliente,
      },
      req.body,
      {
        new: true,
      }
    );
    res.json(cliente);
  } catch (error) {
    res.send(error);
    next();
  }
};

//eliminar un cliente por su id
exports.eliminarCliente = async (req, res, next) => {
  try {
    await Clientes.findOneAndDelete({ _id: req.params.idCliente });
    res.json({ mensaje: "El cliente fue eliminado" });
  } catch (error) {
    console.log(error);
    next();
  }
};
