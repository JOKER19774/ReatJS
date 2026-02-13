import Acercade from "./Acercade.jsx";
import Contacto from "./Contacto.jsx";
import Sucursales from "./Sucursales.jsx";
import Productos from "./Productos.jsx";
import Galeria from "./Galeria.jsx";
import "./Inicio.css";

const Inicio = ({ seccionActiva, setSeccionActiva }) => {
  return (
    <div className="inicio-container">
      {seccionActiva === "inicio" && (
        <h1>Bienvenido a Inicio</h1>
      )}
      
      <div className="contenido-apartado">
        {seccionActiva === "acerca" && <Acercade />}
        {seccionActiva === "contacto" && <Contacto />}
        {seccionActiva === "sucursales" && <Sucursales />}
        {seccionActiva === "productos" && <Productos />}
        {seccionActiva === "galeria" && <Galeria />}
      </div>
    </div>
  );
}
export default Inicio
