"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { cargarTeams } from "@/lib/teams";

export default function TeamsPage() {
  const [lista, setLista] = useState<any[]>([]);
  const [nombre, setNombre] = useState("");
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);

  async function load() {
    const ws = localStorage.getItem("workspace_id");
    setWorkspaceId(ws);

    const { data } = await cargarTeams(ws!);
    setLista(data || []);
  }

  async function crear() {
    await fetch("/api/teams/create", {
      method: "POST",
      body: JSON.stringify({ nombre, workspaceId }),
      headers: { "Content-Type": "application/json" }
    });

    setNombre("");
    load();
  }

  async function agregarMiembro(teamId: string) {
    const userId = prompt("ID del usuario a agregar:");
    if (!userId) return;

    await fetch("/api/teams/add-member", {
      method: "POST",
      body: JSON.stringify({ teamId, userId, workspaceId }),
      headers: { "Content-Type": "application/json" }
    });

    load();
  }

  async function eliminarMiembro(teamId: string) {
    const userId = prompt("ID del usuario a eliminar:");
    if (!userId) return;

    await fetch("/api/teams/remove-member", {
      method: "POST",
      body: JSON.stringify({ teamId, userId, workspaceId }),
      headers: { "Content-Type": "application/json" }
    });

    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold mb-6">Equipos</h1>

      <div className="max-w-xl space-y-4 mb-10">
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del equipo"
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />

        <button
          onClick={crear}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full"
        >
          Crear equipo
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Equipos del workspace</h2>

      <div className="space-y-4">
        {lista.map((t) => (
          <div
            key={t.id}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            <h3 className="font-bold">{t.nombre}</h3>

            <p className="text-sm opacity-70 mb-3">
              Miembros: {t.team_members?.length || 0}
            </p>

            <button
              onClick={() => agregarMiembro(t.id)}
              className="px-3 py-1 bg-green-600 text-white rounded mr-2"
            >
              Agregar miembro
            </button>

            <button
              onClick={() => eliminarMiembro(t.id)}
              className="px-3 py-1 bg-red-600 text-white rounded"
            >
              Eliminar miembro
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
