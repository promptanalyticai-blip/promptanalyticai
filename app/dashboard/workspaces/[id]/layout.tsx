"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { obtenerRolWorkspace } from "@/lib/workspaceRoles";

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    async function check() {
      const workspaceId = localStorage.getItem("workspace_id");

      const { data } = await supabase.auth.getUser();
      if (!data.user || !workspaceId) {
        window.location.href = "/auth/login";
        return;
      }

      const role = await obtenerRolWorkspace(data.user.id, workspaceId);

      if (!role) {
        window.location.href = "/dashboard/workspaces";
        return;
      }

      setAllowed(true);
    }

    check();
  }, []);

  if (!allowed) return null;

  return <>{children}</>;
}
