import { useMemo, useState } from "react";
import { useAuth } from "./AuthContext.jsx";
import "./Productos.css";

const imagenesJuegos = Object.entries(
  import.meta.glob("./assets/juegos/*.{jpg,jpeg,png,webp}", {
    eager: true,
    import: "default",
  })
)
  .sort(([rutaA], [rutaB]) => rutaA.localeCompare(rutaB))
  .map(([, imagen]) => imagen);

const catalogoBase = [
  {
    nombre: "The Legend of Zelda: Echoes of Hyrule",
    precio: 69.99,
    plataforma: "Nintendo Switch",
    genero: "Aventura",
    stock: 8,
    descripcion: "Explora mazmorras, resuelve acertijos y salva el reino en una nueva aventura.",
    envio: "Entrega en 24 horas",
  },
  {
    nombre: "The Last of Us Remastered",
    precio: 59.99,
    plataforma: "PlayStation 5",
    genero: "Accion",
    stock: 5,
    descripcion: "Historia intensa, combate sigiloso y graficos mejorados para nueva generacion.",
    envio: "Envio gratis",
  },
  {
    nombre: "Street Fighter Championship Edition",
    precio: 49.99,
    plataforma: "PlayStation 5",
    genero: "Peleas",
    stock: 11,
    descripcion: "Combates competitivos con personajes clasicos y modos para multijugador local.",
    envio: "Entrega en 24 horas",
  },
  {
    nombre: "Sonic Origins Deluxe",
    precio: 39.99,
    plataforma: "Nintendo Switch",
    genero: "Plataformas",
    stock: 10,
    descripcion: "Coleccion de aventuras retro con extras visuales y misiones nuevas.",
    envio: "Envio gratis",
  },
  {
    nombre: "Minecraft Legends Pack",
    precio: 29.99,
    plataforma: "Xbox Series X",
    genero: "Sandbox",
    stock: 18,
    descripcion: "Construye, explora y juega con amigos en mundos infinitos llenos de creatividad.",
    envio: "Digital inmediato",
  },
  {
    nombre: "Grand Theft Auto V Premium",
    precio: 34.99,
    plataforma: "Xbox Series X",
    genero: "Mundo abierto",
    stock: 7,
    descripcion: "Accion urbana, mundo abierto y contenido online en una edicion completa.",
    envio: "Envio gratis",
  },
  {
    nombre: "Lies of P",
    precio: 54.99,
    plataforma: "PlayStation 5",
    genero: "Soulslike",
    stock: 6,
    descripcion: "Reto exigente con combate tactico y una ambientacion oscura inspirada en Pinocchio.",
    envio: "Entrega en 24 horas",
  },
  {
    nombre: "Kirby's Adventure Deluxe",
    precio: 44.99,
    plataforma: "Nintendo Switch",
    genero: "Plataformas",
    stock: 9,
    descripcion: "Colorido, cooperativo y perfecto para sesiones casuales en familia.",
    envio: "Envio gratis",
  },
  {
    nombre: "Halo Infinite",
    precio: 39.99,
    plataforma: "Xbox Series X",
    genero: "Shooter",
    stock: 12,
    descripcion: "Campana epica y multijugador competitivo con la mejor armadura de Master Chief.",
    envio: "Entrega en 24 horas",
  },
  {
    nombre: "Forza Horizon",
    precio: 49.99,
    plataforma: "Xbox Series X",
    genero: "Carreras",
    stock: 14,
    descripcion: "Festival automovilistico con mapa abierto, coches premium y eventos dinamicos.",
    envio: "Digital inmediato",
  },
  {
    nombre: "God of War Ragnarok",
    precio: 59.99,
    plataforma: "PlayStation 5",
    genero: "Accion",
    stock: 8,
    descripcion: "Batallas cinematograficas, exploracion nordica y una historia intensa de Kratos.",
    envio: "Envio gratis",
  },
  {
    nombre: "Resident Evil 4 Remake",
    precio: 57.99,
    plataforma: "PlayStation 5",
    genero: "Survival Horror",
    stock: 4,
    descripcion: "Tension, accion y una reconstruccion moderna de uno de los clasicos del genero.",
    envio: "Entrega en 24 horas",
  },
  {
    nombre: "Elden Ring",
    precio: 64.99,
    plataforma: "Xbox Series X",
    genero: "RPG",
    stock: 6,
    descripcion: "Mundo enorme, exploracion libre y combates desafiantes para jugadores hardcore.",
    envio: "Envio gratis",
  },
  {
    nombre: "EA Sports FC 26",
    precio: 69.99,
    plataforma: "PlayStation 5",
    genero: "Deportes",
    stock: 13,
    descripcion: "Futbol actualizado con plantillas nuevas, modos competitivos y juego online.",
    envio: "Digital inmediato",
  },
  {
    nombre: "Call of Duty Black Ops",
    precio: 74.99,
    plataforma: "Xbox Series X",
    genero: "Shooter",
    stock: 5,
    descripcion: "Campana explosiva, zombies y partidas multijugador llenas de accion.",
    envio: "Entrega en 24 horas",
  },
  {
    nombre: "Mario Kart 8 Deluxe",
    precio: 52.99,
    plataforma: "Nintendo Switch",
    genero: "Carreras",
    stock: 15,
    descripcion: "Competencia familiar, pistas iconicas y diversion local o en linea.",
    envio: "Envio gratis",
  },
];

