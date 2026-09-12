// app/dashboard/analizar/page.tsx
"use client";

import { Header } from "../components/Header";
import { AnalyzeForm } from "./components/AnalyzeForm";
import { AnalyzeResult } from "./components/AnalyzeResult";
import { useState } from "react";

export default function AnalizarPage() {
  const [result, setResult] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Analizar archivo"
        subtitle="Sube un documento y obtén un análisis inteligente"
      />

      <AnalyzeForm onAnalyze={setResult} />

      {result && <AnalyzeResult text={result} />}
    </div>
  );
}
