export const dynamic = "force-dynamic";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = supabaseServer();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File;
  const workspaceId = formData.get("workspaceId") as string;

  if (!file || !workspaceId) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  const fileBuffer = await file.arrayBuffer();
  const fileName = `${crypto.randomUUID()}-${file.name}`;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("archivos")
    .upload(fileName, fileBuffer, { contentType: file.type });

  if (uploadError) return Response.json({ error: uploadError.message }, { status: 500 });

  const { data: publicUrl } = supabase.storage.from("archivos").getPublicUrl(fileName);

  await supabase.from("files").insert({
    id: crypto.randomUUID(),
    userId: userData.user.id,
    workspaceId,
    name: file.name,
    url: publicUrl.publicUrl,
    size: file.size,
  });

  return Response.json({ success: true, url: publicUrl.publicUrl });
}
