import { createClient } from "@/lib/supabase/client";

export async function crearPrompt(
  nombre: string,
  contenido: string,
  userId: string,
  workspaceId: string | null
) {
  const supabase = createClient();

  return supabase
    .from("prompts")
    .insert([
      {
        nombre,
        contenido,
        user_id: userId,
        workspace_id: workspaceId,
        created_at: new Date().toISOString()
      }
    ])
    .select()
    .single();
}
