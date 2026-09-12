// app/dashboard/metrics/page.tsx
"use client";

import Header from "../components/Header";
import { supabase } from "@/lib/supabaseClient";

export default function MetricsPage() {
  async function loadMetrics() {
    const { data } = await supabase.from("metrics").select("*");
    return data;
  }

  return (
    <div className="p-6">
      <Header title="Metrics" subtitle="Estadísticas del sistema" />
    </div>
  );
}
