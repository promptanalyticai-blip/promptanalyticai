// app/dashboard/metrics/components/MetricGrid.tsx
"use client";

import { MetricCard } from "./MetricCard";

export function MetricGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <MetricCard
        label="Consultas realizadas"
        value="1,248"
        description="Total de prompts procesados"
      />

      <MetricCard
        label="Automatizaciones activas"
        value="12"
        description="Flujos automáticos en ejecución"
      />

      <MetricCard
        label="Archivos analizados"
        value="87"
        description="Documentos procesados este mes"
      />
    </div>
  );
}
