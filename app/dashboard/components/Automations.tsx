"use client";

import { useEffect, useState } from "react";

export function Automations() {
  const [automations, setAutomations] = useState<any[]>([]);
  const [workspaceId, setWorkspaceId] = useState<string>("");

  useEffect(() => {
    const ws = localStorage.getItem("currentWorkspace");
    if (!ws) return;

    setWorkspaceId(ws);
    loadAutomations(ws);
  }, []);

  async function loadAutomations(ws: string) {
    const res = await fetch(`/api/automations/list?workspaceId=${ws}`);
    const json = await res.json();
    setAutomations(json);
  }

  async function createAutomation() {
    const name = prompt("Nombre del workflow:");
    if (!name) return;

    await fetch("/api/automations/create", {
      method: "POST",
      body: JSON.stringify({
        workspaceId,
        name,
        trigger: "file_uploaded",
        action: "generate_analysis",
      }),
    });

    loadAutomations(workspaceId);
  }

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={createAutomation}
        className="px-3 py-1 rounded-lg bg-indigo-600 text-white text-sm w-fit"
      >
        + Crear Automation
      </button>

      {automations.map((a) => (
        <div
          key={a.id}
          className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-md"
        >
          <span className="text-slate-100 font-semibold">{a.name}</span>
          <span className="text-slate-400 text-sm">
            Trigger: {a.trigger} → Action: {a.action}
          </span>
        </div>
      ))}
    </div>
  );
}
