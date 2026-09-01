"use client";

import { useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [resultados, setResultados] = useState<any>(null);

  async function buscar() {
    const workspaceId = localStorage.getItem("workspace_id");

    const res = await fetch("/api/search", {
      method: "POST",
      body: JSON.stringify({ query, workspaceId }),
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();
    setResultados(data);
  }

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold mb-6">Buscador Global</h1>

      <div className="max-w-xl space-y-4 mb-10">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar en todo el workspace..."
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />

        <button
          onClick={buscar}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full"
        >
          Buscar
        </button>
      </div>

      {resultados && (
        <div className="space-y-8">

          {/* PROMPTS */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Prompts</h2>
            {resultados.prompts.length === 0 && <p className="opacity-60">Sin resultados</p>}
            {resultados.prompts.map((p: any) => (
              <div key={p.id} className="p-3 bg-white dark:bg-gray-800 rounded shadow mb-2">
                <p className="font-bold">{p.nombre}</p>
                <p className="text-sm opacity-70">{p.contenido}</p>
              </div>
            ))}
          </div>

          {/* TEMPLATES */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Plantillas</h2>
            {resultados.templates.length === 0 && <p className="opacity-60">Sin resultados</p>}
            {resultados.templates.map((t: any) => (
              <div key={t.id} className="p-3 bg-white dark:bg-gray-800 rounded shadow mb-2">
                <p className="font-bold">{t.nombre}</p>
                <p className="text-sm opacity-70">{t.contenido}</p>
              </div>
            ))}
          </div>

          {/* ARCHIVOS */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Archivos</h2>
            {resultados.archivos.length === 0 && <p className="opacity-60">Sin resultados</p>}
            {resultados.archivos.map((f: any) => (
              <div key={f.id} className="p-3 bg-white dark:bg-gray-800 rounded shadow mb-2">
                <p className="font-bold">{f.nombre}</p>
                <a href={f.url} target="_blank" className="text-blue-600 underline">
                  Ver archivo
                </a>
              </div>
            ))}
          </div>

          {/* ANÁLISIS */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Análisis</h2>
            {resultados.analisis.length === 0 && <p className="opacity-60">Sin resultados</p>}
            {resultados.analisis.map((a: any) => (
              <div key={a.id} className="p-3 bg-white dark:bg-gray-800 rounded shadow mb-2">
                <p className="font-bold">Industria: {a.industria}</p>
                <p className="text-sm opacity-70 whitespace-pre-wrap">{a.resultado}</p>
              </div>
            ))}
          </div>

          {/* EQUIPOS */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Equipos</h2>
            {resultados.teams.length === 0 && <p className="opacity-60">Sin resultados</p>}
            {resultados.teams.map((t: any) => (
              <div key={t.id} className="p-3 bg-white dark:bg-gray-800 rounded shadow mb-2">
                <p className="font-bold">{t.nombre}</p>
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
}
