// app/dashboard/metrics/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function MetricsPage() {
  const [metrics, setMetrics] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabaseBrowser.from("metrics").select("*");
      setMetrics(data || []);
    };
    load();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Metrics</h1>
      <pre className="mt-4">{JSON.stringify(metrics, null, 2)}</pre>
    </div>
  );
}
