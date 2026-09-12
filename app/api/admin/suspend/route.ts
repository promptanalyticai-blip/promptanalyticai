import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = supabaseServer(); // ← AQUI estaba el error

  const body = await req.json();

  const { data, error } = await supabase
    .from("users")
    .update({ suspended: true })
    .eq("id", body.user_id)
    .select("*");

  return Response.json({ data, error });
}
