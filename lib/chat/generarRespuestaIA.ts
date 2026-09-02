import { OpenAI } from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function generarRespuestaIA(messages: any[]) {
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
  });

  return completion.choices[0].message.content;
}
