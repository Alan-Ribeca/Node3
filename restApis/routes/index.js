const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");
const productosController = require("../controllers/productosController");
const pedidosController = require("../controllers/pedidoController");
const usuariosController = require("../controllers/usuariosController");

//middleware para proteger las rutas
const auth = require("../middleware/auth");

// Define routes
module.exports = function () {
  //agrega nuevos clientes via POST
  router.post("/clientes", auth, clienteController.nuevoCliente);

  //obtener todos los clientes
  router.get("/clientes", auth, clienteController.mostrarClientes);

  //muestra un ususaio expecifico por su id
  router.get("/clientes/:idCliente", auth, clienteController.mostrarCliente);

  //actualizar cliente
  router.put("/clientes/:idCliente", auth, clienteController.actualizarCliente);

  //elimina un cliente
  router.delete(
    "/clientes/:idCliente",
    auth,
    clienteController.eliminarCliente
  );

  /**PRODUCTOS */
  //agregar nuevos productos
  router.post(
    "/productos",
    auth,
    productosController.subirArchivo,
    productosController.nuevoProducto
  );

  //muestra todos los productos
  router.get("/productos", auth, productosController.mostrarProductos);

  //mostrar un producto por su id
  router.get(
    "/productos/:idProducto",
    auth,
    productosController.mostrarProducto
  );

  //actualizar un producto
  router.put(
    "/productos/:idProducto",
    auth,
    productosController.subirArchivo,
    productosController.actualizarProducto
  );

  //eliminar un porducto
  router.delete(
    "/productos/:idProducto",
    auth,
    productosController.eliminarProducto
  );

  //busqueda de productos
  router.post(
    "/productos/busqueda/:query",
    auth,
    productosController.buscarProducto
  );

  /**PEDIDOS */
  //agrega nuevos pedidos
  router.post("/pedidos/nuevo/:idUsuario", auth, pedidosController.nuevoPedido);

  //mostrar todos los pedidos
  router.get("/pedidos", auth, pedidosController.mostrarPedidos);

  //mostrar un pedido por su id
  router.get("/pedidos/:idPedido", auth, pedidosController.mostrarPedido);

  //actualizar los pededidos
  router.put("/pedidos/:idPedido", auth, pedidosController.actualizarPedido);

  //eliminar un pedido
  router.delete("/pedidos/:idPedido", auth, pedidosController.eliminarPedido);

  //crear usuarios
  router.post("/crear-cuenta", auth, usuariosController.registrarUsuarios);

  router.post("/iniciar-sesion", usuariosController.autenticarUsuario);

  return router;
};
