import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = supabaseServer();

  const body = await req.json();

  const { data, error } = await supabase
    .from("analysis")
    .insert({ text: body.text })
    .select("*");

  return Response.json({ data, error });
}
