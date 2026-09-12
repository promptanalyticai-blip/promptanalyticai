"use client";

import Header from "../components/Header";
import { supabase } from "@/lib/supabaseClient";

export default async function ReportsPage() {
  const { data } = await supabase.from("reports").select("*");

  return (
    <div className="p-6">
      <Header title="Reports" subtitle="Historial de reportes" />
    </div>
  );
}
