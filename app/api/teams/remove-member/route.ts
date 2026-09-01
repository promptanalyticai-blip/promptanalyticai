import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { registrarAccion } from "@/lib/auditoria";
import { crearNotificacion } from "@/lib/notifications";

export async function POST(req: Request) {
  const { teamId, userId, workspaceId } = await req.json();

  const { error } = await supabase
    .from("team_members")
    .delete()
    .eq("team_id", teamId)
    .eq("user_id", userId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await registrarAccion(workspaceId, userId, "eliminar miembro equipo", `Team: ${teamId}`);
  await crearNotificacion(workspaceId, userId, "equipo", "Se eliminó un miembro del equipo.");

  return NextResponse.json({ ok: true });
}
