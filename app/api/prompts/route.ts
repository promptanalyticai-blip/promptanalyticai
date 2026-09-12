import { db } from "@/lib/db/client";
import { prompts } from "@/lib/db/schema";
import { supabaseServer } from "@/lib/supabase/server";
import { eq } from "drizzle-orm";

export async function GET() {
  // Autenticación real con Supabase SSR
  const supabase = supabaseServer();
  const { data: userData } = await supabase.auth.getUser();

  // Si no hay usuario, devolver lista vacía
  if (!userData?.user) {
    return Response.json([]);
  }

  const userId = userData.user.id;

  // Consultar MySQL con Drizzle
  const result = await db
    .select()
    .from(prompts)
    .where(eq(prompts.userId, userId));

  // Devolver prompts reales
  return Response.json(result);
}
