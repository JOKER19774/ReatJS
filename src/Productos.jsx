import "./Productos.css";
import nintendoImg from './assets/consola de nintendo 2.jpg';
import playImg from './assets/consola playstation.jpg';
import xboxImg from './assets/consola xbox.jpg';
import segaImg from './assets/consola sega.jpg';

// Placeholder image (1x1 transparent GIF) kept so the layout reserves image space
const placeholderImg = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
import nintendoLogo from './assets/logo nintendo.png';
import playLogo from './assets/logo playstation.png';
import xboxLogo from './assets/logo xbox.jpg';
import segaLogo from './assets/logo sega.jpg';

function Productos() {
    const productos = [
        { id: 1, title: 'Switch - Edición Especial', platform: 'Nintendo', desc: 'Consola híbrida con edición especial y color rojo intenso.', price: 299.00, img: nintendoImg, rating: 4.5 },
        { id: 2, title: 'PlayStation 5 - Bundle', platform: 'PlayStation', desc: 'Bundle con juego exclusivo y controles adicionales.', price: 499.00, img: playImg, rating: 4.8 },
        { id: 3, title: 'Xbox Series X', platform: 'Xbox', desc: 'Poderosa consola para gaming en 4K y alto rendimiento.', price: 449.00, img: xboxImg, rating: 4.7 },
        { id: 4, title: 'Sega Megadrive Mini', platform: 'Sega', desc: 'Clásica con juegos preinstalados. Retro y coleccionista.', price: 79.00, img: segaImg, rating: 4.2 }
    ];

    return (
        <div className="productos">
            <h2>Recomendados</h2>
            <div className="productos-list" role="list">
                {productos.map(prod => (
                    <article key={prod.id} className="producto" role="listitem">
                        <img src={prod.img} alt={prod.title} />
                        <div className="producto-meta">
                            {/* logo + plataforma */}
                            <div className="platform-row">
                                <img className="platform-logo" src={{ Nintendo: nintendoLogo, PlayStation: playLogo, Xbox: xboxLogo, Sega: segaLogo }[prod.platform]} alt={prod.platform} />
                                <span className="platform">{prod.platform}</span>
                            </div>
                            <h3>{prod.title}</h3>
                            <p className="descripcion">{prod.desc}</p>
                            <div className="producto-bottom">
                                <div className="precio-rating">
                                    <p className="precio">${prod.price.toFixed(2)}</p>
                                    <p className="rating">⭐ {prod.rating}</p>
                                </div>
                                <div className="acciones">
                                    <button className="btn-detalle">Ver detalles</button>
                                    <button className="btn-carrito">Agregar al carrito</button>
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default Productos;
