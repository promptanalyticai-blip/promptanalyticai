export const dynamic = "force-dynamic";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const supabase = supabaseServer();
  const { searchParams } = new URL(req.url);
  const item_id = searchParams.get("item_id");

  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("item_id", item_id)
    .order("created_at", { ascending: false });

  return Response.json({ data, error });
}
