// app/dashboard/api-keys/components/ApiKeyList.tsx
"use client";

import { useState } from "react";

interface ApiKey {
  name: string;
  key: string;
  active: boolean;
}

interface ApiKeyItemProps {
  name: string;
  active: boolean;
  onToggle: () => void;
}

function ApiKeyItem({ name, active, onToggle }: ApiKeyItemProps) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-md mb-2">
      <span>{name}</span>
      <button
        className={`px-3 py-1 rounded ${
          active ? "bg-green-500 text-white" : "bg-gray-300"
        }`}
        onClick={onToggle}
      >
        {active ? "Active" : "Inactive"}
      </button>
    </div>
  );
}

export default function ApiKeyList({ keys }: { keys: ApiKey[] }) {
  const [apiKeys, setApiKeys] = useState(keys);

  const toggleKey = (index: number) => {
    const updated = [...apiKeys];
    updated[index].active = !updated[index].active;
    setApiKeys(updated);
  };

  return (
    <div>
      {apiKeys.map((k, index) => (
        <ApiKeyItem
          key={index}          {/* ← este es el único key permitido */}
          name={k.name}
          active={k.active}
          onToggle={() => toggleKey(index)}
        />
      ))}
    </div>
  );
}
