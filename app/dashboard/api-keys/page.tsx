"use client";

import { useEffect, useState } from "react";

export default function ApiKeysPage() {
  const [nombre, setNombre] = useState("");
  const [lista, setLista] = useState<any[]>([]);
  const [nuevoToken, setNuevoToken] = useState("");

  async function crear() {
    const workspaceId = localStorage.getItem("workspace_id");

    const res = await fetch("/api/api-keys/create", {
      method: "POST",
      body: JSON.stringify({ nombre, workspaceId }),
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();
    setNuevoToken(data.token);
    cargar();
  }

  async function cargar() {
    const workspaceId = localStorage.getItem("workspace_id");

    const res = await fetch("/api/api-keys/list", {
      method: "POST",
      body: JSON.stringify({ workspaceId }),
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();
    setLista(data);
  }

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold mb-6">API Keys</h1>

      <div className="max-w-xl space-y-4 mb-10">
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre de la API Key"
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />

        <button
          onClick={crear}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full"
        >
          Crear API Key
        </button>

        {nuevoToken && (
          <div className="p-4 bg-green-100 rounded">
            <p className="font-bold">Token generado:</p>
            <p className="break-all">{nuevoToken}</p>
          </div>
        )}
      </div>

      <h2 className="text-xl font-semibold mb-4">Tus API Keys</h2>

      <div className="space-y-4">
        {lista.map((k) => (
          <div key={k.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="font-bold">{k.nombre}</p>
            <p className="text-sm break-all opacity-80">{k.token}</p>
            <p className="text-xs opacity-60 mt-2">
              {new Date(k.creado).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
