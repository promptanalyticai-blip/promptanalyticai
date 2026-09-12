// app/dashboard/metrics/components/MetricCard.tsx
"use client";

type MetricCardProps = {
  label: string;
  value: string | number;
  description?: string;
};

export function MetricCard({ label, value, description }: MetricCardProps) {
  return (
    <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
      <h3 className="text-lg font-semibold text-slate-100">{label}</h3>

      <p className="text-3xl font-bold text-indigo-400 mt-2">{value}</p>

      {description && (
        <p className="text-slate-400 text-sm mt-1">{description}</p>
      )}
    </div>
  );
}
