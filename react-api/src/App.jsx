/* eslint-disable no-unused-vars */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { Header } from "./components/layout/Header";
import { Navegacion } from "./components/layout/Navegacion";

//clientes
import { Clientes } from "./components/clientes/Clientes";
import { NuevoCliente } from "./components/clientes/NuevoCliente";
import { EditarClientes } from "./components/clientes/EditarClientes";

//Productos
import { Productos } from "./components/productos/Productos";
import { EditarProductos } from "./components/productos/EditarProductos";
import { NuevoProducto } from "./components/productos/NuevoProducto";

//pedidos
import { Pedidos } from "./components/pedidos/Pedidos";
import { NuevoPedido } from "./components/pedidos/NuevoPedido";

//login
import { Login } from "./components/auth/Login";

//import el useContext
import { CRMContext, CRMProvider } from "./context/CRMContext";

function App() {
  return (
    <BrowserRouter>
      <CRMProvider>
        <Header />

        <div className="grid contenedor contenido-principal">
          <Navegacion />

          <main className="caja-contenido col-9">
            <Routes>
              <Route path="/Clientes" element={<Clientes />} />
              <Route path="/Clientes/nuevo" element={<NuevoCliente />} />
              <Route path="/Clientes/editar/:id" element={<EditarClientes />} />
              <Route path="/Productos" element={<Productos />} />
              <Route path="/Productos/nuevo" element={<NuevoProducto />} />
              <Route
                path="/Productos/editar/:id"
                element={<EditarProductos />}
              />
              <Route path="/Pedidos" element={<Pedidos />} />
              <Route path="/Pedidos/nuevo/:id" element={<NuevoPedido />} />

              <Route path="/" element={<Login />} />
            </Routes>
          </main>
        </div>
      </CRMProvider>
    </BrowserRouter>
  );
}

export default App;
