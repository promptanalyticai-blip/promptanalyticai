// app/dashboard/notificaciones/page.tsx
"use client";

import { Header } from "../components/Header";
import { NotificationList } from "./components/NotificationList";

export default function NotificacionesPage() {
  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Notificaciones"
        subtitle="Alertas y avisos importantes del sistema"
      />

      <NotificationList />
    </div>
  );
}
