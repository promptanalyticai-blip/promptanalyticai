"use client";

import { useEffect, useState } from "react";

export default function ReportsPage() {
  const [lista, setLista] = useState<any[]>([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [secciones, setSecciones] = useState<any[]>([]);
  const [variables, setVariables] = useState<any>({});
  const [resultado, setResultado] = useState<any>(null);

  async function cargar() {
    const workspaceId = localStorage.getItem("workspace_id");

    const res = await fetch("/api/reports/list", {
      method: "POST",
      body: JSON.stringify({ workspaceId }),
      headers: { "Content-Type": "application/json" }
    });

    setLista(await res.json());
  }

  async function crear() {
    const workspaceId = localStorage.getItem("workspace_id");

    await fetch("/api/reports/create", {
      method: "POST",
      body: JSON.stringify({ workspaceId, nombre, descripcion, secciones }),
      headers: { "Content-Type": "application/json" }
    });

    setNombre("");
    setDescripcion("");
    setSecciones([]);
    cargar();
  }

  async function ejecutar(reportId: string) {
    const res = await fetch("/api/reports/run", {
      method: "POST",
      body: JSON.stringify({ reportId, variables }),
      headers: { "Content-Type": "application/json" }
    });

    setResultado(await res.json());
  }

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold mb-6">Report Builder</h1>

      {/* CREAR REPORTE */}
      <div className="max-w-xl space-y-4 mb-10">
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del reporte"
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />

        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción"
          className="w-full p-3 border rounded-lg min-h-[100px] dark:bg-gray-700 dark:border-gray-600"
        />

        <button
          onClick={() =>
            setSecciones([...secciones, { titulo: "", prompt: "" }])
          }
          className="px-4 py-2 bg-gray-600 text-white rounded-lg w-full"
        >
          Agregar sección
        </button>

        {secciones.map((s, i) => (
          <div key={i} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow space-y-2">
            <input
              value={s.titulo}
              onChange={(e) => {
                const copy = [...secciones];
                copy[i].titulo = e.target.value;
                setSecciones(copy);
              }}
              placeholder="Título de la sección"
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />

            <textarea
              value={s.prompt}
              onChange={(e) => {
                const copy = [...secciones];
                copy[i].prompt = e.target.value;
                setSecciones(copy);
              }}
              placeholder="Prompt IA de la sección"
              className="w-full p-3 border rounded-lg min-h-[100px] dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        ))}

        <button
          onClick={crear}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full"
        >
          Crear reporte
        </button>
      </div>

      {/* LISTA DE REPORTES */}
      <h2 className="text-xl font-semibold mb-4">Reportes creados</h2>

      <div className="space-y-4 mb-10">
        {lista.map((r) => (
          <button
            key={r.id}
            onClick={() => ejecutar(r.id)}
            className="block w-full text-left p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover-soft"
          >
            {r.nombre}
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
          <h3 className="font-bold mb-2">Resultado del reporte:</h3>
          <pre className="text-sm">{JSON.stringify(resultado, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
