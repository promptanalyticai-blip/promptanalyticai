"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { cargarActividad } from "@/lib/activity";

export default function ActivityPage() {
  const [lista, setLista] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  async function load() {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      window.location.href = "/auth/login";
      return;
    }

    setUserId(data.user.id);

    const workspaceId = localStorage.getItem("workspace_id");
    const { data: actividad } = await cargarActividad(workspaceId!);
    setLista(actividad || []);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold mb-6">Actividad del Workspace</h1>

      <div className="space-y-4">
        {lista.map((a) => (
          <div
            key={a.id}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover-soft"
          >
            <p className="font-semibold">{a.accion}</p>
            <p className="text-sm opacity-80">{a.detalle}</p>

            <p className="text-xs opacity-60 mt-2">
              {new Date(a.creado).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
