import { createClient } from "@/lib/supabase/client";

export async function guardarVersion(
  workspaceId: string,
  userId: string,
  recursoId: string,
  tipo: string,
  contenido: string
) {
  const supabase = createClient();

  return supabase
    .from("versions")
    .insert([
      {
        workspace_id: workspaceId,
        user_id: userId,
        resource_id: recursoId,
        tipo,
        contenido,
        created_at: new Date().toISOString()
      }
    ])
    .select()
    .single();
}

export async function obtenerVersiones(recursoId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("versions")
    .select("*")
    .eq("resource_id", recursoId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}
