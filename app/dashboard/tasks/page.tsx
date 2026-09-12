"use client";

import { Header } from "../components/Header";

export default function TasksPage() {
  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Tareas"
        subtitle="Checklist profesional por reportes, análisis, archivos y prompts"
      />

      <p className="text-slate-400">
        Las tareas se gestionan directamente desde cada entidad del sistema.
      </p>
    </div>
  );
}
