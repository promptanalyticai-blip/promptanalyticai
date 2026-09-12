"use client";

export default function WorkspaceDetail({ workspaceId }: { workspaceId: string }) {
  return (
    <div className="p-6 fade-in">
      <h2 className="text-2xl font-bold mb-4">Workspace #{workspaceId}</h2>

      <p className="text-slate-300">
        Aquí puedes ver la información general del workspace, navegar entre sus
        secciones y administrar sus recursos.
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
          <h3 className="text-lg font-semibold text-slate-100 mb-2">Actividad</h3>
          <p className="text-slate-400 text-sm">
            Revisa la actividad reciente del workspace.
          </p>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
          <h3 className="text-lg font-semibold text-slate-100 mb-2">Archivos</h3>
          <p className="text-slate-400 text-sm">
            Gestiona los archivos asociados al workspace.
          </p>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
          <h3 className="text-lg font-semibold text-slate-100 mb-2">Automations</h3>
          <p className="text-slate-400 text-sm">
            Ejecuta y administra automatizaciones inteligentes.
          </p>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
          <h3 className="text-lg font-semibold text-slate-100 mb-2">Reports</h3>
          <p className="text-slate-400 text-sm">
            Genera reportes y métricas del workspace.
          </p>
        </div>
      </div>
    </div>
  );
}
