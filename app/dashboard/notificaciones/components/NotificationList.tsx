// app/dashboard/notificaciones/components/NotificationList.tsx
"use client";

import { NotificationItem } from "./NotificationItem";

export function NotificationList() {
  const mockNotifications = [
    {
      title: "Análisis completado",
      message: "El archivo Reporte_01.pdf fue procesado correctamente.",
      date: "2026-09-02 14:22",
      read: false,
    },
    {
      title: "Nueva automatización",
      message: "Se creó la automatización semanal de métricas.",
      date: "2026-09-01 18:10",
      read: true,
    },
    {
      title: "Actualización del sistema",
      message: "Se aplicaron mejoras de rendimiento.",
      date: "2026-08-31 09:47",
      read: true,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {mockNotifications.map((n, index) => (
        <NotificationItem
          key={index}
          title={n.title}
          message={n.message}
          date={n.date}
          read={n.read}
        />
      ))}
    </div>
  );
}
