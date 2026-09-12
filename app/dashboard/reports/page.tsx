// app/dashboard/reports/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function DashboardReportsPage() {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabaseBrowser.from("reports").select("*");
      setReports(data || []);
    };
    load();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Dashboard Reports</h1>
      <ul className="mt-4">
        {reports.map((r) => (
          <li key={r.id} className="border p-2 rounded mb-2">
            <strong>{r.title}</strong>
            <p>{r.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
