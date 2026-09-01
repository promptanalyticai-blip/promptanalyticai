import { supabase } from "@/lib/supabaseClient";

export async function agregarTag(workspaceId: string, userId: string, recursoId: string, tipo: string, etiqueta: string) {
  return supabase.from("tags").insert([
    { workspace_id: workspaceId, user_id: userId, recurso_id: recursoId, tipo, etiqueta }
  ]);
}

export async function cargarTags(workspaceId: string, recursoId: string) {
  return supabase
    .from("tags")
    .select("*")
    .eq("workspace_id", workspaceId)
    .eq("recurso_id", recursoId)
    .order("creado", { ascending: false });
}
