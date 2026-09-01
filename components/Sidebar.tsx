"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved === "true") setDark(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", dark.toString());
  }, [dark]);

  return (
    <aside className="w-64 h-screen bg-white dark:bg-gray-800 shadow-xl fixed left-0 top-0 p-6 flex flex-col">
      <div className="flex items-center gap-3 mb-10">
        <img src="/logo.svg" alt="logo" className="h-8" />
        <h1 className="text-2xl font-bold dark:text-white">PromptAnalyticAI</h1>
      </div>

      <nav className="flex flex-col gap-4">
        <Link href="/dashboard/analizar" className="text-lg font-medium dark:text-gray-200">
          Analizar texto
        </Link>
        <Link href="/dashboard/historial" className="text-lg font-medium dark:text-gray-200">
          Historial
        </Link>
        <Link href="/dashboard/favoritos" className="text-lg font-medium dark:text-gray-200">
          Favoritos
        </Link>
        <Link href="/dashboard/comparar" className="text-lg font-medium dark:text-gray-200">
          Comparar análisis
        </Link>
      </nav>

      <div className="mt-auto">
        <button
          onClick={() => setDark(!dark)}
          className="w-full mt-6 px-4 py-2 rounded-lg bg-gray-900 text-white dark:bg-gray-200 dark:text-black"
        >
          {dark ? "Modo claro" : "Modo oscuro"}
        </button>
      </div>
    </aside>
  );
}
