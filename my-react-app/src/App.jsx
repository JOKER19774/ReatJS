function App() {
  return (
    <div>
      <h1>EVND</h1>
      <h2>Profesor</h2>
      <h3>M.T.I. Ricardo Luna Santos</h3>

      <UserComponent />
      <ProfileComponent />
      <FeedComponent />
    </div>
  )
}

function UserComponent(){
  const nombre = "Giovanni";
  const apellido = "Gutierrez";
  const nombrecompleto = <h2>El nombre es: {nombre} y su apellido {apellido}</h2>;

  return <h1>User Component {nombrecompleto}</h1>
}

function ProfileComponent(){

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
  const materiales = [
    { id: 1, material: 'grava' },
    { id: 2, material: 'arena' },
    { id: 3, material: 'pala' },
    { id: 4, material: 'martillo' },
  ];

  return (
    <div>
      <p>Lista de materiales de construcción</p>
      <ul>
        {materiales.map((item) => (
          <li key={item.id}>
            {item.material} es un material
          </li>
        ))}
      </ul>
    </div>
  );
}


export default App