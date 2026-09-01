import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const { workspaceId } = await req.json();

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { data } = await supabase
    .from("webhooks")
    .select("*")
    .eq("workspace_id", workspaceId);

  return NextResponse.json(data || []);
}
