import { supabase } from "@/lib/supabaseClient";

export async function cargarActividad(workspaceId: string) {
  return supabase
    .from("audit_logs")
    .select("*, user_id")
    .eq("workspace_id", workspaceId)
    .order("creado", { ascending: false });
}
