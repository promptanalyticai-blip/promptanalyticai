// app/dashboard/api-keys/components/ApiKeyItem.tsx
"use client";

type ApiKeyItemProps = {
  name: string;
  key: string;
  active: boolean;
  onToggle: () => void;
};

export function ApiKeyItem({ name, key, active, onToggle }: ApiKeyItemProps) {
  return (
    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-md flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-slate-100 font-semibold">{name}</span>
        <span className="text-slate-400 text-sm break-all">{key}</span>
      </div>

      <button
        onClick={onToggle}
        className={`px-3 py-1 rounded-lg text-sm ${
          active
            ? "bg-red-600 hover:bg-red-500 text-white"
            : "bg-green-600 hover:bg-green-500 text-white"
        }`}
      >
        {active ? "Desactivar" : "Activar"}
      </button>
    </div>
  );
}
