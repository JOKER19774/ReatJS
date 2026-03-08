import "./NieblaNegra.css";

function NieblaNegra({ children, className = "" }) {
  const clases = ["niebla-negra", className].filter(Boolean).join(" ");

  return (
    <div className={clases}>
      {children}
      <span className="niebla-capa niebla-capa-1" aria-hidden="true" />
      <span className="niebla-capa niebla-capa-2" aria-hidden="true" />
      <span className="niebla-capa niebla-capa-3" aria-hidden="true" />
    </div>
  );
}

export default NieblaNegra;
