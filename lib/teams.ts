import { supabase } from "@/lib/supabaseClient";

export async function crearTeam(nombre: string, workspaceId: string, userId: string) {
  return supabase.from("teams").insert([
    { nombre, workspace_id: workspaceId, owner_id: userId }
  ]);
}

export async function cargarTeams(workspaceId: string) {
  return supabase
    .from("teams")
    .select("*, team_members(user_id)")
    .eq("workspace_id", workspaceId)
    .order("creado", { ascending: false });
}

export async function agregarMiembro(teamId: string, userId: string) {
  return supabase.from("team_members").insert([
    { team_id: teamId, user_id: userId }
  ]);
}

export async function eliminarMiembro(teamId: string, userId: string) {
  return supabase
    .from("team_members")
    .delete()
    .eq("team_id", teamId)
    .eq("user_id", userId);
}
