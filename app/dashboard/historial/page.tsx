"use client";

import { useEffect, useState } from "react";
import { cargarHistorialDB } from "@/lib/historialSupabase";

export default function HistorialPage() {
  const [historial, setHistorial] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function cargar() {
    const { data } = await cargarHistorialDB();
    if (data) setHistorial(data);
    setLoading(false);
  }

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold mb-6">Historial de análisis</h1>

      {loading && (
        <p className="text-gray-500 dark:text-gray-300">Cargando historial...</p>
      )}

      {!loading && historial.length === 0 && (
        <p className="text-gray-500 dark:text-gray-300">
          Aún no hay análisis guardados.
        </p>
      )}

      {!loading && historial.length > 0 && (
        <div className="space-y-4">
          {historial.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer dark:border-gray-600 fade-in hover-soft"
            >
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {new Date(item.fecha).toLocaleString()}
              </p>

              <p className="font-semibold truncate">{item.texto}</p>

              <p className="text-xs text-gray-600 dark:text-gray-400">
                Industria: {item.industria || "Ninguna"}
              </p>

              {item.favorito && (
                <span className="text-brand font-semibold">★ Favorito</span>
              )}

              <details className="mt-3">
                <summary className="cursor-pointer text-blue-600 dark:text-blue-400">
                  Ver resultado
                </summary>
                <pre className="whitespace-pre-wrap mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  {item.resultado}
                </pre>
              </details>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
