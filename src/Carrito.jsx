import { useEffect, useState } from "react";
import api from "./Services/api";
import "./Carrito.css";

function Carrito() {
  const [carritos, setCarritos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerCarritos = async () => {
      try {
        const response = await api.get("/carts");
        setCarritos(response.data.slice(0, 6));
      } catch (error) {
        console.error("Error al obtener carritos:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerCarritos();
  }, []);

  const comprarCarrito = (id) => {
    setCarritos((actual) => actual.filter((carritoItem) => carritoItem.id !== id));
  };

  const formatearFecha = (fechaIso) => {
    const fecha = new Date(fechaIso);
    return fecha.toISOString();
  };

  if (cargando) return <p className="descripcion">Cargando carrito...</p>;

  return (
    <section className="carrito">
      <h2>Carrito de compras</h2>

      {carritos.length === 0 && <p className="carrito-vacio">No hay carritos pendientes.</p>}

      <div className="carrito-lista">
        {carritos.map((carritoItem) => (
          <article className="carrito-card" key={carritoItem.id}>
            <p className="carrito-id">{carritoItem.id}</p>
            <p className="carrito-fecha">{formatearFecha(carritoItem.date)}</p>

            <h3>Productos</h3>
            <ul>
              {carritoItem.products.map((producto, index) => (
                <li key={`${carritoItem.id}-${producto.productId}-${index}`}>
                  Producto #{producto.productId} - Cantidad {producto.quantity}
                </li>
              ))}
            </ul>

            <button type="button" onClick={() => comprarCarrito(carritoItem.id)}>
              Comprar
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Carrito;
