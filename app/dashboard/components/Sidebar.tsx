// app/dashboard/components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  const nav = [
    { name: "Dashboard", href: "/dashboard", icon: "📊" },
    { name: "Enterprise", href: "/dashboard/enterprise", icon: "🏢" },
    { name: "Prompts", href: "/dashboard/prompts", icon: "💬" },
    { name: "Archivos", href: "/dashboard/files", icon: "📁" },
    { name: "Análisis", href: "/dashboard/analysis", icon: "🧠" },
    { name: "Reportes", href: "/dashboard/reports", icon: "📄" },
    { name: "Automations", href: "/dashboard/automations", icon: "⚙️" },
    { name: "Historial", href: "/dashboard/history", icon: "🕒" }
  ];

  return (
    <div className="w-64 h-screen bg-slate-950 border-r border-slate-800 p-6 flex flex-col gap-6">
      <h1 className="text-white text-xl font-bold">PromptAnalyticAI</h1>

      <nav className="flex flex-col gap-2">
        {nav.map((item) => {
          const active = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
                ${
                  active
                    ? "bg-indigo-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }
              `}
            >
              <span>{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
