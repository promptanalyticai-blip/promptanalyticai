// app/dashboard/templates/components/TemplateItem.tsx
"use client";

type TemplateItemProps = {
  name: string;
  description: string;
};

export function TemplateItem({ name, description }: TemplateItemProps) {
  return (
    <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-md flex justify-between items-center">
      <div className="flex flex-col">
        <span className="text-slate-100 font-semibold">{name}</span>
        <span className="text-slate-400 text-sm">{description}</span>
      </div>

      <button className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition text-white text-sm">
        Usar plantilla
      </button>
    </div>
  );
}
