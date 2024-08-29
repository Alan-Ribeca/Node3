/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import { useParams } from "react-router-dom";

export const EditarClientes = () => {
  const [datosClientes, setDatosClientes] = useState({
    nombre: "",
    apellido: "",
    empresa: "",
    email: "",
    telefono: "",
  });

  const navigate = useNavigate(); // Inicializa el hook

  //obtener el id del cliente a actualizar
  const { id } = useParams();

  //Query a la API
  const consultarApi = async () => {
    const clienteConsulta = await clienteAxios.get(`/clientes/${id}`);

    //colocar los datos en el state
    setDatosClientes(clienteConsulta.data);
  };

  //useEffect cuando carga el componente
  useEffect(() => {
    consultarApi();
  }, [id]);

  //leer los datos del formulario
  const actualiazarState = (e) => {
    //obtener una copia del state actual
    setDatosClientes({
      ...datosClientes,
      [e.target.name]: e.target.value,
    });
  };

  //envia una peticion por axios para actualiza el cliente
  const actualizaCliente = (e) => {
    e.preventDefault();

    //enviar la peticion por axios
    clienteAxios
      .put(`/clientes/${datosClientes._id}`, datosClientes)
      .then((res) => {
        //validar errores de mongo
        if (res.data.code === 11000) {
          Swal.fire({
            type: "error",
            title: "Hubo un error",
            text: "No se pudo actualizar el cliente",
            icon: "error",
          });
        } else {
          Swal.fire({
            title: "Cliente actualizado",
            text: "El cliente se actualizo correctamente",
            icon: "success",
          });
        }
      });
    //redirreccionar al usuario una vez creado el usuario
    navigate("/");
  };

  //validar formulario
  const validarCliente = () => {
    //destructuration
    const { nombre, apellido, email, empresa, telefono } = datosClientes;

    //revisar que las propeidades state tengan contenido
    let validar =
      !nombre.length ||
      !apellido.length ||
      !email.length ||
      !empresa.length ||
      !telefono.length;

    //return true o false
    return validar;
  };

  return (
    <>
      <h2>Editar cliente</h2>

      <form onSubmit={actualizaCliente}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Cliente"
            name="nombre"
            onChange={actualiazarState}
            value={datosClientes.nombre}
          />
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input
            type="text"
            placeholder="Apellido Cliente"
            name="apellido"
            onChange={actualiazarState}
            value={datosClientes.apellido}
          />
        </div>

        <div className="campo">
          <label>Empresa:</label>
          <input
            type="text"
            placeholder="Empresa Cliente"
            name="empresa"
            onChange={actualiazarState}
            value={datosClientes.empresa}
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email Cliente"
            name="email"
            onChange={actualiazarState}
            value={datosClientes.email}
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input
            type="number"
            placeholder="Teléfono Cliente"
            name="telefono"
            onChange={actualiazarState}
            value={datosClientes.telefono}
          />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Guardar cambios"
            disabled={validarCliente()}
          />
        </div>
      </form>
    </>
  );
};
