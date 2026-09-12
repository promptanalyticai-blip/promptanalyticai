// app/dashboard/workspaces/[id]/layout.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { obtenerRolWorkspace } from "@/lib/workspaceRole"; // ← IMPORT CORREGIDO

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    async function checkRole() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setAllowed(false);
        return;
      }

      const workspaceId = window.location.pathname.split("/").pop();
      const role = await obtenerRolWorkspace(user.id, workspaceId!);

      if (role === "owner" || role === "admin") {
        setAllowed(true);
      } else {
        setAllowed(false);
      }
    }

    checkRole();
  }, []);

  if (!allowed) {
    return (
      <div className="p-6 text-center text-red-500">
        No tienes permisos para acceder a este workspace.
      </div>
    );
  }

  return <>{children}</>;
}
