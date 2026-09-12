// app/dashboard/overview/page.tsx
"use client";

import { Header } from "../components/Header";
import { OverviewGrid } from "./components/OverviewGrid";

export default function OverviewPage() {
  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Overview"
        subtitle="Resumen general de tu actividad y estado del sistema"
      />

      <OverviewGrid />
    </div>
  );
}
