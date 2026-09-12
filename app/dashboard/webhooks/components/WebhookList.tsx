// app/dashboard/webhooks/components/WebhookList.tsx
"use client";

import { useState } from "react";
import { WebhookItem } from "./WebhookItem";

export function WebhookList() {
  const [webhooks, setWebhooks] = useState([
    {
      name: "Webhook de análisis",
      url: "https://api.miapp.com/webhooks/analysis",
      active: true,
    },
    {
      name: "Webhook de archivos",
      url: "https://api.miapp.com/webhooks/files",
      active: false,
    },
  ]);

  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");

  function toggleWebhook(index: number) {
    const updated = [...webhooks];
    updated[index].active = !updated[index].active;
    setWebhooks(updated);
  }

  function createWebhook() {
    if (!newName.trim() || !newUrl.trim()) return;

    setWebhooks([
      { name: newName, url: newUrl, active: true },
      ...webhooks,
    ]);

    setNewName("");
    setNewUrl("");
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Crear webhook */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
        <h3 className="text-lg font-semibold text-slate-100 mb-4">
          Crear nuevo webhook
        </h3>

        <div className="flex flex-col gap-3">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Nombre del webhook"
            className="bg-slate-800 text-slate-100 border border-slate-700 rounded-lg px-3 py-2"
          />

          <input
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="URL del webhook"
            className="bg-slate-800 text-slate-100 border border-slate-700 rounded-lg px-3 py-2"
          />

          <button
            onClick={createWebhook}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition text-white font-medium"
          >
            Crear webhook
          </button>
        </div>
      </div>

      {/* Lista de webhooks */}
      <div className="flex flex-col gap-4">
        {webhooks.map((w, index) => (
          <WebhookItem
            key={index}
            name={w.name}
            url={w.url}
            active={w.active}
            onToggle={() => toggleWebhook(index)}
          />
        ))}
      </div>
    </div>
  );
}
