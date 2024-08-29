/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";

export const Producto = ({ producto }) => {
  const { _id, nombre, precio, imagen } = producto;

  //elimina un producto
  const eliminarProducto = (id) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "Un producto eliminado no se puede recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        //eliminr el producto de la api
        clienteAxios.delete(`/productos/${id}`).then((res) => {
          if (res.status === 200) {
            Swal.fire("Eliminado", res.data.mensaje, "success");
          }
        });
      }
    });
  };

  return (
    <li className="producto">
      <div className="info-producto">
        <p className="nombre">{nombre}</p>
        <p className="precio">$ {precio} </p>
        {imagen ? (
          <img
            src={`http://localhost:5000/${imagen}`}
            alt="Imagen del producto"
          />
        ) : null}
      </div>
      <div className="acciones">
        <Link to={`/Productos/editar/${_id}`} className="btn btn-azul">
          <i className="fas fa-pen-alt"></i>
          Editar Producto
        </Link>

        <button
          type="button"
          className="btn btn-rojo btn-eliminar"
          onClick={() => eliminarProducto(_id)}
        >
          <i className="fas fa-times"></i>
          Eliminar Cliente
        </button>
      </div>
    </li>
  );
};
