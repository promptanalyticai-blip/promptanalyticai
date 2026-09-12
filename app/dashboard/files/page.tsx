"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import Header from "../components/Header";

type FileItem = {
  id: string;
  name: string;
  url: string;
  size: number;
  workspaceId: string;
};

export default function FilesPage() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [workspaceId, setWorkspaceId] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) return;

      const ws = localStorage.getItem("currentWorkspace");
      if (!ws) return;

      setWorkspaceId(ws);

      const res = await fetch(`/api/files/list?workspaceId=${ws}`);
      const json = await res.json();
      setFiles(json);
      setLoading(false);
    }

    load();
  }, []);

  async function uploadFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !workspaceId) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("workspaceId", workspaceId);

    await fetch("/api/files/upload", {
      method: "POST",
      body: formData,
    });

    const res = await fetch(`/api/files/list?workspaceId=${workspaceId}`);
    const json = await res.json();
    setFiles(json);
  }

  return (
    <div className="flex flex-col gap-6">
      <Header title="Archivos" subtitle="Sistema de almacenamiento conectado a Supabase" />

      <input type="file" onChange={uploadFile} className="text-slate-300" />

      {loading && <p className="text-slate-400">Cargando archivos...</p>}

      <div className="flex flex-col gap-4">
        {files.map((f) => (
          <div
            key={f.id}
            className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-md flex justify-between items-center"
          >
            <div className="flex flex-col">
              <span className="text-slate-100 font-semibold">{f.name}</span>
              <span className="text-slate-400 text-sm">
                {(f.size / 1024).toFixed(1)} KB
              </span>
            </div>

            <a
              href={f.url}
              target="_blank"
              className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition text-white text-sm"
            >
              Descargar
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
