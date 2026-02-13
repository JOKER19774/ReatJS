import "./ContenedorTarjeta.css";

import nintendo from "./assets/consola nintendo.jpg";
import xbox from "./assets/consola xbox.jpg";
import sega from "./assets/consola sega.jpg";
import segaPhoto from "./assets/consola sega.jpg";
import playstation from "./assets/consola playstation.jpg";

const tarjetas = [
  { img: nintendo, texto: "Nintendo" },
  { img: xbox, texto: "Xbox" },
  { img: segaPhoto, texto: "SEGA", imgClass: 'img-photo' },
  { img: playstation, texto: "PlayStation" },
];

const ContenedorTarjeta = () => {
  return (
    <div className="contenedor-tarjeta">
      {tarjetas.map(({ img, texto, imgClass }) => (
        <div className="tarjeta" key={texto}>
          {imgClass === 'img-logo' ? (
            <div className={`img-container ${imgClass}`} style={{ backgroundImage: `url(${img})` }} aria-label={texto}></div>
          ) : imgClass ? (
            <img className={imgClass} src={img} alt={texto} onError={(e) => { e.target.onerror = null; e.target.src = sega }} />
          ) : (
            <img src={img} alt={texto} onError={(e) => { e.target.onerror = null; e.target.src = sega }} />
          )}
          <p>{texto}</p>
        </div>
      ))}
    </div>
  );
};

export default ContenedorTarjeta;
