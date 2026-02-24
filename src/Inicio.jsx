import AcercaDe from "./AcercaDe.jsx";
import Contacto from "./Contacto.jsx";
import Sucursales from "./Sucursales.jsx";
import Productos from "./Productos.jsx";
import Galeria from "./Galeria.jsx";
import Clima from "./clima.jsx";
import Usuarios from "./Usuarios.jsx";
import Carrito from "./Carrito.jsx";
import "./Inicio.css";

const Inicio = ({ seccionActiva }) => {
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
        {seccionActiva === "productos" && <Productos />}
        {seccionActiva === "galeria" && <Galeria />}
        {seccionActiva === "usuarios" && <Usuarios />}
        {seccionActiva === "carrito" && <Carrito />}
      </div>
    </div>
  );
};

export default Inicio;
