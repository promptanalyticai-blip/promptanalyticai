"use client";

import { useEffect, useState } from "react";

export function History() {
  const [logs, setLogs] = useState<any[]>([]);
  const [workspaceId, setWorkspaceId] = useState<string>("");

  useEffect(() => {
    const ws = localStorage.getItem("currentWorkspace");
    if (!ws) return;

    setWorkspaceId(ws);
    loadHistory(ws);
  }, []);

  async function loadHistory(ws: string) {
    const res = await fetch(`/api/history/list?workspaceId=${ws}`);
    const json = await res.json();
    setLogs(json);
  }

  return (
    <div className="flex flex-col gap-4">
      {logs.map((log) => (
        <div
          key={log.id}
          className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-md"
        >
          <div className="flex justify-between">
            <span className="text-slate-100 font-semibold">{log.action}</span>
            <span className="text-slate-500 text-xs">
              {new Date(log.createdAt).toLocaleString()}
            </span>
          </div>

          {log.entityType && (
            <span className="text-slate-400 text-sm">
              {log.entityType} → {log.entityId}
            </span>
          )}

          {log.details && (
            <pre className="text-slate-500 text-xs mt-2 whitespace-pre-wrap">
              {JSON.stringify(JSON.parse(log.details), null, 2)}
            </pre>
          )}
        </div>
      ))}
    </div>
  );
}
