// app/dashboard/configuracion/components/ConfigGeneral.tsx
"use client";

import { useState } from "react";

export function ConfigGeneral() {
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("es");

  return (
    <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
      <h3 className="text-lg font-semibold text-slate-100 mb-4">
        Configuración General
      </h3>

      <div className="flex flex-col gap-4">
        {/* Tema */}
        <div className="flex items-center justify-between">
          <span className="text-slate-300">Modo oscuro</span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition text-white text-sm"
          >
            {darkMode ? "Activado" : "Desactivado"}
          </button>
        </div>

        {/* Idioma */}
        <div className="flex items-center justify-between">
          <span className="text-slate-300">Idioma</span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-slate-800 text-slate-100 border border-slate-700 rounded-lg px-3 py-1"
          >
            <option value="es">Español</option>
            <option value="en">Inglés</option>
          </select>
        </div>
      </div>
    </div>
  );
}
