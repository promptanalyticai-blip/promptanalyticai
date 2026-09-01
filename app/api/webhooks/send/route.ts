import { NextResponse } from "next/server";
import { obtenerWebhooks, enviarWebhook } from "@/lib/webhooks";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const { workspaceId, evento, payload } = await req.json();

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const webhooks = await obtenerWebhooks(workspaceId, evento);

  for (const wh of webhooks) {
    await enviarWebhook(wh, payload);
  }

  return NextResponse.json({ ok: true });
}
