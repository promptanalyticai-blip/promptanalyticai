"use client";

import WorkspaceDetail from "./WorkspaceDetail";

export default function WorkspacePage({ params }) {
  const workspaceId = params.id;

  return (
    <div className="fade-in p-6">
      <WorkspaceDetail workspaceId={workspaceId} />
    </div>
  );
}
