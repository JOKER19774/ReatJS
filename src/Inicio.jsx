import AcercaDe from "./AcercaDe.jsx";
import Contacto from "./Contacto.jsx";
import Sucursales from "./Sucursales.jsx";
import Productos from "./Productos.jsx";
import Galeria from "./Galeria.jsx";
import Clima from "./clima.jsx";
import Usuarios from "./Usuarios.jsx";
import Carrito from "./Carrito.jsx";
import Login from "./Login.jsx";
import NieblaNegra from "./NieblaNegra.jsx";
import { useAuth } from "./AuthContext.jsx";
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
  const { autenticado, esDisenador } = useAuth();
  const seccionesProtegidas = ["productos", "carrito", "usuarios"];
  const intentandoSeccionProtegida = seccionesProtegidas.includes(seccionActiva);
  const mostrarApartadoNoLogeado = intentandoSeccionProtegida && !autenticado;
  const intentoUsuariosNoDesigner = seccionActiva === "usuarios" && autenticado && !esDisenador;

  return (
    <div className="inicio-container">
      {seccionActiva === "inicio" && (
        <NieblaNegra>
          <h1>Bienvenido a Inicio</h1>
          <Clima />
        </NieblaNegra>
      )}

      <div className="contenido-apartado">
        {mostrarApartadoNoLogeado && (
          <NieblaNegra>
            <section className="apartado-no-logeado">
              <h2>Debes iniciar sesion</h2>
              <p>
                Esta seccion requiere acceso para mostrar componentes protegidos:
                Productos, Carrito y Usuarios.
              </p>
              <Login usuarios={usuarios} />
            </section>
          </NieblaNegra>
        )}

        {intentoUsuariosNoDesigner && (
          <NieblaNegra>
            <section className="apartado-no-logeado">
              <h2>Acceso restringido</h2>
              <p>Solo los diseñadores pueden ver y editar la lista de usuarios.</p>
            </section>
          </NieblaNegra>
        )}

        {seccionActiva === "acerca" && (
          <NieblaNegra>
            <AcercaDe />
          </NieblaNegra>
        )}
        {seccionActiva === "contacto" && (
          <NieblaNegra>
            <Contacto />
          </NieblaNegra>
        )}
        {seccionActiva === "sucursales" && (
          <NieblaNegra>
            <Sucursales />
          </NieblaNegra>
        )}
        {seccionActiva === "productos" && autenticado && (
          <NieblaNegra>
            <Productos onComprarProducto={onComprarProducto} />
          </NieblaNegra>
        )}
        {seccionActiva === "galeria" && (
          <NieblaNegra>
            <Galeria />
          </NieblaNegra>
        )}
        {seccionActiva === "usuarios" && autenticado && esDisenador && (
          <NieblaNegra>
            <Usuarios usuarios={usuarios} setUsuarios={setUsuarios} />
          </NieblaNegra>
        )}
        {seccionActiva === "login" && (
          <NieblaNegra>
            <Login usuarios={usuarios} setUsuarios={setUsuarios} />
          </NieblaNegra>
        )}
        {seccionActiva === "carrito" && autenticado && (
          <NieblaNegra>
            <Carrito
              productosComprados={productosComprados}
              onEliminarProductoComprado={onEliminarProductoComprado}
              onCambiarCantidadProducto={onCambiarCantidadProducto}
              ultimoProductoAgregado={ultimoProductoAgregado}
              onVaciarCarrito={onVaciarCarrito}
              onTerminarCompra={onTerminarCompra}
            />
          </NieblaNegra>
        )}
      </div>
    </div>
  );
};

export default Inicio;
