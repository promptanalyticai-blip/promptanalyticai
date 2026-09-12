// app/dashboard/reports/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function ReportsPage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const loadReports = async () => {
      const { data, error } = await supabaseBrowser
        .from("reports")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) {
        setReports(data);
      }
    };

    loadReports();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Reports</h1>

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
