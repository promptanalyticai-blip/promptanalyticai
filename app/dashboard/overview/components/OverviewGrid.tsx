// app/dashboard/overview/components/OverviewGrid.tsx
"use client";

import { OverviewCard } from "./OverviewCard";

export function OverviewGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <OverviewCard
        title="Estado del sistema"
        value="Operativo"
        status="Todos los servicios funcionando correctamente"
      />

      <OverviewCard
        title="Uso mensual"
        value="78%"
        status="Basado en tus límites actuales"
      />

      <OverviewCard
        title="Tareas pendientes"
        value="5"
        status="Automatizaciones y análisis en cola"
      />
    </div>
  );
}
