import { supabase } from "@/lib/supabaseClient";

export async function crearColeccion(workspaceId: string, userId: string, nombre: string) {
  return supabase.from("favorite_collections").insert([
    { workspace_id: workspaceId, user_id: userId, nombre }
  ]);
}

export async function cargarColecciones(workspaceId: string) {
  return supabase
    .from("favorite_collections")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("creado", { ascending: false });
}

export async function agregarFavorito(workspaceId: string, userId: string, recursoId: string, tipo: string, collectionId: string) {
  return supabase.from("favorites").insert([
    { workspace_id: workspaceId, user_id: userId, recurso_id: recursoId, tipo, collection_id: collectionId }
  ]);
}

export async function cargarFavoritos(workspaceId: string, collectionId: string) {
  return supabase
    .from("favorites")
    .select("*")
    .eq("workspace_id", workspaceId)
    .eq("collection_id", collectionId)
    .order("creado", { ascending: false });
}
