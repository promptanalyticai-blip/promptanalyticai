"use client";

import { useEffect, useState } from "react";
import { cargarHistorialDB, marcarFavoritoDB } from "@/lib/historialSupabase";

export default function FavoritosPage() {
  const [favoritos, setFavoritos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function cargar() {
    const { data } = await cargarHistorialDB();
    const soloFavoritos = (data || []).filter((item: any) => item.favorito);
    setFavoritos(soloFavoritos);
    setLoading(false);
  }

  useEffect(() => {
    cargar();
  }, []);

  async function quitarFavorito(id: number) {
    await marcarFavoritoDB(id); // aquí podrías cambiar a false en tu API
    await cargar();
  }

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold mb-6">Favoritos</h1>

      {loading && (
        <p className="text-gray-500 dark:text-gray-300">Cargando favoritos...</p>
      )}

      {!loading && favoritos.length === 0 && (
        <p className="text-gray-500 dark:text-gray-300">
          Aún no tienes análisis marcados como favoritos.
        </p>
      )}

      {!loading && favoritos.length > 0 && (
        <div className="space-y-4">
          {favoritos.map((item) => (
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

              <details className="mt-3">
                <summary className="cursor-pointer text-blue-600 dark:text-blue-400">
                  Ver resultado
                </summary>
                <pre className="whitespace-pre-wrap mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  {item.resultado}
                </pre>
              </details>

              <button
                onClick={() => quitarFavorito(item.id)}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 hover-soft"
              >
                Quitar de favoritos
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
