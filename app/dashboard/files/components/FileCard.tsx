// app/dashboard/files/components/FileCard.tsx
"use client";

import { FileText, Trash2 } from "lucide-react";

type FileCardProps = {
  name: string;
  size: string;
  date: string;
};

export function FileCard({ name, size, date }: FileCardProps) {
  return (
    <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-md flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <FileText className="w-6 h-6 text-indigo-400" />
        <h3 className="text-slate-100 font-semibold">{name}</h3>
      </div>

      <p className="text-slate-400 text-sm">Tamaño: {size}</p>
      <p className="text-slate-400 text-sm">Fecha: {date}</p>

      <button className="mt-2 flex items-center gap-2 text-red-400 hover:text-red-300 transition text-sm">
        <Trash2 className="w-4 h-4" />
        Eliminar
      </button>
    </div>
  );
}
