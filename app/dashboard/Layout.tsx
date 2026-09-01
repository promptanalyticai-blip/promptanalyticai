"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardLayout({ children }) {

  useEffect(() => {
    const workspaceId = localStorage.getItem("workspace_id");
    if (!workspaceId) return;

    const channel = supabase
      .channel(`workspace:${workspaceId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `workspace_id=eq.${workspaceId}`
        },
        (payload) => {
          const evt = new CustomEvent("nueva_notificacion", { detail: payload.new });
          window.dispatchEvent(evt);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return <>{children}</>;
}
