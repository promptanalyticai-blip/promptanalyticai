import { supabaseServer } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const supabase = supabaseServer();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) return Response.json([], { status: 401 });

  const { searchParams } = new URL(req.url);
  const workspaceId = searchParams.get("workspaceId");
  if (!workspaceId) return Response.json([], { status: 400 });

  const { data, error } = await supabase
    .from("files")
    .select("*")
    .eq("workspaceId", workspaceId);

  if (error) return Response.json([], { status: 500 });

  return Response.json(data);
}
