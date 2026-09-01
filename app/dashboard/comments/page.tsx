"use client";

import { useState } from "react";

export default function CommentsPage() {
  const [recursoId, setRecursoId] = useState("");
  const [tipo, setTipo] = useState("analisis");
  const [contenido, setContenido] = useState("");
  const [lista, setLista] = useState<any[]>([]);

  async function cargar() {
    const workspaceId = localStorage.getItem("workspace_id");

    const res = await fetch("/api/comments/list", {
      method: "POST",
      body: JSON.stringify({ workspaceId, recursoId }),
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();
    setLista(data);
  }

  async function crear() {
    const workspaceId = localStorage.getItem("workspace_id");

    await fetch("/api/comments/create", {
      method: "POST",
      body: JSON.stringify({ workspaceId, recursoId, tipo, contenido }),
      headers: { "Content-Type": "application/json" }
    });

    setContenido("");
    cargar();
  }

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold mb-6">Comentarios</h1>

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
        </select>

        <textarea
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          placeholder="Escribe un comentario..."
          className="w-full p-3 border rounded-lg min-h-[120px] dark:bg-gray-700 dark:border-gray-600"
        />

        <button
          onClick={crear}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full"
        >
          Agregar comentario
        </button>

        <button
          onClick={cargar}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 w-full"
        >
          Cargar comentarios
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Comentarios del recurso</h2>

      <div className="space-y-4">
        {lista.map((c) => (
          <div
            key={c.id}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            <p className="font-semibold">{c.tipo}</p>
            <p className="text-sm opacity-80">{c.contenido}</p>
            <p className="text-xs opacity-60 mt-2">
              {new Date(c.creado).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
