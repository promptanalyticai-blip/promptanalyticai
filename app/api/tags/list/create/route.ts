export const dynamic = "force-dynamic";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = supabaseServer();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { workspaceId, name } = await req.json();
  if (!workspaceId || !name) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  await supabase.from("tags").insert({
    id: crypto.randomUUID(),
    workspaceId,
    name,
    userId: userData.user.id,
  });

  return Response.json({ success: true });
}
