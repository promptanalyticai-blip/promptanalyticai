"use client";

import { supabase } from "@/lib/supabaseClient";
import Reactions from "../dashboard/components/Reactions";
import Tags from "../dashboard/components/Tags";
import Tasks from "../dashboard/components/Tasks";
import Link from "next/link";

export default async function AnalysisPage() {
  // Cargar todos los análisis
  const { data: analysisList } = await supabase
    .from("analysis")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-slate-100">Análisis</h1>

      <div className="space-y-6">
        {analysisList?.map((analysis) => (
          <div
            key={analysis.id}
            className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4"
          >
            {/* Título */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-200">
                {analysis.title}
              </h2>

              <Link
                href={`/analysis/${analysis.id}`}
                className="text-indigo-400 hover:text-indigo-300 text-sm"
              >
                Ver detalle →
              </Link>
            </div>

            {/* Descripción */}
            <p className="text-slate-400">{analysis.description}</p>

            {/* Tags */}
            <Tags tags={analysis.tags || []} />

            {/* Reacciones */}
            <Reactions
              likes={analysis.likes || 0}
              dislikes={analysis.dislikes || 0}
            />

            {/* Tareas */}
            <Tasks tasks={analysis.tasks || []} />
          </div>
        ))}
      </div>
    </div>
  );
}
