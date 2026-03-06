import { useState } from "react";
import "./Usuarios.css";

const estadoInicialFormulario = {
  nombre: "",
  apellidos: "",
  direccion: "",
  telefono: "",
  correo: "",
  username: "",
  password: "",
};

function Usuarios({ usuarios, setUsuarios }) {
  const [editandoId, setEditandoId] = useState(null);
  const [formulario, setFormulario] = useState(estadoInicialFormulario);

  const iniciarEdicion = (usuario) => {
    setEditandoId(usuario.id);
    setFormulario({ ...usuario });
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setFormulario(estadoInicialFormulario);
  };

  const guardarEdicion = (event) => {
    event.preventDefault();

    const camposCompletos = Object.values(formulario).every((valor) =>
      typeof valor === "string" ? valor.trim() !== "" : true
    );

    if (!camposCompletos) {
      window.alert("Completa todos los campos para editar el usuario.");
      return;
    }

    setUsuarios((actual) =>
      actual.map((usuario) =>
        usuario.id === editandoId ? { ...usuario, ...formulario } : usuario
      )
    );
    window.alert("Cambios realizados con exito.");
    cancelarEdicion();
  };

  const eliminarUsuario = (id) => {
    setUsuarios((actual) => actual.filter((usuario) => usuario.id !== id));
    if (editandoId === id) {
      cancelarEdicion();
    }
  };

  const actualizarCampo = (campo, valor) => {
    setFormulario((actual) => ({ ...actual, [campo]: valor }));
  };

  return (
    <section className="usuarios">
      <h2>Usuarios Registrados</h2>

      {editandoId !== null && (
        <form className="form-editar-usuario" onSubmit={guardarEdicion}>
          <h3>Registrar Usuarios</h3>
          <div className="campos-formulario">
            <label className="campo-edicion">
              <span>Nombre de usuario</span>
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
              <span>Usuario</span>
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
          </div>
          <div className="acciones-edicion-formulario">
            <button className="btn-editar btn-guardar btn-principal" type="submit">
              Registrar
            </button>
            <button
              className="btn-editar btn-cancelar"
              type="button"
              onClick={cancelarEdicion}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

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
              <th>Password</th>
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
                <td>{usuario.password}</td>
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
