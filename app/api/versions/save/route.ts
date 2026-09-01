import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { registrarAccion } from "@/lib/auditoria";
import { crearNotificacion } from "@/lib/notifications";

export async function POST(req: Request) {
  const { workspaceId, recursoId, tipo, contenido } = await req.json();

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const userId = auth.user.id;

  await supabase.from("versions").insert([
    { workspace_id: workspaceId, user_id: userId, recurso_id: recursoId, tipo, contenido }
  ]);

  await registrarAccion(workspaceId, userId, "guardar versión", `Recurso: ${recursoId}`);
  await crearNotificacion(workspaceId, userId, "versiones", "Nueva versión guardada.");

  return NextResponse.json({ ok: true });
}
