import { supabaseServer } from "@/lib/supabase/server";

export async function cargarMensajes(conversationId: string) {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  return { data, error };
}
