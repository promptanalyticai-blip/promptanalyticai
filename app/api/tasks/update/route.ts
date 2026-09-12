import { supabaseServer } from "@/lib/supabase/server";
import { db } from "@/lib/db/client";
import { tasks } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const supabase = supabaseServer();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, status } = await req.json();

  if (!id || !status) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  await db
    .update(tasks)
    .set({ status })
    .where(eq(tasks.id, id));

  return Response.json({ success: true });
}
