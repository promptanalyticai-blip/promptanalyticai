import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = supabaseServer();
  const body = await req.json();

  const { data, error } = await supabase
    .from("versions")
    .insert({
      workspace_id: body.workspace_id,
      content: body.content,
    })
    .select("*");

  return Response.json({ data, error });
}
