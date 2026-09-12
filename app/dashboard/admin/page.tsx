"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function AdminDashboard() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabaseBrowser.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });
  }, []);

  if (!session) {
    return <p>Cargando sesión...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Panel de Administración</h1>
      <p>Bienvenido, {session.user.email}</p>
    </div>
  );
}
