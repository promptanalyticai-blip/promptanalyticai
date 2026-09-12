// app/dashboard/workspaces/[id]/webhooks/page.tsx
"use client";

import Header from "../../../components/Header";

export default function WebhooksPage({ params }) {
  return (
    <div className="p-6">
      <Header title="Webhooks" subtitle={`Workspace ${params.id}`} />
    </div>
  );
}
