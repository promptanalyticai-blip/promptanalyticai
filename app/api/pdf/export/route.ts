import { NextResponse } from "next/server";
import { generarPDF } from "@/lib/pdf";
import { supabase } from "@/lib/supabaseClient";
import { registrarAccion } from "@/lib/auditoria";

export async function POST(req: Request) {
  const { titulo, contenido } = await req.json();

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const workspaceId = localStorage.getItem("workspace_id");

  const pdfBytes = await generarPDF(titulo, contenido, workspaceId || "Workspace");

  await registrarAccion(workspaceId!, auth.user.id, "exportar pdf", titulo);

  return new NextResponse(pdfBytes.buffer, {
  headers: {
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename="${titulo}.pdf"`,
  },
});
