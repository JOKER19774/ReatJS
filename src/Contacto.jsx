import { useState } from "react";
import "./Contacto.css";

function Contacto() {
  const [formulario, setFormulario] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    mensaje: "",
  });
  const [estado, setEstado] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormulario((actual) => ({ ...actual, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { nombre, correo, telefono, mensaje } = formulario;
    if (!nombre.trim() || !correo.trim() || !telefono.trim() || !mensaje.trim()) {
      setEstado("Por favor completa todos los campos.");
      return;
    }

    setEstado("Mensaje enviado correctamente.");
    setFormulario({ nombre: "", correo: "", telefono: "", mensaje: "" });
  };

  const limpiarFormulario = () => {
    setFormulario({ nombre: "", correo: "", telefono: "", mensaje: "" });
    setEstado("");
  };

  return (
    <div className="contacto">
      <h2>Contacto</h2>
      <p>Ponte en contacto con nosotros para mas informacion.</p>
      <form className="contacto-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Tu nombre"
          value={formulario.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="correo"
          placeholder="Tu correo"
          value={formulario.correo}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="telefono"
          placeholder="Tu telefono"
          value={formulario.telefono}
          onChange={handleChange}
          required
        />
        <textarea
          name="mensaje"
          placeholder="Tu mensaje"
          rows="5"
          value={formulario.mensaje}
          onChange={handleChange}
          required
        ></textarea>

        <div className="contacto-botones">
          <button type="submit">Enviar</button>
          <button type="button" className="btn-limpiar" onClick={limpiarFormulario}>
            Limpiar
          </button>
        </div>
      </form>
      {estado && <p className="contacto-estado">{estado}</p>}
    </div>
  );
}

export default Contacto;
