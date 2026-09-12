// app/dashboard/analizar/components/AnalyzeForm.tsx
"use client";

import { useState } from "react";

type AnalyzeFormProps = {
  onAnalyze: (result: string) => void;
};

export function AnalyzeForm({ onAnalyze }: AnalyzeFormProps) {
  const [file, setFile] = useState<File | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!file) return;

    // Simulación de análisis
    const mockResult = `El archivo "${file.name}" fue analizado correctamente.`;
    onAnalyze(mockResult);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-md flex flex-col gap-4"
    >
      <label className="text-slate-300 text-sm font-medium">
        Selecciona un archivo para analizar:
      </label>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="text-slate-300"
      />

      <button
        type="submit"
        className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition text-white font-medium"
      >
        Analizar archivo
      </button>
    </form>
  );
}
