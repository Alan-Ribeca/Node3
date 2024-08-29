/* eslint-disable react/prop-types */
export const FormBuscarProd = ({ buscarProducto, leerDatosBusqueda }) => {
  return (
    <>
      <form onSubmit={buscarProducto}>
        <legend>Busca un Producto y agrega una cantidad</legend>

        <div className="campo">
          <label>Productos:</label>
          <input
            type="text"
            placeholder="Nombre Productos"
            name="productos"
            onChange={leerDatosBusqueda}
          />
        </div>

        <input
          type="submit"
          className="btn btn-azul btn-block"
          value="Buscar Productos"
        />
      </form>
    </>
  );
};
