// app/dashboard/workspaces/components/WorkspaceCard.tsx
"use client";

type WorkspaceCardProps = {
  name: string;
  members: number;
  onSelect: () => void;
};

export function WorkspaceCard({ name, members, onSelect }: WorkspaceCardProps) {
  return (
    <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-md flex justify-between items-center">
      <div className="flex flex-col">
        <span className="text-slate-100 font-semibold">{name}</span>
        <span className="text-slate-400 text-sm">{members} miembros</span>
      </div>

      <button
        onClick={onSelect}
        className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition text-white text-sm"
      >
        Cambiar
      </button>
    </div>
  );
}
