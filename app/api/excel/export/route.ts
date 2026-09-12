import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = supabaseServer();
  const body = await req.json();

  const { data, error } = await supabase
    .from("excel_exports")
    .insert({
      workspace_id: body.workspace_id,
      payload: body.payload,
    })
    .select("*");

  return Response.json({ data, error });
}
