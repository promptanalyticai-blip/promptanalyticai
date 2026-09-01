import { supabase } from "@/lib/supabaseClient";

export async function registrarUso(token: string) {
  await supabase.from("api_usage").insert([{ token }]);
}

export async function verificarRateLimit(token: string, limite: number = 100) {
  const { data } = await supabase
    .from("api_usage")
    .select("*")
    .eq("token", token)
    .gte("fecha", new Date(Date.now() - 60 * 60 * 1000).toISOString()); // última hora

  if (!data) return false;

  return data.length >= limite;
}
