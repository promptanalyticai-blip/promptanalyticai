"use client";

import { Header } from "../components/Header";

export default function ReactionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Reacciones"
        subtitle="Métricas y actividad de reacciones en tu workspace"
      />

      <p className="text-slate-400">
        Las reacciones aparecen automáticamente en cada prompt, análisis, reporte y archivo.
      </p>
    </div>
  );
}
