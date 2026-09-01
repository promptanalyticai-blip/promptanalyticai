"use client";

import { useEffect, useState } from "react";

export default function WebhooksPage() {
  const [lista, setLista] = useState<any[]>([]);
  const [nombre, setNombre] = useState("");
  const [url, setUrl] = useState("");
  const [evento, setEvento] = useState("analisis.creado");

  async function crear() {
    const workspaceId = localStorage.getItem("workspace_id");

    await fetch("/api/webhooks/create", {
      method: "POST",
      body: JSON.stringify({ workspaceId, nombre, url, evento }),
      headers: { "Content-Type": "application/json" }
    });

    setNombre("");
    setUrl("");
    cargar();
  }

  async function cargar() {
    const workspaceId = localStorage.getItem("workspace_id");

    const res = await fetch("/api/webhooks/list", {
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
      <h1 className="text-3xl font-bold mb-6">Webhooks</h1>

      <div className="max-w-xl space-y-4 mb-10">
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del webhook"
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />

        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL destino"
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />

        <select
          value={evento}
          onChange={(e) => setEvento(e.target.value)}
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="analisis.creado">Análisis creado</option>
          <option value="tarea.creada">Tarea creada</option>
          <option value="archivo.subido">Archivo subido</option>
          <option value="prompt.creado">Prompt creado</option>
        </select>

        <button
          onClick={crear}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full"
        >
          Crear webhook
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Webhooks configurados</h2>

      <div className="space-y-4">
        {lista.map((w) => (
          <div key={w.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="font-bold">{w.nombre}</p>
            <p className="text-sm opacity-80">{w.url}</p>
            <p className="text-xs opacity-60 mt-2">{w.evento}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
