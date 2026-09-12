// app/dashboard/estadisticas/page.tsx
"use client";

import { Header } from "../components/Header";
import { StatsGrid } from "./components/StatsGrid";

export default function EstadisticasPage() {
  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Estadísticas"
        subtitle="Visualiza métricas clave y rendimiento del sistema"
      />

      <StatsGrid />
    </div>
  );
}
