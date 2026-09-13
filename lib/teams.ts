import { createClient } from "@/lib/supabase/client";

export async function crearTeam(
  nombre: string,
  workspaceId: string,
  userId: string
) {
  const supabase = createClient();

  return supabase
    .from("teams")
    .insert([
      {
        nombre,
        workspace_id: workspaceId,
        user_id: userId,
        created_at: new Date().toISOString()
      }
    ])
    .select()
    .single();
}

export async function obtenerTeams(workspaceId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("teams")
    .select("*")
    .eq("workspace_id", workspaceId);

  if (error) throw error;

  return data;
}
