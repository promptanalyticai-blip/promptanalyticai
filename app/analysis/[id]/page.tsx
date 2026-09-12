import { getAnalysisById } from "../../../lib/prompts";
import Reactions from "../../../components/Reactions";
import Tags from "../../../components/Tags";
import Tasks from "../../../components/Tasks";

export default async function AnalysisPage({ params }) {
  const analysis = await getAnalysisById(params.id);

  if (!analysis) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">Análisis no encontrado</h1>
        <p>No existe un análisis con el ID proporcionado.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">{analysis.title}</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">Reacciones</h2>
        <Reactions reactions={analysis.reactions || []} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Tags</h2>
        <Tags tags={analysis.tags || []} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Tareas</h2>
        <Tasks tasks={analysis.tasks || []} />
      </section>
    </div>
  );
}
