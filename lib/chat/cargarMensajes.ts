import { supabase } from "@/lib/supabaseClient";

export async function cargarMensajes(chat_id: string) {
  const { data, error } = await supabase
    .from("mensajes")
    .select("*")
    .eq("chat_id", chat_id)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error cargando mensajes:", error);
    return { data: [] };
  }

  return { data };
}
