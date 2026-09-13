import { createClient } from "@/lib/supabase/client";

export async function subirArchivo(
  file: File,
  workspaceId: string,
  userId: string
) {
  const supabase = createClient();

  const ruta = `${workspaceId}/${Date.now()}-${file.name}`;

  // Subir archivo al bucket
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("files")
    .upload(ruta, file);

  if (uploadError) throw uploadError;

  // Registrar metadata en la tabla
  const { data, error } = await supabase
    .from("files")
    .insert([
      {
        workspace_id: workspaceId,
        user_id: userId,
        path: ruta,
        name: file.name,
        created_at: new Date().toISOString()
      }
    ])
    .select()
    .single();

  if (error) throw error;

  return data;
}
