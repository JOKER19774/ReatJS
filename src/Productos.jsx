import { useEffect, useState } from 'react';
import api from './Services/api';
import './Productos.css';

const imagenesJuegos = Object.entries(
  import.meta.glob('./assets/juegos/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
  })
)
  .sort(([rutaA], [rutaB]) => rutaA.localeCompare(rutaB))
  .map(([, imagen]) => imagen);

const catalogoJuegos = [
  { nombre: 'The Legend of Zelda', precio: 69.99 },
  { nombre: 'The Last of Us', precio: 59.99 },
  { nombre: 'Street Fighter', precio: 49.99 },
  { nombre: 'Sonic Origins', precio: 39.99 },
  { nombre: 'Minecraft', precio: 29.99 },
  { nombre: 'Grand Theft Auto V', precio: 34.99 },
  { nombre: 'Lies of P', precio: 54.99 },
  { nombre: "Kirby's Adventure", precio: 44.99 },
  { nombre: 'Halo Infinite', precio: 39.99 },
  { nombre: 'Forza Horizon', precio: 49.99 },
  { nombre: 'God of War', precio: 59.99 },
  { nombre: 'Resident Evil 4', precio: 57.99 },
  { nombre: 'Elden Ring', precio: 64.99 },
  { nombre: 'FIFA 26', precio: 69.99 },
  { nombre: 'Call of Duty', precio: 74.99 },
  { nombre: 'Mario Kart 8', precio: 52.99 },
];

function Productos({ onComprarProducto }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [articuloAgregado, setArticuloAgregado] = useState(null);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await api.get('/products');
        const productosAjustados = response.data.map((producto, index) => ({
          ...catalogoJuegos[index % catalogoJuegos.length],
          ...producto,
          title: catalogoJuegos[index % catalogoJuegos.length].nombre,
          image: imagenesJuegos[index % imagenesJuegos.length] ?? producto.image,
          price: catalogoJuegos[index % catalogoJuegos.length].precio,
        }));
        setProductos(productosAjustados);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, []);

  const comprarProducto = (producto) => {
    if (onComprarProducto) {
      onComprarProducto(producto);
    }
    setArticuloAgregado(producto);
    setTimeout(() => {
      setArticuloAgregado(null);
    }, 2200);
  };

  const eliminarProducto = (id) => {
    setProductos((actual) => actual.filter((producto) => producto.id !== id));
  };

  if (cargando) return <p className="descripcion">Cargando productos...</p>;

  return (
    <div className="productos">
      <h2>Catalogo Productos</h2>

      {articuloAgregado && (
        <div className="ventana-articulo" role="status" aria-live="polite">
          <img src={articuloAgregado.image} alt={articuloAgregado.title} />
          <div>
            <p className="ventana-titulo">Articulo agregado</p>
            <p>{articuloAgregado.title}</p>
            <p>${articuloAgregado.price}</p>
          </div>
        </div>
      )}

      <div className="productos-list">
        {productos.map((producto) => (
          <article className="producto" key={producto.id}>
            <img src={producto.image} alt={producto.title} />
            <div className="producto-campos">
              <p className="campo titulo">{producto.title}</p>
              <p className="campo precio">${producto.price}</p>
            </div>

            <div className="producto-acciones">
              <button
                type="button"
                className="btn-producto btn-comprar"
                onClick={() => comprarProducto(producto)}
              >
                Comprar producto
              </button>
              <button
                type="button"
                className="btn-producto btn-eliminar"
                onClick={() => eliminarProducto(producto.id)}
              >
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Productos;
