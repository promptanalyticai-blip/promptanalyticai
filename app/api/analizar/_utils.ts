export function detectarIdioma(texto: string) {
  const es = /[áéíóúñ¿¡]/i.test(texto);
  const en = /[a-z]/i.test(texto);

  if (es && !en) return "es";
  if (en && !es) return "en";

  return es ? "es" : "en";
}

export async function llamarClaude(promptFinal: string) {
  const respuesta = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
      "anthropic-workspace-id": process.env.ANTHROPIC_WORKSPACE_ID!,
    },
    body: JSON.stringify({
      model: "claude-sonnet-5",
      max_tokens: 2048,
      messages: [{ role: "user", content: promptFinal }],
    }),
  });

  const raw = await respuesta.text();
  let data;

  try {
    data = JSON.parse(raw);
  } catch {
    return { error: "JSON inválido", raw };
  }

  if (data.error) return { error: data.error.message };

  let resultado = "No se recibió un análisis.";

  if (Array.isArray(data.content)) {
    for (const item of data.content) {
      if (item.text && item.text.trim() !== "") {
        resultado = item.text;
        break;
      }
    }
  }

  return { resultado };
}
