import { supabase } from "@/lib/supabaseClient";

export async function crearTarea(workspaceId: string, creadorId: string, asignadoId: string, titulo: string, descripcion: string, prioridad: string, fecha_limite: string) {
  return supabase.from("tasks").insert([
    { workspace_id: workspaceId, creador_id: creadorId, asignado_id: asignadoId, titulo, descripcion, prioridad, fecha_limite }
  ]);
}

export async function cargarTareas(workspaceId: string) {
  return supabase
    .from("tasks")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("creado", { ascending: false });
}

export async function actualizarTarea(id: string, estado: string) {
  return supabase
    .from("tasks")
    .update({ estado })
    .eq("id", id);
}
