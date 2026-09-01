import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { registrarAccion } from "@/lib/auditoria";
import { crearNotificacion } from "@/lib/notifications";

export async function POST(req: Request) {
  const { workspaceId, recursoId, tipo, emoji } = await req.json();

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const userId = auth.user.id;

  await supabase.from("reactions").insert([
    { workspace_id: workspaceId, user_id: userId, recurso_id: recursoId, tipo, emoji }
  ]);

  await registrarAccion(workspaceId, userId, "reaccion", `Recurso: ${recursoId}`);
  await crearNotificacion(workspaceId, userId, "reaccion", "Nueva reacción agregada.");

  return NextResponse.json({ ok: true });
}
