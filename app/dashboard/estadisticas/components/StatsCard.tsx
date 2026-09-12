// app/dashboard/estadisticas/components/StatsCard.tsx
"use client";

import { ReactNode } from "react";

type StatsCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
};

export function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-md flex items-center gap-4">
      <div className="text-indigo-400">{icon}</div>

      <div className="flex flex-col">
        <span className="text-slate-300 text-sm">{title}</span>
        <span className="text-slate-100 text-2xl font-bold">{value}</span>
      </div>
    </div>
  );
}
