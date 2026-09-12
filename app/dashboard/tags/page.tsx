"use client";

import { Header } from "../components/Header";

export default function TagsPage() {
  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Tags"
        subtitle="Sistema de tags colaborativos por workspace"
      />

      <p className="text-slate-400">
        Los tags se asignan automáticamente desde cada entidad (archivos, reportes, análisis, prompts).
      </p>
    </div>
  );
}
