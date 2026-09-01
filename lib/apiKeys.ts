import { supabase } from "@/lib/supabaseClient";
import { randomUUID } from "crypto";

export async function crearApiKey(workspaceId: string, nombre: string) {
  const token = randomUUID() + "-" + randomUUID();

  await supabase.from("api_keys").insert([
    { workspace_id: workspaceId, nombre, token }
  ]);

  return token;
}

export async function obtenerApiKeys(workspaceId: string) {
  return supabase
    .from("api_keys")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("creado", { ascending: false });
}

export async function validarToken(token: string) {
  const { data } = await supabase
    .from("api_keys")
    .select("*")
    .eq("token", token)
    .single();

  return data;
}