const productosIniciales = catalogoBase.map((juego, index) => ({
  id: index + 1,
  title: juego.nombre,
  price: juego.precio,
  image: imagenesJuegos[index % imagenesJuegos.length],
  category: juego.genero,
  plataforma: juego.plataforma,
  stock: juego.stock,
  descripcion: juego.descripcion,
  envio: juego.envio,
}));

const estadoInicialFormulario = {
  title: "",
  price: "",
  category: "",
  plataforma: "",
  stock: "",
  descripcion: "",
  envio: "",
};

function Productos({ onComprarProducto }) {
  const { esDisenador } = useAuth();
  const [productos, setProductos] = useState(productosIniciales);
  const [articuloAgregado, setArticuloAgregado] = useState(null);
  const [editandoId, setEditandoId] = useState(null);
  const [formulario, setFormulario] = useState(estadoInicialFormulario);

  const resumen = useMemo(() => {
    const totalStock = productos.reduce((total, producto) => total + Number(producto.stock || 0), 0);
    return { totalStock };
  }, [productos]);

  const comprarProducto = (producto) => {
    onComprarProducto?.(producto);
    setArticuloAgregado(producto);
    setTimeout(() => {
      setArticuloAgregado(null);
    }, 2200);
  };

  const actualizarCampo = (campo, valor) => {
    setFormulario((actual) => ({ ...actual, [campo]: valor }));
  };

  const iniciarEdicion = (producto) => {
    setEditandoId(producto.id);
    setFormulario({
      title: producto.title,
      price: String(producto.price),
      category: producto.category,
      plataforma: producto.plataforma,
      stock: String(producto.stock),
      descripcion: producto.descripcion,
      envio: producto.envio,
    });
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setFormulario(estadoInicialFormulario);
  };

  const guardarProducto = (event) => {
    event.preventDefault();

    const camposCompletos = Object.values(formulario).every((valor) => String(valor).trim() !== "");
    if (!camposCompletos) {
      window.alert("Completa todos los campos del producto.");
      return;
    }

    const productoActualizado = {
      title: formulario.title.trim(),
      price: Number(formulario.price),
      category: formulario.category.trim(),
      plataforma: formulario.plataforma.trim(),
      stock: Number(formulario.stock),
      descripcion: formulario.descripcion.trim(),
      envio: formulario.envio.trim(),
    };

    if (Number.isNaN(productoActualizado.price) || Number.isNaN(productoActualizado.stock)) {
      window.alert("Precio y stock deben ser valores numericos.");
      return;
    }

    setProductos((actual) => {
      if (editandoId !== null) {
        return actual.map((producto) =>
          producto.id === editandoId ? { ...producto, ...productoActualizado } : producto
        );
      }

      const imagen = imagenesJuegos[actual.length % imagenesJuegos.length];
      return [
        ...actual,
        {
          id: actual.length ? Math.max(...actual.map((producto) => producto.id)) + 1 : 1,
          image: imagen,
          ...productoActualizado,
        },
      ];
    });

    window.alert(editandoId !== null ? "Producto actualizado con exito." : "Producto agregado al catalogo.");
    cancelarEdicion();
  };

  const eliminarProducto = (id) => {
    setProductos((actual) => actual.filter((producto) => producto.id !== id));
    if (editandoId === id) {
      cancelarEdicion();
    }
  };

  return (
    <section className="productos">
      <div className="productos-encabezado">
        <div>
          <p className="productos-kicker">{esDisenador ? "Panel de catalogo" : "Tienda en linea"}</p>
          <h2>{esDisenador ? "Gestion de videojuegos" : "Videojuegos disponibles"}</h2>
          <p className="descripcion productos-descripcion">
            {esDisenador
              ? "Como diseñador puedes crear, editar y eliminar articulos del catalogo, ademas de revisar stock y datos comerciales."
              : "Elige tus juegos favoritos, revisa plataforma, stock y agregalos al carrito como en una tienda real."}
          </p>
        </div>
        <div className="productos-resumen">
          <span>{productos.length} articulos</span>
          <span>{resumen.totalStock} piezas en stock</span>
          <span>{esDisenador ? "Modo diseñador" : "Ofertas activas"}</span>
        </div>
      </div>

      {esDisenador && (
        <div className="panel-disenador-productos">
          <form className="form-editar-producto" onSubmit={guardarProducto}>
            <h3>{editandoId !== null ? "Editar producto" : "Registrar producto"}</h3>
            <div className="campos-formulario-producto">
              <label className="campo-edicion-producto">
                <span>Nombre del juego</span>
                <input
                  className="input-producto"
                  type="text"
                  value={formulario.title}
                  onChange={(event) => actualizarCampo("title", event.target.value)}
                />
              </label>
              <label className="campo-edicion-producto">
                <span>Precio</span>
                <input
                  className="input-producto"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formulario.price}
                  onChange={(event) => actualizarCampo("price", event.target.value)}
                />
              </label>
              <label className="campo-edicion-producto">
                <span>Genero</span>
                <input
                  className="input-producto"
                  type="text"
                  value={formulario.category}
                  onChange={(event) => actualizarCampo("category", event.target.value)}
                />
              </label>
              <label className="campo-edicion-producto">
                <span>Plataforma</span>
                <input
                  className="input-producto"
                  type="text"
                  value={formulario.plataforma}
                  onChange={(event) => actualizarCampo("plataforma", event.target.value)}
                />
              </label>
              <label className="campo-edicion-producto">
                <span>Stock</span>
                <input
                  className="input-producto"
                  type="number"
                  min="0"
                  value={formulario.stock}
                  onChange={(event) => actualizarCampo("stock", event.target.value)}
                />
              </label>
              <label className="campo-edicion-producto">
                <span>Envio</span>
                <input
                  className="input-producto"
                  type="text"
                  value={formulario.envio}
                  onChange={(event) => actualizarCampo("envio", event.target.value)}
                />
              </label>
              <label className="campo-edicion-producto campo-edicion-producto-completo">
                <span>Descripcion</span>
                <textarea
                  className="input-producto input-producto-textarea"
                  value={formulario.descripcion}
                  onChange={(event) => actualizarCampo("descripcion", event.target.value)}
                />
              </label>
            </div>
            <div className="acciones-edicion-producto">
              <button className="btn-producto btn-guardar" type="submit">
                {editandoId !== null ? "Guardar cambios" : "Agregar producto"}
              </button>
              <button className="btn-producto btn-cancelar" type="button" onClick={cancelarEdicion}>
                Cancelar
              </button>
            </div>
          </form>

          <div className="tabla-wrapper">
            <table className="tabla-productos-edicion">
              <thead>
                <tr>
                  <th>Juego</th>
                  <th>Plataforma</th>
                  <th>Genero</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Envio</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.title}</td>
                    <td>{producto.plataforma}</td>
                    <td>{producto.category}</td>
                    <td>${Number(producto.price).toFixed(2)}</td>
                    <td>{producto.stock}</td>
                    <td>{producto.envio}</td>
                    <td>
                      <button
                        className="btn-producto btn-editar"
                        type="button"
                        onClick={() => iniciarEdicion(producto)}
                      >
                        Editar
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn-producto btn-eliminar"
                        type="button"
                        onClick={() => eliminarProducto(producto.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!esDisenador && articuloAgregado && (
        <div className="ventana-articulo" role="status" aria-live="polite">
          <img src={articuloAgregado.image} alt={articuloAgregado.title} />
          <div>
            <p className="ventana-titulo">Articulo agregado</p>
            <p>{articuloAgregado.title}</p>
            <p>${Number(articuloAgregado.price).toFixed(2)}</p>
          </div>
        </div>
      )}

      {!esDisenador && (
        <div className="productos-list">
          {productos.map((producto) => (
            <article className="producto" key={producto.id}>
              <div className="producto-imagen-wrapper">
                <img src={producto.image} alt={producto.title} />
              </div>

              <div className="producto-campos">
                <div className="producto-tags">
                  <p className="campo categoria">{producto.category}</p>
                  <p className="campo plataforma">{producto.plataforma}</p>
                </div>
                <p className="campo titulo">{producto.title}</p>
                <p className="campo descripcion-juego">{producto.descripcion}</p>
                <div className="producto-meta">
                  <p className="campo precio">${Number(producto.price).toFixed(2)}</p>
                  <p className="campo envio">{producto.envio}</p>
                </div>
              </div>

              <div className="producto-acciones">
                <button
                  type="button"
                  className="btn-producto btn-comprar"
                  onClick={() => comprarProducto(producto)}
                >
                  Agregar al carrito
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Productos;
