"use client";

import { useState } from "react";

export default function ReactionsPage() {
  const [recursoId, setRecursoId] = useState("");
  const [emoji, setEmoji] = useState("😀");
  const [lista, setLista] = useState<any[]>([]);

  async function cargar() {
    const workspaceId = localStorage.getItem("workspace_id");

    const res = await fetch("/api/reactions/list", {
      method: "POST",
      body: JSON.stringify({ workspaceId, recursoId }),
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();
    setLista(data);
  }

  async function agregar(tipo: string) {
    const workspaceId = localStorage.getItem("workspace_id");

    await fetch("/api/reactions/add", {
      method: "POST",
      body: JSON.stringify({ workspaceId, recursoId, tipo, emoji }),
      headers: { "Content-Type": "application/json" }
    });

    cargar();
  }

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold mb-6">Reacciones</h1>

      <div className="max-w-xl space-y-4 mb-10">

        <input
          value={recursoId}
          onChange={(e) => setRecursoId(e.target.value)}
          placeholder="ID del recurso"
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />

        <select
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="😀">😀</option>
          <option value="🔥">🔥</option>
          <option value="❤️">❤️</option>
          <option value="💡">💡</option>
          <option value="👍">👍</option>
        </select>

        <button
          onClick={() => agregar("emoji")}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 w-full"
        >
          Agregar emoji
        </button>

        <button
          onClick={() => agregar("like")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full"
        >
          Like ❤️
        </button>

        <button
          onClick={cargar}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 w-full"
        >
          Cargar reacciones
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Reacciones del recurso</h2>

      <div className="space-y-4">
        {lista.map((r) => (
          <div
            key={r.id}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            <p className="font-semibold">{r.tipo}</p>
            <p className="text-2xl">{r.emoji}</p>
            <p className="text-xs opacity-60 mt-2">
              {new Date(r.creado).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
