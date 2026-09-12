// app/dashboard/calendar/components/CalendarGrid.tsx
"use client";

import { CalendarEvent } from "./CalendarEvent";

export function CalendarGrid() {
  const mockEvents = [
    { title: "Revisión semanal", date: "2026-09-03" },
    { title: "Análisis mensual", date: "2026-09-05" },
    { title: "Reunión de métricas", date: "2026-09-08" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {mockEvents.map((event, index) => (
        <CalendarEvent
          key={index}
          title={event.title}
          date={event.date}
        />
      ))}
    </div>
  );
}
