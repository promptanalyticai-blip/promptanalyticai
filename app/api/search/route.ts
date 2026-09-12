import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = supabaseServer();
  const body = await req.json();

  const { data, error } = await supabase
    .from("search_index")
    .select("*")
    .ilike("content", `%${body.query}%`);

  return Response.json({ data, error });
}

