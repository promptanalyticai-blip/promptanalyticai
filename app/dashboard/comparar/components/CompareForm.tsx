// app/dashboard/comparar/components/CompareForm.tsx
"use client";

import { useState } from "react";

type CompareFormProps = {
  onCompare: (result: string) => void;
};

export function CompareForm({ onCompare }: CompareFormProps) {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");

  function handleCompare(e: React.FormEvent) {
    e.preventDefault();

    if (!textA.trim() || !textB.trim()) return;

    // Simulación de comparación
    const mockResult = `Comparación realizada:\n\nTexto A: ${textA}\n\nTexto B: ${textB}\n\nResultado: Los textos fueron comparados correctamente.`;
    onCompare(mockResult);
  }

  return (
    <form
      onSubmit={handleCompare}
      className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-md flex flex-col gap-4"
    >
      <label className="text-slate-300 text-sm font-medium">
        Texto A:
      </label>
      <textarea
        value={textA}
        onChange={(e) => setTextA(e.target.value)}
        className="w-full h-32 p-3 rounded-lg bg-slate-800 text-slate-100 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Escribe el primer texto..."
      />

      <label className="text-slate-300 text-sm font-medium">
        Texto B:
      </label>
      <textarea
        value={textB}
        onChange={(e) => setTextB(e.target.value)}
        className="w-full h-32 p-3 rounded-lg bg-slate-800 text-slate-100 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Escribe el segundo texto..."
      />

      <button
        type="submit"
        className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition text-white font-medium"
      >
        Comparar textos
      </button>
    </form>
  );
}
