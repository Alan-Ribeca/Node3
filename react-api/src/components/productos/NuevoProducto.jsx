import { useState } from "react";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
clienteAxios;
import { useNavigate } from "react-router-dom";

export const NuevoProducto = () => {
  //guardar los productos en el state
  const [guardarProducto, setGuardarProducto] = useState({
    nombre: "",
    precio: "",
  });

  const navigate = useNavigate(); // Inicializa el hook

  //guardar la img
  const [imagen, setImagen] = useState("");

  //leer los datos del formulario
  const leerDatos = (e) => {
    setGuardarProducto({
      //obtener una copia del state y agregar lo nuevo
      ...guardarProducto,
      [e.target.name]: e.target.value,
    });
    console.log(guardarProducto);
  };

  //guardar la img
  const leerImg = (e) => {
    setImagen(e.target.files[0]);
  };

  //almacenar el nuevo producto en la base de datos junto con la img
  const agregarProducto = async (e) => {
    e.preventDefault();

    //crear un formdata para enviar la img
    const formData = new FormData();
    formData.append("nombre", guardarProducto.nombre);
    formData.append("precio", guardarProducto.precio);
    formData.append("imagen", imagen);

    try {
      await clienteAxios.post("/productos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      //lanzar una alerta de OK
      Swal.fire({
        icon: "success",
        title: "Producto agregado correctamente",
      });
      //resetear el formulario y redireccionar
      setGuardarProducto({ nombre: "", precio: "" });
      setImagen("");
      navigate("/productos");
    } catch (error) {
      console.log(error);
      //lanzar alerta de error
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un error al agregar el producto",
      });
    }
  };

  return (
    <>
      <h2>Nuevo Producto</h2>

      <form onSubmit={agregarProducto}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Producto"
            name="nombre"
            onChange={leerDatos}
          />
        </div>

        <div className="campo">
          <label>Precio:</label>
          <input
            type="number"
            name="precio"
            min="0.00"
            step="0.01"
            placeholder="Precio"
            onChange={leerDatos}
          />
        </div>

        <div className="campo">
          <label>Imagen:</label>
          <input type="file" name="imagen" onChange={leerImg} />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Producto"
          />
        </div>
      </form>
    </>
  );
};
