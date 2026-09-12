import { supabaseServer } from "@/lib/supabase/server";
import { db } from "@/lib/db/client";
import { logs } from "@/lib/db/schema";

export async function POST(req: Request) {
  const supabase = supabaseServer();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { workspaceId, action } = await req.json();

  if (!workspaceId || !action) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  await db.insert(logs).values({
    id: crypto.randomUUID(),
    userId: userData.user.id,
    workspaceId,
    action,
  });

  return Response.json({ success: true });
}

