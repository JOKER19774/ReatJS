import { useState } from "react";
import { useAuth } from "./AuthContext.jsx";
import "./Login.css";

function Login({ usuarios, setUsuarios }) {
  const { autenticado, usuarioActual, login, logout } = useAuth();
  const [credenciales, setCredenciales] = useState({ usuario: "", password: "" });
  const [modo, setModo] = useState("login"); // "login" | "register" | "recover"
  const [registro, setRegistro] = useState({
    nombre: "",
    username: "",
    password: "",
    correo: "",
    tipoCuenta: "usuario",
  });
  const [recuperarCorreo, setRecuperarCorreo] = useState("");

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

    login({
      id: usuarioEncontrado.id,
      username: usuarioEncontrado.username,
      nombre: usuarioEncontrado.nombre,
      isDesigner: usuarioEncontrado.isDesigner || false,
    });

    window.alert("Usuario y contrasena correctos. Acceso realizado con exito.");
  };

  const enviarRegistro = (event) => {
    event.preventDefault();
    // validar
    if (
      !registro.nombre.trim() ||
      !registro.username.trim() ||
      !registro.password.trim() ||
      !registro.correo.trim()
    ) {
      window.alert("Completa todos los campos del registro.");
      return;
    }
    if (usuarios.some((u) => u.username === registro.username)) {
      window.alert("El nombre de usuario ya existe.");
      return;
    }
    const nuevoUsuario = {
      id: usuarios.length + 1,
      ...registro,
      isDesigner: registro.tipoCuenta === "disenador",
    };
    setUsuarios([...usuarios, nuevoUsuario]);
    login(nuevoUsuario);
    window.alert("Cuenta creada y sesión iniciada.");
    setModo("login");
  };

  const enviarRecuperacion = (event) => {
    event.preventDefault();
    if (!recuperarCorreo.trim()) {
      window.alert("Escribe un correo para recuperar la contraseña.");
      return;
    }
    window.alert(
      `Se ha enviado un correo de recuperación a ${recuperarCorreo}`
    );
    setRecuperarCorreo("");
    setModo("login");
  };

  return (
    <section className="login">
      <div className="login-avatar" aria-hidden="true">
        <span className="avatar-cabeza"></span>
        <span className="avatar-cuerpo"></span>
      </div>
      <h2>USER LOGIN</h2>
      {autenticado && (
        <p className="estado-login">
          Sesion iniciada: <strong>{usuarioActual?.username}</strong>
        </p>
      )}

      {modo === "login" && (
        <form className="form-login" onSubmit={enviarLogin}>
          <div className="campo-login">
            <span className="icono-campo" aria-hidden="true">U</span>
            <input
              className="input-login"
              type="text"
              autoComplete="username"
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
              autoComplete="current-password"
              placeholder="Password"
              value={credenciales.password}
              onChange={(event) => actualizarCampo("password", event.target.value)}
              required
            />
          </div>

          <div className="fila-opciones-login">
            <button
              className="link-accion-login"
              type="button"
              onClick={() => setModo("register")}
            >
              Crear cuenta
            </button>
            <button
              className="link-accion-login"
              type="button"
              onClick={() => setModo("recover")}
            >
              Recuperar contrasena
            </button>
          </div>

          <button className="btn-login btn-acceder" type="submit">
            ACCEDER
          </button>
          {autenticado && (
            <button className="btn-login btn-salir" type="button" onClick={logout}>
              CERRAR SESION
            </button>
          )}
        </form>
      )}

      {modo === "register" && (
        <form className="form-login" onSubmit={enviarRegistro}>
          <div className="campo-login">
            <input
              className="input-login"
              type="text"
              placeholder="Nombre completo"
              value={registro.nombre}
              onChange={(e) => setRegistro({ ...registro, nombre: e.target.value })}
              required
            />
          </div>
          <div className="campo-login">
            <input
              className="input-login"
              type="text"
              placeholder="Username"
              value={registro.username}
              onChange={(e) => setRegistro({ ...registro, username: e.target.value })}
              required
            />
          </div>
          <div className="campo-login">
            <input
              className="input-login"
              type="password"
              placeholder="Password"
              value={registro.password}
              onChange={(e) => setRegistro({ ...registro, password: e.target.value })}
              required
            />
          </div>
          <div className="campo-login">
            <input
              className="input-login"
              type="email"
              placeholder="Correo"
              value={registro.correo}
              onChange={(e) => setRegistro({ ...registro, correo: e.target.value })}
              required
            />
          </div>
          <div className="campo-login campo-tipo-cuenta">
            <span className="etiqueta-tipo-cuenta">Quiero registrarme como:</span>
            <div className="opciones-tipo-cuenta">
              <label className="opcion-tipo-cuenta">
                <input
                  type="radio"
                  name="tipoCuenta"
                  value="usuario"
                  checked={registro.tipoCuenta === "usuario"}
                  onChange={(e) => setRegistro({ ...registro, tipoCuenta: e.target.value })}
                />
                <span>Usuario</span>
              </label>
              <label className="opcion-tipo-cuenta">
                <input
                  type="radio"
                  name="tipoCuenta"
                  value="disenador"
                  checked={registro.tipoCuenta === "disenador"}
                  onChange={(e) => setRegistro({ ...registro, tipoCuenta: e.target.value })}
                />
                <span>Diseñador</span>
              </label>
            </div>
          </div>
          <div className="fila-opciones-login">
            <button
              className="link-accion-login"
              type="button"
              onClick={() => setModo("login")}
            >
              Volver
            </button>
          </div>
          <button className="btn-login btn-acceder" type="submit">
            Registrarse
          </button>
        </form>
      )}

      {modo === "recover" && (
        <form className="form-login" onSubmit={enviarRecuperacion}>
          <div className="campo-login">
            <input
              className="input-login"
              type="email"
              placeholder="Correo de recuperación"
              value={recuperarCorreo}
              onChange={(e) => setRecuperarCorreo(e.target.value)}
              required
            />
          </div>
          <div className="fila-opciones-login">
            <button
              className="link-accion-login"
              type="button"
              onClick={() => setModo("login")}
            >
              Volver
            </button>
          </div>
          <button className="btn-login btn-acceder" type="submit">
            Enviar correo
          </button>
        </form>
      )}
    </section>
  );
}

export default Login;
