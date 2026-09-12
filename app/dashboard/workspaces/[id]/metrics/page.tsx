// app/dashboard/workspaces/[id]/metrics/page.tsx
"use client";

import Header from "../../../components/Header";

export default function WorkspaceMetricsPage({ params }) {
  return (
    <div className="p-6">
      <Header title="Metrics" subtitle={`Workspace ${params.id}`} />
    </div>
  );
}
