import { NextResponse } from "next/server";
import { agregarMensaje, cargarMensajes } from "@/lib/chat";

export async function POST(req: Request) {
  const { chat_id, mensaje } = await req.json();

  await agregarMensaje(chat_id, "user", mensaje);

  const { data: historial } = await cargarMensajes(chat_id);

  const messages = historial.map((m: any) => ({
    role: m.rol,
    content: m.contenido,
  }));

  messages.push({ role: "user", content: mensaje });

  const completion = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-3-sonnet-20240229",
      max_tokens: 800,
      messages,
    }),
  }).then((r) => r.json());

  const respuesta = completion.content[0].text;

  await agregarMensaje(chat_id, "assistant", respuesta);

  return NextResponse.json({ respuesta });
}
