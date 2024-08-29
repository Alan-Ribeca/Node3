/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CRMContext } from "../../context/CRMContext";
export const Navegacion = () => {
  // Contexto para la autenticación
  const [auth, setAuth] = useContext(CRMContext);

  if (!auth.auth) return null;

  return (
    <aside className="sidebar col-3">
      <h2>Administración</h2>

      <nav className="navegacion">
        <Link to="/Clientes" className="clientes">
          Clientes
        </Link>
        <Link to="/Productos" className="productos">
          Productos
        </Link>
        <Link to="Pedidos" className="pedidos">
          Pedidos
        </Link>
      </nav>
    </aside>
  );
};
