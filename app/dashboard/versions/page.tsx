"use client";

import { useState } from "react";

export default function VersionsPage() {
  const [recursoId, setRecursoId] = useState("");
  const [tipo, setTipo] = useState("analisis");
  const [contenido, setContenido] = useState("");
  const [lista, setLista] = useState<any[]>([]);

  async function guardar() {
    const workspaceId = localStorage.getItem("workspace_id");

    await fetch("/api/versions/save", {
      method: "POST",
      body: JSON.stringify({ workspaceId, recursoId, tipo, contenido }),
      headers: { "Content-Type": "application/json" }
    });

    cargar();
  }

  async function cargar() {
    const workspaceId = localStorage.getItem("workspace_id");

    const res = await fetch("/api/versions/list", {
      method: "POST",
      body: JSON.stringify({ workspaceId, recursoId }),
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();
    setLista(data);
  }

  async function restaurar(version: any) {
    const workspaceId = localStorage.getItem("workspace_id");

    await fetch("/api/versions/restore", {
      method: "POST",
      body: JSON.stringify({
        workspaceId,
        recursoId,
        tipo,
        contenido: version.contenido
      }),
      headers: { "Content-Type": "application/json" }
    });

    alert("Versión restaurada.");
  }

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold mb-6">Historial de Versiones</h1>

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
          placeholder="Contenido actual para guardar versión"
          className="w-full p-3 border rounded-lg min-h-[120px] dark:bg-gray-700 dark:border-gray-600"
        />

        <button
          onClick={guardar}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full"
        >
          Guardar versión
        </button>

        <button
          onClick={cargar}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 w-full"
        >
          Cargar versiones
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Versiones del recurso</h2>

      <div className="space-y-4">
        {lista.map((v) => (
          <div
            key={v.id}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            <p className="font-semibold">{v.tipo}</p>
            <p className="text-sm opacity-80 whitespace-pre-wrap">{v.contenido}</p>
            <p className="text-xs opacity-60 mt-2">
              {new Date(v.creado).toLocaleString()}
            </p>

            <button
              onClick={() => restaurar(v)}
              className="mt-3 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Restaurar esta versión
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
