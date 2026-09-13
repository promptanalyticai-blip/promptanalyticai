export const dynamic = "force-dynamic";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = supabaseServer();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { workspaceId, title, description } = await req.json();
  if (!workspaceId || !title) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  await supabase.from("tasks").insert({
    id: crypto.randomUUID(),
    workspaceId,
    userId: userData.user.id,
    title,
    description: description || "",
  });

  return Response.json({ success: true });
}
