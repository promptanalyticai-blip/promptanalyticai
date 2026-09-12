// app/dashboard/webhooks/components/WebhookItem.tsx
"use client";

type WebhookItemProps = {
  name: string;
  url: string;
  active: boolean;
  onToggle: () => void;
};

export function WebhookItem({ name, url, active, onToggle }: WebhookItemProps) {
  return (
    <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-md flex justify-between items-center">
      <div className="flex flex-col">
        <span className="text-slate-100 font-semibold">{name}</span>
        <span className="text-slate-400 text-sm break-all">{url}</span>
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
