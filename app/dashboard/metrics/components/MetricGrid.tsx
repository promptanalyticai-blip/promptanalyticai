// app/dashboard/metrics/components/MetricGrid.tsx
"use client";

import { MetricCard } from "../MetricCard";

export function MetricGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <MetricCard title="Usuarios" value="120" />
      <MetricCard title="Ventas" value="$4,500" />
      <MetricCard title="Conversiones" value="3.2%" />
    </div>
  );
}
