import { NextResponse } from "next/server";
import { cargarTags } from "@/lib/tags";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const { workspaceId, recursoId } = await req.json();

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const tags = await cargarTags(workspaceId, recursoId);

  return NextResponse.json(tags.data || []);
}
