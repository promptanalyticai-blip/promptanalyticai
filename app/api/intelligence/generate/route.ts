import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = supabaseServer();
  const body = await req.json();

  // Aqui llamas a tu modelo de IA
  const ai = await body.model.generate(body.input);

  // Filtrar solo los bloques que contienen texto
  const textBlock = ai.content.find(block => block.type === "output_text");

  return Response.json({
    insights: textBlock?.text ?? ""
  });
}
