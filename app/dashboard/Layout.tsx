import { ReactNode, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    const workspaceId = localStorage.getItem("workspace_id");
    if (!workspaceId) {
      console.warn("No workspace_id found in localStorage");
    }
  }, []);

  return <>{children}</>;
}
