import { createClient } from "@/lib/supabase/client";

export async function crearReporte(
  workspaceId: string,
  userId: string,
  titulo: string,
  contenido: string
) {
  const supabase = createClient();

  return supabase
    .from("reports")
    .insert([
      {
        workspace_id: workspaceId,
        user_id: userId,
        titulo,
        contenido,
        created_at: new Date().toISOString()
      }
    ])
    .select()
    .single();
}

export async function obtenerReportes(workspaceId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}
