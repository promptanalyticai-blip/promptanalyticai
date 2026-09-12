// app/dashboard/configuracion/page.tsx
"use client";

import { Header } from "../components/Header";
import { ConfigGeneral } from "./components/ConfigGeneral";
import { ConfigAccount } from "./components/ConfigAccount";

export default function ConfiguracionPage() {
  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Configuración"
        subtitle="Ajusta las preferencias y opciones de tu cuenta"
      />

      <ConfigGeneral />
      <ConfigAccount />
    </div>
  );
}
