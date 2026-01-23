import logo from "./assets/kenny 2.jpg";
import youtube from "./assets/redes/youtube.png";
import facebook from "./assets/redes/facebook.png";
import instagram from "./assets/redes/instagram.png";

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
        <div className="Logo">
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
