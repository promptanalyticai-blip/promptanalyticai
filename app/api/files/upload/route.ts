import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { registrarAccion } from "@/lib/auditoria";
import { crearNotificacion } from "@/lib/notifications";

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as File;
  const workspaceId = form.get("workspace_id") as string;

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const userId = auth.user.id;

  const ruta = `${workspaceId}/${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("archivos")
    .upload(ruta, file);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: urlData } = supabase.storage
    .from("archivos")
    .getPublicUrl(ruta);

  await supabase.from("files").insert([
    {
      workspace_id: workspaceId,
      user_id: userId,
      nombre: file.name,
      tipo: file.type,
      url: urlData.publicUrl
    }
  ]);

  await registrarAccion(
    workspaceId,
    userId,
    "subir archivo",
    `Archivo: ${file.name}`
  );

  await crearNotificacion(
    workspaceId,
    userId,
    "archivo",
    "Se subió un archivo."
  );

  return NextResponse.json({ url: urlData.publicUrl });
}
