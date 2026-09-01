import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { registrarAccion } from "@/lib/auditoria";
import { crearNotificacion } from "@/lib/notifications";

export async function POST(req: Request) {
  const { userId, workspaceId, rol } = await req.json();

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  await supabase.from("workspace_roles").upsert([
    { user_id: userId, workspace_id: workspaceId, rol }
  ]);

  await registrarAccion(
    workspaceId,
    auth.user.id,
    "cambiar rol",
    `Nuevo rol para ${userId}: ${rol}`
  );

  await crearNotificacion(
    workspaceId,
    auth.user.id,
    "roles",
    "Se actualizó un rol de usuario."
  );

  return NextResponse.json({ ok: true });
}
