import { createClient } from "@/lib/supabase/client";

export async function crearEvento(
  workspaceId: string,
  userId: string,
  titulo: string,
  descripcion: string,
  fecha: string,
  hora: string
) {
  const supabase = createClient();

  return supabase
    .from("calendar_events")
    .insert([
      {
        workspace_id: workspaceId,
        user_id: userId,
        title: titulo,
        description: descripcion,
        date: fecha,
        time: hora,
        created_at: new Date().toISOString()
      }
    ]);
}
