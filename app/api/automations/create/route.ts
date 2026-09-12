import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = createServerSupabase();
  const body = await req.json();

  const { data, error } = await supabase
    .from("automations")
    .insert({
      name: body.name,
      description: body.description,
      trigger: body.trigger,
      action: body.action
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ automation: data });
}
