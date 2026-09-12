// app/prompts/page.tsx
"use client";

import Header from "../dashboard/components/Header";
import { supabase } from "@/lib/supabaseClient";

export default async function PromptsPage() {
  const { data } = await supabase.from("prompts").select("*");

  return (
    <div className="p-6">
      <Header title="Prompts" subtitle="Listado de prompts creados" />
    </div>
  );
}
