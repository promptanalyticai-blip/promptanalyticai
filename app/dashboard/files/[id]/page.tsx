"use client";

import { useEffect, useState } from "react";
import { Reactions } from "../../components/Reactions";
import { Tags } from "../../components/Tags";
import { Tasks } from "../../components/Tasks";

export default function FilePage({ params }: { params: { id: string } }) {
  const [file, setFile] = useState<any>(null);
  const [workspaceId, setWorkspaceId] = useState<string>("");

  useEffect(() => {
    const ws = localStorage.getItem("currentWorkspace");
    if (!ws) return;

    setWorkspaceId(ws);
    loadFile(params.id);

    // ⭐ Trigger automation: file_viewed
    fetch("/api/automations/execute", {
      method: "POST",
      body: JSON.stringify({
        workspaceId: ws,
        trigger: "file_viewed",
        payload: { id: params.id }
      })
    });
  }, [params.id]);

  async function loadFile(id: string) {
    const res = await fetch(`/api/files/get?id=${id}`);
    const json = await res.json();
    setFile(json);

    // ⭐ Registrar historial
    await fetch("/api/history/create", {
      method: "POST",
      body: JSON.stringify({
        workspaceId,
        action: "file_viewed",
        entityType: "file",
        entityId: id,
        details: { id }
      })
    });
  }

  if (!file) {
    return <div className="text-slate-400">Cargando archivo...</div>;
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-2xl font-bold text-white">{file.name}</h1>

      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
        <p className="text-slate-300">Tipo: {file.type}</p>
        <p className="text-slate-300">Tamaño: {file.size} bytes</p>
        <p className="text-slate-300">Subido: {new Date(file.createdAt).toLocaleString()}</p>

        <a
          href={file.url}
          target="_blank"
          className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Abrir archivo
        </a>
      </div>

      {/* ⭐ Reactions */}
      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
        <h2 className="text-lg font-semibold text-white mb-2">Reacciones</h2>
        <Reactions entityType="file" entityId={params.id} />
      </div>

      {/* ⭐ Tags */}
      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
        <h2 className="text-lg font-semibold text-white mb-2">Tags</h2>
        <Tags entityId={params.id} />
      </div>

      {/* ⭐ Tasks */}
      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
        <h2 className="text-lg font-semibold text-white mb-2">Tareas</h2>
        <Tasks entityType="file" entityId={params.id} />
      </div>

      {/* ⭐ Export (metadata) */}
      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex gap-4">
        <button
          onClick={() =>
            window.open(`/api/export/files?workspaceId=${workspaceId}&format=json`)
          }
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Exportar JSON
        </button>

        <button
          onClick={() =>
            window.open(`/api/export/files?workspaceId=${workspaceId}&format=csv`)
          }
          className="px-4 py-2 bg-slate-700 text-white rounded-lg"
        >
          Exportar CSV
        </button>

        <button
          onClick={() =>
            window.open(`/api/export/files?workspaceId=${workspaceId}&format=txt`)
          }
          className="px-4 py-2 bg-slate-700 text-white rounded-lg"
        >
          Exportar TXT
        </button>
      </div>
    </div>
  );
}
