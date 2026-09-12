"use client";

import Reactions from "../../../components/Reactions";
import Tags from "../../../components/Tags";
import Tasks from "../../../components/Tasks";

export default function PromptAnalysisPage({ params }) {
  const { id } = params;

  return (
    <div className="fade-in p-6">
      <h1 className="text-3xl font-bold mb-4">Análisis del Prompt #{id}</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Reacciones</h2>
        <Reactions reactions={["👍", "🔥", "💡"]} />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Etiquetas</h2>
        <Tags tags={["AI", "Marketing", "Estrategia"]} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Tareas</h2>
        <Tasks tasks={["Revisar prompt", "Optimizar estructura", "Generar análisis"]} />
      </div>
    </div>
  );
}
