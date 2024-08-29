import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import { CRMContext } from "../../context/CRMContext";

export const NuevoCliente = () => {
  // Contexto para la autenticación
  const [auth] = useContext(CRMContext);
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga

  const [guardarCliente, setGuardarCliente] = useState({
    nombre: "",
    apellido: "",
    empresa: "",
    email: "",
    telefono: "",
  });

  const navigate = useNavigate();

  //leer los datos del formulario
  const actualiazarState = (e) => {
    setGuardarCliente({
      ...guardarCliente,
      [e.target.name]: e.target.value,
    });
  };

  //añade en la REST API un cliente nuevo
  const agregarCliente = (e) => {
    e.preventDefault();
    clienteAxios.post("/clientes", guardarCliente).then((res) => {
      if (res.data.code === 11000) {
        Swal.fire({
          type: "error",
          title: "Hubo un error",
          text: "Ese cliente ya está registrado",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Se agregó el cliente",
          text: "El cliente se agregó correctamente",
          icon: "success",
        });
      }
    });
    navigate("/");
  };

  //validar formulario
  const validarCliente = () => {
    const { nombre, apellido, email, empresa, telefono } = guardarCliente;
    return (
      !nombre.length ||
      !apellido.length ||
      !email.length ||
      !empresa.length ||
      !telefono.length
    );
  };

  //verificar si el usuario está autenticado
  useEffect(() => {
    if (!auth.auth) {
      navigate("/"); // Redirige si no está autenticado
    } else {
      setIsLoading(false); // Cambiar el estado de carga cuando la autenticación se verifique
    }
  }, [auth, navigate]);

  // No renderizar nada mientras se verifica la autenticación
  if (isLoading) return null;

  return (
    <>
      <h2>Nuevo cliente</h2>
      <form onSubmit={agregarCliente}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Cliente"
            name="nombre"
            onChange={actualiazarState}
          />
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input
            type="text"
            placeholder="Apellido Cliente"
            name="apellido"
            onChange={actualiazarState}
          />
        </div>

        <div className="campo">
          <label>Empresa:</label>
          <input
            type="text"
            placeholder="Empresa Cliente"
            name="empresa"
            onChange={actualiazarState}
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email Cliente"
            name="email"
            onChange={actualiazarState}
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input
            type="number"
            placeholder="Teléfono Cliente"
            name="telefono"
            onChange={actualiazarState}
          />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Cliente"
            disabled={validarCliente()}
          />
        </div>
      </form>
    </>
  );
};
