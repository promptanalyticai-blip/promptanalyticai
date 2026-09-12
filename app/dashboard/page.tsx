// app/dashboard/page.tsx
"use client";

import { Header } from "./components/Header";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <Header title="Dashboard" subtitle="Bienvenida a tu panel de control" />

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Ejemplo de tarjetas del dashboard */}
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
          <h3 className="text-lg font-semibold mb-2">Actividad reciente</h3>
          <p className="text-slate-400 text-sm">
            Aquí verás tus últimas acciones dentro del sistema.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
          <h3 className="text-lg font-semibold mb-2">Analíticas</h3>
          <p className="text-slate-400 text-sm">
            Métricas clave de tu uso y rendimiento.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
          <h3 className="text-lg font-semibold mb-2">Automatizaciones</h3>
          <p className="text-slate-400 text-sm">
            Configura flujos automáticos para tu trabajo.
          </p>
        </div>
      </section>
    </div>
  );
}
