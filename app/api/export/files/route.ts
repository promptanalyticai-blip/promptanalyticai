import { supabaseServer } from "@/lib/supabase/server";
import { db } from "@/lib/db/client";
import { files } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  const supabase = supabaseServer();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const workspaceId = searchParams.get("workspaceId");
  const format = searchParams.get("format") || "json";

  if (!workspaceId) return Response.json({ error: "Missing workspaceId" }, { status: 400 });

  const result = await db.select().from(files).where(eq(files.workspaceId, workspaceId));

  if (format === "json") return Response.json(result);

  if (format === "txt") {
    const txt = result.map((f) => `${f.name} - ${f.url}`).join("\n");
    return new Response(txt, {
      headers: {
        "Content-Type": "text/plain",
        "Content-Disposition": `attachment; filename="files-${workspaceId}.txt"`,
      },
    });
  }

  if (format === "csv") {
    const csv = ["id,name,url,size"]
      .concat(result.map((f) => `${f.id},${f.name},${f.url},${f.size}`))
      .join("\n");

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="files-${workspaceId}.csv"`,
      },
    });
  }

  return Response.json({ error: "Unsupported format" }, { status: 400 });
}
