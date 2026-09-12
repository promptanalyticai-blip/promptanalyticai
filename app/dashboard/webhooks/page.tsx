// app/dashboard/webhooks/page.tsx
"use client";

import { Header } from "../components/Header";
import { WebhookList } from "./components/WebhookList";

export default function WebhooksPage() {
  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Webhooks"
        subtitle="Gestiona integraciones externas mediante eventos automáticos"
      />

      <WebhookList />
    </div>
  );
}
