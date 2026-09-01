"use client";

import { useEffect, useState } from "react";
import { crearWorkspace, cargarWorkspaces, cambiarWorkspace } from "@/lib/workspaces";

export default function WorkspacesPage() {
  const [nombre, setNombre] = useState("");
  const [lista, setLista] = useState<any[]>([]);

  async function load() {
    const userId = "USER_ID_AQUI"; 
    const { data } = await cargarWorkspaces(userId);
    setLista(data || []);
  }

  async function crear() {
    const userId = "USER_ID_AQUI";
    await crearWorkspace(nombre, userId);
    setNombre("");
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold mb-6">Workspaces</h1>

      <div className="max-w-lg space-y-6">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">Crear workspace</h2>

          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre del workspace"
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          />

          <button
            onClick={crear}
            className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 hover-soft"
          >
            Crear
          </button>
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">Tus workspaces</h2>

          {lista.map((w) => (
            <button
              key={w.id}
              onClick={() => cambiarWorkspace(w.id)}
              className="block w-full text-left p-3 rounded-lg bg-gray-100 dark:bg-gray-700 mb-2 hover-soft"
            >
              {w.nombre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
