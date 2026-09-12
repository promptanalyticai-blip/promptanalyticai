import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "PromptAnalyticAI",
  description: "SaaS para análisis avanzado de prompts y auditoría de acciones."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-950 text-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-6">{children}</div>
      </body>
    </html>
  );
}
