import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const { workspaceId, nombre, url, evento } = await req.json();

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  await supabase.from("webhooks").insert([
    { workspace_id: workspaceId, nombre, url, evento }
  ]);

  return NextResponse.json({ ok: true });
}
