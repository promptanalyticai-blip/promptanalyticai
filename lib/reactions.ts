import { supabase } from "@/lib/supabaseClient";

export async function agregarReaccion(workspaceId: string, userId: string, recursoId: string, tipo: string, emoji?: string) {
  return supabase.from("reactions").insert([
    { workspace_id: workspaceId, user_id: userId, recurso_id: recursoId, tipo, emoji }
  ]);
}

export async function cargarReacciones(workspaceId: string, recursoId: string) {
  return supabase
    .from("reactions")
    .select("*")
    .eq("workspace_id", workspaceId)
    .eq("recurso_id", recursoId)
    .order("creado", { ascending: false });
}
