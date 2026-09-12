// app/dashboard/security/components/SecuritySettings.tsx
"use client";

import { useState } from "react";

export function SecuritySettings() {
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  function updatePassword() {
    setPasswordUpdated(true);
    setTimeout(() => setPasswordUpdated(false), 2000);
  }

  return (
    <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
      <h3 className="text-lg font-semibold text-slate-100 mb-4">
        Configuración de Seguridad
      </h3>

      <div className="flex flex-col gap-4">
        {/* Cambiar contraseña */}
        <div className="flex flex-col">
          <label className="text-slate-300 text-sm mb-1">
            Nueva contraseña
          </label>
          <input
            type="password"
            className="bg-slate-800 text-slate-100 border border-slate-700 rounded-lg px-3 py-2"
            placeholder="Escribe tu nueva contraseña..."
          />
        </div>

        <button
          onClick={updatePassword}
          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition text-white font-medium"
        >
          Actualizar contraseña
        </button>

        {passwordUpdated && (
          <p className="text-green-400 text-sm mt-2">
            ✔ Contraseña actualizada correctamente
          </p>
        )}
      </div>
    </div>
  );
}
