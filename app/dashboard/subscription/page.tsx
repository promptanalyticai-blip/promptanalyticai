"use client";

import { useEffect, useState } from "react";

type Subscription = {
  id: string;
  status: string;
  plan_id: string;
  created_at: string;
};

export default function SubscriptionPage() {
  const [subs, setSubs] = useState<Subscription[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/subscriptions");
      const data = await res.json();
      setSubs(data.subscriptions ?? []);
    }

    load();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Suscripciones</h1>

      {subs.length === 0 && <p>No hay suscripciones activas.</p>}

      {subs.map((sub) => (
        <div
          key={sub.id}
          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow max-w-lg mb-4"
        >
          <p className="mb-2">
            Estado: <strong>{sub.status}</strong>
          </p>
          <p className="mb-2">Plan: {sub.plan_id}</p>
          <p className="mb-4">Creado: {sub.created_at}</p>
        </div>
      ))}
    </div>
  );
}
