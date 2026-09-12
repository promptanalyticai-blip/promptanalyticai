import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = supabaseServer();
  const body = await req.json();

  const { data, error } = await supabase
    .from("teams")
    .insert({
      owner_id: body.owner_id,
      name: body.name,
    })
    .select("*");

  return Response.json({ data, error });
}
