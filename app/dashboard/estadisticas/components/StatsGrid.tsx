// app/dashboard/estadisticas/components/StatsGrid.tsx
"use client";

import { StatsCard } from "./StatsCard";
import { BarChart3, FileText, Zap, Users } from "lucide-react";

export function StatsGrid() {
  const stats = [
    {
      title: "Análisis realizados",
      value: 128,
      icon: <BarChart3 className="w-8 h-8" />,
    },
    {
      title: "Archivos procesados",
      value: 54,
      icon: <FileText className="w-8 h-8" />,
    },
    {
      title: "Automatizaciones activas",
      value: 7,
      icon: <Zap className="w-8 h-8" />,
    },
    {
      title: "Usuarios del workspace",
      value: 3,
      icon: <Users className="w-8 h-8" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((s, index) => (
        <StatsCard key={index} title={s.title} value={s.value} icon={s.icon} />
      ))}
    </div>
  );
}
