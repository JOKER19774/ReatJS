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

import { useAuth } from "./AuthContext.jsx";
import Categorias from "./Categorias.jsx";

function Menu({ setSeccionActiva }) {
    const { autenticado, esDisenador, logout } = useAuth();

    // si no está autenticado mostramos la mayoría de apartados, pero no enlace a Usuarios ni Carrito
    if (!autenticado) {
        return (
            <nav className="menu">
                <ul>
                        <li>
                        <a
                            href="#Inicio"
                            onClick={(e) => {
                                e.preventDefault();
                                setSeccionActiva("inicio");
                            }}
                        >
                            Inicio
                        </a>
                    </li>
                    <li className="categoria-item">
                        <Categorias setSeccionActiva={setSeccionActiva} />
                    </li>
                    <li>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setSeccionActiva("acerca");
                            }}
                        >
                            Acerca de
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setSeccionActiva("productos");
                            }}
                        >
                            Productos
                        </a>
                    </li>
                    {/* no mostramos carrito hasta logear */}
                    <li>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setSeccionActiva("galeria");
                            }}
                        >
                            Galería
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setSeccionActiva("contacto");
                            }}
                        >
                            Contacto
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setSeccionActiva("sucursales");
                            }}
                        >
                            Sucursales
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setSeccionActiva("login");
                            }}
                        >
                            Iniciar sesión
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }

    // ya autenticado mostramos todos los apartados incluyendo Usuarios y Carrito
    return (
        <nav className="menu">
            <ul>
                <li>
                    <a
                        href="#Inicio"
                        onClick={(e) => {
                            e.preventDefault();
                            setSeccionActiva("inicio");
                        }}
                    >
                        Inicio
                    </a>
                </li>
                <li className="categoria-item">
                    <Categorias setSeccionActiva={setSeccionActiva} />
                </li>
                <li>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setSeccionActiva("acerca");
                        }}
                    >
                        Acerca de
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setSeccionActiva("productos");
                        }}
                    >
                        Productos
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setSeccionActiva("carrito");
                        }}
                    >
                        Carrito
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setSeccionActiva("usuarios");
                        }}
                    >
                        Usuarios
                    </a>
                </li>
                <li>
                    {autenticado ? (
                        <button
                            className="btn-cerrar-sesion"
                            onClick={() => {
                                logout();
                                setSeccionActiva("inicio");
                            }}
                        >
                            Cerrar sesión
                        </button>
                    ) : (
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setSeccionActiva("login");
                            }}
                        >
                            Iniciar sesión
                        </a>
                    )}
                </li>
                <li>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setSeccionActiva("galeria");
                        }}
                    >
                        Galería
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setSeccionActiva("contacto");
                        }}
                    >
                        Contacto
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setSeccionActiva("sucursales");
                        }}
                    >
                        Sucursales
                    </a>
                </li>
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

