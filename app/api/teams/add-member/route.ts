export const dynamic = "force-dynamic";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = supabaseServer();
  const body = await req.json();

  const { data, error } = await supabase
    .from("team_members")
    .insert({
      team_id: body.team_id,
      user_id: body.user_id,
      role: body.role,
    })
    .select("*");

  return Response.json({ data, error });
}
