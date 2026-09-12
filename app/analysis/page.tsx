"use client";

import { supabase } from "@/lib/supabaseClient";
import Reactions from "../../../dashboard/components/Reactions";
import Tags from "../../../dashboard/components/Tags";
import Tasks from "../../../dashboard/components/Tasks";

export default async function AnalysisDetailPage({ params }) {
  const { id } = params;

  // Cargar análisis
  const { data: analysis } = await supabase
    .from("analysis")
    .select("*")
    .eq("id", id)
    .single();

  // Cargar reacciones
  const { data: reactions } = await supabase
    .from("reactions")
    .select("*")
    .eq("analysis_id", id);

  // Cargar tags
  const { data: tags } = await supabase
    .from("tags")
    .select("*")
    .eq("analysis_id", id);

  // Cargar tareas
  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("analysis_id", id);

  return (
    <div className="p-6 space-y-6">
      {/* Título */}
      <h1 className="text-2xl font-bold text-slate-100">
        {analysis?.title || "Análisis"}
      </h1>

      {/* Descripción */}
      <p className="text-slate-400">{analysis?.description}</p>

      {/* Reacciones */}
      <div>
        <h2 className="text-xl font-semibold text-slate-200 mb-2">
          Reacciones
        </h2>
        <Reactions
          likes={reactions?.filter((r) => r.type === "like").length || 0}
          dislikes={reactions?.filter((r) => r.type === "dislike").length || 0}
        />
      </div>

      {/* Tags */}
      <div>
        <h2 className="text-xl font-semibold text-slate-200 mb-2">Tags</h2>
        <Tags tags={tags?.map((t) => t.name) || []} />
      </div>

      {/* Tareas */}
      <div>
        <h2 className="text-xl font-semibold text-slate-200 mb-2">Tareas</h2>
        <Tasks tasks={tasks || []} />
      </div>
    </div>
  );
}
