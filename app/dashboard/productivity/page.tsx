"use client";

import { useEffect, useState } from "react";

export default function ProductivityPage() {
  const [workspaceId, setWorkspaceId] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [metrics, setMetrics] = useState<any>(null);
  const [insights, setInsights] = useState<any>(null);

  useEffect(() => {
    const ws = localStorage.getItem("currentWorkspace");
    if (!ws) return;

    setWorkspaceId(ws);
    loadScore(ws);
  }, []);

  async function loadScore(ws: string) {
    const res = await fetch(`/api/productivity/score?workspaceId=${ws}`);
    const json = await res.json();

    setScore(json.score);
    setMetrics(json.metrics);
    setInsights(json.insights);
  }

  return (
    <div className="flex flex-col gap-8 p-6">
      <h1 className="text-3xl font-bold text-white">Workspace Productivity Score</h1>

      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
        <h2 className="text-xl text-white font-semibold">Score</h2>
        <p className="text-5xl font-bold text-indigo-400">{score}</p>
      </div>

      {metrics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(metrics).map(([key, value]) => (
            <div
              key={key}
              className="bg-slate-900 p-4 rounded-xl border border-slate-800"
            >
              <h3 className="text-slate-400 text-sm">{key}</h3>
              <p className="text-white text-2xl font-bold">{value as any}</p>
            </div>
          ))}
        </div>
      )}

      {insights && (
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <h2 className="text-xl text-white font-semibold mb-4">Insights</h2>

          <p className="text-slate-300 whitespace-pre-wrap">{insights.summary}</p>

          {insights.recommendations && (
            <>
              <h3 className="text-white font-semibold mt-4">Recomendaciones</h3>
              <ul className="list-disc ml-6 text-slate-300">
                {insights.recommendations.map((r: string, i: number) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </>
          )}

          {insights.alerts && (
            <>
              <h3 className="text-white font-semibold mt-4">Alertas</h3>
              <ul className="list-disc ml-6 text-red-400">
                {insights.alerts.map((a: string, i: number) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
