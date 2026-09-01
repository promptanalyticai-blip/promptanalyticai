import { NextResponse } from "next/server";
import { cargarFavoritos } from "@/lib/favorites";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const { workspaceId, collectionId } = await req.json();

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const favoritos = await cargarFavoritos(workspaceId, collectionId);

  return NextResponse.json(favoritos.data || []);
}
