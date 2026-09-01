import { supabase } from "./supabaseClient";

export async function guardarAnalisisDB(texto: string, resultado: string, industria: string) {
  return await supabase.from("analisis").insert([{ texto, resultado, industria }]);
}

export async function cargarHistorialDB() {
  return await supabase.from("analisis").select("*").order("id", { ascending: false });
}

export async function marcarFavoritoDB(id: number) {
  return await supabase.from("analisis").update({ favorito: true }).eq("id", id);
}
