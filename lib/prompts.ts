import { supabase } from "./supabaseClient";

export async function crearPrompt(nombre: string, contenido: string, userId: string, workspaceId: string | null) {
  return supabase.from("prompts").insert([{ nombre, contenido, user_id: userId, workspace_id: workspaceId }]);
}

export async function cargarPrompts(userId: string, workspaceId: string | null) {
  let q = supabase.from("prompts").select("*").eq("user_id", userId);
  if (workspaceId) q = q.eq("workspace_id", workspaceId);
  return q.order("creado", { ascending: false });
}

export async function actualizarPrompt(id: string, nombre: string, contenido: string) {
  return supabase.from("prompts").update({ nombre, contenido }).eq("id", id);
}

export async function eliminarPrompt(id: string) {
  return supabase.from("prompts").delete().eq("id", id);
}

export async function marcarFavoritoPrompt(id: string) {
  return supabase.from("prompts").update({ favorito: true }).eq("id", id);
}

export async function quitarFavoritoPrompt(id: string) {
  return supabase.from("prompts").update({ favorito: false }).eq("id", id);
}
