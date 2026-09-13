import { createClient } from "@/lib/supabase/client";

export async function crearComentario(
  workspaceId: string,
  userId: string,
  recursoId: string,
  tipo: string,
  contenido: string
) {
  const supabase = createClient();

  return supabase
    .from("comments")
    .insert([
      {
        workspace_id: workspaceId,
        user_id: userId,
        resource_id: recursoId,
        type: tipo,
        content: contenido,
        created_at: new Date().toISOString()
      }
    ])
    .select()
    .single();
}
