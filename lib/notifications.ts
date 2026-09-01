import { supabase } from "./supabaseClient";

export async function crearNotificacion(workspaceId: string, userId: string, tipo: string, mensaje: string) {
  return supabase.from("notifications").insert([
    { workspace_id: workspaceId, user_id: userId, tipo, mensaje }
  ]);
}

export async function cargarNotificaciones(workspaceId: string) {
  return supabase
    .from("notifications")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("creado", { ascending: false });
}
