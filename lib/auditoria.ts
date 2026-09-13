import { createClient } from "@/lib/supabase/client";

export async function registrarAccion(
  workspaceId: string,
  userId: string,
  accion: string,
  detalle: string = ""
) {
  const supabase = createClient();

  return supabase
    .from("audit_logs")
    .insert([
      {
        workspace_id: workspaceId,
        user_id: userId,
        action: accion,
        detail: detalle,
        created_at: new Date().toISOString()
      }
    ]);
}
