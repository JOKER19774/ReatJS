import "./Galeria.css";
import gtaImg from "./assets/gta.jpg";
import minecraftImg from "./assets/minecraft.jpg";
import sonicImg from "./assets/sonic.jpg";
import zeldaImg from "./assets/zelda.jpg";
import kirbyImg from "./assets/kirbys.jpg";
import liesOfImg from "./assets/lies of.jpg";
import lastOfUsImg from "./assets/the last ofus.jpg";
import streetsImg from "./assets/streets.jpg";

function Galeria() {
    const imagenes = [
        { id: 1, titulo: "Grand Theft Auto", src: gtaImg, experiencia: "Experiencia de Grand Theft Auto" },
        { id: 2, titulo: "Minecraft", src: minecraftImg, experiencia: "Experiencia de Minecraft" },
        { id: 3, titulo: "Sonic", src: sonicImg, experiencia: "Experiencia de Sonic" },
        { id: 4, titulo: "Streets", src: streetsImg, experiencia: "Experiencia de Streets" },
        { id: 5, titulo: "Zelda", src: zeldaImg, experiencia: "Experiencia de Zelda" },
        { id: 6, titulo: "Kirby", src: kirbyImg, experiencia: "Experiencia de Kirby" },
        { id: 7, titulo: "Lies of P", src: liesOfImg, experiencia: "Experiencia de Lies of P" },
        { id: 8, titulo: "The Last of Us", src: lastOfUsImg, experiencia: "Experiencia de The Last of Us" },    ];

    return (
        <div className="galeria">
            <h2>Galería</h2>
            <div className="galeria-grid">
                {imagenes.map((imagen) => (
                    <div key={imagen.id} className="galeria-item">
                        <img src={imagen.src} alt={imagen.titulo} />
                        <p>{imagen.titulo}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Galeria;

