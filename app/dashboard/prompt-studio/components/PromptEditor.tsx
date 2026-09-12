// app/dashboard/prompt-studio/components/PromptEditor.tsx
"use client";

import { useState } from "react";

type PromptEditorProps = {
  onRun: (result: string) => void;
};

export function PromptEditor({ onRun }: PromptEditorProps) {
  const [prompt, setPrompt] = useState("");

  function handleRun() {
    if (!prompt.trim()) return;

    // Simulación de respuesta
    const mockResponse = `Respuesta generada para tu prompt:\n\n"${prompt}"`;
    onRun(mockResponse);
  }

  return (
    <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-md flex flex-col gap-4">
      <label className="text-slate-300 text-sm font-medium">
        Escribe tu prompt:
      </label>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full h-40 p-3 rounded-lg bg-slate-800 text-slate-100 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Ejemplo: Resume este texto..."
      />

      <button
        onClick={handleRun}
        className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition text-white font-medium"
      >
        Ejecutar prompt
      </button>
    </div>
  );
}
