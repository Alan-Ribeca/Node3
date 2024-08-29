 
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";

//cpmtext
import { CRMContext } from "../../context/CRMContext";

export const Login = () => {
  const navigate = useNavigate(); // Inicializa el hook

  //auth y token
  const [auth, setAuth] = useContext(CRMContext);
  console.log(auth);

  //state con los datos del form
  const [guardarCredenciales, setGuardarCredenciales] = useState({});

  //almacenar lo que el usuario escribe en el state
  const leerDatos = (e) => {
    setGuardarCredenciales({
      ...guardarCredenciales,
      [e.target.name]: e.target.value,
    });
  };

  //iniciar sesion en el servidor
  const iniciarSesion = async (e) => {
    e.preventDefault();

    //auntenticar al usuario
    try {
      const respuesta = await clienteAxios.post(
        "/iniciar-sesion",
        guardarCredenciales
      );

      //extraer el token y colocarlo en el localStorage
      const { token } = respuesta.data;
      localStorage.setItem("token", token);

      //colocarl el token en el state
      setAuth({
        token,
        auth: true,
      });

      //alerta inciar sesion OK
      Swal.fire({
        icon: "success",
        title: "Inciar sesion exitosa",
        text: "Bienvenido!",
      });

      //redireccionar al usuario
      navigate("/Clientes");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: error.response.data.mensaje,
      });
    }
  };

  return (
    <>
      <div className="login">
        <h2>Inciar sesion</h2>

        <div className="contenedor-formulario">
          <form onSubmit={iniciarSesion}>
            <div className="campo">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email para inicar sesion"
                onChange={leerDatos}
              />
            </div>

            <div className="campo">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="password para inicar sesion"
                onChange={leerDatos}
              />
            </div>

            <input
              type="submit"
              value="Iniciar sesion"
              className="btn btn-verde btn-block"
            />
          </form>
        </div>
      </div>
    </>
  );
};
