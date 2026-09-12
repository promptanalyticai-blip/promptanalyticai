// app/dashboard/teams/components/TeamList.tsx
"use client";

import { useState } from "react";
import { TeamCard } from "./TeamCard";

export function TeamList() {
  const [teams, setTeams] = useState([
    { name: "Marketing", members: 4 },
    { name: "Desarrollo", members: 6 },
    { name: "Operaciones", members: 3 },
  ]);

  const [newTeam, setNewTeam] = useState("");

  function createTeam() {
    if (!newTeam.trim()) return;

    setTeams([{ name: newTeam, members: 1 }, ...teams]);
    setNewTeam("");
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Crear equipo */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
        <h3 className="text-lg font-semibold text-slate-100 mb-4">
          Crear nuevo equipo
        </h3>

        <div className="flex gap-3">
          <input
            value={newTeam}
            onChange={(e) => setNewTeam(e.target.value)}
            placeholder="Nombre del equipo"
            className="flex-1 bg-slate-800 text-slate-100 border border-slate-700 rounded-lg px-3 py-2"
          />

          <button
            onClick={createTeam}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition text-white font-medium"
          >
            Crear
          </button>
        </div>
      </div>

      {/* Lista de equipos */}
      <div className="flex flex-col gap-4">
        {teams.map((team, index) => (
          <TeamCard key={index} name={team.name} members={team.members} />
        ))}
      </div>
    </div>
  );
}
