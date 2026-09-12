import { supabaseServer } from "@/lib/supabase/server";
import { db } from "@/lib/db/client";
import { automations } from "@/lib/db/schema";

export async function POST(req: Request) {
  const supabase = supabaseServer();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { workspaceId, name, trigger, action, conditions } = await req.json();

  if (!workspaceId || !name || !trigger || !action) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  await db.insert(automations).values({
    id: crypto.randomUUID(),
    workspaceId,
    name,
    trigger,
    action,
    conditions: conditions ? JSON.stringify(conditions) : null,
  });

  return Response.json({ success: true });
}
