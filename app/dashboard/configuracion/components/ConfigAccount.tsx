// app/dashboard/configuracion/components/ConfigAccount.tsx
"use client";

import { useState } from "react";

export function ConfigAccount() {
  const [email, setEmail] = useState("usuario@example.com");
  const [name, setName] = useState("Usuario");

  return (
    <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
      <h3 className="text-lg font-semibold text-slate-100 mb-4">
        Configuración de la Cuenta
      </h3>

      <div className="flex flex-col gap-4">
        {/* Nombre */}
        <div className="flex flex-col">
          <label className="text-slate-300 text-sm mb-1">Nombre</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-slate-800 text-slate-100 border border-slate-700 rounded-lg px-3 py-2"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-slate-300 text-sm mb-1">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-slate-800 text-slate-100 border border-slate-700 rounded-lg px-3 py-2"
          />
        </div>

        <button className="mt-4 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition text-white font-medium">
          Guardar cambios
        </button>
      </div>
    </div>
  );
}
