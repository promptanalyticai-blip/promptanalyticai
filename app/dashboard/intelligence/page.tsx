"use client";

import { useEffect, useState } from "react";

export default function IntelligencePage() {
  const [workspaceId, setWorkspaceId] = useState<string>("");
  const [insights, setInsights] = useState<string>("");

  useEffect(() => {
    const ws = localStorage.getItem("currentWorkspace");
    if (!ws) return;

    setWorkspaceId(ws);
  }, []);

  async function generateInsights() {
    const res = await fetch("/api/intelligence/generate", {
      method: "POST",
      body: JSON.stringify({ workspaceId }),
    });

    const json = await res.json();
    setInsights(json.insights);
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-3xl font-bold text-white">Workspace Intelligence Pro</h1>

      <p className="text-slate-400">
        Este módulo analiza automáticamente tu workspace y genera insights inteligentes.
      </p>

      <button
        onClick={generateInsights}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg w-fit"
      >
        Generar Insights
      </button>

      {insights && (
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 whitespace-pre-wrap text-slate-300">
          {insights}
        </div>
      )}
    </div>
  );
}
