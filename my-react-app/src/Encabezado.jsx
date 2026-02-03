import logo from "./assets/kenny_2.jpg";
import youtube from "./assets/youtube.png";
import facebook from "./assets/facebook.png";
import instagram from "./assets/instagram.png";
import "./Encabezado.css";

function Encabezado() {
    return (
        <header className="encabezado">
            <Logo />
            <Menu />
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

function Menu() {
    return (
        <nav className="menu">
            <ul>
                <li><a href="#">Inicio</a></li>
                <li><a href="#">Acerca de</a></li>
                <li><a href="#">Productos</a></li>
                <li><a href="#">Contacto</a></li>
                <li><a href="#">Sucursales</a></li>
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
