// app/dashboard/reports/page.tsx
"use client";

import Header from "../../components/Header";
import { supabase } from "@/lib/supabaseClient";

export default async function ReportsPage() {
  const { data: reports } = await supabase
    .from("reports")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-6">
      <Header title="Reports" subtitle="Historial de reportes del workspace" />

      <div className="mt-6 space-y-4">
        {reports?.map((report) => (
          <div
            key={report.id}
            className="p-4 bg-slate-900 border border-slate-800 rounded-lg"
          >
            <h3 className="text-lg font-semibold text-slate-100">
              {report.title}
            </h3>
            <p className="text-slate-400 text-sm">{report.description}</p>
            <p className="text-slate-500 text-xs mt-2">
              {new Date(report.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
