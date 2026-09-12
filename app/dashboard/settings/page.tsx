"use client";

import { Header } from "../components/Header";
import { useState } from "react";

export default function SettingsPage() {
  const [name, setName] = useState("Mindy");
  const [email, setEmail] = useState("mindy@example.com");
  const [saved, setSaved] = useState(false);

  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Configuración"
        subtitle="Ajustes de tu cuenta y preferencias del sistema"
      />

      {/* Perfil */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-md flex flex-col gap-4">
        <h3 className="text-slate-100 font-semibold text-lg">Perfil</h3>

        <label className="text-slate-300 text-sm">Nombre</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-slate-800 text-slate-100 border border-slate-700 rounded-lg px-3 py-2"
        />

        <label className="text-slate-300 text-sm">Correo electrónico</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-slate-800 text-slate-100 border border-slate-700 rounded-lg px-3 py-2"
        />

        <button
          onClick={save}
          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition text-white font-medium w-fit"
        >
          Guardar cambios
        </button>

        {saved && (
          <p className="text-green-400 text-sm">✔ Cambios guardados</p>
        )}
      </div>

      {/* Preferencias */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-md flex flex-col gap-4">
        <h3 className="text-slate-100 font-semibold text-lg">Preferencias</h3>

        <div className="flex items-center gap-3">
          <input type="checkbox" id="darkmode" checked readOnly />
          <label htmlFor="darkmode" className="text-slate-300 text-sm">
            Modo oscuro (activo por defecto)
          </label>
        </div>

        <div className="flex items-center gap-3">
          <input type="checkbox" id="notifications" defaultChecked />
          <label htmlFor="notifications" className="text-slate-300 text-sm">
            Recibir notificaciones por correo
          </label>
        </div>
      </div>

      {/* Seguridad */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-md flex flex-col gap-4">
        <h3 className="text-slate-100 font-semibold text-lg">Seguridad</h3>

        <button className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition text-white font-medium w-fit">
          Cambiar contraseña
        </button>

        <button className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition text-slate-200 font-medium w-fit">
          Ver actividad de inicio de sesión
        </button>
      </div>
    </div>
  );
}
