import { createClient } from "@/lib/supabase/client";

export async function obtenerRol(userId: string, workspaceId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("roles")
    .select("*")
    .eq("user_id", userId)
    .eq("workspace_id", workspaceId)
    .single();

  if (error) throw error;

  return data;
}

export async function asignarRol(
  userId: string,
  workspaceId: string,
  rol: string
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("roles")
    .insert([
      {
        user_id: userId,
        workspace_id: workspaceId,
        rol,
        created_at: new Date().toISOString()
      }
    ])
    .select()
    .single();

  if (error) throw error;

  return data;
}
