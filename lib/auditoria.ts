import { supabase } from "@/lib/supabaseClient";

export async function registrarAccion(workspaceId: string, userId: string, accion: string, detalle: string = "") {
  return supabase.from("audit_logs").insert([
    { workspace_id: workspaceId, user_id: userId, accion, detalle }
  ]);
}

export async function cargarAuditoria(workspaceId: string) {
  return supabase
    .from("audit_logs")
    .select("*, user_id")
    .eq("workspace_id", workspaceId)
    .order("creado", { ascending: false });
}
