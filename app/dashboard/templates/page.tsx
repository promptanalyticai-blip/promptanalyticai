// app/dashboard/templates/page.tsx
"use client";

import { Header } from "../components/Header";
import { TemplateList } from "./components/TemplateList";

export default function TemplatesPage() {
  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Plantillas"
        subtitle="Gestiona y organiza tus plantillas personalizadas"
      />

      <TemplateList />
    </div>
  );
}
