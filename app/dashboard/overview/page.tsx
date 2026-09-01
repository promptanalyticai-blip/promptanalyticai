"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { obtenerKPIs } from "@/lib/overview";

export default function OverviewPage() {
  const [kpi, setKpi] = useState<any>(null);

  async function load() {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      window.location.href = "/auth/login";
      return;
    }

    const workspaceId = localStorage.getItem("workspace_id");
    const datos = await obtenerKPIs(workspaceId!);
    setKpi(datos);
  }

  useEffect(() => {
    load();
  }, []);

  if (!kpi) return <p>Cargando...</p>;

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold mb-6">Dashboard Global</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Análisis</h2>
          <p className="text-3xl font-bold mt-2">{kpi.analisis}</p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Prompts</h2>
          <p className="text-3xl font-bold mt-2">{kpi.prompts}</p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Plantillas</h2>
          <p className="text-3xl font-bold mt-2">{kpi.templates}</p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Archivos</h2>
          <p className="text-3xl font-bold mt-2">{kpi.archivos}</p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Equipos</h2>
          <p className="text-3xl font-bold mt-2">{kpi.teams}</p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Miembros</h2>
          <p className="text-3xl font-bold mt-2">{kpi.miembros}</p>
        </div>

      </div>
    </div>
  );
}
