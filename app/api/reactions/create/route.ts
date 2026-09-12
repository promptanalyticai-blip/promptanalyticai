import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = supabaseServer();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { workspaceId, entityId, reaction } = await req.json();
  if (!workspaceId || !entityId || !reaction) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  await supabase.from("reactions").insert({
    id: crypto.randomUUID(),
    workspaceId,
    entityId,
    reaction,
    userId: userData.user.id,
  });

  return Response.json({ success: true });
}
