import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { registrarAccion } from "@/lib/auditoria";
import { crearNotificacion } from "@/lib/notifications";

export async function POST(req: Request) {
  const { workspaceId, recursoId, tipo, collectionId } = await req.json();

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const userId = auth.user.id;

  await supabase.from("favorites").insert([
    { workspace_id: workspaceId, user_id: userId, recurso_id: recursoId, tipo, collection_id: collectionId }
  ]);

  await registrarAccion(workspaceId, userId, "agregar favorito", `Recurso: ${recursoId}`);
  await crearNotificacion(workspaceId, userId, "favoritos", "Se agregó un favorito.");

  return NextResponse.json({ ok: true });
}
