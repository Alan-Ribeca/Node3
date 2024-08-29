/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spiner } from "../layout/Spiner";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

export const EditarProductos = () => {
  // Obtener el Id del producto
  const { id } = useParams();

  const navigate = useNavigate(); // Inicializa el hook

  // Estado para guardar los datos del producto
  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    imagen: "", // Asegúrate de usar "imagen" en lugar de "img"
  });

  // Consultar la API para traer el producto a editar
  const consultarApi = async () => {
    try {
      const productoConsulta = await clienteAxios.get(`/productos/${id}`);
      setProducto(productoConsulta.data);
    } catch (error) {
      console.error("Error al obtener el producto:", error);
    }
  };

  // Cuando el componente carga
  useEffect(() => {
    consultarApi();
  }, []);

  // Leer los datos del formulario
  const leerDatos = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  // Guardar la img
  const leerImg = (e) => {
    setProducto({
      ...producto,
      imagen: e.target.files[0], // Almacena el archivo de imagen directamente en el estado "producto"
    });
  };

  // Extraer los datos para llenar el formulario
  const { nombre, precio, imagen } = producto;

  // Verificar si los datos están cargando
  if (!nombre && !precio && !imagen) return <Spiner />;

  // editar el producto en la base de datos
  const editarProducto = async (e) => {
    e.preventDefault();

    //crear un formdata para enviar la img
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("precio", precio);
    formData.append("imagen", imagen);

    try {
      await clienteAxios.put(`/productos/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Lanzar una alerta de OK
      Swal.fire({
        icon: "success",
        title: "Producto editado correctamente",
      });
      // Resetear el formulario y redireccionar
      setProducto({ nombre: "", precio: "", imagen: "" });
      navigate("/productos");
    } catch (error) {
      console.error(
        "Error al editar el producto:",
        error.response ? error.response.data : error.message
      );
      // Lanzar alerta de error
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un error al editar el producto",
      });
    }
  };

  return (
    <>
      <h2>Editar producto</h2>

      <form onSubmit={editarProducto}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Producto"
            name="nombre"
            value={nombre}
            onChange={leerDatos}
          />
        </div>

        <div className="campo">
          <label>Precio:</label>
          <input
            type="number"
            name="precio"
            value={precio}
            min="0.00"
            step="0.01"
            placeholder="Precio"
            onChange={leerDatos}
          />
        </div>

        <div className="campo">
          <label>Imagen:</label>
          {imagen && typeof imagen === "string" ? (
            <img
              src={`http://localhost:5000/${imagen}`}
              alt="Img del producto"
              width="300"
            />
          ) : null}
          <input type="file" name="imagen" onChange={leerImg} />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Editar Producto"
          />
        </div>
      </form>
    </>
  );
};
