// app/dashboard/activity/components/ActivityList.tsx
"use client";

import { ActivityItem } from "./ActivityItem";

export function ActivityList() {
  const mockActivity = [
    {
      action: "Analizaste el archivo Reporte_01.pdf",
      timestamp: "2026-09-02 14:22",
    },
    {
      action: "Creaste una automatización de análisis semanal",
      timestamp: "2026-09-01 18:10",
    },
    {
      action: "Actualizaste tu configuración de notificaciones",
      timestamp: "2026-08-31 09:47",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {mockActivity.map((item, index) => (
        <ActivityItem
          key={index}
          action={item.action}
          timestamp={item.timestamp}
        />
      ))}
    </div>
  );
}
