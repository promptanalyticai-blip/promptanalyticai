import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = supabaseServer();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id, updates } = await req.json();
  if (!id || !updates) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  const { error } = await supabase
    .from("tasks")
    .update(updates)
    .eq("id", id);

  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json({ success: true });
}
