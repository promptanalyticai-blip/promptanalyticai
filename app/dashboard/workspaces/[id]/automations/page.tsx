// app/dashboard/workspaces/[id]/automations/page.tsx
"use client";

import Header from "../../../components/Header";

export default function WorkspaceAutomationsPage({ params }) {
  return (
    <div className="p-6">
      <Header title="Automations" subtitle={`Workspace ${params.id}`} />
    </div>
  );
}
