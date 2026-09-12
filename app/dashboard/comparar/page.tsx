// app/dashboard/comparar/page.tsx
"use client";

import { Header } from "../components/Header";
import { CompareForm } from "./components/CompareForm";
import { CompareResult } from "./components/CompareResult";
import { useState } from "react";

export default function CompararPage() {
  const [result, setResult] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Comparar"
        subtitle="Compara dos textos, prompts o resultados"
      />

      <CompareForm onCompare={setResult} />

      {result && <CompareResult text={result} />}
    </div>
  );
}
