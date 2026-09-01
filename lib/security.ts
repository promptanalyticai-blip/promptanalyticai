import { supabase } from "@/lib/supabaseClient";

export async function cargarSesiones(userId: string) {
  return supabase
    .from("user_sessions")
    .select("*")
    .eq("user_id", userId)
    .order("creado", { ascending: false });
}

export async function terminarSesion(id: string) {
  return supabase
    .from("user_sessions")
    .update({ activo: false })
    .eq("id", id);
}
