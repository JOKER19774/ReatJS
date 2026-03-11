import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuarioActual, setUsuarioActual] = useState(null);

  const login = (usuario) => {
    setUsuarioActual(usuario);
  };

  const logout = () => {
    setUsuarioActual(null);
  };

  const esDisenador = Boolean(usuarioActual?.isDesigner);

  const value = useMemo(
    () => ({
      usuarioActual,
      autenticado: Boolean(usuarioActual),
      esDisenador,
      login,
      logout,
    }),
    [usuarioActual]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider.");
  }

  return context;
}

export default AuthContext;
