// app/dashboard/workspaces/[id]/settings/page.tsx
"use client";

import Header from "../../../components/Header";

export default function WorkspaceActivityPage({ params }) {
  return (
    <div className="p-6">
      <Header title="Actividad" subtitle={`Workspace ${params.id}`} />
    </div>
  );
}
