import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { data, error } = await supabaseServer
    .from("comments")
    .insert({
      item_id: body.item_id,
      user_id: body.user_id,
      content: body.content,
    })
    .select("*")
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ data });
}
