import { createClient } from "@/lib/supabase/client";

export async function registrarWebhook(workspaceId: string, url: string, evento: string) {
  const supabase = createClient();

  return supabase
    .from("webhooks")
    .insert([
      {
        workspace_id: workspaceId,
        url,
        evento,
        created_at: new Date().toISOString()
      }
    ])
    .select()
    .single();
}

export async function obtenerWebhooks(workspaceId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("webhooks")
    .select("*")
    .eq("workspace_id", workspaceId);

  if (error) throw error;
  return data;
}
