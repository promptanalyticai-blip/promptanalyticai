"use client";

import { useEffect, useState } from "react";

export default function AutomationsAIPage() {
  const [workspaceId, setWorkspaceId] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [createdCount, setCreatedCount] = useState<number>(0);

  useEffect(() => {
    const ws = localStorage.getItem("currentWorkspace");
    if (!ws) return;

    setWorkspaceId(ws);
  }, []);

  async function generateAutomations(autoCreate: boolean) {
    const res = await fetch("/api/automations/ai", {
      method: "POST",
      body: JSON.stringify({ workspaceId, autoCreate }),
    });

    const json = await res.json();
    setSuggestions(json.suggestions || []);
    setCreatedCount(json.created || 0);
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-3xl font-bold text-white">Workspace Automations AI</h1>

      <p className="text-slate-400">
        Este módulo analiza tu workspace y genera automations inteligentes.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => generateAutomations(false)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Generar sugerencias
        </button>

        <button
          onClick={() => generateAutomations(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          Crear automations automáticamente
        </button>
      </div>

      {createdCount > 0 && (
        <div className="text-green-400">
          {createdCount} automations creadas automáticamente.
        </div>
      )}

      <div className="flex flex-col gap-4">
        {suggestions.map((s, i) => (
          <div
            key={i}
            className="bg-slate-900 p-4 rounded-xl border border-slate-800"
          >
            <h2 className="text-white font-semibold">{s.name}</h2>
            <p className="text-slate-300 text-sm">Trigger: {s.trigger}</p>
            <p className="text-slate-300 text-sm">Action: {s.action}</p>

            {s.conditions && (
              <pre className="text-slate-400 text-xs mt-2 whitespace-pre-wrap">
                {JSON.stringify(s.conditions, null, 2)}
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
