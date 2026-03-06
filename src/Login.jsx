import { useState } from "react";
import "./Login.css";

function Login({ usuarios }) {
  const [credenciales, setCredenciales] = useState({
    usuario: "",
    password: "",
  });

  const actualizarCampo = (campo, valor) => {
    setCredenciales((actual) => ({ ...actual, [campo]: valor }));
  };

  const enviarLogin = (event) => {
    event.preventDefault();

    const usuarioEncontrado = usuarios.find(
      (usuario) => usuario.username === credenciales.usuario
    );

    if (!usuarioEncontrado) {
      window.alert("Usuario no encontrado en la tabla de usuarios.");
      return;
    }

    if (usuarioEncontrado.password !== credenciales.password) {
      window.alert("Contrasena incorrecta para ese usuario.");
      return;
    }

    window.alert("Usuario y contrasena correctos. Acceso realizado con exito.");
  };

  return (
    <section className="login">
      <div className="login-avatar" aria-hidden="true">
        <span className="avatar-cabeza"></span>
        <span className="avatar-cuerpo"></span>
      </div>
      <h2>USER LOGIN</h2>
      <form className="form-login" onSubmit={enviarLogin}>
        <div className="campo-login">
          <span className="icono-campo" aria-hidden="true">U</span>
          <input
            className="input-login"
            type="text"
            placeholder="Username"
            value={credenciales.usuario}
            onChange={(event) => actualizarCampo("usuario", event.target.value)}
            required
          />
        </div>

        <div className="campo-login">
          <span className="icono-campo" aria-hidden="true">*</span>
          <input
            className="input-login"
            type="password"
            placeholder="Password"
            value={credenciales.password}
            onChange={(event) => actualizarCampo("password", event.target.value)}
            required
          />
        </div>

        <div className="fila-opciones-login">
          <button className="link-accion-login" type="button">
            Crear cuenta
          </button>
          <button className="link-accion-login" type="button">
            Recuperar contrasena
          </button>
        </div>

        <button className="btn-login btn-acceder" type="submit">
          ACCEDER
        </button>
      </form>
    </section>
  );
}

export default Login;
