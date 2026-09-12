// app/dashboard/components/Navbar.tsx
"use client";

import { useState } from "react";
import { Bell, Menu, User } from "lucide-react";

type NavbarProps = {
  title?: string;
};

export function Navbar({ title = "PromptAnalyticAI" }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-4 py-3">
      {/* Left section */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-lg hover:bg-slate-800 transition"
        >
          <Menu className="w-5 h-5 text-slate-300" />
        </button>

        <h1 className="text-lg font-semibold text-slate-100">{title}</h1>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg hover:bg-slate-800 transition">
          <Bell className="w-5 h-5 text-slate-300" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <button className="p-2 rounded-lg hover:bg-slate-800 transition">
          <User className="w-5 h-5 text-slate-300" />
        </button>
      </div>
    </nav>
  );
}
