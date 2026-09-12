"use client";

import { Header } from "../components/Header";

export default function ActivityPage() {
  const events = [
    {
      title: "Archivo subido",
      description: "Juan subió reporte-mensual.pdf",
      time: "Hace 2 horas",
    },
    {
      title: "Análisis generado",
      description: "Se generó un análisis de métricas",
      time: "Hace 5 horas",
    },
    {
      title: "Workspace actualizado",
      description: "Se cambió el nombre del workspace Marketing",
      time: "Ayer",
    },
    {
      title: "Automatización ejecutada",
      description: "Resumen semanal completado",
      time: "Ayer",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Actividad"
        subtitle="Eventos recientes en tu cuenta y workspaces"
      />

      <div className="flex flex-col gap-4">
        {events.map((e, index) => (
          <div
            key={index}
            className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-md"
          >
            <h3 className="text-slate-100 font-semibold">{e.title}</h3>
            <p className="text-slate-400 text-sm">{e.description}</p>
            <span className="text-slate-500 text-xs">{e.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
