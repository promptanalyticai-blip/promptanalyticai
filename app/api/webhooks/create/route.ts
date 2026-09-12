import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = supabaseServer();
  const body = await req.json();

  const { data, error } = await supabase
    .from("webhooks")
    .insert({
      name: body.name,
      url: body.url,
    })
    .select("*");

  return Response.json({ data, error });
}
