// app/dashboard/calendar/page.tsx
"use client";

import { Header } from "../components/Header";
import { CalendarGrid } from "./components/CalendarGrid";

export default function CalendarPage() {
  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Calendario"
        subtitle="Eventos y actividades programadas"
      />

      <CalendarGrid />
    </div>
  );
}
