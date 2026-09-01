import { NextResponse } from "next/server";
import { validarApiKey } from "@/lib/apiKeys";

export async function POST(req: Request) {
  const auth = req.headers.get("authorization");

  if (!auth || !auth.startsWith("Bearer ")) {
    return NextResponse.json({ error: "API key requerida" }, { status: 401 });
  }

  const apiKey = auth.replace("Bearer ", "").trim();
  const keyData = await validarApiKey(apiKey);

  if (!keyData) {
    return NextResponse.json({ error: "API key inválida" }, { status: 403 });
  }

  const { texto } = await req.json();

  if (!texto || texto.trim().length === 0) {
    return NextResponse.json({ error: "Texto requerido" }, { status: 400 });
  }

  const completion = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-3-sonnet-20240229",
      max_tokens: 600,
      messages: [{ role: "user", content: texto }],
    }),
  }).then((r) => r.json());

  const respuesta = completion.content[0].text;

  return NextResponse.json({
    workspace_id: keyData.workspace_id,
    resultado: respuesta,
  });
}
