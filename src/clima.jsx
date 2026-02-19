import { useEffect, useState } from "react";

function Clima() {
  const [clima, setClima] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const lat = 20.276631197914273;
  const lng = -97.9580923038819;

  useEffect(() => {
    const obtenerClima = async () => {
      if (!API_KEY) {
        setError("No se encontro VITE_OPENWEATHER_API_KEY en .env");
        setCargando(false);
        return;
      }

      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric&lang=es`
        );

        if (!res.ok) {
          throw new Error("Error al obtener el clima");
        }

        const data = await res.json();
        setClima(data);
      } catch (e) {
        setError(e.message || "No se pudo obtener el clima");
      } finally {
        setCargando(false);
      }
    };

    obtenerClima();
  }, [API_KEY, lat, lng]);

  return (
    <div className="Clima">
      {error ? (
        <p>{error}</p>
      ) : clima ? (
        <>
          <p>
            {clima.name} Temp: {Math.round(clima.main.temp)} C | Hum: {clima.main.humidity}%
          </p>
          <p>Descripcion: {clima.weather?.[0]?.description}</p>
        </>
      ) : (
        <p>{cargando ? "Cargando clima..." : "Sin datos de clima"}</p>
      )}
    </div>
  );
}

export default Clima;
