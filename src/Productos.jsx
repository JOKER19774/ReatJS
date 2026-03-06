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
  const [editandoId, setEditandoId] = useState(null);
  const [formularioEdicion, setFormularioEdicion] = useState({
    title: "",
    price: "",
    image: "",
  });

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
    if (editandoId === id) {
      cancelarEdicion();
    }
  };

  const iniciarEdicion = (producto) => {
    setEditandoId(producto.id);
    setFormularioEdicion({
      title: producto.title ?? "",
      price: String(producto.price ?? ""),
      image: producto.image ?? "",
    });
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setFormularioEdicion({
      title: "",
      price: "",
      image: "",
    });
  };

  const actualizarCampoEdicion = (campo, valor) => {
    setFormularioEdicion((actual) => ({ ...actual, [campo]: valor }));
  };

  const guardarEdicion = (event) => {
    event.preventDefault();

    const tituloValido = formularioEdicion.title.trim() !== "";
    const imagenValida = formularioEdicion.image.trim() !== "";
    const precioNumero = Number(formularioEdicion.price);
    const precioValido = Number.isFinite(precioNumero) && precioNumero > 0;

    if (!tituloValido || !imagenValida || !precioValido) {
      window.alert("Completa titulo, precio valido e imagen para editar el producto.");
      return;
    }

    setProductos((actual) =>
      actual.map((producto) =>
        producto.id === editandoId
          ? {
              ...producto,
              title: formularioEdicion.title.trim(),
              price: Number(precioNumero.toFixed(2)),
              image: formularioEdicion.image.trim(),
            }
          : producto
      )
    );

    window.alert("Cambios realizados con exito.");
    cancelarEdicion();
  };

  if (cargando) return <p className="descripcion">Cargando productos...</p>;

  return (
    <div className="productos">
      <h2>Catalogo Productos</h2>

      {editandoId !== null && (
        <form className="form-editar-producto" onSubmit={guardarEdicion}>
          <h3>Editando producto #{editandoId}</h3>
          <div className="tabla-wrapper">
            <table className="tabla-productos-edicion">
              <thead>
                <tr>
                  <th>Titulo</th>
                  <th>Precio</th>
                  <th>Imagen</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      className="input-producto"
                      type="text"
                      value={formularioEdicion.title}
                      onChange={(event) =>
                        actualizarCampoEdicion("title", event.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="input-producto"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formularioEdicion.price}
                      onChange={(event) =>
                        actualizarCampoEdicion("price", event.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="input-producto"
                      type="text"
                      value={formularioEdicion.image}
                      onChange={(event) =>
                        actualizarCampoEdicion("image", event.target.value)
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="acciones-edicion-producto">
            <button type="submit" className="btn-producto btn-guardar">
              Guardar cambios
            </button>
            <button
              type="button"
              className="btn-producto btn-cancelar"
              onClick={cancelarEdicion}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

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
                className="btn-producto btn-editar"
                onClick={() => iniciarEdicion(producto)}
              >
                Editar
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
