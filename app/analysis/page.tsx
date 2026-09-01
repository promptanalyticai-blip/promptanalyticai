"use client";

import { useState } from "react";

export default function AnalyzePage() {
  const [text, setText] = useState("");
  const [type, setType] = useState("general");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  async function handleAnalyze() {
    setLoading(true);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, type }),
      });

      const data = await res.json();
      setResult(data.analysis ?? "No se recibió un análisis.");
    } catch (error) {
      setResult("Hubo un error al analizar el texto.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Analyze</h1>

      <select
        className="border p-3 rounded-lg"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="general">General</option>
        <option value="marketing">Marketing</option>
        <option value="realestate">Real Estate</option>
        <option value="ecommerce">E-commerce</option>
        <option value="legal">Legal</option>
        <option value="rrhh">Recursos Humanos (RRHH)</option>
      </select>

      <textarea
        className="w-full p-4 border rounded-lg h-48"
        placeholder="Pega tu texto aquí..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={handleAnalyze}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg disabled:opacity-50"
        disabled={loading || !text.trim()}
      >
        {loading ? "Analizando..." : "Analizar"}
      </button>

      {result && (
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-xl font-bold mb-4">Resultado</h2>
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  );
}
