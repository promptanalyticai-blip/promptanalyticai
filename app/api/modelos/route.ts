import { NextResponse } from "next/server";

export async function GET() {
  const respuesta = await fetch("https://api.anthropic.com/v1/models", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
      "anthropic-workspace-id": process.env.ANTHROPIC_WORKSPACE_ID!,
    },
  });

  const raw = await respuesta.text();
  let data;

  try {
    data = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "No se pudo parsear JSON", raw });
  }

  return NextResponse.json(data);
}
