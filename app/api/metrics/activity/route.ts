import { supabaseServer } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const supabase = supabaseServer();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const workspaceId = searchParams.get("workspaceId");

  if (!workspaceId) {
    return Response.json({ error: "Missing workspaceId" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("logs")
    .select("created_at")
    .eq("workspaceId", workspaceId);

  if (error) return Response.json([], { status: 500 });

  // Agrupar por día
  const grouped = Object.values(
    data.reduce((acc: any, log: any) => {
      const day = log.created_at.split("T")[0];
      acc[day] = acc[day] || { day, count: 0 };
      acc[day].count++;
      return acc;
    }, {})
  );

  return Response.json(grouped);
}
