export function detectarIdioma(texto: string): "es" | "en" {
  const es = /[áéíóúñ]/i.test(texto);
  return es ? "es" : "en";
}

export async function llamarClaude(prompt: string) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!
    },
    body: JSON.stringify({
      model: "claude-3-sonnet-20240229",
      max_tokens: 4096,
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await response.json();
  return data.content[0].text;
}
