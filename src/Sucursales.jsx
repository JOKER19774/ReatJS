import "./Sucursales.css";
import sucursalCentroImg from "./assets/surcusal.jpg";
import sucursalNorteImg from "./assets/surcusal 2.jpg";
import sucursalSurImg from "./assets/surcusal 3.jpg";

function Sucursales() {
    return (
        <div className="sucursales">
            <h2>Nuestras Sucursales</h2>
            <div className="sucursales-list">
                <div className="sucursal">
                    <img className="sucursal-img" src={sucursalCentroImg} alt="Sucursal Centro" />
                    <h3>Sucursal Centro</h3>
                    <p>Dirección: Calle Principal #123</p>
                    <p>Teléfono: +34 123 456 789</p>
                    <iframe
                        className="sucursal-mapa"
                        title="Mapa Sucursal Centro"
                        src="https://maps.google.com/maps?q=19.4326,-99.1332&z=15&output=embed"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
                <div className="sucursal">
                    <img className="sucursal-img" src={sucursalNorteImg} alt="Sucursal Norte" />
                    <h3>Sucursal Norte</h3>
                    <p>Dirección: Avenida del Norte #456</p>
                    <p>Teléfono: +34 987 654 321</p>
                    <iframe
                        className="sucursal-mapa"
                        title="Mapa Sucursal Norte"
                        src="https://maps.google.com/maps?q=19.5058,-99.1460&z=15&output=embed"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
                <div className="sucursal">
                    <img className="sucursal-img" src={sucursalSurImg} alt="Sucursal Sur" />
                    <h3>Sucursal Sur</h3>
                    <p>Dirección: Avenida del Sur #789</p>
                    <p>Teléfono: +34 555 666 777</p>
                    <iframe
                        className="sucursal-mapa"
                        title="Mapa Sucursal Sur"
                        src="https://maps.google.com/maps?q=19.3467,-99.1617&z=15&output=embed"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}

export default Sucursales;
