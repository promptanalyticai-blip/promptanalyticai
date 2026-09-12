// app/dashboard/workspaces/[id]/reports/page.tsx
"use client";

import Header from "../../../components/Header";

export default function WorkspaceReportsPage({ params }) {
  return (
    <div className="p-6">
      <Header title="Reports" subtitle={`Workspace ${params.id}`} />
    </div>
  );
}
