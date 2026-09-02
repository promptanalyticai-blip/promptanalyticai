import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function generarRespuestaIA(messages: any[]) {
  const prompt = messages
    .map((m: any) => `${m.role}: ${m.content}`)
    .join("\n");

  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    prompt,
  });

  return text;
}
