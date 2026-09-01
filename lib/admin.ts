import { supabase } from "@/lib/supabaseClient";

export async function esSuperadmin(userId: string) {
  const { data } = await supabase
    .from("superadmins")
    .select("*")
    .eq("user_id", userId)
    .single();

  return !!data;
}

export async function cargarWorkspaces() {
  return supabase.from("workspaces").select("*");
}

export async function cargarUsuarios() {
  return supabase.from("profiles").select("*");
}

export async function suspenderUsuario(userId: string) {
  return supabase
    .from("profiles")
    .update({ suspendido: true })
    .eq("id", userId);
}
