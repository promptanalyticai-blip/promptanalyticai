import { createClient } from "@/lib/supabase/client";

export async function agregarReaccion(
  workspaceId: string,
  userId: string,
  recursoId: string,
  tipo: string,
  emoji?: string
) {
  const supabase = createClient();

  return supabase
    .from("reactions")
    .insert([
      {
        workspace_id: workspaceId,
        user_id: userId,
        resource_id: recursoId,
        type: tipo,
        emoji: emoji ?? null,
        created_at: new Date().toISOString()
      }
    ])
    .select()
    .single();
}
