// app/dashboard/workspaces/[id]/files/page.tsx
"use client";

import Header from "../../../components/Header";

export default function WorkspaceFilesPage({ params }) {
  return (
    <div className="p-6">
      <Header title="Files" subtitle={`Workspace ${params.id}`} />
    </div>
  );
}
