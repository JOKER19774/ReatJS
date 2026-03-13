// el enlace de categorías se renderiza exactamente igual que los demás links del menú
function Categorias({ setSeccionActiva }) {
  const handleClick = (e) => {
    e.preventDefault();
    if (setSeccionActiva) setSeccionActiva("productos");
  };

  return (
    <a href="#" onClick={handleClick}>
      Categorías
    </a>
  );
}

export default Categorias;
