"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function SubscriptionPage() {
  const [sub, setSub] = useState<any>(null);
  const [customerId, setCustomerId] = useState<string | null>(null);

  async function load() {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      window.location.href = "/auth/login";
      return;
    }

    const { data: subs } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", data.user.id)
      .single();

    setSub(subs || null);
   // setCustomerId(subs?.stripe_customer_id || null);
  }

  async function subscribe() {
    const { data } = await supabase.auth.getUser();

  //  const res = await fetch("/api/stripe/create-checkout", {
  //    method: "POST",
  //    body: JSON.stringify({ user_id: data.user.id }),
  //  });

  //  const { url } = await res.json();
   // window.location.href = url;
  }

//  async function openPortal() {
  //  const res = await fetch("/api/stripe/customer-portal", {
 //     method: "POST",
 //     body: JSON.stringify({ customer_id: customerId }),
 //   });

  //  const { url } = await res.json();
  //  window.location.href = url;
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold mb-6">Suscripción</h1>

      {!sub && (
        <button
          onClick={subscribe}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Suscribirme al plan Pro
        </button>
      )}

      {sub && (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow max-w-lg">
          <p className="mb-2">Estado: <strong>{sub.status}</strong></p>
          <p className="mb-2">Plan: {sub.plan_id}</p>
          <p className="mb-4">
            Renovación: {new Date(sub.current_period_end).toLocaleDateString()}
          </p>

          <button
            onClick={openPortal}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Administrar suscripción
          </button>
        </div>
      )}
    </div>
  );
}
