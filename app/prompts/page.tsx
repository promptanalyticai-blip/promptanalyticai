// app/prompts/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function PromptsPage() {
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    const loadPrompts = async () => {
      const { data, error } = await supabaseBrowser
        .from("prompts")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) {
        setPrompts(data);
      }
    };

    loadPrompts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Prompts</h1>

      <ul className="mt-4">
        {prompts.map((p) => (
          <li key={p.id} className="border p-2 rounded mb-2">
            <strong>{p.title}</strong>
            <p>{p.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
