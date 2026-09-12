// app/dashboard/reports/page.tsx
"use client";

import Header from "../components/Header";
import { supabase } from "@/lib/supabaseClient";

export default function ReportsPage() {
  async function loadReports() {
    const { data: reports } = await supabase
      .from("reports")
      .select("*")
      .order("created_at", { ascending: false });

    return reports;
  }

  return (
    <div className="p-6">
      <Header title="Reports" subtitle="Historial de reportes del workspace" />

      {/* Aquí luego puedes renderizar los reportes */}
    </div>
  );
}
