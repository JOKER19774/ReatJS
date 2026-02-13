import "./Contacto.css";

function Contacto() {
    return (
        <div className="contacto">
            <h2>Contacto</h2>
            <p>Ponte en contacto con nosotros para más información.</p>
            <form className="contacto-form">
                <input type="text" placeholder="Tu nombre" required />
                <input type="email" placeholder="Tu correo" required />
                <input type="tel" placeholder="Tu teléfono" required />
                <textarea placeholder="Tu mensaje" rows="5" required></textarea>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default Contacto;
