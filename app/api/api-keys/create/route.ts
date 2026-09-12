import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = supabaseServer(); // ← ESTA LINEA ES OBLIGATORIA

  const body = await req.json();

  const { data, error } = await supabase
    .from("api_keys")
    .insert({
      user_id: body.user_id,
      name: body.name,
    })
    .select("*");

  return Response.json({ data, error });
}
