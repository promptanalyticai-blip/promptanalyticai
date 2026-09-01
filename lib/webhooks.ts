import { supabase } from "@/lib/supabaseClient";

export async function obtenerWebhooks(workspaceId: string, evento: string) {
  const { data } = await supabase
    .from("webhooks")
    .select("*")
    .eq("workspace_id", workspaceId)
    .eq("evento", evento);

  return data || [];
}

export async function registrarLog(webhookId: string, status: string, respuesta: string) {
  await supabase.from("webhook_logs").insert([
    { webhook_id: webhookId, status, respuesta }
  ]);
}

export async function enviarWebhook(webhook: any, payload: any) {
  try {
    const res = await fetch(webhook.url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" }
    });

    const text = await res.text();
    await registrarLog(webhook.id, "success", text);
  } catch (err: any) {
    await registrarLog(webhook.id, "error", err.message);
  }
}
