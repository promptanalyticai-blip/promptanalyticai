// app/dashboard/files/components/FileGrid.tsx
"use client";

import { FileCard } from "./FileCard";

export function FileGrid() {
  const mockFiles = [
    { name: "Reporte_01.pdf", size: "2.4 MB", date: "2026-08-12" },
    { name: "Analisis_ventas.xlsx", size: "1.1 MB", date: "2026-08-10" },
    { name: "Clientes.csv", size: "850 KB", date: "2026-08-09" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {mockFiles.map((file) => (
        <FileCard
          key={file.name}
          name={file.name}
          size={file.size}
          date={file.date}
        />
      ))}
    </div>
  );
}
