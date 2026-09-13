import { createClient } from "@/lib/supabase/client";

export async function crearTemplate(
  nombre: string,
  contenido: string,
  userId: string,
  workspaceId: string
) {
  const supabase = createClient();

  return supabase
    .from("templates")
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

export async function obtenerTemplates(workspaceId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("templates")
    .select("*")
    .eq("workspace_id", workspaceId);

  if (error) throw error;

  return data;
}
