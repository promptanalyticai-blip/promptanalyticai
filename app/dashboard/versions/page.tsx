// app/dashboard/versions/page.tsx
"use client";

import { Header } from "../components/Header";
import { VersionList } from "./components/VersionList";

export default function VersionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Versiones"
        subtitle="Historial de actualizaciones y cambios del sistema"
      />

      <VersionList />
    </div>
  );
}
