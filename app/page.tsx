"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    setDark(theme === "dark");
  }, []);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 fade-in">
        {/* Navbar con branding */}
        <h1 className="text-4xl font-bold p-6">PromptAnalyticAI</h1>

        <p className="p-6">Bienvenida, Mindy.</p>
      </div>
    </div>
  );
}
