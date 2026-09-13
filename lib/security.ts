import { createClient } from "@/lib/supabase/client";

export async function cargarSesiones(userId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("security_logs")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function registrarSesion(
  userId: string,
  ip: string,
  userAgent: string
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("security_logs")
    .insert([
      {
        user_id: userId,
        ip,
        user_agent: userAgent,
        created_at: new Date().toISOString()
      }
    ])
    .select()
    .single();

  if (error) throw error;

  return data;
}
