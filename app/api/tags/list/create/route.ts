import { supabaseServer } from "@/lib/supabase/server";
import { db } from "@/lib/db/client";
import { tags } from "@/lib/db/schema";

export async function POST(req: Request) {
  const supabase = supabaseServer();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { workspaceId, name, color } = await req.json();

  if (!workspaceId || !name) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  await db.insert(tags).values({
    id: crypto.randomUUID(),
    workspaceId,
    name,
    color: color || null,
  });

  return Response.json({ success: true });
}
