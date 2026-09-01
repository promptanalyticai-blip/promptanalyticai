import { supabase } from "@/lib/supabaseClient";

export async function crearWorkspace(nombre: string, userId: string) {
  // Crear workspace
  const { data: ws, error } = await supabase
    .from("workspaces")
    .insert([{ nombre, user_id: userId }])
    .select()
    .single();

  if (error) throw error;

  // Auto-asignar rol owner
  await supabase.from("workspace_members").insert([
    { user_id: userId, workspace_id: ws.id, role: "owner" }
  ]);

  return ws;
}
