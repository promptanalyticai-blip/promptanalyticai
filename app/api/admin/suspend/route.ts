import { NextResponse } from "next/server";
import { esSuperadmin, suspenderUsuario } from "@/lib/admin";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const { userId } = await req.json();

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const permitido = await esSuperadmin(auth.user.id);
  if (!permitido) return NextResponse.json({ error: "No autorizado" }, { status: 403 });

  await suspenderUsuario(userId);

  return NextResponse.json({ ok: true });
}
