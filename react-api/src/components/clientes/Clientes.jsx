/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import { Cliente } from "./Cliente";
import { Link } from "react-router-dom";
import { Spiner } from "../layout/Spiner";
import { useNavigate } from "react-router-dom";
import { CRMContext } from "../../context/CRMContext";

export const Clientes = () => {
  const navigate = useNavigate(); // Inicializa el hook

  const [guardarClientes, setGuardarClientes] = useState([]);

  // Contexto para la autenticación
  const [auth, setAuth] = useContext(CRMContext);

  useEffect(() => {
    if (auth.token !== "") {
      const consultarApi = async () => {
        try {
          const clientesConsultas = await clienteAxios.get("/clientes", {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });

          //colocal el resultado en el state
          setGuardarClientes(clientesConsultas.data);
        } catch (error) {
          //error con auterizacion
          console.error(error);
          //redireccionar al usuario si hay error con la autenticación
          navigate("/");
        }
      };
      consultarApi();
    } else {
      //redirreccionar al usuario si no tiene el tokebn
      navigate("/");
    }
  }, [guardarClientes]);

  if (!guardarClientes.length) return <Spiner />;
  return (
    <>
      <h2>Clientes</h2>
      <Link to={"/Clientes/nuevo"} className="btn btn-verde     nvo-cliente">
        {" "}
        <i className="fas fa-plus-circle"></i>
        Nuevo Cliente
      </Link>
      <ul className="listado-clientes">
        {guardarClientes.map((cliente) => (
          <Cliente key={cliente._id} cliente={cliente} />
        ))}
      </ul>
    </>
  );
};
