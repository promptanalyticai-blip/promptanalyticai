"use client";

import { supabaseBrowser } from "@/lib/supabase/browser";

export default async function AnalysisPage() {
  const { data } = await supabaseBrowser.from("analysis").select("*");

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Analysis</h1>

      <ul className="mt-4">
        {data?.map((a: any) => (
          <li key={a.id} className="border p-2 rounded mb-2">
            <strong>{a.title}</strong>
            <p>{a.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
