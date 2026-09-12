// app/dashboard/teams/page.tsx
"use client";

import { Header } from "../components/Header";
import { TeamList } from "./components/TeamList";

export default function TeamsPage() {
  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Equipos"
        subtitle="Organiza usuarios en grupos de trabajo y gestiona permisos"
      />

      <TeamList />
    </div>
  );
}
