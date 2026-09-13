import { createClient } from "@/lib/supabase/client";

export async function cargarActividad(workspaceId: string) {
  const supabase = createClient();

  return supabase
    .from("activity")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: false });
}
