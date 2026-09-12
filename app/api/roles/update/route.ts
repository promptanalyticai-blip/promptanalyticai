import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = supabaseServer();
  const body = await req.json();

  const { data, error } = await supabase
    .from("roles")
    .update({
      name: body.name,
      permissions: body.permissions,
    })
    .eq("id", body.id)
    .select("*");

  return Response.json({ data, error });
}
