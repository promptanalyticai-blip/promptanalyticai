import { createClient } from "@/lib/supabase/client";

export async function crearWorkspace(nombre: string, ownerId: string) {
  const supabase = createClient();

  return supabase
    .from("workspaces")
    .insert([
      {
        nombre,
        owner_id: ownerId,
        created_at: new Date().toISOString()
      }
    ])
    .select()
    .single();
}

export async function obtenerWorkspaces(userId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("workspaces")
    .select("*")
    .eq("owner_id", userId);

  if (error) throw error;
  return data;
}
