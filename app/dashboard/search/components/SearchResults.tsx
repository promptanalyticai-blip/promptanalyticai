// app/dashboard/search/components/SearchResults.tsx
"use client";

type SearchResultsProps = {
  query: string;
};

export function SearchResults({ query }: SearchResultsProps) {
  const data = [
    { type: "Archivo", name: "reporte-mensual.pdf" },
    { type: "Análisis", name: "Comparación de métricas" },
    { type: "Automatización", name: "Workflow semanal" },
    { type: "Prompt", name: "Generador de resúmenes" },
  ];

  const filtered =
    query.trim().length === 0
      ? []
      : data.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className="flex flex-col gap-3">
      {filtered.length === 0 && query.trim().length > 0 && (
        <p className="text-slate-400 text-sm">
          No se encontraron resultados para "{query}"
        </p>
      )}

      {filtered.map((item, index) => (
        <div
          key={index}
          className="p-4 rounded-lg bg-slate-900 border border-slate-800 shadow-md flex justify-between"
        >
          <span className="text-slate-100 font-medium">{item.name}</span>
          <span className="text-slate-400 text-sm">{item.type}</span>
        </div>
      ))}
    </div>
  );
}
