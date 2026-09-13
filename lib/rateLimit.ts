import { createClient } from "@/lib/supabase/client";

export async function registrarUso(token: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from("api_usage")
    .insert([
      {
        token,
        created_at: new Date().toISOString()
      }
    ]);

  if (error) throw error;
}
