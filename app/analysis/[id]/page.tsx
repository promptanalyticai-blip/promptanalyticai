import { supabaseClient } from "@/lib/supabaseClient";

export default async function AnalysisDetail({ params }: any) {
  const { data } = await supabaseClient
    .from("analysis")
    .select("*")
    .eq("id", params.id)
    .single();

  return (
    <div>
      <h1>{data?.title}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
