"use client";

import { useEffect, useState } from "react";
import { getHistorial } from "@/lib/historialSupabase";

export default function HistorialPage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    getHistorial().then((res) => setItems(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Historial</h1>

      <pre>{JSON.stringify(items, null, 2)}</pre>
    </div>
  );
}
