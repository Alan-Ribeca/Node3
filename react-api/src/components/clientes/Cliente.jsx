import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
/* eslint-disable react/prop-types */
export const Cliente = ({ cliente }) => {
  const { _id, nombre, apellido, email, empresa, telefono } = cliente;

  //eliminar cliente
  const eliminarCliente = (id) => {
    Swal.fire({
      title: "Deseas eliminar este cliente?",
      text: "Un cliente eliminado no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        clienteAxios.delete(`/clientes/${id}`);
        Swal.fire({
          title: "Cliente eliminado",
          text: "El cliente fue eliminado correctamente",
          icon: "success",
        });
      }
    });
  };

  return (
    <li className="cliente">
      <div className="info-cliente">
        <p className="nombre">
          {nombre} {apellido}
        </p>
        <p className="empresa">{empresa}</p>
        <p>{email}</p>
        <p>{telefono}</p>
      </div>
      <div className="acciones">
        <Link to={`/Clientes/editar/${_id}`} className="btn btn-azul">
          <i className="fas fa-pen-alt"></i>
          Editar Cliente
        </Link>
        <Link to={`/Pedidos/nuevo/${_id}`} className="btn btn-amarillo">
          <i className="fas fa-plus"></i>
          Nuevo pedido
        </Link>
        <button
          type="button"
          onClick={() => eliminarCliente(_id)}
          className="btn btn-rojo btn-eliminar"
        >
          <i className="fas fa-times"></i>
          Eliminar Cliente
        </button>
      </div>
    </li>
  );
};
