import { supabase } from "@/lib/supabaseClient";

export async function crearComentario(workspaceId: string, userId: string, recursoId: string, tipo: string, contenido: string) {
  return supabase.from("comments").insert([
    { workspace_id: workspaceId, user_id: userId, recurso_id: recursoId, tipo, contenido }
  ]);
}

export async function cargarComentarios(workspaceId: string, recursoId: string) {
  return supabase
    .from("comments")
    .select("*")
    .eq("workspace_id", workspaceId)
    .eq("recurso_id", recursoId)
    .order("creado", { ascending: false });
}
