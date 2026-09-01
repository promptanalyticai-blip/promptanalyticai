import { supabase } from "@/lib/supabaseClient";

export async function crearTemplate(nombre: string, contenido: string, userId: string, workspaceId: string) {
  return supabase.from("templates").insert([
    { nombre, contenido, user_id: userId, workspace_id: workspaceId }
  ]);
}

export async function cargarTemplates(userId: string, workspaceId: string) {
  return supabase
    .from("templates")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("creado", { ascending: false });
}

export async function actualizarTemplate(id: string, nombre: string, contenido: string) {
  return supabase
    .from("templates")
    .update({ nombre, contenido })
    .eq("id", id);
}

export async function eliminarTemplate(id: string) {
  return supabase.from("templates").delete().eq("id", id);
}

export async function marcarFavoritoTemplate(id: string) {
  return supabase.from("templates").update({ favorito: true }).eq("id", id);
}

export async function quitarFavoritoTemplate(id: string) {
  return supabase.from("templates").update({ favorito: false }).eq("id", id);
}
