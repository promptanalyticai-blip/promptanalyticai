import { supabase } from "./supabaseClient";

export async function crearChat(userId: string, workspaceId: string | null, titulo: string) {
  return supabase.from("chats").insert([{ user_id: userId, workspace_id: workspaceId, titulo }]).select().single();
}

export async function cargarChats(userId: string, workspaceId: string | null) {
  let q = supabase.from("chats").select("*").eq("user_id", userId);
  if (workspaceId) q = q.eq("workspace_id", workspaceId);
  return q.order("creado", { ascending: false });
}

export async function cargarMensajes(chatId: string) {
  return supabase.from("chat_messages").select("*").eq("chat_id", chatId).order("creado", { ascending: true });
}

export async function agregarMensaje(chatId: string, rol: string, contenido: string) {
  return supabase.from("chat_messages").insert([{ chat_id: chatId, rol, contenido }]);
}
