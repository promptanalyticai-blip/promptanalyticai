"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  crearTemplate,
  cargarTemplates,
  actualizarTemplate,
  eliminarTemplate,
  marcarFavoritoTemplate,
  quitarFavoritoTemplate,
} from "@/lib/templates";

import { registrarAccion } from "@/lib/auditoria";
import { crearNotificacion } from "@/lib/notifications";

export default function TemplatesPage() {
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
    const { data: templates } = await cargarTemplates(data.user.id, workspaceId!);
    setLista(templates || []);
  }

  async function guardar() {
    if (!userId) return;

    const workspaceId = localStorage.getItem("workspace_id");

    if (editId) {
      await actualizarTemplate(editId, nombre, contenido);

      await registrarAccion(
        workspaceId!,
        userId,
        "actualizar plantilla",
        `Plantilla actualizada: ${nombre}`
      );

      await crearNotificacion(
        workspaceId!,
        userId,
        "plantilla",
        "Se actualizó una plantilla."
      );

      setEditId(null);
    } else {
      await crearTemplate(nombre, contenido, userId, workspaceId!);

      await registrarAccion(
        workspaceId!,
        userId,
        "crear plantilla",
        `Plantilla creada: ${nombre}`
      );

      await crearNotificacion(
        workspaceId!,
        userId,
        "plantilla",
        "Se creó una nueva plantilla."
      );
    }

    setNombre("");
    setContenido("");
    load();
  }

  function editar(t: any) {
    setEditId(t.id);
    setNombre(t.nombre);
    setContenido(t.contenido);
  }

  async function eliminar(id: string) {
    if (!userId) return;

    const workspaceId = localStorage.getItem("workspace_id");

    await eliminarTemplate(id);

    await registrarAccion(
      workspaceId!,
      userId,
      "eliminar plantilla",
      `Plantilla eliminada: ${id}`
    );

    await crearNotificacion(
      workspaceId!,
      userId,
      "plantilla",
      "Se eliminó una plantilla."
    );

    load();
  }

  async function toggleFavorito(t: any) {
    const workspaceId = localStorage.getItem("workspace_id");

    if (t.favorito) {
      await quitarFavoritoTemplate(t.id);

      await registrarAccion(
        workspaceId!,
        userId!,
        "quitar favorito plantilla",
        `Plantilla: ${t.nombre}`
      );

      await crearNotificacion(
        workspaceId!,
        userId!,
        "plantilla",
        "Se quitó de favoritos una plantilla."
      );
    } else {
      await marcarFavoritoTemplate(t.id);

      await registrarAccion(
        workspaceId!,
        userId!,
        "marcar favorito plantilla",
        `Plantilla: ${t.nombre}`
      );

      await crearNotificacion(
        workspaceId!,
        userId!,
        "plantilla",
        "Se marcó como favorita una plantilla."
      );
    }

    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold mb-6">Plantillas IA</h1>

      <div className="max-w-xl space-y-4 mb-10">

        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre de la plantilla"
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />

        <textarea
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          placeholder="Contenido de la plantilla"
          className="w-full p-3 border rounded-lg min-h-[120px] dark:bg-gray-700 dark:border-gray-600"
        />

        <button
          onClick={guardar}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover-soft w-full"
        >
          {editId ? "Actualizar plantilla" : "Guardar plantilla"}
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Tus plantillas</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lista.map((t) => (
          <div
            key={t.id}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover-soft"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold">{t.nombre}</h3>

              <button
                onClick={() => toggleFavorito(t)}
                className={`px-2 py-1 rounded ${
                  t.favorito ? "bg-yellow-400" : "bg-gray-200 dark:bg-gray-600"
                }`}
              >
                ★
              </button>
            </div>

            <p className="text-sm whitespace-pre-wrap mb-3">{t.contenido}</p>

            <div className="flex gap-2">
              <button
                onClick={() => editar(t)}
                className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Editar
              </button>

              <button
                onClick={() => eliminar(t.id)}
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
