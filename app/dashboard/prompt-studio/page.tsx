"use client";

import { useEffect, useState } from "react";

export default function PromptStudioPage() {
  const [flows, setFlows] = useState<any[]>([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [pasos, setPasos] = useState<any[]>([]);
  const [variables, setVariables] = useState<any>({});
  const [resultado, setResultado] = useState<any>(null);

  async function cargarFlows() {
    const workspaceId = localStorage.getItem("workspace_id");

    const res = await fetch("/api/prompt-studio/list", {
      method: "POST",
      body: JSON.stringify({ workspaceId }),
      headers: { "Content-Type": "application/json" }
    });

    setFlows(await res.json());
  }

  async function crearFlow() {
    const workspaceId = localStorage.getItem("workspace_id");

    await fetch("/api/prompt-studio/create", {
      method: "POST",
      body: JSON.stringify({ workspaceId, nombre, descripcion, pasos }),
      headers: { "Content-Type": "application/json" }
    });

    setNombre("");
    setDescripcion("");
    setPasos([]);
    cargarFlows();
  }

  async function ejecutar(flowId: string) {
    const res = await fetch("/api/prompt-studio/run", {
      method: "POST",
      body: JSON.stringify({ flowId, variables }),
      headers: { "Content-Type": "application/json" }
    });

    setResultado(await res.json());
  }

  useEffect(() => {
    cargarFlows();
  }, []);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold mb-6">Prompt Studio</h1>

      {/* CREAR FLOW */}
      <div className="max-w-xl space-y-4 mb-10">
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del flujo"
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />

        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción"
          className="w-full p-3 border rounded-lg min-h-[100px] dark:bg-gray-700 dark:border-gray-600"
        />

        <button
          onClick={() => setPasos([...pasos, { prompt: "", variable_salida: "" }])}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg w-full"
        >
          Agregar paso
        </button>

        {pasos.map((p, i) => (
          <div key={i} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow space-y-2">
            <textarea
              value={p.prompt}
              onChange={(e) => {
                const copy = [...pasos];
                copy[i].prompt = e.target.value;
                setPasos(copy);
              }}
              placeholder="Prompt del paso"
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />

            <input
              value={p.variable_salida}
              onChange={(e) => {
                const copy = [...pasos];
                copy[i].variable_salida = e.target.value;
                setPasos(copy);
              }}
              placeholder="Variable de salida (ej: resumen)"
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        ))}

        <button
          onClick={crearFlow}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full"
        >
          Crear flujo
        </button>
      </div>

      {/* LISTA DE FLOWS */}
      <h2 className="text-xl font-semibold mb-4">Flujos creados</h2>

      <div className="space-y-4 mb-10">
        {flows.map((f) => (
          <button
            key={f.id}
            onClick={() => ejecutar(f.id)}
            className="block w-full text-left p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover-soft"
          >
            {f.nombre}
          </button>
        ))}
      </div>

      {/* VARIABLES */}
      <h2 className="text-xl font-semibold mb-4">Variables de entrada</h2>

      <div className="max-w-xl space-y-4 mb-10">
        <textarea
          value={JSON.stringify(variables, null, 2)}
          onChange={(e) => setVariables(JSON.parse(e.target.value))}
          className="w-full p-3 border rounded-lg min-h-[120px] dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      {/* RESULTADO */}
      {resultado && (
        <div className="p-4 bg-green-100 rounded-lg shadow">
          <h3 className="font-bold mb-2">Resultado del flujo:</h3>
          <pre className="text-sm">{JSON.stringify(resultado, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
