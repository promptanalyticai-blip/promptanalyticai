// app/dashboard/api-keys/components/ApiKeyList.tsx
"use client";

import { useState } from "react";
import { ApiKeyItem } from "./ApiKeyItem";

export function ApiKeyList() {
  const [keys, setKeys] = useState([
    {
      name: "Producción",
      key: "pk_live_1234567890abcdef",
      active: true,
    },
    {
      name: "Desarrollo",
      key: "pk_dev_abcdef1234567890",
      active: false,
    },
  ]);

  const [newName, setNewName] = useState("");

  function toggleKey(index: number) {
    const updated = [...keys];
    updated[index].active = !updated[index].active;
    setKeys(updated);
  }

  function createKey() {
    if (!newName.trim()) return;

    const newKey = {
      name: newName,
      key: crypto.randomUUID() + crypto.randomUUID(),
      active: true,
    };

    setKeys([newKey, ...keys]);
    setNewName("");
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Crear nueva API Key */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
        <h3 className="text-lg font-semibold text-slate-100 mb-4">
          Crear nueva API Key
        </h3>

        <div className="flex gap-3">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Nombre de la clave"
            className="flex-1 bg-slate-800 text-slate-100 border border-slate-700 rounded-lg px-3 py-2"
          />

          <button
            onClick={createKey}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition text-white font-medium"
          >
            Crear
          </button>
        </div>
      </div>

      {/* Lista de claves */}
      <div className="flex flex-col gap-4">
        {keys.map((k, index) => (
          <ApiKeyItem
            key={index}
            name={k.name}
            key={k.key}
            active={k.active}
            onToggle={() => toggleKey(index)}
          />
        ))}
      </div>
    </div>
  );
}
