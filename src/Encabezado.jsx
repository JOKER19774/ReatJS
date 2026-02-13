import logo from "./assets/kenny_2.jpg";
import youtube from "./assets/youtube.png";
import facebook from "./assets/facebook.png";
import instagram from "./assets/instagram.png";
import "./Encabezado.css";

function Encabezado({ seccionActiva, setSeccionActiva }) {
    return (
        <header className="encabezado">
            <Logo />
            <Menu setSeccionActiva={setSeccionActiva} />
            <Redes />
        </header>
    );
}

function Logo() {
    return (
        <div className="logo">
            <img src={logo} alt="Logo del sitio" />
        </div>
    );
}

function Menu({ setSeccionActiva }) {
    return (
        <nav className="menu">
            <ul>
                <li><a href="#Inicio" onClick={(e) => { e.preventDefault(); setSeccionActiva("inicio"); }}>Inicio</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setSeccionActiva("acerca"); }}>Acerca de</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setSeccionActiva("productos"); }}>Productos</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setSeccionActiva("galeria"); }}>Galería</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setSeccionActiva("contacto"); }}>Contacto</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setSeccionActiva("sucursales"); }}>Sucursales</a></li>
            </ul>
        </nav>
    );
}

function Redes() {
    return (
        <div className="redes">
            <img src={youtube} alt="YouTube" />
            <img src={facebook} alt="Facebook" />
            <img src={instagram} alt="Instagram" />
        </div>
    );
}

export default Encabezado;