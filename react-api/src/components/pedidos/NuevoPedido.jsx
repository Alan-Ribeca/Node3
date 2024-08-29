/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";
import { FormBuscarProd } from "./FormBuscarProd";
import Swal from "sweetalert2";
import { FormCantidadProd } from "./FormCantidadProd";

export const NuevoPedido = () => {
  //extraer el id del cliente
  const { id } = useParams();

  const navigate = useNavigate(); // Inicializa el hook

  const [guardarCliente, setGuardarCliente] = useState({});
  const [busqueda, setBusqueda] = useState("");
  const [guardarProductos, setGuardarProductos] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    //obtener el cliente
    const consultarApi = async () => {
      //consultar el cliente actual
      const resultado = await clienteAxios.get(`/clientes/${id}`);
      //guardamos los datos del cliente en el state
      setGuardarCliente(resultado.data);
    };

    consultarApi();

    //actualizar el total del precio
    actualizarTotal();
  }, [guardarProductos]);

  //funcion para buscar productos en la bd
  const buscarProducto = async (e) => {
    e.preventDefault();
    //obtener los prod de la busqueda
    const resultadoBusqueda = await clienteAxios.post(
      `/productos/busqueda/${busqueda}`
    );

    //si no hay resultados una alerta de lo contrario lo agregamos al state
    if (resultadoBusqueda.data[0]) {
      let productoResultado = resultadoBusqueda.data[0];

      //agregar la llave 'producto' (copia del id)
      productoResultado.producto = resultadoBusqueda.data[0]._id;
      productoResultado.cantidad = 0;

      //ponerlo en el state
      setGuardarProductos((productosPrevios) => [
        ...productosPrevios,
        productoResultado,
      ]);
    } else {
      Swal.fire({
        icon: "error",
        title: "Producto no encontrado",
        text: "No hay resultados para su busqueda",
      });
    }
  };

  //almacenar una busqueda en el state
  const leerDatosBusqueda = (e) => {
    e.preventDefault();
    setBusqueda(e.target.value);
  };

  //actualizar la cantidad de productos
  const restarProductos = (i) => {
    //copiar el arreglo original
    const todosProductos = [...guardarProductos];

    //validar si esta en 0 no puede pedir
    if (todosProductos[i].cantidad === 0) return;

    //decrementar
    todosProductos[i].cantidad--;

    //guardarlos en el state
    setGuardarProductos(todosProductos);
  };

  const aumentarProductos = (i) => {
    //copiar el arreglo original
    const todosProductos = [...guardarProductos];

    //incrementar
    todosProductos[i].cantidad++;

    //almacenarlo en el state
    setGuardarProductos(todosProductos);
  };

  //eliminar un producto del state
  const eliminarProducto = (id) => {
    const todosProductos = guardarProductos.filter(
      (producto) => producto._id !== id
    );

    //actualizar el state
    setGuardarProductos(todosProductos);
  };

  //calcular el total a pagar
  const actualizarTotal = () => {
    //si el array de prod es 0 el precio es 0
    if (guardarProductos.length === 0) {
      setTotal(0);
      return;
    }

    //calcular el total
    let totalPedido = 0;
    guardarProductos.forEach((prod) => {
      totalPedido += prod.precio * prod.cantidad;
    });

    //almacenar el total
    setTotal(totalPedido);
  };

  //almacena el pedido en la bd los productos
  const realizarPedido = async (e) => {
    e.preventDefault();

    //construir el objeto
    const pedido = {
      cliente: id,
      pedido: guardarProductos,
      total: total,
    };

    //almacenarlo en la base de datos
    const resultado = await clienteAxios.post(`/pedidos/nuevo/${id}`, pedido);

    //leer resultado
    if (resultado.status === 200) {
      //todo bien
      Swal.fire({
        icon: "success",
        title: "Pedido realizado con éxito",
        text: "El pedido ha sido almacenado en la base de datos",
      });
      //limpiar el state
      setBusqueda("");
      setGuardarProductos([]);
      setTotal(0);
      //redireccionar al usuario
      navigate(`/productos`);
    } else {
      //error
      Swal.fire({
        icon: "error",
        title: "Error al realizar el pedido",
        text: "Hubo un problema al almacenar el pedido en la base de datos",
      });
    }
  };

  return (
    <>
      <h2>Nuevo Pedido</h2>

      <div className="ficha-cliente">
        <h3>Datos de Cliente</h3>
        <p>
          {guardarCliente.nombre} {guardarCliente.apellido}
        </p>
        <p>Telefono: {guardarCliente.telefono}</p>
      </div>

      <FormBuscarProd
        buscarProducto={buscarProducto}
        leerDatosBusqueda={leerDatosBusqueda}
      />

      <ul className="resumen">
        {guardarProductos.map((producto, index) => (
          <FormCantidadProd
            key={producto.producto}
            producto={producto}
            restarProductos={restarProductos}
            aumentarProductos={aumentarProductos}
            eliminarProducto={eliminarProducto}
            index={index}
          />
        ))}
      </ul>
      <p className="total">
        Total a pagar <span>$ {total}</span>
      </p>

      {total > 0 ? (
        <form onSubmit={realizarPedido}>
          <input
            type="submit"
            className="btn btn-verde btn-block"
            value="Realizar pedido"
          />
        </form>
      ) : null}
    </>
  );
};
