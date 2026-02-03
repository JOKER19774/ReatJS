import "./ContenedorTarjeta.css";

import nintendo from "./assets/nintendo.png";
import xbox from "./assets/xbox2.jpg";
import sega from "./assets/sega3.png";
import playstation from "./assets/playstation.png";

const tarjetas = [
  { img: nintendo, texto: "Nintendo" },
  { img: xbox, texto: "Xbox" },
  { img: sega, texto: "SEGA" },
  { img: playstation, texto: "PlayStation" },
];

const ContenedorTarjeta = () => {
  return (
    <div className="contenedor-tarjeta">
      {tarjetas.map(({ img, texto }) => (
        <div className="tarjeta" key={texto}>
          <img src={img} alt={texto} />
          <p>{texto}</p>
        </div>
      ))}
    </div>
  );
};

export default ContenedorTarjeta;
