// app/dashboard/workspaces/[id]/settings/page.tsx
"use client";

import Header from "../../../components/Header";

export default function WorkspaceSettingsPage({ params }) {
  return (
    <div className="p-6">
      <Header title="Configuración" subtitle={`Workspace ${params.id}`} />
    </div>
  );
}
