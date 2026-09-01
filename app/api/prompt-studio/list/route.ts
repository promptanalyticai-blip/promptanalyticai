import { NextResponse } from "next/server";
import { cargarFlows } from "@/lib/promptStudio";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const { workspaceId } = await req.json();

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const flows = await cargarFlows(workspaceId);

  return NextResponse.json(flows.data || []);
}
