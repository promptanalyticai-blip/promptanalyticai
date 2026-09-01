"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { cargarRoles, asignarRol } from "@/lib/roles";

export default function RolesPage() {
  const [lista, setLista] = useState<any[]>([]);
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);

  async function load() {
    const ws = localStorage.getItem("workspace_id");
    setWorkspaceId(ws);

    const { data } = await cargarRoles(ws!);
    setLista(data || []);
  }

  async function cambiarRol(userId: string, rol: string) {
    await fetch("/api/roles/update", {
      method: "POST",
      body: JSON.stringify({ userId, workspaceId, rol }),
      headers: { "Content-Type": "application/json" }
    });

    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold mb-6">Roles del Workspace</h1>

      <div className="space-y-4">
        {lista.map((r) => (
          <div
            key={r.id}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            <p className="font-semibold">Usuario: {r.user_id}</p>
            <p className="text-sm mb-3">Rol actual: {r.rol}</p>

            <div className="flex gap-2">
              <button
                onClick={() => cambiarRol(r.user_id, "admin")}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Admin
              </button>

              <button
                onClick={() => cambiarRol(r.user_id, "editor")}
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Editor
              </button>

              <button
                onClick={() => cambiarRol(r.user_id, "lector")}
                className="px-3 py-1 bg-gray-600 text-white rounded"
              >
                Lector
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
