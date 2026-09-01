"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  crearPrompt,
  cargarPrompts,
  actualizarPrompt,
  eliminarPrompt,
  marcarFavoritoPrompt,
  quitarFavoritoPrompt,
} from "@/lib/prompts";

export default function PromptsPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [lista, setLista] = useState<any[]>([]);
  const [nombre, setNombre] = useState("");
  const [contenido, setContenido] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  async function load() {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      window.location.href = "/auth/login";
      return;
    }

    setUserId(data.user.id);

    const workspaceId = localStorage.getItem("workspace_id");
    const { data: prompts } = await cargarPrompts(data.user.id, workspaceId);
    setLista(prompts || []);
  }

  async function guardar() {
    if (!userId) return;

    const workspaceId = localStorage.getItem("workspace_id");

    if (editId) {
      await actualizarPrompt(editId, nombre, contenido);
      setEditId(null);
    } else {
      await crearPrompt(nombre, contenido, userId, workspaceId);
    }

    setNombre("");
    setContenido("");
    load();
  }

  async function editar(p: any) {
    setEditId(p.id);
    setNombre(p.nombre);
    setContenido(p.contenido);
  }

  async function eliminar(id: string) {
    await eliminarPrompt(id);
    load();
  }

  async function toggleFavorito(p: any) {
    if (p.favorito) await quitarFavoritoPrompt(p.id);
    else await marcarFavoritoPrompt(p.id);
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold mb-6">Editor de Prompts</h1>

      <div className="max-w-xl space-y-4 mb-10">

        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del prompt"
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />

        <textarea
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          placeholder="Contenido del prompt"
          className="w-full p-3 border rounded-lg min-h-[120px] dark:bg-gray-700 dark:border-gray-600"
        />

        <button
          onClick={guardar}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover-soft w-full"
        >
          {editId ? "Actualizar prompt" : "Guardar prompt"}
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Tus prompts</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lista.map((p) => (
          <div
            key={p.id}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover-soft"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold">{p.nombre}</h3>

              <button
                onClick={() => toggleFavorito(p)}
                className={`px-2 py-1 rounded ${
                  p.favorito ? "bg-yellow-400" : "bg-gray-200 dark:bg-gray-600"
                }`}
              >
                ★
              </button>
            </div>

            <p className="text-sm whitespace-pre-wrap mb-3">{p.contenido}</p>

            <div className="flex gap-2">
              <button
                onClick={() => editar(p)}
                className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Editar
              </button>

              <button
                onClick={() => eliminar(p.id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
