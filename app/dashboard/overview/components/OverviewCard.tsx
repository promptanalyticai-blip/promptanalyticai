// app/dashboard/overview/components/OverviewCard.tsx
"use client";

type OverviewCardProps = {
  title: string;
  value: string | number;
  status?: string;
};

export function OverviewCard({ title, value, status }: OverviewCardProps) {
  return (
    <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
      <h3 className="text-lg font-semibold text-slate-100">{title}</h3>

      <p className="text-3xl font-bold text-indigo-400 mt-2">{value}</p>

      {status && (
        <p className="text-slate-400 text-sm mt-1">{status}</p>
      )}
    </div>
  );
}
