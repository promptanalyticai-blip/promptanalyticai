"use client";

import { useEffect, useState } from "react";
import { getHistorial } from "@/lib/historialSupabase";

export default function HistorialPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getHistorial().then(setItems);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Historial</h1>
      <pre className="mt-4">{JSON.stringify(items, null, 2)}</pre>
    </div>
  );
}
