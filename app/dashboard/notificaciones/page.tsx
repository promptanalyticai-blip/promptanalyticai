"use client";

import { useEffect, useState } from "react";
import { cargarNotificaciones } from "@/lib/notifications";

export default function NotificacionesPage() {
  const [lista, setLista] = useState<any[]>([]);

  async function load() {
    const workspaceId = localStorage.getItem("workspace_id");
    const { data } = await cargarNotificaciones(workspaceId!);
    setLista(data || []);
  }

  useEffect(() => {
    load();

    function handler() {
      load();
    }

    window.addEventListener("nueva_notificacion", handler);
    return () => window.removeEventListener("nueva_notificacion", handler);
  }, []);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold mb-6">Notificaciones</h1>

      <div className="space-y-4">
        {lista.map((n) => (
          <div key={n.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="font-semibold">{n.tipo}</p>
            <p className="text-sm">{n.mensaje}</p>
            <p className="text-xs mt-1 opacity-70">
              {new Date(n.creado).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
