"use client";

import { useState } from "react";

export default function TagsPage() {
  const [recursoId, setRecursoId] = useState("");
  const [tipo, setTipo] = useState("analisis");
  const [etiqueta, setEtiqueta] = useState("");
  const [lista, setLista] = useState<any[]>([]);

  async function cargar() {
    const workspaceId = localStorage.getItem("workspace_id");

    const res = await fetch("/api/tags/list", {
      method: "POST",
      body: JSON.stringify({ workspaceId, recursoId }),
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();
    setLista(data);
  }

  async function agregar() {
    const workspaceId = localStorage.getItem("workspace_id");

    await fetch("/api/tags/add", {
      method: "POST",
      body: JSON.stringify({ workspaceId, recursoId, tipo, etiqueta }),
      headers: { "Content-Type": "application/json" }
    });

    setEtiqueta("");
    cargar();
  }

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold mb-6">Etiquetas</h1>

      <div className="max-w-xl space-y-4 mb-10">

        <input
          value={recursoId}
          onChange={(e) => setRecursoId(e.target.value)}
          placeholder="ID del recurso"
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />

        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="analisis">Análisis</option>
          <option value="prompt">Prompt</option>
          <option value="template">Plantilla</option>
          <option value="archivo">Archivo</option>
          <option value="comentario">Comentario</option>
        </select>

        <input
          value={etiqueta}
          onChange={(e) => setEtiqueta(e.target.value)}
          placeholder="Etiqueta (ej: urgente, cliente, idea)"
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />

        <button
          onClick={agregar}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full"
        >
          Agregar etiqueta
        </button>

        <button
          onClick={cargar}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 w-full"
        >
          Cargar etiquetas
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Etiquetas del recurso</h2>

      <div className="space-y-4">
        {lista.map((t) => (
          <div
            key={t.id}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            <p className="font-semibold">{t.tipo}</p>
            <p className="text-sm opacity-80">{t.etiqueta}</p>
            <p className="text-xs opacity-60 mt-2">
              {new Date(t.creado).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
