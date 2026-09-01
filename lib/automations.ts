import { supabase } from "@/lib/supabaseClient";
import { enviarWebhook } from "@/lib/webhooks";
import { generarAnalisisIA } from "@/lib/ia";

export async function obtenerAutomations(workspaceId: string, evento: string) {
  const { data } = await supabase
    .from("automations")
    .select("*")
    .eq("workspace_id", workspaceId)
    .eq("evento", evento);

  return data || [];
}

export async function obtenerAcciones(automationId: string) {
  const { data } = await supabase
    .from("automation_actions")
    .select("*")
    .eq("automation_id", automationId);

  return data || [];
}

export async function ejecutarAutomation(automation: any, payload: any) {
  const acciones = await obtenerAcciones(automation.id);

  for (const accion of acciones) {
    if (accion.tipo === "webhook") {
      await enviarWebhook({ id: accion.id, url: accion.configuracion.url }, payload);
    }

    if (accion.tipo === "email") {
      console.log("Enviar email:", accion.configuracion);
      // Aquí puedes integrar tu sistema de email
    }

    if (accion.tipo === "ia") {
      const prompt = accion.configuracion.prompt.replaceAll("{{payload}}", JSON.stringify(payload));
      const resultado = await generarAnalisisIA(prompt);
      console.log("Resultado IA:", resultado);
    }

    if (accion.tipo === "favorito") {
      await supabase.from("favorites").insert([
        {
          workspace_id: automation.workspace_id,
          user_id: automation.user_id,
          recurso_id: payload.id,
          tipo: payload.tipo,
          collection_id: accion.configuracion.collection_id
        }
      ]);
    }
  }
}
