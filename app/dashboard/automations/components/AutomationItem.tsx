// app/dashboard/automations/components/AutomationItem.tsx
"use client";

import { Zap, ToggleLeft, ToggleRight } from "lucide-react";

type AutomationItemProps = {
  name: string;
  schedule: string;
  active: boolean;
};

export function AutomationItem({ name, schedule, active }: AutomationItemProps) {
  return (
    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-md flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Zap className="w-6 h-6 text-indigo-400" />

        <div className="flex flex-col">
          <p className="text-slate-100 font-semibold">{name}</p>
          <span className="text-slate-400 text-sm">{schedule}</span>
        </div>
      </div>

      <button className="text-slate-300 hover:text-indigo-400 transition">
        {active ? (
          <ToggleRight className="w-8 h-8 text-indigo-400" />
        ) : (
          <ToggleLeft className="w-8 h-8 text-slate-600" />
        )}
      </button>
    </div>
  );
}
