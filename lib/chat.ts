import { supabase } from "./supabaseClient";

export async function crearChat(userId: string, workspaceId: string | null, titulo: string) {
  return await supabase
    .from("chats")
    .insert([{ user_id: userId, workspace_id: workspaceId, titulo }])
    .select()
    .single();
}

export async function cargarChats(userId: string, workspaceId: string | null) {
  return await supabase
    .from("chats")
    .select("*")
    .eq("user_id", userId)
    .eq("workspace_id", workspaceId)
    .order("id", { ascending: false });
}

export async function cargarMensajes(chatId: string) {
  return await supabase
    .from("mensajes")
    .select("*")
    .eq("chat_id", chatId)
    .order("id", { ascending: true });
}
