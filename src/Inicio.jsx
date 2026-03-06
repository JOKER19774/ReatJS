import AcercaDe from "./AcercaDe.jsx";
import Contacto from "./Contacto.jsx";
import Sucursales from "./Sucursales.jsx";
import Productos from "./Productos.jsx";
import Galeria from "./Galeria.jsx";
import Clima from "./clima.jsx";
import Usuarios from "./Usuarios.jsx";
import Carrito from "./Carrito.jsx";
import Login from "./Login.jsx";
import "./Inicio.css";

const Inicio = ({
  seccionActiva,
  onComprarProducto,
  productosComprados,
  onEliminarProductoComprado,
  onCambiarCantidadProducto,
  ultimoProductoAgregado,
  onVaciarCarrito,
  onTerminarCompra,
  usuarios,
  setUsuarios,
}) => {
  return (
    <div className="inicio-container">
      {seccionActiva === "inicio" && (
        <>
          <h1>Bienvenido a Inicio</h1>
          <Clima />
        </>
      )}

      <div className="contenido-apartado">
        {seccionActiva === "acerca" && <AcercaDe />}
        {seccionActiva === "contacto" && <Contacto />}
        {seccionActiva === "sucursales" && <Sucursales />}
        {seccionActiva === "productos" && <Productos onComprarProducto={onComprarProducto} />}
        {seccionActiva === "galeria" && <Galeria />}
        {seccionActiva === "usuarios" && (
          <Usuarios usuarios={usuarios} setUsuarios={setUsuarios} />
        )}
        {seccionActiva === "login" && <Login usuarios={usuarios} />}
        {seccionActiva === "carrito" && (
          <Carrito
            productosComprados={productosComprados}
            onEliminarProductoComprado={onEliminarProductoComprado}
            onCambiarCantidadProducto={onCambiarCantidadProducto}
            ultimoProductoAgregado={ultimoProductoAgregado}
            onVaciarCarrito={onVaciarCarrito}
            onTerminarCompra={onTerminarCompra}
          />
        )}
      </div>
    </div>
  );
};

export default Inicio;
