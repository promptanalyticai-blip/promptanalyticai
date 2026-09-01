"use client";

import { useState } from "react";

export default function ConfiguracionPage() {
  const [modoOscuro, setModoOscuro] = useState(false);
  const [nombre, setNombre] = useState("");

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold mb-6">Configuración</h1>

      <div className="space-y-6 max-w-lg">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">Preferencias</h2>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={modoOscuro}
              onChange={() => setModoOscuro(!modoOscuro)}
            />
            Activar modo oscuro
          </label>
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">Perfil</h2>

          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre"
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          />

          <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover-soft">
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}
