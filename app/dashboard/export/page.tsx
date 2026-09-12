"use client";

import { Header } from "../components/Header";

export default function ExportPage() {
  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Exportar"
        subtitle="Exportación profesional de análisis, reportes, archivos y métricas"
      />

      <p className="text-slate-400">
        Usa los botones de exportación dentro de cada módulo para generar PDF, JSON, CSV o TXT.
      </p>
    </div>
  );
}
