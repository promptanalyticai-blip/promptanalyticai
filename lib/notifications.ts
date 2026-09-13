import { createClient } from "@/lib/supabase/client";

export async function crearNotificacion(
  workspaceId: string,
  userId: string,
  tipo: string,
  mensaje: string
) {
  const supabase = createClient();

  return supabase
    .from("notifications")
    .insert([
      {
        workspace_id: workspaceId,
        user_id: userId,
        type: tipo,
        message: mensaje,
        created_at: new Date().toISOString()
      }
    ])
    .select()
    .single();
}
