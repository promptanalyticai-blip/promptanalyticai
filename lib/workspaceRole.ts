import { supabase } from "@/lib/supabaseClient";

export async function obtenerRolWorkspace(userId: string, workspaceId: string) {
  const { data, error } = await supabase
    .from("workspace_members")
    .select("role")
    .eq("user_id", userId)
    .eq("workspace_id", workspaceId)
    .single();

  if (error) {
    console.error("Error obteniendo rol:", error);
    return null;
  }

  return data?.role || null;
}

export const workspaceRoles = {
  OWNER: "owner",
  ADMIN: "admin",
  MEMBER: "member",
};
