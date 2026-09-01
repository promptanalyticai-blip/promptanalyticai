import { NextResponse } from "next/server";
import { terminarSesion } from "@/lib/security";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const { id } = await req.json();

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  await terminarSesion(id);

  return NextResponse.json({ ok: true });
}
