"use client";

import { useEffect, useState } from "react";

export default function EnterpriseDashboard() {
  const [workspaceId, setWorkspaceId] = useState<string>("");
  const [metrics, setMetrics] = useState<any>(null);
  const [recent, setRecent] = useState<any>(null);

  useEffect(() => {
    const ws = localStorage.getItem("currentWorkspace");
    if (!ws) return;

    setWorkspaceId(ws);
    loadMetrics(ws);
    loadRecent(ws);
  }, []);

  async function loadMetrics(ws: string) {
    const res = await fetch(`/api/export/metrics?workspaceId=${ws}&format=json`);
    const json = await res.json();
    setMetrics(json);
  }

  async function loadRecent(ws: string) {
    const res = await fetch(`/api/history/list?workspaceId=${ws}`);
    const json = await res.json();

    // Ordenar por fecha descendente
    const sorted = json.sort(
      (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    setRecent(sorted.slice(0, 10)); // últimos 10 eventos
  }

  if (!metrics) {
    return <div className="text-slate-400 p-6">Cargando panel enterprise...</div>;
  }

  return (
    <div className="flex flex-col gap-8 p-6">
      <h1 className="text-3xl font-bold text-white">Panel Enterprise</h1>

      {/* ⭐ Métricas principales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(metrics).map(([key, value]) => (
          <div
            key={key}
            className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-md"
          >
            <h2 className="text-slate-400 text-sm">{key.toUpperCase()}</h2>
            <p className="text-white text-3xl font-bold">{value as any}</p>
          </div>
        ))}
      </div>

      {/* ⭐ Actividad reciente */}
      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-md">
        <h2 className="text-xl font-semibold text-white mb-4">Actividad reciente</h2>

        <div className="flex flex-col gap-3">
          {recent?.map((log: any) => (
            <div
              key={log.id}
              className="p-4 rounded-lg bg-slate-800 border border-slate-700"
            >
              <div className="flex justify-between">
                <span className="text-white font-semibold">{log.action}</span>
                <span className="text-slate-400 text-sm">
                  {new Date(log.createdAt).toLocaleString()}
                </span>
              </div>

              {log.entityType && (
                <p className="text-slate-300 text-sm">
                  {log.entityType} → {log.entityId}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ⭐ Inteligencia del workspace */}
      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-md">
        <h2 className="text-xl font-semibold text-white mb-4">Workspace Intelligence</h2>

        <p className="text-slate-400">
          Este panel se actualizará automáticamente a medida que agregues más datos,
          tareas, tags, reacciones y automations.
        </p>
      </div>
    </div>
  );
}
