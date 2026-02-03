import "./ContenedorTarjeta.css";

import nintendo from "./assets/nintendo2.jpg";
import xbox from "./assets/xbox2.jpg";
import sega from "./assets/sega2.jpg";
import playstation from "./assets/playstation2.jpg";

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
