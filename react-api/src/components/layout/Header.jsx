import { useContext } from "react";
import { CRMContext } from "../../context/CRMContext";
import { useNavigate } from "react-router-dom";
export const Header = () => {
  const navigate = useNavigate(); // Inicializa el hook

  // Contexto para la autenticación
  const [auth, setAuth] = useContext(CRMContext);

  const cerrarSesion = () => {
    //auth.auth = false y el token se elimina
    setAuth({
      token: "",
      auth: false,
    });

    localStorage.setItem("token", "");

    //redireccionamos a inciar sesion
    navigate("/iniciar-sesion");
  };
  return (
    <>
      <header className="barra">
        <div className="contenedor">
          <div className="contenido-barra">
            <h1>CRM - Administrador de Clientes</h1>

            {auth.auth ? (
              <button
                type="button"
                className="btn btn-rojo"
                onClick={cerrarSesion}
              >
                <i className="far far-times-circle"></i>
                Cerrar sesion
              </button>
            ) : null}
          </div>
        </div>
      </header>
    </>
  );
};
