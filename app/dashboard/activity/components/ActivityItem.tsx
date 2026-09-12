// app/dashboard/activity/components/ActivityItem.tsx
"use client";

import { Clock } from "lucide-react";

type ActivityItemProps = {
  action: string;
  timestamp: string;
};

export function ActivityItem({ action, timestamp }: ActivityItemProps) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
      <Clock className="w-5 h-5 text-indigo-400 mt-1" />

      <div className="flex flex-col">
        <p className="text-slate-100 font-medium">{action}</p>
        <span className="text-slate-400 text-sm">{timestamp}</span>
      </div>
    </div>
  );
}
