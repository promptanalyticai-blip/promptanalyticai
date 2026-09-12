// app/dashboard/automations/components/AutomationList.tsx
"use client";

import { AutomationItem } from "./AutomationItem";

export function AutomationList() {
  const mockAutomations = [
    {
      name: "Análisis diario de archivos",
      schedule: "Todos los días a las 8:00 AM",
      active: true,
    },
    {
      name: "Reporte semanal",
      schedule: "Cada lunes a las 9:00 AM",
      active: false,
    },
    {
      name: "Backup automático",
      schedule: "Cada 12 horas",
      active: true,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {mockAutomations.map((auto, index) => (
        <AutomationItem
          key={index}
          name={auto.name}
          schedule={auto.schedule}
          active={auto.active}
        />
      ))}
    </div>
  );
}
