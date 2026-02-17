import { useEffect, useState } from "react";

const SUCURSALES = [
  { nombre: "Sucursal Centro", lat: 19.4326, lng: -99.1332 },
  { nombre: "Sucursal Norte", lat: 19.5058, lng: -99.146 },
  { nombre: "Sucursal Sur", lat: 19.3467, lng: -99.1617 },
];

function calcularDistanciaKm(origen, destino) {
  const radioTierraKm = 6371;
  const dLat = ((destino.lat - origen.lat) * Math.PI) / 180;
  const dLng = ((destino.lng - origen.lng) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((origen.lat * Math.PI) / 180) *
      Math.cos((destino.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return radioTierraKm * c;
}

function MapaGeolocalizacion() {
  const [ubicacion, setUbicacion] = useState(null);
  const [error, setError] = useState("");
  const sucursalMasCercana = ubicacion
    ? SUCURSALES.reduce((masCercana, actual) => {
        const distanciaActual = calcularDistanciaKm(ubicacion, actual);
        const distanciaMasCercana = calcularDistanciaKm(ubicacion, masCercana);
        return distanciaActual < distanciaMasCercana ? actual : masCercana;
      }, SUCURSALES[0])
    : null;
  const distanciaKm =
    ubicacion && sucursalMasCercana
      ? calcularDistanciaKm(ubicacion, sucursalMasCercana)
      : null;

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Tu navegador no soporta geolocalizacion.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setUbicacion({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setError("");
      },
      () => {
        setError("No se pudo obtener tu ubicacion.");
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div className="mapa-geolocalizacion">
      <h3>Tu ubicacion en tiempo real</h3>

      {error && <p>{error}</p>}

      {!error && !ubicacion && <p>Obteniendo ubicacion...</p>}

      {ubicacion && (
        <>
          <p>
            Latitud: {ubicacion.lat.toFixed(6)} | Longitud: {ubicacion.lng.toFixed(6)}
          </p>
          <p>
            Distancia a {sucursalMasCercana.nombre}: {distanciaKm.toFixed(2)} km
          </p>
          <p>Ruta desde tu ubicacion actual hacia {sucursalMasCercana.nombre}</p>
          <iframe
            title="Ruta a sucursal"
            src={`https://maps.google.com/maps?saddr=${ubicacion.lat},${ubicacion.lng}&daddr=${sucursalMasCercana.lat},${sucursalMasCercana.lng}&output=embed`}
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: "8px" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </>
      )}
    </div>
  );
}

export default MapaGeolocalizacion;
