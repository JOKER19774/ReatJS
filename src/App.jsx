import { useState } from "react";
import ContenedorTarjeta from "./ContenedorTarjeta";
import Encabezado from "./Encabezado";
import Inicio from "./Inicio";
import PiePagina from "./PiePagina";
import MapaGeolocalizacion from "./MapaGeolocalizacion.jsx";
import usuariosIniciales from "./usuariosIniciales";
import "./App.css";

function App() {
  const [seccionActiva, setSeccionActiva] = useState("inicio");
  const [productosComprados, setProductosComprados] = useState([]);
  const [ultimoProductoAgregado, setUltimoProductoAgregado] = useState(null);
  const [usuarios, setUsuarios] = useState(usuariosIniciales);

  const agregarProductoAlCarrito = (producto) => {
    setUltimoProductoAgregado({ ...producto, ts: Date.now() });
    setProductosComprados((actual) => {
      const productoExistente = actual.find((item) => item.id === producto.id);

      if (productoExistente) {
        return actual.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }

      return [
        ...actual,
        {
          id: producto.id,
          title: producto.title,
          image: producto.image,
          price: producto.price,
          cantidad: 1,
        },
      ];
    });
  };

  const eliminarProductoComprado = (id) => {
    setProductosComprados((actual) => actual.filter((item) => item.id !== id));
  };

  const cambiarCantidadProducto = (id, delta) => {
    setProductosComprados((actual) =>
      actual
        .map((item) =>
          item.id === id ? { ...item, cantidad: Math.max(1, item.cantidad + delta) } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const vaciarCarrito = () => {
    setProductosComprados([]);
  };

  const terminarCompra = () => {
    if (productosComprados.length === 0) return;
    window.alert("Compra terminada con exito.");
    setProductosComprados([]);
  };

  return (
    <div>
      <Encabezado seccionActiva={seccionActiva} setSeccionActiva={setSeccionActiva} />
      <Inicio
        seccionActiva={seccionActiva}
        setSeccionActiva={setSeccionActiva}
        onComprarProducto={agregarProductoAlCarrito}
        productosComprados={productosComprados}
        onEliminarProductoComprado={eliminarProductoComprado}
        onCambiarCantidadProducto={cambiarCantidadProducto}
        ultimoProductoAgregado={ultimoProductoAgregado}
        onVaciarCarrito={vaciarCarrito}
        onTerminarCompra={terminarCompra}
        usuarios={usuarios}
        setUsuarios={setUsuarios}
      />
      
      {seccionActiva === "inicio" && (
        <>
          <ContenedorTarjeta />

          <div className="cuadro-abajo">
            <FeedComponent />
            <ProfileComponent />
          </div>
        </>
      )}
      
      <PiePagina />
    </div>
  );
}


function ProfileComponent() {
  return <MapaGeolocalizacion />;
}

function FeedComponent() {
  return (
    <>
      <p>
        Nuestra empresa vende consolas de videojuegos de Sega, Xbox, Play y
        Nintendo, y tambien videojuegos para esas mismas consolas.
      </p>
      <p>
        Contamos con consolas nuevas y seminuevas, controles, accesorios,
        membresias y ediciones especiales. Tambien ofrecemos catalogo de juegos
        clasicos y actuales para cada plataforma, con atencion personalizada
        para ayudarte a elegir la mejor opcion segun tu presupuesto y estilo de
        juego.
      </p>
      <p>
        Manejamos preventas, paquetes promocionales con consola + juego,
        mantenimiento basico de controles, instalacion de accesorios y
        recomendaciones por edad, genero y nivel de experiencia.
      </p>
      <p>
        En nuestra tienda puedes encontrar titulos de aventura, deportes,
        carreras, accion, retro y multijugador, ademas de opciones para juego
        local y en linea.
      </p>
      <p>
        Tambien brindamos soporte para configurar cuentas, actualizar consolas y
        resolver dudas tecnicas para que puedas jugar sin complicaciones.
      </p>
    </>
  );
}

export default App;

