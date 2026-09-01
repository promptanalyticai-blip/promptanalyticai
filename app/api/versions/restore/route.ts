import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { registrarAccion } from "@/lib/auditoria";
import { crearNotificacion } from "@/lib/notifications";

export async function POST(req: Request) {
  const { workspaceId, recursoId, tipo, contenido } = await req.json();

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const userId = auth.user.id;

  // Restaurar depende del tipo
  if (tipo === "prompt") {
    await supabase.from("prompts").update({ contenido }).eq("id", recursoId);
  }

  if (tipo === "template") {
    await supabase.from("templates").update({ contenido }).eq("id", recursoId);
  }

  if (tipo === "analisis") {
    await supabase.from("analisis").update({ resultado: contenido }).eq("id", recursoId);
  }

  if (tipo === "archivo") {
    await supabase.from("files").update({ contenido }).eq("id", recursoId);
  }

  await registrarAccion(workspaceId, userId, "restaurar versión", `Recurso: ${recursoId}`);
  await crearNotificacion(workspaceId, userId, "versiones", "Versión restaurada.");

  return NextResponse.json({ ok: true });
}
