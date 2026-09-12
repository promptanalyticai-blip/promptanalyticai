import { supabaseClient } from "@/lib/supabaseClient";

export default async function AnalysisPage() {
  const { data } = await supabaseClient.from("analysis").select("*");

  return (
    <div>
      <h1>Analysis</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
