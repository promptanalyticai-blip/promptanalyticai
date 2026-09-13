import { createClient } from "@/lib/supabase/client";

export async function asignarRolWorkspace(workspaceId: string, userId: string, rol: string) {
  const supabase = createClient();

  return supabase
    .from("workspace_roles")
    .insert([
      {
        workspace_id: workspaceId,
        user_id: userId,
        rol,
        created_at: new Date().toISOString()
      }
    ])
    .select()
    .single();
}

export async function obtenerRolesWorkspace(workspaceId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("workspace_roles")
    .select("*")
    .eq("workspace_id", workspaceId);

  if (error) throw error;
  return data;
}
