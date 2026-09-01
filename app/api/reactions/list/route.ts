import { NextResponse } from "next/server";
import { cargarReacciones } from "@/lib/reactions";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const { workspaceId, recursoId } = await req.json();

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const reacciones = await cargarReacciones(workspaceId, recursoId);

  return NextResponse.json(reacciones.data || []);
}
