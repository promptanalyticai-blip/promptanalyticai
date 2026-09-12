import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { error } = await supabaseServer
    .from("team_members")
    .delete()
    .eq("user_id", body.user_id)
    .eq("team_id", body.team_id);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ success: true });
}
