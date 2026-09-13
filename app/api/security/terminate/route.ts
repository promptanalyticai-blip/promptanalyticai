export const dynamic = "force-dynamic";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = supabaseServer();
  const body = await req.json();

  const { error } = await supabase
    .from("sessions")
    .delete()
    .eq("id", body.session_id);

  return Response.json({ success: !error, error });
}
