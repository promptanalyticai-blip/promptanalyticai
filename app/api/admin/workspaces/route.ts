import { NextResponse } from "next/server";
import { esSuperadmin, cargarWorkspaces } from "@/lib/admin";
import { supabase } from "@/lib/supabaseClient";

export async function POST() {
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const permitido = await esSuperadmin(auth.user.id);
  if (!permitido) return NextResponse.json({ error: "No autorizado" }, { status: 403 });

  const ws = await cargarWorkspaces();
  return NextResponse.json(ws.data || []);
}
