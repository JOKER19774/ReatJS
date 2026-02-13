import { useState } from "react";
import ContenedorTarjeta from "./ContenedorTarjeta";
import Encabezado from "./Encabezado";
import Inicio from "./Inicio";
import PiePagina from "./PiePagina";
import "./App.css";

function App() {
  const [seccionActiva, setSeccionActiva] = useState("inicio");

  return (
    <div>
      <Encabezado seccionActiva={seccionActiva} setSeccionActiva={setSeccionActiva} />
      <Inicio seccionActiva={seccionActiva} setSeccionActiva={setSeccionActiva} />
      
      {seccionActiva === "inicio" && (
        <>
          <ContenedorTarjeta />

          <div className="cuadro-abajo">
            <h1>EVND</h1>
            <h2>Profesor</h2>
            <h3>M.T.I. Ricardo Luna Santos</h3>

            <UserComponent />
            <ProfileComponent />
            <FeedComponent />
          </div>
        </>
      )}
      
      <PiePagina />
    </div>
  );
}


function UserComponent(){
  const nombre = "Giovanni";
  const apellido = "Gutierrez";
  const nombrecompleto = <h2>El nombre es: {nombre} y su apellido {apellido}</h2>;

  return <h1>User Component {nombrecompleto}</h1>
}

function ProfileComponent() {
  return (
    <>
      <iframe
        title="Mapa Centro de Xicotepec"
        src="https://maps.google.com/maps?q=20.2766,-97.9617&z=16&output=embed"
        width="100%"
        height="260"
        style={{ border: 0, borderRadius: "8px" }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </>
  );
}

function FeedComponent() {
  return (
    <>
      <p>Diferencias entre videojuegos</p>
      <ul>
        <li>
          Nintendo: Se enfoca en la diversión familiar, juegos creativos y personajes icónicos como Mario y Zelda.
        </li>
        <li>
          Sega: Fue pionera en la industria de los videojuegos, destacando en los años 90 con Sonic.
        </li>
        <li>
          PlayStation: Se caracteriza por gráficos avanzados y juegos con historias más maduras.
        </li>
        <li>
          Xbox: Destaca por su potencia, servicios en línea y el sistema Game Pass.
        </li>
      </ul>
    </>
  );
}

export default App;
