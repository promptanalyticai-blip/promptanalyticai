import { createClient } from "@/lib/supabase/client";

export async function crearTag(workspaceId: string, nombre: string) {
  const supabase = createClient();

  return supabase
    .from("tags")
    .insert([
      {
        workspace_id: workspaceId,
        nombre,
        created_at: new Date().toISOString()
      }
    ])
    .select()
    .single();
}

export async function obtenerTags(workspaceId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("tags")
    .select("*")
    .eq("workspace_id", workspaceId);

  if (error) throw error;
  return data;
}
