"use client";

import { useEffect, useState } from "react";

export default function MetricsPage() {
  const [data, setData] = useState<any>(null);

  async function cargar() {
    const workspaceId = localStorage.getItem("workspace_id");

    const res = await fetch("/api/metrics/workspace", {
      method: "POST",
      body: JSON.stringify({ workspaceId }),
      headers: { "Content-Type": "application/json" }
    });

    setData(await res.json());
  }

  useEffect(() => {
    cargar();
  }, []);

  if (!data) return <div>Cargando métricas...</div>;

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold mb-6">Métricas del Workspace</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <MetricCard titulo="Análisis" valor={data.analisis} />
        <MetricCard titulo="Prompts" valor={data.prompts} />
        <MetricCard titulo="Archivos" valor={data.archivos} />
        <MetricCard titulo="Tareas" valor={data.tareas} />
        <MetricCard titulo="Equipos" valor={data.equipos} />
        <MetricCard titulo="Versiones" valor={data.versiones} />
        <MetricCard titulo="Automations" valor={data.automations} />
        <MetricCard titulo="Reportes" valor={data.reportes} />
      </div>

      <h2 className="text-xl font-semibold mb-4">Actividad por día</h2>

      <div className="space-y-2">
        {Object.keys(data.actividad).map((fecha) => (
          <div key={fecha} className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="font-bold">{fecha}</p>
            <p className="opacity-80">Análisis creados: {data.actividad[fecha]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MetricCard({ titulo, valor }: any) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow text-center">
      <p className="text-sm opacity-70">{titulo}</p>
      <p className="text-3xl font-bold">{valor}</p>
    </div>
  );
}
