import { NextResponse } from "next/server";
import { obtenerAutomations, ejecutarAutomation } from "@/lib/automations";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const { workspaceId, evento, payload } = await req.json();

  const automations = await obtenerAutomations(workspaceId, evento);

  for (const auto of automations) {
    await ejecutarAutomation(auto, payload);
  }

  return NextResponse.json({ ok: true });
}
