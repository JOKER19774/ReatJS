import "./ContenedorTarjeta.css";

import nintendo from "./assets/logo nintendo.png";
import xbox from "./assets/logo xbox.jpg";
import sega from "./assets/logo sega.jpg";
import playstation from "./assets/logo playstation.png";

const tarjetas = [
  {
    img: nintendo,
    texto: "Nintendo",
    descripcion: "Consolas enfocadas en diversión familiar y juegos icónicos."
  },
  {
    img: xbox,
    texto: "Xbox",
    descripcion: "Potencia gráfica y servicios como Xbox Game Pass."
  },
  {
  img: sega,
  texto: "SEGA",
  descripcion: "Empresa histórica de videojuegos, creadora de Sonic."
  },
  {
    img: playstation,
    texto: "PlayStation",
    descripcion: "Juegos con historias maduras y gráficos avanzados."
  },
];

const ContenedorTarjeta = () => {
  return (
    <div className="contenedor-tarjeta">
      {tarjetas.map(({ img, texto, descripcion, imgClass }) => (
        <div className="tarjeta" key={texto}>
          {imgClass === 'img-logo' ? (
            <div className={`img-container ${imgClass}`} style={{ backgroundImage: `url(${img})` }} aria-label={texto}></div>
          ) : imgClass ? (
            <img className={imgClass} src={img} alt={texto} onError={(e) => { e.target.onerror = null; e.target.src = sega }} />
          ) : (
            <img src={img} alt={texto} onError={(e) => { e.target.onerror = null; e.target.src = sega }} />
          )}
          <h3>{texto}</h3>
          <p className="descripcion">{descripcion}</p>
          <button className="btn-vermas">Ver más</button>
        </div>
      ))}
    </div>
  );
};

export default ContenedorTarjeta;