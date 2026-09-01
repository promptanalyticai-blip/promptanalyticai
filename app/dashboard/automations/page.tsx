"use client";

import { useEffect, useState } from "react";

export default function AutomationsPage() {
  const [lista, setLista] = useState<any[]>([]);
  const [nombre, setNombre] = useState("");
  const [evento, setEvento] = useState("analisis.creado");
  const [acciones, setAcciones] = useState<any[]>([]);

  async function cargar() {
    const workspaceId = localStorage.getItem("workspace_id");

    const res = await fetch("/api/automations/list", {
      method: "POST",
      body: JSON.stringify({ workspaceId }),
      headers: { "Content-Type": "application/json" }
    });

    setLista(await res.json());
  }

  async function crear() {
    const workspaceId = localStorage.getItem("workspace_id");

    await fetch("/api/automations/create", {
      method: "POST",
      body: JSON.stringify({ workspaceId, nombre, evento, acciones }),
      headers: { "Content-Type": "application/json" }
    });

    setNombre("");
    setAcciones([]);
    cargar();
  }

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold mb-6">Automations</h1>

      {/* CREAR AUTOMATION */}
      <div className="max-w-xl space-y-4 mb-10">
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre de la automatización"
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />

        <select
          value={evento}
          onChange={(e) => setEvento(e.target.value)}
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="analisis.creado">Análisis creado</option>
          <option value="tarea.creada">Tarea creada</option>
          <option value="archivo.subido">Archivo subido</option>
          <option value="prompt.creado">Prompt creado</option>
        </select>

        <button
          onClick={() =>
            setAcciones([...acciones, { tipo: "webhook", configuracion: { url: "" } }])
          }
          className="px-4 py-2 bg-gray-600 text-white rounded-lg w-full"
        >
          Agregar acción Webhook
        </button>

        <button
          onClick={() =>
            setAcciones([...acciones, { tipo: "ia", configuracion: { prompt: "" } }])
          }
          className="px-4 py-2 bg-gray-600 text-white rounded-lg w-full"
        >
          Agregar acción IA
        </button>

        {acciones.map((a, i) => (
          <div key={i} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow space-y-2">
            <p className="font-bold">Acción: {a.tipo}</p>

            {a.tipo === "webhook" && (
              <input
                value={a.configuracion.url}
                onChange={(e) => {
                  const copy = [...acciones];
                  copy[i].configuracion.url = e.target.value;
                  setAcciones(copy);
                }}
                placeholder="URL del webhook"
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              />
            )}

            {a.tipo === "ia" && (
              <textarea
                value={a.configuracion.prompt}
                onChange={(e) => {
                  const copy = [...acciones];
                  copy[i].configuracion.prompt = e.target.value;
                  setAcciones(copy);
                }}
                placeholder="Prompt IA"
                className="w-full p-3 border rounded-lg min-h-[100px] dark:bg-gray-700 dark:border-gray-600"
              />
            )}
          </div>
        ))}

        <button
          onClick={crear}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full"
        >
          Crear automatización
        </button>
      </div>

      {/* LISTA */}
      <h2 className="text-xl font-semibold mb-4">Automatizaciones creadas</h2>

      <div className="space-y-4">
        {lista.map((a) => (
          <div key={a.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="font-bold">{a.nombre}</p>
            <p className="text-sm opacity-80">{a.evento}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
