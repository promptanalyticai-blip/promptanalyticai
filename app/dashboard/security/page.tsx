"use client";

import { useEffect, useState } from "react";

export default function SecurityPage() {
  const [lista, setLista] = useState<any[]>([]);

  async function cargar() {
    const res = await fetch("/api/security/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();
    setLista(data);
  }

  async function terminar(id: string) {
    await fetch("/api/security/terminate", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" }
    });

    cargar();
  }

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold mb-6">Seguridad de la Cuenta</h1>

      <h2 className="text-xl font-semibold mb-4">Sesiones activas</h2>

      <div className="space-y-4">
        {lista.map((s) => (
          <div
            key={s.id}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            <p className="font-bold">IP: {s.ip}</p>
            <p className="text-sm opacity-80">{s.user_agent}</p>

            <p className="text-xs opacity-60 mt-2">
              {new Date(s.creado).toLocaleString()}
            </p>

            <p className="text-xs mt-1">
              Estado:{" "}
              <span className={s.activo ? "text-green-600" : "text-red-600"}>
                {s.activo ? "Activa" : "Terminada"}
              </span>
            </p>

            {s.activo && (
              <button
                onClick={() => terminar(s.id)}
                className="mt-3 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Terminar sesión
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
