// app/dashboard/security/components/TwoFactorCard.tsx
"use client";

import { useState } from "react";

export function TwoFactorCard() {
  const [enabled, setEnabled] = useState(false);

  function toggle2FA() {
    setEnabled(!enabled);
  }

  return (
    <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
      <h3 className="text-lg font-semibold text-slate-100 mb-4">
        Autenticación en Dos Pasos (2FA)
      </h3>

      <p className="text-slate-300 text-sm mb-4">
        Añade una capa adicional de seguridad a tu cuenta.
      </p>

      <button
        onClick={toggle2FA}
        className={`px-4 py-2 rounded-lg font-medium transition ${
          enabled
            ? "bg-red-600 hover:bg-red-500 text-white"
            : "bg-green-600 hover:bg-green-500 text-white"
        }`}
      >
        {enabled ? "Desactivar 2FA" : "Activar 2FA"}
      </button>

      <p className="text-slate-400 text-sm mt-3">
        Estado actual:{" "}
        <span className={enabled ? "text-green-400" : "text-red-400"}>
          {enabled ? "Activado" : "Desactivado"}
        </span>
      </p>
    </div>
  );
}
