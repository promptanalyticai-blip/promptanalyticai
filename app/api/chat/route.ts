export const dynamic = "force-dynamic";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = supabaseServer();

  const body = await req.json();

  const { data, error } = await supabase
    .from("messages")
    .insert({
      conversation_id: body.conversation_id,
      text: body.text,
    })
    .select("*");

  return Response.json({ data, error });
}
