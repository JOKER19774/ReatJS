import { useEffect, useState } from 'react';
import api from './Services/api';
import './Productos.css';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await api.get('/products');
        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, []);

  if (cargando) return <p className="descripcion">Cargando productos...</p>;

  return (
    <div className="productos">
      <h2>Catalogo Productos</h2>

      <div className="productos-list">
        {productos.map((producto) => (
          <article className="producto" key={producto.id}>
            <img src={producto.image} alt={producto.title} />
            <div className="producto-campos">
              <p className="campo titulo">{producto.title}</p>
              <p className="campo precio">${producto.price}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Productos;
