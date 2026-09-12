// app/dashboard/automations/page.tsx
"use client";

import { Header } from "../components/Header";
import { Automations } from "../components/Automations";

export default function AutomationsPage() {
  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Automations"
        subtitle="Workflows automáticos del workspace"
      />

      <Automations />
    </div>
  );
}
