/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import clienteAxios from "../../config/axios";
import { Producto } from "./Producto";
import { Spiner } from "../layout/Spiner";
import { useNavigate } from "react-router-dom";
import { CRMContext } from "../../context/CRMContext";

export const Productos = () => {
  const navigate = useNavigate(); // Inicializa el hook
  // Contexto para la autenticación
  const [auth, setAuth] = useContext(CRMContext);

  //productos = state, para guardar la funcion en el state
  const [guardarProductos, setGuardarProductos] = useState([]);

  //useEffect para consultar la api cuando carga el componente
  useEffect(() => {
    if (auth.token !== "") {
      // funcion para consultar la api
      const consultarApi = async () => {
        try {
          const productosConsulta = await clienteAxios.get("/productos", {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          setGuardarProductos(productosConsulta.data);
        } catch (error) {
          //error con auterizacion
          console.error(error);
          //redireccionar al usuario si hay error con la autenticación
          navigate("/");
        }
      };

      //llamar a la api
      consultarApi();
    } else {
      //redirreccionar al usuario si no tiene el tokebn
      navigate("/");
    }
  }, [guardarProductos]);

  //spiner de carga
  if (!guardarProductos.length) return <Spiner />;

  return (
    <>
      <h2>Productos</h2>

      <Link to={"/productos/nuevo"} className="btn btn-verde nvo-cliente">
        {" "}
        <i className="fas fa-plus-circle"></i>
        Nuevo Producto
      </Link>

      <ul className="listado-productos">
        {guardarProductos.map((producto) => (
          <Producto key={producto._id} producto={producto} />
        ))}
      </ul>
    </>
  );
};
