import { createClient } from "@/lib/supabase/client";
import { randomUUID } from "crypto";

export async function crearApiKey(workspaceId: string, nombre: string) {
  const supabase = createClient();

  const nuevaKey = randomUUID();

  const { data, error } = await supabase
    .from("api_keys")
    .insert({
      id: nuevaKey,
      workspace_id: workspaceId,
      name: nombre,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}
