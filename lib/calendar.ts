import { supabase } from "@/lib/supabaseClient";

export async function crearEvento(workspaceId: string, userId: string, titulo: string, descripcion: string, fecha: string, hora: string) {
  return supabase.from("calendar_events").insert([
    { workspace_id: workspaceId, user_id: userId, titulo, descripcion, fecha, hora }
  ]);
}

export async function cargarEventos(workspaceId: string) {
  return supabase
    .from("calendar_events")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("fecha", { ascending: true })
    .order("hora", { ascending: true });
}
