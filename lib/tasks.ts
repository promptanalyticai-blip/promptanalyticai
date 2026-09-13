import { createClient } from "@/lib/supabase/client";

export async function crearTask(
  workspaceId: string,
  userId: string,
  titulo: string,
  descripcion: string
) {
  const supabase = createClient();

  return supabase
    .from("tasks")
    .insert([
      {
        workspace_id: workspaceId,
        user_id: userId,
        titulo,
        descripcion,
        created_at: new Date().toISOString()
      }
    ])
    .select()
    .single();
}

export async function obtenerTasks(workspaceId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function completarTask(taskId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("tasks")
    .update({
      completado: true,
      completado_at: new Date().toISOString()
    })
    .eq("id", taskId)
    .select()
    .single();

  if (error) throw error;

  return data;
}
