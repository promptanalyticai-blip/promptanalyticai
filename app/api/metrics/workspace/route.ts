export const dynamic = "force-dynamic";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const supabase = supabaseServer();
  const { searchParams } = new URL(req.url);
  const workspace_id = searchParams.get("workspace_id");

  const { data, error } = await supabase
    .from("workspace_metrics")
    .select("*")
    .eq("workspace_id", workspace_id);

  return Response.json({ data, error });
}
