import { supabase } from "@/lib/supabaseClient";

export async function obtenerRol(userId: string, workspaceId: string) {
  const { data } = await supabase
    .from("workspace_roles")
    .select("rol")
    .eq("user_id", userId)
    .eq("workspace_id", workspaceId)
    .single();

  return data?.rol || "lector";
}

export async function asignarRol(userId: string, workspaceId: string, rol: string) {
  return supabase.from("workspace_roles").upsert([
    { user_id: userId, workspace_id: workspaceId, rol }
  ]);
}

export async function cargarRoles(workspaceId: string) {
  return supabase
    .from("workspace_roles")
    .select("*, user_id")
    .eq("workspace_id", workspaceId);
}
