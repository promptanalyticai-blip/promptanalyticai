import { createClient } from "@/lib/supabase/client";

export async function crearChat(
  userId: string,
  workspaceId: string | null,
  titulo: string
) {
  const supabase = createClient();

  return await supabase
    .from("chats")
    .insert([
      {
        user_id: userId,
        workspace_id: workspaceId,
        title: titulo,
        created_at: new Date().toISOString()
      }
    ])
    .select()
    .single();
}
