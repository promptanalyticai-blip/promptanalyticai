"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { cargarArchivos, eliminarArchivo } from "@/lib/files";
import { registrarAccion } from "@/lib/auditoria";
import { crearNotificacion } from "@/lib/notifications";

export default function FilesPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [lista, setLista] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);

  async function load() {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      window.location.href = "/auth/login";
      return;
    }

    setUserId(data.user.id);

    const workspaceId = localStorage.getItem("workspace_id");
    const { data: archivos } = await cargarArchivos(workspaceId!);
    setLista(archivos || []);
  }

  async function subir() {
    if (!file || !userId) return;

    const workspaceId = localStorage.getItem("workspace_id");

    const form = new FormData();
    form.append("file", file);
    form.append("workspace_id", workspaceId!);

    await fetch("/api/files/upload", {
      method: "POST",
      body: form
    });

    setFile(null);
    load();
  }

  async function eliminar(id: string, nombre: string) {
    const workspaceId = localStorage.getItem("workspace_id");

    await eliminarArchivo(id);

    await registrarAccion(
      workspaceId!,
      userId!,
      "eliminar archivo",
      `Archivo eliminado: ${nombre}`
    );

    await crearNotificacion(
      workspaceId!,
      userId!,
      "archivo",
      "Se eliminó un archivo."
    );

    load();
  }

  // ⭐ ANALIZAR PDF
  async function analizarPDF(f: any) {
    const workspaceId = localStorage.getItem("workspace_id");

    const blob = await fetch(f.url).then((r) => r.blob());

    const form = new FormData();
    form.append("file", blob);
    form.append("workspace_id", workspaceId!);

    await fetch("/api/analizar/pdf-file", {
      method: "POST",
      body: form
    });

    alert("PDF analizado correctamente.");
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold mb-6">Archivos</h1>

      <div className="max-w-xl space-y-4 mb-10">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />

        <button
          onClick={subir}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full"
        >
          Subir archivo
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Tus archivos</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lista.map((f) => (
          <div
            key={f.id}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover-soft"
          >
            <h3 className="font-bold">{f.nombre}</h3>

            <p className="text-sm opacity-70 mb-3">{f.tipo}</p>

            <a
              href={f.url}
              target="_blank"
              className="text-blue-600 underline"
            >
              Ver / Descargar
            </a>

            <button
              onClick={() => eliminar(f.id, f.nombre)}
              className="mt-3 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Eliminar
            </button>

            {f.tipo === "application/pdf" && (
              <button
                onClick={() => analizarPDF(f)}
                className="mt-3 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Analizar PDF
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
