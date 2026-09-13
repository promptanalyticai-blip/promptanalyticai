export const dynamic = "force-dynamic";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = supabaseServer();
  const body = await req.json();

  const { data, error } = await supabase
    .from("calendar")
    .insert({
      user_id: body.user_id,
      title: body.title,
      date: body.date,
    })
    .select("*");

  return Response.json({ data, error });
}
