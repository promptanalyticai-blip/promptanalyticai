// app/dashboard/versions/components/VersionItem.tsx
"use client";

type VersionItemProps = {
  version: string;
  date: string;
  status: "stable" | "beta";
};

export function VersionItem({ version, date, status }: VersionItemProps) {
  const statusColor =
    status === "stable" ? "text-green-400" : "text-yellow-400";

  return (
    <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-md flex justify-between items-center">
      <div className="flex flex-col">
        <span className="text-slate-100 font-semibold">{version}</span>
        <span className="text-slate-400 text-sm">{date}</span>
      </div>

      <div className="flex items-center gap-4">
        <span className={`${statusColor} text-sm font-medium`}>
          {status === "stable" ? "Estable" : "Beta"}
        </span>

        <button className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition text-white text-sm">
          Ver detalles
        </button>
      </div>
    </div>
  );
}
