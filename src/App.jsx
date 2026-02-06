import ContenedorTarjeta from "./ContenedorTarjeta";
import Encabezado from "./Encabezado";
import "./App.css";

function App() {
  return (
    <div>
      <Encabezado />
      <ContenedorTarjeta />

      <div className="cuadro-abajo">
        <h1>EVND</h1>
        <h2>Profesor</h2>
        <h3>M.T.I. Ricardo Luna Santos</h3>

        <UserComponent />
        <ProfileComponent />
        <FeedComponent />
      </div>

      <footer className="pie-pagina">
        <p>© 2026 EVND | Entornos Virtuales y Negocios Digitales</p>
        <p>Alumno: Giovanni Gutierrez</p>
      </footer>

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
  
  const users = [
    { id: 1, name: 'Diego', role: 'Web Developer' },
    { id: 2, name: 'Andrea', role: 'Web Designer' },
    { id: 3, name: 'Pao', role: 'Team Leader' },
  ]

      return (
    <>
      <p>Lista de usuarios del sistema</p>
      <ul>
        {
          users.map(function(user, index){
            return (
              <li key={index}> {user.name} es un {user.role} es un {user.role}</li>
            )
          })
        }
      </ul>
    </>
  )
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
