import logo from "./assets/kenny_2.jpg";
import youtube from "./assets/youtube.png";
import facebook from "./assets/facebook.png";
import instagram from "./assets/instagram.png";
import "./Encabezado.css";

function Encabezado() {
    return (
        <div>
            <Logo />
            <Menu />
            <Redes />
            <h2>Bienvenidos a mi sitio</h2>
        </div>
    );
}

function Logo() {
    return (
        <div>
            <img src={logo} alt="Logo del sitio" />
        </div>
    );
}

function Menu() {
    return (
        <nav>
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
        <nav>
            <ul>
                <li><img src={youtube} alt="YouTube" /></li>
                <li><img src={facebook} alt="Facebook" /></li>
                <li><img src={instagram} alt="Instagram" /></li>
            </ul>
        </nav>
    );
}


export default Encabezado;
