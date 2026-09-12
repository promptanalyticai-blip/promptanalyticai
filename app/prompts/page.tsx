// app/prompts/page.tsx
"use client";

import Header from "../dashboard/components/Header";
import { supabase } from "@/lib/supabaseClient";

export default function PromptsPage() {
  async function loadPrompts() {
    const { data } = await supabase.from("prompts").select("*");
    return data;
  }

  return (
    <div className="p-6">
      <Header title="Prompts" subtitle="Listado de prompts creados" />
    </div>
  );
}
