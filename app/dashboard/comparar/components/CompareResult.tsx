// app/dashboard/comparar/components/CompareResult.tsx
"use client";

type CompareResultProps = {
  text: string;
};

export function CompareResult({ text }: CompareResultProps) {
  return (
    <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
      <h3 className="text-lg font-semibold text-slate-100 mb-2">
        Resultado de la comparación
      </h3>

      <pre className="whitespace-pre-wrap text-slate-300 text-sm">
        {text}
      </pre>
    </div>
  );
}
