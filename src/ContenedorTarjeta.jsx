import "./ContenedorTarjeta.css";

import nintendo from "./assets/nintendo.png";
import xbox from "./assets/xbox2.jpg";
import sega from "./assets/sega3.png";
import playstation from "./assets/playstation.png";

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
      {tarjetas.map(({ img, texto, descripcion }) => (
        <div className="tarjeta" key={texto}>
          <img src={img} alt={texto} />
          <h3>{texto}</h3>
          <p className="descripcion">{descripcion}</p>
          <button className="btn-vermas">Ver más</button>
        </div>
      ))}
    </div>
  );
};

export default ContenedorTarjeta;
