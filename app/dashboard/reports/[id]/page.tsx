"use client";

import { useEffect, useState } from "react";
import { Reactions } from "../../components/Reactions";
import { Tags } from "../../components/Tags";
import { Tasks } from "../../components/Tasks";

export default function ReportPage({ params }: { params: { id: string } }) {
  const [report, setReport] = useState<any>(null);
  const [workspaceId, setWorkspaceId] = useState<string>("");

  useEffect(() => {
    const ws = localStorage.getItem("currentWorkspace");
    if (!ws) return;

    setWorkspaceId(ws);
    loadReport(params.id);

    // ⭐ Trigger automation: report_viewed
    fetch("/api/automations/execute", {
      method: "POST",
      body: JSON.stringify({
        workspaceId: ws,
        trigger: "report_viewed",
        payload: { id: params.id }
      })
    });
  }, [params.id]);

  async function loadReport(id: string) {
    const res = await fetch(`/api/report/get?id=${id}`);
    const json = await res.json();
    setReport(json);

    // ⭐ Registrar historial
    await fetch("/api/history/create", {
      method: "POST",
      body: JSON.stringify({
        workspaceId,
        action: "report_viewed",
        entityType: "report",
        entityId: id,
        details: { id }
      })
    });
  }

  if (!report) {
    return <div className="text-slate-400">Cargando reporte...</div>;
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-2xl font-bold text-white">{report.title}</h1>

      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
        <pre className="whitespace-pre-wrap text-slate-300">
          {report.content}
        </pre>
      </div>

      {/* ⭐ Reactions */}
      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
        <h2 className="text-lg font-semibold text-white mb-2">Reacciones</h2>
        <Reactions entityType="report" entityId={params.id} />
      </div>

      {/* ⭐ Tags */}
      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
        <h2 className="text-lg font-semibold text-white mb-2">Tags</h2>
        <Tags entityId={params.id} />
      </div>

      {/* ⭐ Tasks */}
      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
        <h2 className="text-lg font-semibold text-white mb-2">Tareas</h2>
        <Tasks entityType="report" entityId={params.id} />
      </div>

      {/* ⭐ Export */}
      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex gap-4">
        <button
          onClick={() =>
            window.open(`/api/export/report?id=${params.id}&format=pdf`)
          }
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Exportar PDF
        </button>

        <button
          onClick={() =>
            window.open(`/api/export/report?id=${params.id}&format=json`)
          }
          className="px-4 py-2 bg-slate-700 text-white rounded-lg"
        >
          Exportar JSON
        </button>

        <button
          onClick={() =>
            window.open(`/api/export/report?id=${params.id}&format=csv`)
          }
          className="px-4 py-2 bg-slate-700 text-white rounded-lg"
        >
          Exportar CSV
        </button>

        <button
          onClick={() =>
            window.open(`/api/export/report?id=${params.id}&format=txt`)
          }
          className="px-4 py-2 bg-slate-700 text-white rounded-lg"
        >
          Exportar TXT
        </button>
      </div>
    </div>
  );
}
