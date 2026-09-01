import { supabase } from "@/lib/supabaseClient";

export async function subirArchivo(file: File, workspaceId: string, userId: string) {
  const ruta = `${workspaceId}/${Date.now()}-${file.name}`;

  const { data: upload, error } = await supabase.storage
    .from("archivos")
    .upload(ruta, file);

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from("archivos")
    .getPublicUrl(ruta);

  await supabase.from("files").insert([
    {
      workspace_id: workspaceId,
      user_id: userId,
      nombre: file.name,
      tipo: file.type,
      url: urlData.publicUrl
    }
  ]);

  return urlData.publicUrl;
}

export async function cargarArchivos(workspaceId: string) {
  return supabase
    .from("files")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("creado", { ascending: false });
}

export async function eliminarArchivo(id: string) {
  return supabase.from("files").delete().eq("id", id);
}
