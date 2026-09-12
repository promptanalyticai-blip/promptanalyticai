// app/dashboard/workspaces/components/WorkspaceList.tsx
"use client";

import { useState } from "react";
import { WorkspaceCard } from "./WorkspaceCard";

export function WorkspaceList() {
  const [workspaces, setWorkspaces] = useState([
    { name: "Workspace Principal", members: 5 },
    { name: "Workspace Marketing", members: 3 },
    { name: "Workspace Desarrollo", members: 6 },
  ]);

  const [newName, setNewName] = useState("");

  function createWorkspace() {
    if (!newName.trim()) return;

    setWorkspaces([{ name: newName, members: 1 }, ...workspaces]);
    setNewName("");
  }

  function selectWorkspace(name: string) {
    alert(`Cambiaste al workspace: ${name}`);
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Crear workspace */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
        <h3 className="text-lg font-semibold text-slate-100 mb-4">
          Crear nuevo workspace
        </h3>

        <div className="flex gap-3">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Nombre del workspace"
            className="flex-1 bg-slate-800 text-slate-100 border border-slate-700 rounded-lg px-3 py-2"
          />

          <button
            onClick={createWorkspace}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition text-white font-medium"
          >
            Crear
          </button>
        </div>
      </div>

      {/* Lista de workspaces */}
      <div className="flex flex-col gap-4">
        {workspaces.map((ws, index) => (
          <WorkspaceCard
            key={index}
            name={ws.name}
            members={ws.members}
            onSelect={() => selectWorkspace(ws.name)}
          />
        ))}
      </div>
    </div>
  );
}
