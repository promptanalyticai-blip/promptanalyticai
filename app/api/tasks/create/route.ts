import { supabaseServer } from "@/lib/supabase/server";
import { db } from "@/lib/db/client";
import { tasks } from "@/lib/db/schema";

export async function POST(req: Request) {
  const supabase = supabaseServer();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { workspaceId, entityType, entityId, title, description, assignedTo, dueDate } =
    await req.json();

  if (!workspaceId || !entityType || !entityId || !title) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  await db.insert(tasks).values({
    id: crypto.randomUUID(),
    workspaceId,
    entityType,
    entityId,
    title,
    description: description || null,
    status: "todo",
    assignedTo: assignedTo || null,
    dueDate: dueDate || null,
  });

  return Response.json({ success: true });
}
