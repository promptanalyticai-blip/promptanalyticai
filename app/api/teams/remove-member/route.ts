export const dynamic = "force-dynamic";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = supabaseServer();
  const body = await req.json();

  const { error } = await supabase
    .from("team_members")
    .delete()
    .eq("user_id", body.user_id)
    .eq("team_id", body.team_id);

  return Response.json({ success: !error, error });
}
