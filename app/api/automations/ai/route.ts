export const dynamic = "force-dynamic";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = supabaseServer();

  const body = await req.json();

  const { data, error } = await supabase
    .from("automations_ai")
    .insert({ prompt: body.prompt })
    .select("*");

  return Response.json({ data, error });
}
