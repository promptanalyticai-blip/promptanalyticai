// app/dashboard/analizar/components/AnalyzeResult.tsx
"use client";

type AnalyzeResultProps = {
  text: string;
};

export function AnalyzeResult({ text }: AnalyzeResultProps) {
  return (
    <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
      <h3 className="text-lg font-semibold text-slate-100 mb-2">
        Resultado del análisis
      </h3>

      <p className="text-slate-300 text-sm">{text}</p>
    </div>
  );
}
