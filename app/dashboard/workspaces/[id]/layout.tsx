// app/dashboard/workspaces/[id]/layout.tsx
"use client";

import { ReactNode, useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function WorkspaceLayout({
  params,
  children,
}: {
  params: { id: string };
  children: ReactNode;
}) {
  const [workspace, setWorkspace] = useState<any>(null);

  useEffect(() => {
    const loadWorkspace = async () => {
      const { data, error } = await supabaseBrowser
        .from("workspaces")
        .select("*")
        .eq("id", params.id)
        .single();

      if (!error) {
        setWorkspace(data);
      }
    };

    loadWorkspace();
  }, [params.id]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">
        Workspace: {workspace ? workspace.name : "Cargando..."}
      </h1>
      <div className="mt-4">{children}</div>
    </div>
  );
}
