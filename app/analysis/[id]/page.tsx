"use client";

import { supabaseBrowser } from "@/lib/supabase/browser";

export default async function AnalysisDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { data } = await supabaseBrowser
    .from("analysis")
    .select("*")
    .eq("id", params.id)
    .single();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Analysis detail</h1>
      {data ? (
        <div className="mt-4">
          <p>{data.title}</p>
          <p>{data.content}</p>
        </div>
      ) : (
        <p>No se encontro el analisis.</p>
      )}
    </div>
  );
}
