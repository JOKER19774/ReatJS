import { useMemo, useState } from "react";
import "./Usuarios.css";

const estadoInicialFormulario = {
  nombre: "",
  apellidos: "",
  direccion: "",
  telefono: "",
  correo: "",
  username: "",
  password: "",
  tipoCuenta: "usuario",
};

function Usuarios({ usuarios, setUsuarios }) {
  const [editandoId, setEditandoId] = useState(null);
  const [formulario, setFormulario] = useState(estadoInicialFormulario);

  const resumen = useMemo(() => {
    const totalDisenadores = usuarios.filter((usuario) => usuario.isDesigner).length;
    const totalUsuarios = usuarios.length - totalDisenadores;
    return { totalDisenadores, totalUsuarios };
  }, [usuarios]);

  const iniciarEdicion = (usuario) => {
    setEditandoId(usuario.id);
    setFormulario({
      nombre: usuario.nombre || "",
      apellidos: usuario.apellidos || "",
      direccion: usuario.direccion || "",
      telefono: usuario.telefono || "",
      correo: usuario.correo || "",
      username: usuario.username || "",
      password: usuario.password || "",
      tipoCuenta: usuario.isDesigner ? "disenador" : "usuario",
    });
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setFormulario(estadoInicialFormulario);
  };

  const actualizarCampo = (campo, valor) => {
    setFormulario((actual) => ({ ...actual, [campo]: valor }));
  };

  const guardarUsuario = (event) => {
    event.preventDefault();

    const camposCompletos = Object.entries(formulario).every(([campo, valor]) =>
      campo === "tipoCuenta" ? true : String(valor).trim() !== ""
    );

    if (!camposCompletos) {
      window.alert("Completa todos los campos del usuario.");
      return;
    }

    const usernameRepetido = usuarios.some(
      (usuario) =>
        usuario.username.toLowerCase() === formulario.username.trim().toLowerCase() &&
        usuario.id !== editandoId
    );

    if (usernameRepetido) {
      window.alert("Ese nombre de usuario ya existe.");
      return;
    }

    const usuarioNormalizado = {
      nombre: formulario.nombre.trim(),
      apellidos: formulario.apellidos.trim(),
      direccion: formulario.direccion.trim(),
      telefono: formulario.telefono.trim(),
      correo: formulario.correo.trim(),
      username: formulario.username.trim(),
      password: formulario.password.trim(),
      isDesigner: formulario.tipoCuenta === "disenador",
    };

    if (editandoId !== null) {
      setUsuarios((actual) =>
        actual.map((usuario) =>
          usuario.id === editandoId ? { ...usuario, ...usuarioNormalizado } : usuario
        )
      );
      window.alert("Usuario actualizado con exito.");
    } else {
      setUsuarios((actual) => [
        ...actual,
        {
          id: actual.length ? Math.max(...actual.map((usuario) => usuario.id)) + 1 : 1,
          ...usuarioNormalizado,
        },
      ]);
      window.alert("Usuario agregado con exito.");
    }

    cancelarEdicion();
  };

  const eliminarUsuario = (id) => {
    setUsuarios((actual) => actual.filter((usuario) => usuario.id !== id));
    if (editandoId === id) {
      cancelarEdicion();
    }
  };

  return (
    <section className="usuarios">
      <div className="usuarios-encabezado">
        <div>
          <p className="usuarios-kicker">Panel de usuarios</p>
          <h2>Gestion de cuentas</h2>
          <p className="usuarios-descripcion">
            Desde aqui puedes registrar usuarios nuevos, editar cuentas existentes y administrar quien entra como usuario o como disenador.
          </p>
        </div>
        <div className="usuarios-resumen">
          <span>{usuarios.length} cuentas</span>
          <span>{resumen.totalUsuarios} usuarios</span>
          <span>{resumen.totalDisenadores} disenadores</span>
        </div>
      </div>

      <form className="form-editar-usuario" onSubmit={guardarUsuario}>
        <h3>{editandoId !== null ? "Editar usuario" : "Registrar usuario"}</h3>
        <div className="campos-formulario">
          <label className="campo-edicion">
            <span>Nombre</span>
            <input
              className="input-usuario"
              type="text"
              value={formulario.nombre}
              onChange={(event) => actualizarCampo("nombre", event.target.value)}
            />
          </label>
          <label className="campo-edicion">
            <span>Apellidos</span>
            <input
              className="input-usuario"
              type="text"
              value={formulario.apellidos}
              onChange={(event) => actualizarCampo("apellidos", event.target.value)}
            />
          </label>
          <label className="campo-edicion">
            <span>Direccion</span>
            <input
              className="input-usuario"
              type="text"
              value={formulario.direccion}
              onChange={(event) => actualizarCampo("direccion", event.target.value)}
            />
          </label>
          <label className="campo-edicion">
            <span>Telefono</span>
            <input
              className="input-usuario"
              type="text"
              value={formulario.telefono}
              onChange={(event) => actualizarCampo("telefono", event.target.value)}
            />
          </label>
          <label className="campo-edicion">
            <span>Correo</span>
            <input
              className="input-usuario"
              type="email"
              value={formulario.correo}
              onChange={(event) => actualizarCampo("correo", event.target.value)}
            />
          </label>
          <label className="campo-edicion">
            <span>Username</span>
            <input
              className="input-usuario"
              type="text"
              value={formulario.username}
              onChange={(event) => actualizarCampo("username", event.target.value)}
            />
          </label>
          <label className="campo-edicion">
            <span>Password</span>
            <input
              className="input-usuario"
              type="text"
              value={formulario.password}
              onChange={(event) => actualizarCampo("password", event.target.value)}
            />
          </label>
          <div className="campo-edicion campo-edicion-completo">
            <span>Tipo de cuenta</span>
            <div className="opciones-tipo-usuario">
              <label className="opcion-tipo-usuario">
                <input
                  type="radio"
                  name="tipoCuentaUsuario"
                  value="usuario"
                  checked={formulario.tipoCuenta === "usuario"}
                  onChange={(event) => actualizarCampo("tipoCuenta", event.target.value)}
                />
                <span>Usuario</span>
              </label>
              <label className="opcion-tipo-usuario">
                <input
                  type="radio"
                  name="tipoCuentaUsuario"
                  value="disenador"
                  checked={formulario.tipoCuenta === "disenador"}
                  onChange={(event) => actualizarCampo("tipoCuenta", event.target.value)}
                />
                <span>Disenador</span>
              </label>
            </div>
          </div>
        </div>
        <div className="acciones-edicion-formulario">
          <button className="btn-editar btn-guardar btn-principal" type="submit">
            {editandoId !== null ? "Guardar cambios" : "Agregar usuario"}
          </button>
          <button
            className="btn-editar btn-cancelar btn-principal"
            type="button"
            onClick={cancelarEdicion}
          >
            Cancelar
          </button>
        </div>
      </form>

      <div className="tabla-wrapper">
        <table className="tabla-usuarios">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Direccion</th>
              <th>Telefono</th>
              <th>Correo</th>
              <th>Username</th>
              <th>Tipo</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nombre}</td>
                <td>{usuario.apellidos}</td>
                <td>{usuario.direccion}</td>
                <td>{usuario.telefono}</td>
                <td>{usuario.correo}</td>
                <td>{usuario.username}</td>
                <td>{usuario.isDesigner ? "Disenador" : "Usuario"}</td>
                <td>
                  <button
                    className="btn-editar"
                    type="button"
                    onClick={() => iniciarEdicion(usuario)}
                  >
                    Editar
                  </button>
                </td>
                <td>
                  <button
                    className="btn-eliminar"
                    type="button"
                    onClick={() => eliminarUsuario(usuario.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Usuarios;
