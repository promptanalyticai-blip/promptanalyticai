import { NextResponse } from "next/server";
import { cargarComentarios } from "@/lib/comments";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const { workspaceId, recursoId } = await req.json();

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const comentarios = await cargarComentarios(workspaceId, recursoId);

  return NextResponse.json(comentarios.data || []);
}
