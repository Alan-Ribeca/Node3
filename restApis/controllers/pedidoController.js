const pedidos = require("../models/Pedido");

//agregar los pedidos a la base de datos
exports.nuevoPedido = async (req, res, next) => {
  const pedido = new pedidos(req.body);

  try {
    await pedido.save();
    res.json({ mensaje: "Se agrego un nuevo pedido" });
  } catch (error) {
    console.log(error);
    next();
  }
};

//mostrar Todos los pedidos
exports.mostrarPedidos = async (req, res, next) => {
  try {
    const mostrarPedidos = await pedidos
      .find({})
      .populate("cliente")
      .populate({ path: "pedido.producto", model: "Productos" });
    res.json(mostrarPedidos);
  } catch (error) {
    console.log(error);
    next();
  }
};

//mostrar un pedido por ID
exports.mostrarPedido = async (req, res, next) => {
  const mostrarPedido = await pedidos
    .findById(req.params.idPedido)
    .populate("cliente")
    .populate({ path: "pedido.producto", model: "Productos" });

  if (!mostrarPedido) {
    res.json({ mensaje: "Ese pedido no existe" });
    return next();
  }

  //mostrar el pedido
  res.json(mostrarPedido);
};

//actualizar un pedido
exports.actualizarPedido = async (req, res, next) => {
  try {
    let pedido = await pedidos.findOneAndUpdate(
      { _id: req.params.idPedido },
      req.body,
      { new: true }
    );

    res.json(pedido);
  } catch (error) {
    console.log(error);
    next();
  }
};

//eliminar un pedido
exports.eliminarPedido = async (req, res, next) => {
  try {
    await pedidos.findOneAndDelete({ _id: req.params.idPedido });
    res.json({ mensaje: "Pedido eliminado correctamente" });
  } catch (error) {
    console.log(error);
    next();
  }
};
