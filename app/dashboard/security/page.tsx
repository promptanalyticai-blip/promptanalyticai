// app/dashboard/security/page.tsx
"use client";

import { Header } from "../components/Header";
import { SecuritySettings } from "./components/SecuritySettings";
import { TwoFactorCard } from "./components/TwoFactorCard";

export default function SecurityPage() {
  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Seguridad"
        subtitle="Protege tu cuenta y administra opciones avanzadas"
      />

      <SecuritySettings />
      <TwoFactorCard />
    </div>
  );
}
