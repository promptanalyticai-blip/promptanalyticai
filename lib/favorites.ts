import { createClient } from "@/lib/supabase/client";

export async function crearColeccion(
  workspaceId: string,
  userId: string,
  nombre: string
) {
  const supabase = createClient();

  return supabase
    .from("favorite_collections")
    .insert([
      {
        workspace_id: workspaceId,
        user_id: userId,
        name: nombre,
        created_at: new Date().toISOString()
      }
    ])
    .select()
    .single();
}
