import { useEffect, useState } from "react";
import "./Carrito.css";

function Carrito({
  productosComprados = [],
  onEliminarProductoComprado,
  onCambiarCantidadProducto,
  ultimoProductoAgregado,
  onVaciarCarrito,
  onTerminarCompra,
}) {
  const [notificacionArticulo, setNotificacionArticulo] = useState(null);

  useEffect(() => {
    if (!ultimoProductoAgregado) return;

    setNotificacionArticulo(ultimoProductoAgregado);
    const timeoutId = setTimeout(() => {
      setNotificacionArticulo(null);
    }, 2600);

    return () => clearTimeout(timeoutId);
  }, [ultimoProductoAgregado]);

  const totalComprado = productosComprados.reduce(
    (total, producto) => total + producto.price * producto.cantidad,
    0
  );

  return (
    <section className="carrito">
      <h2>Carrito de compras</h2>

      {notificacionArticulo && (
        <div className="carrito-notificacion" role="status" aria-live="polite">
          <img src={notificacionArticulo.image} alt={notificacionArticulo.title} />
          <div className="carrito-notificacion-texto">
            <p className="carrito-notificacion-titulo">Articulo agregado al carrito</p>
            <p>{notificacionArticulo.title}</p>
            <p>${Number(notificacionArticulo.price).toFixed(2)}</p>
          </div>
        </div>
      )}

      {productosComprados.length === 0 && (
        <p className="carrito-vacio">Tu carrito esta vacio. Agrega productos desde la seccion Productos.</p>
      )}

      {productosComprados.length > 0 && (
        <div className="carrito-lista">
          {productosComprados.map((producto) => (
            <article className="carrito-card" key={producto.id}>
              <img className="carrito-imagen" src={producto.image} alt={producto.title} />
              <h3>{producto.title}</h3>

              <p className="carrito-precio">Precio: ${producto.price.toFixed(2)}</p>

              <div className="carrito-cantidad">
                <button
                  type="button"
                  className="btn-cantidad"
                  onClick={() => onCambiarCantidadProducto?.(producto.id, -1)}
                >
                  -
                </button>
                <span>Cantidad: {producto.cantidad}</span>
                <button
                  type="button"
                  className="btn-cantidad"
                  onClick={() => onCambiarCantidadProducto?.(producto.id, 1)}
                >
                  +
                </button>
              </div>

              <p className="carrito-subtotal">
                Subtotal: ${(producto.price * producto.cantidad).toFixed(2)}
              </p>

              <button
                type="button"
                className="btn-eliminar-item"
                onClick={() => onEliminarProductoComprado?.(producto.id)}
              >
                Eliminar
              </button>
            </article>
          ))}
        </div>
      )}

      {productosComprados.length > 0 && (
        <>
          <p className="carrito-total">Total: ${totalComprado.toFixed(2)}</p>
          <div className="carrito-acciones-finales">
            <button type="button" className="btn-final btn-terminar" onClick={onTerminarCompra}>
              Terminar compra
            </button>
            <button type="button" className="btn-final btn-vaciar" onClick={onVaciarCarrito}>
              Vaciar carrito
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default Carrito;
